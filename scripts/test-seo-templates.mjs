import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { cities } from '../src/data/cities.js';
import { counties } from '../src/data/counties.js';
import { services, isSpecialtyService } from '../src/data/services.js';
import { businessNode, BUSINESS_ID, SITE } from '../src/data/schemaBusiness.js';
import { photos, homepagePhotos, pickPhotos, describePhoto } from '../src/data/photos.js';

const page = (route) => readFile(`dist${route}index.html`, 'utf8');
function graph(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((match) => { const schema = JSON.parse(match[1]); return schema['@graph'] || [schema]; });
}
function checkBusiness(html, route) {
  const nodes = graph(html);
  const businesses = nodes.filter((node) => node['@type'] === 'LocalBusiness');
  assert.equal(businesses.length, 1, `${route}: one complete business entity`);
  assert.deepEqual(businesses[0], businessNode, `${route}: shared business address, coordinates and identity`);
  const service = nodes.find((node) => node['@type'] === 'Service');
  assert.equal(service?.provider?.['@id'], BUSINESS_ID, `${route}: complete provider referenced by stable ID`);
  return nodes;
}
function checkIllustrations(html, route) {
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (/src="\/illustrations\//.test(tag)) assert.match(tag, /alt="Illustration: /, `${route}: accurate illustration alt text`);
  }
}
const decode = (text) => text.replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const attribute = (tag, name) => decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] || '');
const photoRegistry = new Map(photos.map((photo) => [photo.src, photo]));
const imageSitemap = await readFile('dist/image-sitemap.xml', 'utf8');
const sitemapImages = new Map([...imageSitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => [
  decode(entry.match(/<loc>([\s\S]*?)<\/loc>/)?.[1] || ''),
  [...entry.matchAll(/<image:image><image:loc>([\s\S]*?)<\/image:loc><image:title>([\s\S]*?)<\/image:title><\/image:image>/g)]
    .map(([, src, title]) => ({ src: decode(src), title: decode(title) })),
]));
function checkPhotos(html, route, expectedPhotos, includeSitemap = false) {
  const photoTags = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag).filter((tag) => photoRegistry.has(attribute(tag, 'src')));
  const renderedSources = photoTags.map((tag) => attribute(tag, 'src'));
  assert.deepEqual(renderedSources, expectedPhotos.map((photo) => photo.src), `${route}: expected job photos are rendered`);
  assert.equal(new Set(renderedSources).size, expectedPhotos.length, `${route}: no duplicate job photos`);
  for (const tag of photoTags) {
    const photo = photoRegistry.get(attribute(tag, 'src'));
    assert.equal(attribute(tag, 'alt'), describePhoto(photo), `${route}: alt text describes the photo without invented city or service provenance`);
    assert.equal(Number(attribute(tag, 'width')), photo.width, `${route}: intrinsic photo width`);
    assert.equal(Number(attribute(tag, 'height')), photo.height, `${route}: intrinsic photo height`);
  }
  if (includeSitemap) assert.deepEqual(sitemapImages.get(`${SITE}${route}`), expectedPhotos.map((photo) => ({ src: `${SITE}${photo.src}`, title: describePhoto(photo) })), `${route}: image sitemap matches rendered photos and factual captions`);
}
function checkSpecialty(html, nodes, route) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
  const description = html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/)?.[1] || '';
  assert.doesNotMatch(`${title} ${description}`, /\$85/, `${route}: specialty search metadata does not advertise standard pickup minimum`);
  for (const [tag] of html.matchAll(/<span class="price-floor">[\s\S]*?<\/span>/g)) {
    assert.doesNotMatch(tag, /\$85/, `${route}: specialty price badge does not imply standard pickup pricing`);
  }
  const costFaqs = nodes.find((node) => node['@type'] === 'FAQPage')?.mainEntity.filter((node) => /\bcost\b|\bpric/i.test(node.name)) || [];
  for (const costFaq of costFaqs) assert.doesNotMatch(costFaq.acceptedAnswer.text, /\$85/, `${route}: cost FAQ uses a separate project quote`);
  assert.match(html, /data-specialty-scope/, `${route}: specialty acceptance and scope are visible`);
  assert.match(html, /standard pickup minimum is not a project quote/, `${route}: separate project pricing is explained`);
}

let count = 0;
let specialtyCount = 0;
const homepage = await page('/');
assert.equal(homepagePhotos.length, 6, 'Homepage has six selected job photos');
assert.match(homepage, /id="job-photos"/, 'Homepage job photos have a direct section link');
assert.match(homepage, /data-authentic-photos/, 'Homepage identifies the real job photo collection');
assert.doesNotMatch(homepage, /data-ba-target|ba-range|real job photos coming soon/i, 'Homepage has no placeholder before/after slider or stale photo promise');
checkPhotos(homepage, '/', homepagePhotos, true);
for (const photo of homepagePhotos) assert.ok(homepage.includes(`href="${photo.src}"`), 'Homepage photos link to the full photograph');
for (const [citySlug, city] of Object.entries(cities)) {
  const route = `/cities/${citySlug}/`;
  const html = await page(route);
  const nodes = checkBusiness(html, route);
  assert.equal(nodes.find((node) => node['@type'] === 'Service').areaServed.name, city.name, `${route}: city is the service area`);
  assert.equal(nodes.find((node) => node['@type'] === 'BreadcrumbList').itemListElement[1].item, `${SITE}/service-areas/`);
  assert.match(html, new RegExp(`href="/quote/${citySlug}/"`), `${route}: crawlable city quote preparation link`);
  assert.ok(html.includes(`href="/quote/?city=${encodeURIComponent(city.name)}"`), `${route}: quote CTA opens the prefilled form`);
  assert.match(html, /data-authentic-photos/, `${route}: gallery shows authentic job photos`);
  assert.match(html, /data-photo-provenance/, `${route}: photo collection source is disclosed without assigning a capture location`);
  assert.doesNotMatch(html, /data-illustration-disclosure|Pickup illustrations|Real loads, real curbs\./, `${route}: no stale gallery claims`);
  checkPhotos(html, route, pickPhotos(citySlug, 3), true);
  checkIllustrations(html, route);
  count++;

  const quoteRoute = `/quote/${citySlug}/`;
  const quoteHtml = await page(quoteRoute);
  const quoteNodes = checkBusiness(quoteHtml, quoteRoute);
  assert.equal(quoteNodes.find((node) => node['@type'] === 'Service').offers?.price, undefined, `${quoteRoute}: a minimum is not an exact Offer price`);
  assert.ok(quoteHtml.includes(`href="/quote/?city=${encodeURIComponent(city.name)}"`), `${quoteRoute}: direct form destination`);
  assert.match(quoteHtml, /does not reserve an appointment/, `${quoteRoute}: inquiry and confirmed pickup are distinguished`);
  count++;

  for (const serviceSlug of Object.keys(services)) {
    const comboRoute = `/cities/${citySlug}/${serviceSlug}/`;
    const comboHtml = await page(comboRoute);
    const comboNodes = checkBusiness(comboHtml, comboRoute);
    checkPhotos(comboHtml, comboRoute, pickPhotos(serviceSlug, 1));
    checkIllustrations(comboHtml, comboRoute);
    if (isSpecialtyService(serviceSlug)) { checkSpecialty(comboHtml, comboNodes, comboRoute); specialtyCount++; }
    count++;
  }
}
for (const serviceSlug of Object.keys(services)) {
  const route = `/services/${serviceSlug}/`;
  const html = await page(route);
  const nodes = checkBusiness(html, route);
  checkPhotos(html, route, pickPhotos(serviceSlug, 1), true);
  assert.equal(nodes.find((node) => node['@type'] === 'BreadcrumbList').itemListElement[1].item, `${SITE}/services/`);
  checkIllustrations(html, route);
  if (isSpecialtyService(serviceSlug)) { checkSpecialty(html, nodes, route); specialtyCount++; }
  count++;
}
for (const countySlug of Object.keys(counties)) {
  const route = `/counties/${countySlug}/`;
  const nodes = checkBusiness(await page(route), route);
  assert.equal(nodes.find((node) => node['@type'] === 'BreadcrumbList').itemListElement[1].item, `${SITE}/service-areas/`);
  count++;
}
console.log(`SEO templates passed: ${count} pages use the shared business entity, ${Object.keys(cities).length} city quote pages have incoming city links, authentic photo galleries and their sitemap agree, and ${specialtyCount} specialty pages use project pricing.`);
