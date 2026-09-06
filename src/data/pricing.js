// Public pricing is photo-quote based. Historical numeric tier estimates below are not advertised rates.
// The current minimum and customer promises come from servicePolicy.js.

export { PRICE_FLOOR, PRICE_FLOOR_DETAIL } from './booking.js';

export const PRICING_HEADING = 'What it costs';
export const PRICING_INTRO = "Eligible curbside, driveway or accessible-garage pickups have an $85 minimum. This is not a flat price for every item. Send photos for the exact total in writing before booking.";
export const LOADS_TITLE = 'Eligible junk pickups — $85 minimum';
export const ITEMS_TITLE = 'Common items — quoted from photos';
export const ITEMS_SUBLINE = 'Appliances, electronics, and tires are recycled, not dumped.';

// Load descriptions; the public minimum is maintained in servicePolicy.js.
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
    price: "Quoted from photos",
    priceLow: 85,
    priceHigh: 170,
    desc: 'a few items that fit in a 5-ft pickup bed.',
  },
  {
    slug: 'van-load',
    label: 'Van load',
    price: "Quoted from photos",
    priceLow: 255,
    priceHigh: 550,
    desc: 'about the size of a delivery van — a room or two, or roughly half a garage.',
  },
  {
    slug: 'full',
    label: 'Full load',
    price: "Quoted from photos",
    priceLow: 550,
    priceHigh: 750,
    desc: 'a packed box-truck load: about 1–2 bedrooms or a full garage cleanout.',
  },
];

// Recyclable items are quoted from photos, including disposal requirements.
export const itemPrices = [
  { item: 'Mattress', price: "Quoted from photos" },
  { item: 'Refrigerator', price: "Quoted from photos", recycled: true },
  { item: 'Freezer', price: "Quoted from photos", recycled: true },
  { item: 'Mini fridge', price: "Quoted from photos", recycled: true },
  { item: 'TV', price: "Quoted from photos", recycled: true },
  { item: 'Tires', price: "Quoted from photos", recycled: true },
];

// What moves a quote up or down — used by the "What changes the price?" explainer.
export const priceFactors = [
  { label: 'Volume', detail: 'How much of the truck a load fills is the biggest factor for loads.' },
  { label: 'Heavy materials', detail: 'Concrete, dirt, brick, and shingles are charged by weight and dump fees.' },
  { label: "Staging and truck access", detail: "Items must be safely staged at the curb, in the driveway or in an accessible garage. Show the path to truck parking." },
  { label: 'Specialty disposal', detail: 'Appliances with refrigerant, mattresses, and e-waste have certified recycling fees.' },
];