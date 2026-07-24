// Maps each service slug to a Lucide icon name (used via astro-icon).
// Distinct icon per service so service cards stop looking identical.
//
// Browse the full Lucide set at https://lucide.dev — to change an icon,
// just swap the right-hand string (no other code changes needed).
export const serviceIcons = {
  'junk-pickup':           'lucide:truck',
  'furniture-removal':     'lucide:sofa',
  'appliance-recycling':   'lucide:refrigerator',
  'garage-cleanout':       'lucide:warehouse',
  'yard-debris':           'lucide:tree-pine',
  'dumpster-rental':       'lucide:container',
  'mattress-removal':      'lucide:bed',
  'hot-tub-removal':       'lucide:bath',
  'scrap-metal-removal':   'lucide:wrench',
  'electronics-removal':   'lucide:tv',
  'hoarder-cleanout':      'lucide:boxes',
  'estate-cleanout':       'lucide:home',
  'attic-cleanout':        'lucide:triangle',
  'basement-cleanout':     'lucide:layers',
  'fence-removal':         'lucide:fence',
  'shed-removal':          'lucide:tent',
  'single-item-pickup':    'lucide:package',
  'demolition':            'lucide:hammer',
};

// Fallback for unknown slugs.
export const FALLBACK_ICON = 'lucide:check-circle-2';

export function iconForService(slug) {
  return serviceIcons[slug] || FALLBACK_ICON;
}

// Keep detailed prices off service cards. The homepage and pricing page show only
// the $85 pickup minimum; every actual job is quoted from customer photos.
export function startingPriceForService() {
  return 'Photo quote';
}
