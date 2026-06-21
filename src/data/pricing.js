// Shared volume-pricing tiers. Single source of truth used by the homepage
// PricingPreview, the /pricing/ page, the booking form load-size select, and
// the OfferCatalog JSON-LD. Edit prices here and they update everywhere.

// Price-floor strings live in booking.js (single source); re-exported here so
// pricing consumers can import everything pricing-related from one module.
export { PRICE_FLOOR, PRICE_FLOOR_DETAIL } from './booking.js';

// Relatable, volume-based load sizes (owner-set). $85 minimum per pickup.
export const tiers = [
  {
    slug: 'single-item',
    label: 'Single item',
    price: 'From $85',
    priceLow: 85,
    priceHigh: 85,
    detail: 'one item — $85 minimum per pickup',
    blurb: 'One item dropped curbside or pulled from the garage.',
    examples: ['Mattress – from $100', 'Refrigerator – from $100', 'TV – from $50', 'Mini fridge – $45'],
  },
  {
    slug: 'pickup-bed',
    label: 'Pickup-bed load',
    price: '$85 – $170',
    priceLow: 85,
    priceHigh: 170,
    detail: 'about a 5-ft pickup truck bed',
    blurb: 'A few items that fit in a pickup bed.',
    examples: ['A few large items', '2–3 appliances', 'Small garage corner', 'Single-room declutter'],
  },
  {
    slug: 'van-load',
    label: 'Van load',
    price: '$255 – $550',
    priceLow: 255,
    priceHigh: 550,
    detail: 'about the size of an Amazon delivery van',
    blurb: 'A room or two, or about half a garage.',
    examples: ['Living-room set', 'Bedroom set', 'Half-garage cleanout', 'Apartment move-out'],
  },
  {
    slug: 'full',
    label: 'Full load',
    price: 'up to $750',
    priceLow: 550,
    priceHigh: 750,
    detail: 'a full trailer load',
    blurb: 'A whole-house or large cleanout.',
    examples: ['Full-house cleanout', 'Large estate', 'Garage + basement', 'Remodel debris'],
  },
];

// Per-item starting prices (owner-set). The $85 pickup minimum still applies —
// these are per-piece rates for items added to a load or picked up together.
// Appliances, electronics, and tires are recycled, never landfilled.
export const itemPrices = [
  { item: 'Mattress', price: 'from $100' },
  { item: 'Refrigerator', price: 'from $100', recycled: true },
  { item: 'Freezer', price: 'from $60', recycled: true },
  { item: 'Mini fridge', price: '$45', recycled: true },
  { item: 'TV', price: 'from $50', recycled: true },
  { item: 'Tires', price: '$30 each', recycled: true },
];

// What moves a quote up or down — used by the "What changes the price?" explainer.
export const priceFactors = [
  { label: 'Volume', detail: 'How much of the truck the load fills is the biggest factor.' },
  { label: 'Heavy materials', detail: 'Concrete, dirt, brick, and shingles are charged by weight and dump fees.' },
  { label: 'Stairs & carry distance', detail: 'Long carries, tight access, and multiple flights add labor time.' },
  { label: 'Specialty disposal', detail: 'Appliances with refrigerant, mattresses, and e-waste have certified recycling fees.' },
];
