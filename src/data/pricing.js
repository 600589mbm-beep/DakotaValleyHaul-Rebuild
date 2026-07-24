// Shared pricing data — single source of truth for the homepage PricingPreview,
// the /pricing/ page, the booking-form load-size select, and the OfferCatalog
// JSON-LD. Two DISTINCT groups, kept separate on purpose:
//   A) LOADS — volume-based, start at $85 (the minimum applies to LOADS ONLY).
//   B) ITEMS — flat per-piece recyclable rates, NO load minimum (some < $85).
// Do not reintroduce a blanket "$85 minimum" or "only pay for the space you
// fill" — both are false against the flat item rates / recycling fees.
// Owner-approved load pricing reconfirmed July 23, 2026.

export { PRICE_FLOOR, PRICE_FLOOR_DETAIL } from './booking.js';

export const PRICING_HEADING = 'What it costs';
export const PRICING_INTRO =
  'Volume-based pricing for junk and cleanouts, plus flat rates on common recyclables. Text photos for a firm number.';
export const LOADS_TITLE = 'Junk & cleanout loads — from $85';
export const ITEMS_TITLE = 'Common items — flat rates, priced individually (no load minimum)';
export const ITEMS_SUBLINE = 'Appliances, electronics, and tires are recycled, not dumped.';

// Group A — volume-based loads (the $85 minimum applies to loads only).
export const tiers = [
  {
    slug: 'single-item',
    label: 'Single item',
    price: 'from $85',
    priceLow: 85,
    priceHigh: 85,
    desc: 'one bulky item like a couch, dresser, or table, curbside or from the garage.',
  },
  {
    slug: 'pickup-bed',
    label: 'Pickup-bed load',
    price: '$85 – $170',
    priceLow: 85,
    priceHigh: 170,
    desc: 'a few items that fit in a 5-ft pickup bed.',
  },
  {
    slug: 'van-load',
    label: 'Van load',
    price: '$255 – $550',
    priceLow: 255,
    priceHigh: 550,
    desc: 'about the size of a delivery van — a room or two, or roughly half a garage.',
  },
  {
    slug: 'full',
    label: 'Full load',
    price: 'up to $750',
    priceLow: 550,
    priceHigh: 750,
    desc: 'a packed box-truck load: about 1–2 bedrooms or a full garage cleanout.',
  },
];

// Group B — flat per-item recyclable rates. NO load minimum; priced individually.
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
  { label: 'Volume', detail: 'How much of the truck a load fills is the biggest factor for loads.' },
  { label: 'Heavy materials', detail: 'Concrete, dirt, brick, and shingles are charged by weight and dump fees.' },
  { label: 'Stairs & carry distance', detail: 'Long carries, tight access, and multiple flights add labor time.' },
  { label: 'Specialty disposal', detail: 'Appliances with refrigerant, mattresses, and e-waste have certified recycling fees.' },
];