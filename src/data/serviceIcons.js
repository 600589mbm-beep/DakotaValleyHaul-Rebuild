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

// "Starting from" price shown on service cards. Loads start at $85 (the minimum
// applies to loads only, not flat-rate recyclable items); larger cleanouts start
// higher. These are
// honest entry points, not quotes — final price is volume-based.
export const serviceStartingPrice = {
  'junk-pickup':         'From $85',
  'furniture-removal':   'From $85',
  'appliance-recycling': 'From $85',
  'garage-cleanout':     'From $255',
  'yard-debris':         'From $85',
  'dumpster-rental':     'By quote',
  'mattress-removal':    'From $100',
  'hot-tub-removal':     'By quote',
  'scrap-metal-removal': 'From $85',
  'electronics-removal': 'From $85',
  'hoarder-cleanout':    'By quote',
  'estate-cleanout':     'From $255',
  'attic-cleanout':      'From $85',
  'basement-cleanout':   'From $255',
  'fence-removal':       'From $85',
  'shed-removal':        'By quote',
  'single-item-pickup':  'From $85',
  'demolition':          'By quote',
};

export function startingPriceForService(slug) {
  return serviceStartingPrice[slug] || 'From $85';
}
