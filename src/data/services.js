// Service landing pages at /services/:slug.
// Each entry mirrors the structure of cities.js: name, intro, metaTitle, metaDescription, sections.

// These requests need a project or rental quote, not the standard pickup minimum.
export const SPECIALTY_SERVICE_SLUGS = ['hot-tub-removal', 'fence-removal', 'shed-removal', 'demolition', 'dumpster-rental'];
export const isSpecialtyService = (slug) => SPECIALTY_SERVICE_SLUGS.includes(slug);

export const SERVICE_SEO_NAMES = {
  'junk-pickup': 'Junk Removal',
  'furniture-removal': 'Furniture Removal',
  'appliance-recycling': 'Appliance Recycling',
  'garage-cleanout': 'Garage Cleanout',
  'yard-debris': 'Yard Waste Removal',
  'dumpster-rental': 'Dumpster Rental',
  'mattress-removal': 'Mattress Disposal',
  'hot-tub-removal': 'Hot Tub Removal',
  'scrap-metal-removal': 'Scrap Metal Pickup',
  'electronics-removal': 'Electronics Removal',
  'hoarder-cleanout': 'Hoarder Cleanout Pickup',
  'estate-cleanout': 'Estate Cleanout Pickup',
  'attic-cleanout': 'Attic Cleanout Pickup',
  'basement-cleanout': 'Basement Cleanout Pickup',
  'fence-removal': 'Fence Removal',
  'shed-removal': 'Shed Removal',
  'single-item-pickup': 'Single-Item Pickup',
  'demolition': 'Outdoor Demolition',
};

export const services = {
  'junk-pickup': {
    name: 'Junk pickup',
    icon: 'Truck',
    headline: 'Affordable curbside and garage junk pickup across Minnesota',
    intro:
      "Curbside, driveway and accessible-garage junk pickup with an $85 minimum for eligible jobs. Text photos for the full price in writing, approve it and confirm an available pickup window with the crew. No inside-home pickup.",
    metaTitle: 'Junk Removal Minnesota | Dakota Valley',
    metaDescription:
      "Junk pickup in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
      'Single-item pickup',
      'Multi-item bundles',
      'Garage cleanout pickup',
      'Office and warehouse small loads',
      'Estate cleanouts (by quote)',
      'Move-out and apartment turnover loads',
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'furniture-removal': {
    name: 'Furniture removal',
    icon: 'Sofa',
    headline: 'Furniture removal — sofas, beds, dressers, sectionals, office',
    intro:
      "Curbside, driveway and accessible-garage pickup for sofas, sectionals, dressers, beds, tables and office furniture. Eligible pickups have an $85 minimum; send photos for the complete written quote before booking. No inside-home carry-out.",
    metaTitle: 'Furniture Removal Minnesota | Dakota Valley',
    metaDescription:
      "Furniture removal in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
  "Sofa and sectional pickup",
  "Pre-staged mattresses and box springs",
  "Disassembled bed frames and headboards",
  "Dressers and wardrobes",
  "Dining tables and chairs",
  "Office desks and filing cabinets"
],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'appliance-recycling': {
    name: 'Appliance recycling',
    icon: 'Recycle',
    headline: 'Appliance removal and certified recycling across Minnesota',
    intro:
      'Paid pickup of pre-staged refrigerators, washers, dryers, stoves, dishwashers and microwaves. Send photos and your address for acceptance and a written quote. Have appliances safely disconnected by a qualified person before staging; do not cut refrigerant lines. Approve the price before confirming pickup.',
    metaTitle: 'Appliance Recycling Minnesota | Dakota Valley',
    metaDescription:
      "Appliance recycling in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
      'Refrigerator and freezer pickup (refrigerant recovered EPA-certified)',
      'Washer and dryer removal',
      'Stove and oven pickup',
      'Dishwasher and disposal',
      'Microwave and small appliance bundles',
      'AC unit and dehumidifier removal',
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'garage-cleanout': {
    name: 'Garage cleanout',
    icon: 'Home',
    headline: 'Garage cleanout pickup — pre-selected and safely staged items',
    intro:
      'Paid pickup of approved boxes, furniture, sports equipment and other nonhazardous items you have selected for removal. Separate belongings you are keeping and provide a clear loading path from an accessible garage, driveway or curb. Send photos for a written quote and approve the price before confirming pickup.',
    metaTitle: 'Garage Cleanout Pickup Minnesota | Dakota Valley',
    metaDescription:
      "Garage cleanout in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
      'Pickup of approved garage-staged loads',
      'Half-garage downsize',
      'Holiday and seasonal decoration purge',
      'Sports equipment bundles',
      'Old furniture stored in the garage',
      'Shop tool and hardware purges',
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'yard-debris': {
    name: 'Yard and storm debris',
    icon: 'Leaf',
    headline: 'Paid pickup of staged yard waste, brush and storm debris',
    intro:
      'Send photos of brush, branches, garden waste or storm debris for a paid pickup quote. Identify mixed materials such as lumber, fencing, soil or sod so the crew can review acceptance, weight and disposal needs. Stage approved debris at the curb, in the driveway or in an accessible garage. Approve the written total before confirming pickup; this is not a public drop-off site.',
    metaTitle: 'Yard Waste Removal Minnesota | Dakota Valley',
    metaDescription:
      "Paid yard waste removal in Minnesota. Brush, branches and staged storm debris reviewed from photos. Approve your written quote before confirming pickup.",
    services: [
      'Brush and branch piles',
      'Storm debris cleanup',
      'Old fencing and posts',
      'Deck debris and old lumber',
      'Sod and yard renovation waste',
      'Garden bed cleanouts',
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'dumpster-rental': {
    name: 'Dumpster and trailer rental',
    icon: 'Warehouse',
    headline: 'Short-term dumpster and trailer drop for DIY loading',
    intro:
      "Request a dumpster or trailer for DIY loading during an agreed rental period. Send your address, access photos, material list and preferred dates. Availability, container size, permitted materials, weight limits, price, delivery and collection terms are confirmed in writing. A request does not reserve a container.",
    metaTitle: 'Dumpster & Trailer Rental Minnesota | Dakota Valley',
    metaDescription:
      "Dumpster and trailer rental requests in Minnesota. Send project and access photos. Scope, price and scheduling require written confirmation; no interior work.",
    services: [
      'Dumpster or trailer requests, subject to availability',
      'DIY loading during the agreed rental period',
      'Materials and weight limits approved before loading',
      'Delivery access reviewed from photos',
      'Delivery and collection dates confirmed in writing',
      'Written rental price and terms before confirmation',
    ],
    process: [
  "Send your address, access photos, materials and preferred rental dates.",
  "The crew checks availability and confirms the container, load limits, rental period and total in writing.",
  "Approve the price and terms before confirming delivery and collection.",
  "Load only approved materials within the agreed limits during your confirmed rental period."
],
  },
  'mattress-removal': {
    name: 'Mattress removal',
    icon: 'Sofa',
    headline: "Paid mattress and box spring pickup — staged items only",
    intro:
      "Pickup of pre-staged mattresses, box springs and disassembled bed-frame pieces. Send photos showing size, quantity and condition. Eligible pickups have an $85 minimum; the written total includes the disposal requirements for your job. No bedroom or stair carry-out.",
    metaTitle: "Mattress Disposal Minnesota | Dakota Valley",
    metaDescription:
      "Paid mattress disposal in Minnesota. Stage mattresses and box springs curbside or in a garage. Get a written photo quote before confirming pickup.",
    services: [
      "Single mattress pickup",
      "Multi-mattress bundles (move-out, hotel turnover)",
      "Box spring + frame removal",
      "Pillow-top and memory-foam mattresses",
      "Crib and toddler mattresses",
      "Certified mattress recycling chain",
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'hot-tub-removal': {
    name: 'Hot tub removal',
    icon: 'Warehouse',
    headline: "Hot tub disassembly and removal across Minnesota",
    intro:
      "Request outdoor hot tub removal with photos of the tub, its installation and the full access path. The crew reviews whether the project can be accepted and confirms disassembly, hauling, disposal and any preparation in the written quote. Approve the price and scope before confirming an available appointment.",
    metaTitle: "Hot Tub Removal Minnesota | Dakota Valley",
    metaDescription:
      "Hot tub removal requests in Minnesota. Send project and access photos. Scope, price and scheduling require written confirmation; no interior work.",
    services: [
      "Free-standing hot tub removal",
      "Sunken / below-grade tub removal",
      "Cover and accessories disposal",
      "Spa equipment and pump removal",
      "Inflatable hot tub removal",
      "Saunas (separate quote)",
    ],
    process: [
  "Send photos of the full outdoor project and access, or describe the requested rental.",
  "The crew reviews whether the project can be accepted and confirms the exact written scope and price.",
  "Approve the quote and confirm an available appointment or rental window.",
  "Only the work included in the agreed written scope is performed; no interior work."
],
  },
  'scrap-metal-removal': {
    name: 'Scrap metal removal',
    icon: 'Recycle',
    headline: "Scrap metal pickup and certified recycling",
    intro:
      "Scrap metal removal across Minnesota \u2014 appliances, exercise equipment, fencing, gutters, swing sets, file cabinets, and bulk metal piles. Routed to certified Minnesota metal recyclers, not landfill.",
    metaTitle: "Scrap Metal Pickup Minnesota | Dakota Valley",
    metaDescription:
      "Scrap metal removal in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
      "Appliance metal recovery",
      "Aluminum, copper, steel piles",
      "Fencing and gutter removal",
      "Filing cabinet bundles",
      "Swing set and play structure metal",
      "Exercise equipment",
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'electronics-removal': {
    name: 'Electronics removal',
    icon: 'Recycle',
    headline: "Electronics removal with R2-certified e-waste recycling",
    intro:
      "Electronics pickup across Minnesota \u2014 TVs (including old CRTs), computers, monitors, printers, gaming consoles, audio equipment. Routed to R2-certified e-waste recyclers. Hard drives wiped or physically destroyed on request.",
    metaTitle: "Electronics Removal Minnesota | Dakota Valley",
    metaDescription:
      "Electronics removal in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
      "CRT and flat-panel TV pickup",
      "Computer towers and laptops",
      "Printers and scanners",
      "Gaming consoles",
      "Audio/video equipment",
      "Hard drive destruction (on request)",
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'hoarder-cleanout': {
    name: 'Hoarder cleanout',
    icon: 'Home',
    headline: "Judgment-free pickup of pre-staged cleanout items",
    intro:
      "Discreet pickup of approved nonhazardous furniture, boxes and household items after safe curbside, driveway or garage staging. We do not enter living areas, sort rooms or handle hazardous cleanup. Send photos for a written quote and appointment confirmation.",
    metaTitle: "Hoarder Cleanout Pickup Minnesota | Dakota Valley",
    metaDescription:
      "Hoarder cleanout in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
  "Pre-staged household furniture",
  "Approved boxes and storage items",
  "Separately staged donation candidates",
  "Nonhazardous bulky household items",
  "Multiple pickups by agreement",
  "Family or property-manager coordination"
],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'estate-cleanout': {
    name: 'Estate cleanout',
    icon: 'Home',
    headline: "Estate cleanout pickup — pre-staged items only",
    intro:
      "Estate cleanout pickup for approved furniture, boxes and household items that have already been safely staged at the curb, in the driveway or in an accessible garage. We do not sort or carry items from rooms inside the home. Text photos of everything to be collected for a written quote and a confirmed pickup window.",
    metaTitle: "Estate Cleanout Pickup Minnesota | Dakota Valley",
    metaDescription:
      "Estate cleanout in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
  "Pre-selected furniture staged for pickup",
  "Approved boxes and household items",
  "Separately staged donation candidates",
  "Photo details of the complete load",
  "Family or property-manager coordination",
  "Pickup windows confirmed in advance"
],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'attic-cleanout': {
    name: 'Attic cleanout',
    icon: 'Home',
    headline: "Attic cleanout pickup — pre-staged items only",
    intro:
      "Pickup of approved items from your attic cleanout after they are safely staged at the curb, in the driveway or in an accessible garage. We do not enter the attic or carry items on stairs. Text photos for a written quote and a pickup window confirmed by the crew.",
    metaTitle: "Attic Cleanout Pickup Minnesota | Dakota Valley",
    metaDescription:
      "Attic cleanout in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
      "Pickup of pre-staged attic items",
      "Selective box removal",
      "Old furniture from attic",
      "Safely bagged, pre-staged nonhazardous insulation debris (by review)",
      "Holiday decoration bundles",
      "Trunk and chest removal",
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'basement-cleanout': {
    name: 'Basement cleanout',
    icon: 'Home',
    headline: "Basement cleanout pickup — pre-staged items only",
    intro:
      "Pickup of approved items from your basement cleanout after they are safely staged at the curb, in the driveway or in an accessible garage. We do not enter the basement or carry items on stairs. Text photos for a written quote and a pickup window confirmed by the crew.",
    metaTitle: "Basement Cleanout Pickup Minnesota | Dakota Valley",
    metaDescription:
      "Basement cleanout in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
      "Pickup of pre-staged basement items",
      "Old furniture from basement",
      "Exercise equipment",
      "Water-damaged debris",
      "Empty paint cans + clean materials",
      "Pre-disassembled storage shelving",
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'fence-removal': {
    name: 'Fence removal',
    icon: 'Leaf',
    headline: "Fence removal and hauling across Minnesota",
    intro:
      "Request outdoor fence removal with photos of the fence, posts, footings and access. The crew reviews the project and confirms any dismantling, footing work, hauling and cleanup in a written quote. Approve the exact scope and price before confirming an available appointment.",
    metaTitle: "Fence Removal Minnesota | Dakota Valley",
    metaDescription:
      "Fence removal requests in Minnesota. Send project and access photos. Scope, price and scheduling require written confirmation; no interior work.",
    services: [
      "Wood fence removal",
      "Chain-link fence removal",
      "Vinyl/PVC fencing",
      "Wrought iron fence",
      "Concrete footing breakup (by quote)",
      "Gate hardware removal",
    ],
    process: [
  "Send photos of the full outdoor project and access, or describe the requested rental.",
  "The crew reviews whether the project can be accepted and confirms the exact written scope and price.",
  "Approve the quote and confirm an available appointment or rental window.",
  "Only the work included in the agreed written scope is performed; no interior work."
],
  },
  'shed-removal': {
    name: 'Shed removal',
    icon: 'Warehouse',
    headline: "Shed removal and demolition across Minnesota",
    intro:
      "Request outdoor shed removal with photos of the structure, contents, foundation and access. The crew reviews acceptance and confirms dismantling, debris hauling, cleanup and any foundation work in a written quote. Approve the scope and price before confirming an available appointment.",
    metaTitle: "Shed Removal Minnesota | Dakota Valley",
    metaDescription:
      "Shed removal requests in Minnesota. Send project and access photos. Scope, price and scheduling require written confirmation; no interior work.",
    services: [
      "Wood shed dismantling + haul",
      "Metal shed (Tuff Shed etc.) breakdown",
      "Plastic/resin shed removal",
      "Brick shed demolition (quote)",
      "Foundation pad demo (quote)",
      "Site cleanup + sweep",
    ],
    process: [
  "Send photos of the full outdoor project and access, or describe the requested rental.",
  "The crew reviews whether the project can be accepted and confirms the exact written scope and price.",
  "Approve the quote and confirm an available appointment or rental window.",
  "Only the work included in the agreed written scope is performed; no interior work."
],
  },
  'single-item-pickup': {
    name: 'Single-item pickup',
    icon: 'Truck',
    headline: "Paid single-item pickup — get a written photo quote",
    intro:
      "Need one bulky item gone? Send photos of the sofa, dresser, appliance or other item for a written quote. Eligible curbside, driveway and accessible-garage pickups have an $85 minimum, not a fixed price for every item. Your pickup window is confirmed with the crew.",
    metaTitle: "Single-Item Pickup Minnesota | Dakota Valley",
    metaDescription:
      "Single-item pickup in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.",
    services: [
      "Single sofa or sectional",
      "Single refrigerator",
      "Single mattress + box",
      "Single piano (by quote)",
      "Single appliance",
      "Single bulky item (treadmill, etc.)",
    ],
    process: [
  "Text photos of all items, the staging area and your pickup address.",
  "Approve the written total and confirm an available appointment with the crew.",
  "Have all approved items safely staged at the curb, in the driveway or in an accessible garage.",
  "The crew loads the agreed items; any change to the scope needs your approval first."
],
  },
  'demolition': {
    name: 'Light demolition',
    icon: 'Warehouse',
    headline: "Outdoor project requests and pre-staged renovation debris",
    intro:
      "Outdoor light-demolition requests and pre-staged renovation debris are reviewed from photos. Accepted project scope, access, hauling and disposal are confirmed in writing before booking. No interior demolition or inside-home carry-out is offered.",
    metaTitle: "Outdoor Demolition Minnesota | Dakota Valley",
    metaDescription:
      "Light demolition requests in Minnesota. Send project and access photos. Scope, price and scheduling require written confirmation; no interior work.",
    services: ["Outdoor shed requests, subject to written scope approval","Outdoor fence requests, subject to written scope approval","Outdoor deck requests, subject to written scope approval","Pre-staged bathroom renovation debris","Pre-staged kitchen cabinets and counters","Outdoor hot-tub requests, subject to written scope approval"],
    process: [
  "Send photos of the full outdoor project and access, or describe the requested rental.",
  "The crew reviews whether the project can be accepted and confirms the exact written scope and price.",
  "Approve the quote and confirm an available appointment or rental window.",
  "Only the work included in the agreed written scope is performed; no interior work."
],
  },
};

export function getService(slug) {
  return services[slug] || null;
}

export function getServiceSlugs() {
  return Object.keys(services);
}
