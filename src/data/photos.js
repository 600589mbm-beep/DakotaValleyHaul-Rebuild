// Production photo registry for Dakota Valley Junk Removal.
// Each entry: src (path), width/height (intrinsic — for CLS prevention),
// desc (base alt text, gets city/service name appended at render time).
//
// To swap images later: replace files in public/attached_assets/ and update
// the src/width/height/desc here. Pages auto-update on next build.
//
// IMPORTANT: descriptions here are conservative defaults — review against the
// actual photo content and edit for accuracy. Wrong alt text is worse than
// generic alt text.

export const photos = [
  {
    src: '/attached_assets/IMG_7020_1750653174383.jpeg',
    width: 1242,
    height: 1847,
    desc: 'Dakota Valley Junk Removal truck loaded with furniture and appliances',
  },
  {
    src: '/attached_assets/IMG_7038_1750897423693.jpeg',
    width: 1242,
    height: 1576,
    desc: 'Curbside junk pickup in progress',
  },
  {
    src: '/attached_assets/IMG_7039_1750897423693.jpeg',
    width: 1242,
    height: 1793,
    desc: 'Crew loading household items from the driveway',
  },
  {
    src: '/attached_assets/IMG_7040_1750897423693.jpeg',
    width: 1242,
    height: 1551,
    desc: 'Garage cleanout staged for pickup',
  },
  {
    src: '/attached_assets/IMG_7041_1750897423693.jpeg',
    width: 1242,
    height: 1604,
    desc: 'Truck loaded with furniture ready for transport',
  },
  {
    src: '/attached_assets/IMG_7042_1750897423693.jpeg',
    width: 1121,
    height: 2162,
    desc: 'Items staged at the curb for Dakota Valley pickup',
  },
  {
    src: '/attached_assets/IMG_7021_1750696599185.png',
    width: 1242,
    height: 2688,
    desc: 'Full driveway load ready for hauling',
  },
];

// Deterministic photo selection per slug — same city always gets the same
// photos across builds, but different cities get different photos.
// Uses a simple character-sum hash; spread via small prime offset.
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
// "{base desc} — {service or context} in {City}, MN"
export function buildAlt(photoDesc, cityName, context = '') {
  const contextPart = context ? ` (${context})` : '';
  return `${photoDesc}${contextPart} — Dakota Valley Junk Removal in ${cityName}, MN`;
}
