import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { cities } from '../src/data/cities.js';
import { counties } from '../src/data/counties.js';
import { services, isSpecialtyService } from '../src/data/services.js';
import { businessNode, BUSINESS_ID, SITE } from '../src/data/schemaBusiness.js';

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
for (const [citySlug, city] of Object.entries(cities)) {
  const route = `/cities/${citySlug}/`;
  const html = await page(route);
  const nodes = checkBusiness(html, route);
  assert.equal(nodes.find((node) => node['@type'] === 'Service').areaServed.name, city.name, `${route}: city is the service area`);
  assert.equal(nodes.find((node) => node['@type'] === 'BreadcrumbList').itemListElement[1].item, `${SITE}/service-areas/`);
  assert.match(html, new RegExp(`href="/quote/${citySlug}/"`), `${route}: crawlable city quote preparation link`);
  assert.ok(html.includes(`href="/quote/?city=${encodeURIComponent(city.name)}"`), `${route}: quote CTA opens the prefilled form`);
  assert.match(html, /data-illustration-disclosure/, `${route}: gallery discloses illustrations`);
  assert.doesNotMatch(html, /Real loads, real curbs\.|job photos<\/p>/, `${route}: gallery does not claim completed local jobs`);
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
    checkIllustrations(comboHtml, comboRoute);
    if (isSpecialtyService(serviceSlug)) { checkSpecialty(comboHtml, comboNodes, comboRoute); specialtyCount++; }
    count++;
  }
}
for (const serviceSlug of Object.keys(services)) {
  const route = `/services/${serviceSlug}/`;
  const html = await page(route);
  const nodes = checkBusiness(html, route);
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
console.log(`SEO templates passed: ${count} pages use the shared business entity, ${Object.keys(cities).length} city quote pages have incoming city links, galleries disclose illustrations, and ${specialtyCount} specialty pages use project pricing.`);
