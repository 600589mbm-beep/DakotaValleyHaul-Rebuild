// Service landing pages at /services/:slug.
// Each entry mirrors the structure of cities.js: name, intro, metaTitle, metaDescription, sections.

export const services = {
  'junk-pickup': {
    name: 'Junk pickup',
    icon: 'Truck',
    headline: 'Affordable curbside and garage junk pickup across Minnesota',
    intro:
      'Same-day eligible curbside and garage junk pickup. $85 minimum, text-first photo quotes, and calendar booking. No call required — text photos and the crew sends a quote.',
    metaTitle: 'Junk Pickup Minnesota | Curbside & Garage Removal | Dakota Valley',
    metaDescription:
      'Curbside and garage junk pickup across Minnesota. Single items to garage cleanouts. $85 minimum, text photos for a quote, calendar booking.',
    services: [
      'Single-item pickup',
      'Multi-item bundles',
      'Garage cleanout pickup',
      'Office and warehouse small loads',
      'Estate cleanouts (by quote)',
      'Move-out and apartment turnover loads',
    ],
    process: [
      'Text photos of the items plus city or county.',
      'Crew confirms the pickup window via text.',
      'Items go curbside or in the garage before the appointment.',
      'Crew arrives, loads, sweeps, and texts a completion photo.',
    ],
  },
  'furniture-removal': {
    name: 'Furniture removal',
    icon: 'Sofa',
    headline: 'Furniture removal — sofas, beds, dressers, sectionals, office',
    intro:
      'Curbside or garage furniture removal across Minnesota. Sofas, sectionals, beds and mattresses, dressers, dining sets, desks, and office furniture. $85 minimum, $0 hidden fees.',
    metaTitle: 'Furniture Removal Minnesota | Sofa, Bed, Dresser Pickup | Dakota Valley',
    metaDescription:
      'Furniture removal across Minnesota: sofas, sectionals, mattresses, dressers, dining sets, office furniture. Curbside or garage pickup. $85 minimum.',
    services: [
      'Sofa and sectional removal',
      'Mattress and box spring recycling',
      'Bed frame and headboard breakdown',
      'Dresser and wardrobe removal',
      'Dining tables and chairs',
      'Office desks, conference tables, filing cabinets',
    ],
    process: [
      'Photo of each piece + dimensions if oversized.',
      'Crew confirms quote and pickup window via text.',
      'Items at the curb, in the driveway, or just inside the garage.',
      'Donatable pieces routed to Bridging, Arc, or Goodwill.',
    ],
  },
  'appliance-recycling': {
    name: 'Appliance recycling',
    icon: 'Recycle',
    headline: 'Appliance removal and certified recycling across Minnesota',
    intro:
      'Curbside and garage appliance removal: refrigerators, washers, dryers, stoves, dishwashers, microwaves. EPA-certified refrigerant recovery for fridges and freezers. Metals routed to certified recyclers.',
    metaTitle: 'Appliance Removal & Recycling Minnesota | Fridge, Washer, Dryer | Dakota Valley',
    metaDescription:
      'Curbside appliance removal across Minnesota. Refrigerator, washer, dryer, stove, dishwasher, microwave pickup with EPA-certified refrigerant handling.',
    services: [
      'Refrigerator and freezer pickup (refrigerant recovered EPA-certified)',
      'Washer and dryer removal',
      'Stove and oven pickup',
      'Dishwasher and disposal',
      'Microwave and small appliance bundles',
      'AC unit and dehumidifier removal',
    ],
    process: [
      'Photo + brand/model if you have it.',
      'Crew confirms appliance can be safely disconnected and removed.',
      'Appliance staged in the garage, on the porch, or curbside.',
      'Crew arrives, loads, and routes to certified recyclers.',
    ],
  },
  'garage-cleanout': {
    name: 'Garage cleanout',
    icon: 'Home',
    headline: 'Garage cleanout pickup — boxes, clutter, bulky items, fast load',
    intro:
      'Garage-staged cleanouts. Boxes, clutter, old paint cans (empty only), furniture, sports equipment, holiday decorations, and the years of accumulated stuff that piled up. Stage everything, the crew loads.',
    metaTitle: 'Garage Cleanout Pickup Minnesota | Fast Curbside Load | Dakota Valley',
    metaDescription:
      'Garage cleanout pickup across Minnesota. Stage items in the garage, the crew loads. $85 minimum, photo quote, calendar booking.',
    services: [
      'Full garage cleanout',
      'Half-garage downsize',
      'Holiday and seasonal decoration purge',
      'Sports equipment bundles',
      'Old furniture stored in the garage',
      'Shop tool and hardware purges',
    ],
    process: [
      'Photo of the staged pile (or a video walk-through).',
      'Crew confirms volume-based quote.',
      'Pile stays in the garage until the appointment.',
      'Crew loads, sweeps, donates/recycles where possible.',
    ],
  },
  'yard-debris': {
    name: 'Yard and storm debris',
    icon: 'Leaf',
    headline: 'Yard waste, brush, branches, storm debris, and fence removal',
    intro:
      'Curbside yard waste and storm debris removal. Brush, branches, fencing, deck debris, storm cleanup piles. Compostable material routed to certified compost facilities.',
    metaTitle: 'Yard Waste & Storm Debris Removal Minnesota | Dakota Valley',
    metaDescription:
      'Yard waste, branches, storm debris, and fence removal across Minnesota. Curbside pickup, compostable material routed to certified facilities.',
    services: [
      'Brush and branch piles',
      'Storm debris cleanup',
      'Old fencing and posts',
      'Deck debris and old lumber',
      'Sod and yard renovation waste',
      'Garden bed cleanouts',
    ],
    process: [
      'Photo of the pile + rough volume.',
      'Crew confirms quote and window via text.',
      'Pile staged at curb or driveway.',
      'Crew loads and routes compostables to certified facilities.',
    ],
  },
  'dumpster-rental': {
    name: 'Dumpster and trailer rental',
    icon: 'Warehouse',
    headline: 'Short-term dumpster and trailer drop for DIY loading',
    intro:
      "Short-term drop options for remodels, cleanouts, and DIY loading. By request — text size and timeline. Best for jobs where you're loading over a few days and don't need full-service crew labor.",
    metaTitle: 'Dumpster & Trailer Rental Minnesota | Short-Term Drop | Dakota Valley',
    metaDescription:
      'Short-term dumpster and trailer drop across Minnesota for remodels, DIY cleanouts, and renovation debris. By request — text size and timeline.',
    services: [
      'Driveway-friendly dumpster drop',
      'Trailer drop for DIY loading',
      'Remodel and demo debris loads',
      'Multi-day loading windows',
      'Pickup once you signal complete',
      'Material sorted at the transfer facility',
    ],
    process: [
      'Text the project scope and target dates.',
      'Crew confirms size + drop/pickup windows.',
      'Drop happens curbside or driveway.',
      'You load over the rental window; crew picks up on signal.',
    ],
  },
};

export function getService(slug) {
  return services[slug] || null;
}

export function getServiceSlugs() {
  return Object.keys(services);
}
