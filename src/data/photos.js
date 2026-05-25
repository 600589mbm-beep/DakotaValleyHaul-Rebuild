// Production image registry for Dakota Valley Junk Removal.
//
// ─────────────────────────────────────────────────────────────────────────
// IMPORTANT (2026-05-25): The previous entries here pointed at files that
// were NOT real job photos — they were screenshots of a competitor's booking
// app and CRM screens that exposed customer PII. Those files were removed
// from the repo. Until the owner supplies real photography, this registry
// serves brand-safe vector ILLUSTRATIONS so every page still has on-brand
// imagery without misleading customers or leaking data.
//
// TO ADD REAL PHOTOS (see public/PHOTO-SHOT-LIST.md):
//   1. Drop optimized images into public/attached_assets/ (or /photos/).
//   2. Replace the `src`, `width`, `height`, and `desc` below.
//   3. `npm run build` — alt text + image-sitemap rebuild across all pages.
// Each entry: src, width/height (intrinsic — prevents layout shift),
// desc (base alt text; city/service name is appended at render time),
// illustration (true while these are vector placeholders).
// ─────────────────────────────────────────────────────────────────────────

export const photos = [
  {
    src: '/illustrations/truck-load.svg',
    width: 1200,
    height: 800,
    desc: 'Dakota Valley Junk Removal truck loaded with furniture and appliances outside a home',
    illustration: true,
  },
  {
    src: '/illustrations/curbside.svg',
    width: 1200,
    height: 800,
    desc: 'Sofa, chairs and boxes staged at the curb for junk pickup',
    illustration: true,
  },
  {
    src: '/illustrations/garage.svg',
    width: 1200,
    height: 800,
    desc: 'Open garage stacked with boxes and items ready for a cleanout',
    illustration: true,
  },
  {
    src: '/illustrations/appliances.svg',
    width: 1200,
    height: 800,
    desc: 'Refrigerator, washer and stove lined up for appliance removal and recycling',
    illustration: true,
  },
  {
    src: '/illustrations/yard-debris.svg',
    width: 1200,
    height: 800,
    desc: 'Branches, fencing and yard debris piled for yard waste removal',
    illustration: true,
  },
  {
    src: '/illustrations/estate.svg',
    width: 1200,
    height: 800,
    desc: 'Furniture, boxes and appliances from a full property cleanout',
    illustration: true,
  },
];

// Deterministic image selection per slug — same city always gets the same
// images across builds, but different cities get different ones.
export function pickPhotos(slug, count = 2) {
  const hash = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const result = [];
  const seen = new Set();
  for (let i = 0; result.length < count && i < photos.length * 2; i++) {
    const idx = (hash + i * 7) % photos.length;
    if (!seen.has(idx)) {
      seen.add(idx);
      result.push(photos[idx]);
    }
  }
  return result;
}

// Build city-specific alt text. Pattern:
// "{base desc} — Dakota Valley Junk Removal in {City}, MN"
export function buildAlt(photoDesc, cityName, context = '') {
  const contextPart = context ? ` (${context})` : '';
  return `${photoDesc}${contextPart} — Dakota Valley Junk Removal in ${cityName}, MN`;
}
