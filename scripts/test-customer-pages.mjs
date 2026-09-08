import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { build } from 'esbuild';

const site = 'https://dakotavalleyjunkremovalservice.com';
const routes = ['/services/', '/pricing/', '/service-areas/', '/reviews/', '/faq/', '/quote/'];
const routeFile = (route) => resolve('dist', `.${route}`, 'index.html');
const titles = new Set();
const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');

for (const route of routes) {
  const dom = new JSDOM(await readFile(routeFile(route), 'utf8'), { url: `${site}${route}` });
  const doc = dom.window.document;
  assert.equal(doc.querySelectorAll('h1').length, 1, `${route}: one descriptive main heading`);
  assert.ok(doc.title.length > 15 && !titles.has(doc.title), `${route}: unique descriptive title`);
  titles.add(doc.title);
  assert.ok(doc.querySelector('meta[name="description"]')?.content.length > 60, `${route}: useful meta description`);
  assert.equal(doc.querySelector('link[rel="canonical"]')?.href, `${site}${route}`);
  assert.ok(sitemap.includes(`${site}${route}`), `${route}: included in sitemap`);
  const menu = doc.querySelector('.site-mobile-menu');
  assert.ok(menu?.querySelector('summary')?.textContent.includes('Menu'), `${route}: mobile menu available`);
  for (const destination of routes) assert.ok(menu.querySelector(`a[href="${destination}"]`), `${route}: menu links to ${destination}`);
  for (const link of doc.querySelectorAll('a[href^="/"]')) {
    const url = new URL(link.href, site);
    const file = url.pathname.endsWith('/') ? routeFile(url.pathname) : resolve('dist', `.${url.pathname}`);
    await access(file).catch(() => assert.fail(`${route}: broken internal destination ${url.pathname}`));
  }
  for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) JSON.parse(script.textContent);
  dom.window.close();
}

// Run only locally built site modules. Third-party analytics and real requests
// are never loaded; a failure if any unmocked network request is attempted.
async function interactivePage(route) {
  const dom = new JSDOM(await readFile(routeFile(route), 'utf8'), { url: `${site}${route}`, runScripts: 'outside-only' });
  dom.window.matchMedia = () => ({ matches: false, addEventListener() {} });
  dom.window.fetch = async () => { throw new Error('Unexpected network call in customer-flow test'); };
  for (const script of dom.window.document.querySelectorAll('script[type="module"][src^="/_astro/"]')) {
    const bundled = await build({ entryPoints: [resolve('dist', `.${script.getAttribute('src')}`)], bundle: true, write: false, format: 'iife', platform: 'browser', logLevel: 'silent' });
    dom.window.eval(bundled.outputFiles[0].text);
  }
  return dom;
}

const dom = await interactivePage('/service-areas/');
const { document: doc, Event, KeyboardEvent, MouseEvent } = dom.window;
const input = doc.querySelector('[data-area-search]');
const matches = () => [...doc.querySelectorAll('[data-areas-slug]')].filter((link) => !link.hidden);
function search(value) { input.value = value; input.dispatchEvent(new Event('input', { bubbles: true })); }
search('55124');
assert.deepEqual(matches().map((link) => link.dataset.areasSlug), ['apple-valley']);
assert.match(doc.querySelector('[data-area-status]').textContent, /1 city/);
search('00000');
assert.equal(matches().length, 0);
assert.equal(doc.querySelector('[data-area-empty]').hidden, false);
assert.ok(doc.querySelector('[data-area-empty] a[href="/quote/"]'));
doc.querySelector('[data-area-reset]').click();
assert.equal(input.value, '');
assert.equal(matches().length, 61);
assert.equal(doc.querySelector('[data-area-empty]').hidden, true);
assert.equal(doc.activeElement, input);
search('saint paul');
assert.deepEqual(matches().map((link) => link.dataset.areasSlug), ['st-paul']);
doc.querySelector('[data-area-clear]').click();
assert.equal(matches().length, 61);
const menu = doc.querySelector('.site-mobile-menu');
const summary = menu.querySelector('summary');
summary.click();
assert.equal(menu.open, true);
summary.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert.equal(menu.open, false);
assert.equal(doc.activeElement, summary);
summary.click();
doc.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
assert.equal(menu.open, false);
dom.window.close();

// Catch regressions in the shared templates, including all city quote pages.
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}
const pages = await walk('dist');
for (const path of pages) {
  const html = await readFile(path, 'utf8');
  assert.ok(!/<a\b[^>]*>\s*(?:Book|Use the booking form|Use the quote helper)\s*<\/a>/i.test(html), `${path}: stale quote CTA`);
  assert.ok(html.includes('site-mobile-menu'), `${path}: shared mobile navigation`);
}
console.log(`Customer pages passed: ${pages.length} pages, six navigation destinations, SEO metadata/sitemap, ZIP search/reset/empty states, and menu keyboard behavior.`);
