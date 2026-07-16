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

// Real proof photos are committed public assets. Keep this list limited to
// owner-supplied field photos so page visuals never drift back into placeholders.
export const realJobPhotos = [
  {
    src: '/photos/dakota-county/dakota-valley-pickup-truck-apple-valley.webp',
    width: 1800,
    height: 526,
    desc: 'Dakota Valley branded pickup truck on an Apple Valley junk removal route',
    slugs: ['apple-valley', 'eagan', 'burnsville', 'lakeville', 'rosemount', 'farmington', 'hastings', 'dakota-county'],
    category: 'fleet',
    real: true,
  },
  {
    src: '/photos/dakota-county/dakota-valley-dump-truck-dakota-county.webp',
    width: 1771,
    height: 544,
    desc: 'Dakota Valley dump truck serving Apple Valley and Dakota County junk removal routes',
    slugs: ['apple-valley', 'eagan', 'burnsville', 'lakeville', 'rosemount', 'farmington', 'hastings', 'dakota-county'],
    category: 'fleet',
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-driveway-junk-load.webp',
    width: 1242,
    height: 960,
    desc: 'Driveway junk load staged for pickup in Apple Valley',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-storage-cleanout.webp',
    width: 1242,
    height: 1690,
    desc: 'Storage unit cleanout pile with boxes, bags, and furniture in Apple Valley',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-storage-unit-cleanout.webp',
    width: 1242,
    height: 1677,
    desc: 'Packed storage unit before an Apple Valley junk removal cleanout',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-furniture-pickup.webp',
    width: 1600,
    height: 1200,
    desc: 'Sofa and household furniture staged in a garage for Apple Valley pickup',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-appliance-removal.webp',
    width: 1440,
    height: 1920,
    desc: 'Refrigerator staged in a garage for appliance removal in Apple Valley',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-curbside-small-load.webp',
    width: 1242,
    height: 956,
    desc: 'Curbside household junk and small items staged for Apple Valley pickup',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-kids-toys-garage-cleanout.webp',
    width: 1440,
    height: 1920,
    desc: 'Kids toys and garage items staged for Apple Valley junk pickup',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-yard-toys-garage-cleanout.webp',
    width: 1440,
    height: 1920,
    desc: 'Yard toys, mower, and household items staged for Apple Valley junk pickup',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-garage-furniture-cleanout.webp',
    width: 1200,
    height: 1600,
    desc: 'Garage furniture and boxed clutter staged for Apple Valley cleanout',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-patio-debris-removal.webp',
    width: 1242,
    height: 1656,
    desc: 'Patio lumber and outdoor debris staged for Apple Valley removal',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/apple-valley-recliner-sofa-removal.webp',
    width: 1242,
    height: 1159,
    desc: 'Recliner sofa ready for Apple Valley furniture removal',
    slugs: ['apple-valley', 'dakota-county'],
    real: true,
  },
  {
    src: '/photos/dakota-county/dakota-county-van-loading.webp',
    width: 1242,
    height: 1581,
    desc: 'Bulky cabinets and furniture loaded into a van on a Dakota County junk route',
    slugs: ['apple-valley', 'eagan', 'burnsville', 'lakeville', 'rosemount', 'farmington', 'hastings', 'dakota-county'],
    real: true,
  },
];

export function pickFleetPhotos(slug, count = 1) {
  return realJobPhotos
    .filter((photo) => photo.category === 'fleet' && photo.slugs.includes(slug))
    .slice(0, count);
}

export function pickRealJobPhotos(slug, count = 3) {
  return realJobPhotos
    .filter((photo) => photo.slugs.includes(slug))
    .slice(0, count);
}

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
