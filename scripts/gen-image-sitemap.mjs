#!/usr/bin/env node
// Generates public/image-sitemap.xml from the page+image registry so Google
// Images can discover the photographs actually displayed on each page.
// Runs as a prebuild step when the photo registry changes.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SITE = 'https://dakotavalleyjunkremovalservice.com';

const { getCitySlugs } = await import(join(root, 'src/data/cities.js'));
const { services } = await import(join(root, 'src/data/services.js'));
const { homepagePhotos, pickPhotos, describePhoto } = await import(join(root, 'src/data/photos.js'));

const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const entries = [];

// Homepage — the six photographs displayed by JobPhotos.astro.
entries.push({ loc: `${SITE}/`, images: homepagePhotos.map((photo) => ({ url: `${SITE}${photo.src}`, title: describePhoto(photo) })) });

// Service pages
for (const slug of Object.keys(services)) {
  const p = pickPhotos(slug, 1)[0];
  entries.push({ loc: `${SITE}/services/${slug}/`, images: [{ url: `${SITE}${p.src}`, title: describePhoto(p) }] });
}

// City pages
for (const slug of getCitySlugs()) {
  const ps = pickPhotos(slug, 3);
  entries.push({ loc: `${SITE}/cities/${slug}/`, images: ps.map((p) => ({ url: `${SITE}${p.src}`, title: describePhoto(p) })) });
}

const body = entries.map((e) => {
  const imgs = e.images.map((im) =>
    `    <image:image><image:loc>${xmlEsc(im.url)}</image:loc><image:title>${xmlEsc(im.title)}</image:title></image:image>`
  ).join('\n');
  return `  <url>\n    <loc>${xmlEsc(e.loc)}</loc>\n${imgs}\n  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;

writeFileSync(join(root, 'public', 'image-sitemap.xml'), xml);
console.log(`[image-sitemap] wrote ${entries.length} urls with images`);
