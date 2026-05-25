// Shared volume-pricing tiers. Single source of truth used by the homepage
// PricingPreview, the /pricing/ page, the booking form load-size select, and
// the OfferCatalog JSON-LD. Edit prices here and they update everywhere.

// Price-floor strings live in booking.js (single source); re-exported here so
// pricing consumers can import everything pricing-related from one module.
export { PRICE_FLOOR, PRICE_FLOOR_DETAIL } from './booking.js';

export const tiers = [
  {
    slug: 'single-item',
    label: 'Single item',
    price: '$85',
    priceLow: 85,
    priceHigh: 85,
    detail: '$85 each',
    blurb: 'One small item — small sofa, kids mattress, mini fridge, or small dresser.',
    examples: ['Small sofa', 'Kids mattress', 'Mini fridge', 'Small dresser'],
  },
  {
    slug: 'small',
    label: 'Small load',
    price: '$120 – $185',
    priceLow: 120,
    priceHigh: 185,
    detail: '~1/8 to 1/4 truck',
    blurb: 'A few large items or appliances.',
    examples: ['Refrigerator – $120', 'Mattress + box spring – $120', '2–3 appliances', 'Yard waste pile (small)', 'Garage corner load'],
  },
  {
    slug: 'medium',
    label: 'Medium load',
    price: '$220 – $320',
    priceLow: 220,
    priceHigh: 320,
    detail: '~1/4 to 1/2 truck',
    blurb: 'Half a garage or a multi-room pickup.',
    examples: ['Living room set', 'Bedroom set', 'Half garage cleanout', 'Apartment move-out', 'Partial estate cleanout'],
  },
  {
    slug: 'large',
    label: 'Large load',
    price: '$380 – $520',
    priceLow: 380,
    priceHigh: 520,
    detail: '~1/2 to 3/4 truck',
    blurb: 'A full garage or most of an estate.',
    examples: ['Full garage cleanout', 'Multi-room cleanout', 'Most estate cleanouts', 'Office cleanout', 'Hot tub removal (base)'],
  },
  {
    slug: 'full',
    label: 'Full truck',
    price: '$580 – $750',
    priceLow: 580,
    priceHigh: 750,
    detail: 'Full truckload',
    blurb: 'A whole-house or large cleanout.',
    examples: ['Full house cleanout', 'Hoarder cleanout (per truck)', 'Large estate', 'Yard renovation debris', 'Remodel debris'],
  },
];

// What moves a quote up or down — used by the "What changes the price?" explainer.
export const priceFactors = [
  { label: 'Volume', detail: 'How much of the truck the load fills is the biggest factor.' },
  { label: 'Heavy materials', detail: 'Concrete, dirt, brick, and shingles are charged by weight and dump fees.' },
  { label: 'Stairs & carry distance', detail: 'Long carries, tight access, and multiple flights add labor time.' },
  { label: 'Specialty disposal', detail: 'Appliances with refrigerant, mattresses, and e-waste have certified recycling fees.' },
];
