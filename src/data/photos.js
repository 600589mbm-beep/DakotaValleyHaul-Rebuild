// Authentic job photos supplied by the business owner on 2026-09-08.
// Originals are copied unchanged to public/photos/jobs/. Capture dates and
// individual job cities were not supplied, so captions do not invent them.
const photo = (id, width, height, desc) => ({ id, src: `/photos/jobs/${id}.jpg`, width, height, desc, illustration: false });

export const photos = [
  photo('garage-household-items', 384, 512, 'Mirrors, furniture parts and boxes gathered beside an open garage'),
  photo('outdoor-lumber', 815, 1448, 'Detached weathered boards gathered outside beneath a deck'),
  photo('stacked-garage-boards', 386, 512, 'Boards stacked together on a garage floor'),
  photo('garage-mattress-box-springs', 480, 640, 'A mattress and box springs standing together in a garage'),
  photo('garage-cardboard-furniture', 800, 600, 'Flattened cardboard, shelving and household items in an open garage'),
  photo('garage-patio-furniture', 1536, 2048, 'Patio furniture, wooden pallets and worn cushions in a garage'),
  photo('garage-mixed-items', 960, 1280, 'A mattress, televisions and furniture gathered in an open garage'),
  photo('garage-mattresses', 1200, 1600, 'Several mattresses and box springs grouped together in a garage'),
  photo('outdoor-wood-and-trim', 1600, 1200, 'Detached wood and trim gathered outside beside a porch'),
  photo('garage-furniture-panels', 480, 640, 'Disassembled furniture panels leaning against a garage wall'),
];

const homepageIds = [
  'garage-mixed-items', 'garage-mattresses', 'outdoor-wood-and-trim',
  'garage-furniture-panels', 'garage-household-items', 'garage-patio-furniture',
];
export const homepagePhotos = homepageIds.map(id => photos.find(item => item.id === id));

// Prefer relevant item photography where supplied. Other services show a
// general staged-item example; captions describe only what is pictured.
const preferredPhoto = {
  'junk-pickup': 'garage-mixed-items',
  'furniture-removal': 'garage-patio-furniture',
  'garage-cleanout': 'garage-cardboard-furniture',
  'yard-debris': 'outdoor-wood-and-trim',
  'mattress-removal': 'garage-mattresses',
  'electronics-removal': 'garage-mixed-items',
  'estate-cleanout': 'garage-mixed-items',
  'hoarder-cleanout': 'garage-cardboard-furniture',
  'attic-cleanout': 'garage-mixed-items',
  'basement-cleanout': 'garage-patio-furniture',
  'fence-removal': 'outdoor-lumber',
  'shed-removal': 'outdoor-wood-and-trim',
  'demolition': 'outdoor-wood-and-trim',
  'single-item-pickup': 'garage-mattresses',
  'appliance-recycling': 'garage-mixed-items',
  'scrap-metal-removal': 'garage-mixed-items',
  'hot-tub-removal': 'garage-mixed-items',
  'dumpster-rental': 'outdoor-wood-and-trim',
};

export function pickPhotos(slug, count = 2) {
  const hash = [...slug].reduce((total, character) => total + character.charCodeAt(0), 0);
  const preferred = photos.find(item => item.id === preferredPhoto[slug]);
  // Reserve larger originals for wide hero images; smaller originals still
  // appear in gallery cards at a size suited to their supplied resolution.
  const heroPhotos = photos.filter(item => item.width >= 800);
  const start = photos.indexOf(preferred || heroPhotos[hash % heroPhotos.length]);
  return Array.from({ length: Math.min(Math.max(0, count), photos.length) }, (_, i) => photos[(start + i) % photos.length]);
}

export function describePhoto(item) {
  return `${item.illustration ? 'Illustration: ' : ''}${item.desc}`;
}

// City/service context belongs to the page, not a claim about photo location.
export function buildAlt(photoDesc, _cityName = '', _context = '') {
  const item = photos.find(entry => entry.desc === photoDesc);
  return item ? describePhoto(item) : photoDesc;
}
