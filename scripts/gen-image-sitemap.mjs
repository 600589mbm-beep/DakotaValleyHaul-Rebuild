#!/usr/bin/env node
// Generates public/image-sitemap.xml from the page+image registry so Google
// Images can discover our imagery. Runs as a prebuild step. When real photos
// replace the illustrations in photos.js, this regenerates automatically.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SITE = 'https://dakotavalleyjunkremovalservice.com';

const { cities, getCitySlugs } = await import(join(root, 'src/data/cities.js'));
const { services } = await import(join(root, 'src/data/services.js'));
const { pickPhotos, buildAlt } = await import(join(root, 'src/data/photos.js'));

const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const entries = [];

// Homepage — the lead illustration + branded card
entries.push({ loc: `${SITE}/`, images: [
  { url: `${SITE}/illustrations/truck-load.svg`, title: 'Dakota Valley Junk Removal truck loaded with furniture and appliances' },
  { url: `${SITE}/og-card.png`, title: 'Dakota Valley Junk Removal — curbside & garage pickup across Minnesota' },
]});

// Service pages
for (const [slug, s] of Object.entries(services)) {
  const p = pickPhotos(slug, 1)[0];
  entries.push({ loc: `${SITE}/services/${slug}/`, images: [{ url: `${SITE}${p.src}`, title: `${s.name} — Dakota Valley Junk Removal` }] });
}

// City pages
for (const slug of getCitySlugs()) {
  const c = cities[slug];
  const ps = pickPhotos(slug, 2);
  entries.push({ loc: `${SITE}/cities/${slug}/`, images: ps.map((p) => ({ url: `${SITE}${p.src}`, title: buildAlt(p.desc, c.name) })) });
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
