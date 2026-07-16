// Service landing pages at /services/:slug.
// Each entry mirrors the structure of cities.js: name, intro, metaTitle, metaDescription, sections.

export const services = {
  'junk-pickup': {
    name: 'Junk pickup',
    icon: 'Truck',
    headline: 'Affordable curbside and garage junk pickup across Minnesota',
    intro:
      'Same-day eligible curbside and garage junk pickup. loads from $85, text-first photo quotes, and calendar booking. No call required — text photos and the crew sends a quote.',
    metaTitle: 'Junk Pickup Minnesota | From $85 | Dakota Valley',
    metaDescription:
      'Curbside and garage junk pickup across Minnesota. Single items to garage cleanouts. loads from $85, text photos for a quote, calendar booking.',
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
      'Curbside or garage furniture removal across Minnesota. Sofas, sectionals, beds and mattresses, dressers, dining sets, desks, and office furniture. loads from $85, $0 hidden fees.',
    metaTitle: 'Furniture Removal Minnesota | From $85 | Dakota Valley',
    metaDescription:
      'Furniture removal across Minnesota: sofas, sectionals, mattresses, dressers, dining sets, office furniture. Curbside or garage pickup. loads from $85.',
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
      'Donatable pieces routed to Bridging, Arc, or Savers.',
    ],
  },
  'appliance-recycling': {
    name: 'Appliance recycling',
    icon: 'Recycle',
    headline: 'Appliance removal and certified recycling across Minnesota',
    intro:
      'Curbside and garage appliance removal: refrigerators, washers, dryers, stoves, dishwashers, microwaves. EPA-certified refrigerant recovery for fridges and freezers. Metals routed to certified recyclers.',
    metaTitle: 'Appliance Removal Minnesota | Fridge Pickup | Dakota Valley',
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
    metaTitle: 'Garage Cleanout Pickup Minnesota | Dakota Valley',
    metaDescription:
      'Garage cleanout pickup across Minnesota. Stage items in the garage, the crew loads. loads from $85, photo quote, calendar booking.',
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
    metaTitle: 'Yard Debris Removal Minnesota | Dakota Valley',
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
    metaTitle: 'Dumpster Trailer Rental Minnesota | Dakota Valley',
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
  'mattress-removal': {
    name: 'Mattress removal',
    icon: 'Sofa',
    headline: "Mattress and box spring removal with certified recycling",
    intro:
      "Curbside mattress removal across Minnesota. Single, queen, king \u2014 and box springs. Mattresses are recycled at certified Minnesota facilities where up to 80% of components (steel coils, foam, fiber, fabric) are recovered. loads from $85, no hidden disposal fees.",
    metaTitle: "Mattress removal Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Mattress removal across Minnesota from $100. Text photos for a firm quote, then book curbside or garage pickup with certified recycling.",
    services: [
      "Single mattress pickup",
      "Multi-mattress bundles (move-out, hotel turnover)",
      "Box spring + frame removal",
      "Pillow-top and memory-foam mattresses",
      "Crib and toddler mattresses",
      "Certified mattress recycling chain",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'hot-tub-removal': {
    name: 'Hot tub removal',
    icon: 'Warehouse',
    headline: "Hot tub disassembly and removal across Minnesota",
    intro:
      "Hot tub removal from decks, backyards, patios, and below-grade installations. Crew handles disassembly, lifting, hauling, and disposal. Quoted by request \u2014 text photos of the tub, deck, and access path.",
    metaTitle: "Hot tub removal Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Hot tub removal across Minnesota. Text photos of the tub and access path for a written quote on disassembly, hauling, and disposal.",
    services: [
      "Free-standing hot tub removal",
      "Sunken / below-grade tub removal",
      "Cover and accessories disposal",
      "Spa equipment and pump removal",
      "Inflatable hot tub removal",
      "Saunas (separate quote)",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'scrap-metal-removal': {
    name: 'Scrap metal removal',
    icon: 'Recycle',
    headline: "Scrap metal pickup and certified recycling",
    intro:
      "Scrap metal removal across Minnesota \u2014 appliances, exercise equipment, fencing, gutters, swing sets, file cabinets, and bulk metal piles. Routed to certified Minnesota metal recyclers, not landfill.",
    metaTitle: "Scrap metal removal Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Scrap metal pickup across Minnesota. Text photos for a firm quote on appliances, equipment, fencing, cabinets, and bulk metal piles.",
    services: [
      "Appliance metal recovery",
      "Aluminum, copper, steel piles",
      "Fencing and gutter removal",
      "Filing cabinet bundles",
      "Swing set and play structure metal",
      "Exercise equipment",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'electronics-removal': {
    name: 'Electronics removal',
    icon: 'Recycle',
    headline: "Electronics removal with R2-certified e-waste recycling",
    intro:
      "Electronics pickup across Minnesota \u2014 TVs (including old CRTs), computers, monitors, printers, gaming consoles, audio equipment. Routed to R2-certified e-waste recyclers. Hard drives wiped or physically destroyed on request.",
    metaTitle: "Electronics removal Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Electronics pickup across Minnesota. Text photos for a firm quote on TVs, computers, monitors, printers, consoles, and audio equipment.",
    services: [
      "CRT and flat-panel TV pickup",
      "Computer towers and laptops",
      "Printers and scanners",
      "Gaming consoles",
      "Audio/video equipment",
      "Hard drive destruction (on request)",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'hoarder-cleanout': {
    name: 'Hoarder cleanout',
    icon: 'Home',
    headline: "Compassionate, discreet hoarder cleanout services",
    intro:
      "Hoarder cleanout across Minnesota. Discreet, judgment-free, thorough. Crew works at your pace, sorts donations vs trash on-site, and leaves the property clean. Quoted on-site for each job.",
    metaTitle: "Hoarder cleanout Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Hoarder cleanout across Minnesota. Discreet, judgment-free service with donation sorting, hauling, and cleanup quoted from photos.",
    services: [
      "Full-property hoarder cleanout",
      "Partial-room cleanout",
      "Sort-on-site donation routing",
      "Biohazard-adjacent prep (defer hazmat to licensed)",
      "Multi-day projects",
      "Family/landlord coordination",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'estate-cleanout': {
    name: 'Estate cleanout',
    icon: 'Home',
    headline: "Estate cleanout services across Minnesota",
    intro:
      "Estate cleanout for families navigating loss, downsizing, or property sale. Respectful, thorough, donation-first approach. We help identify valuables vs trash, route donatable items to Bridging / Arc / Savers, and leave the property show-ready.",
    metaTitle: "Estate cleanout Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Estate cleanout across Minnesota for downsizing, probate, or sale prep. Text photos for a written quote and donation-first hauling.",
    services: [
      "Full estate cleanout",
      "Selective room cleanout",
      "Donation pickup with tax receipts",
      "Photo documentation before haul",
      "Family coordination for valuables",
      "Property show-prep cleaning",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'attic-cleanout': {
    name: 'Attic cleanout',
    icon: 'Home',
    headline: "Attic cleanout and old storage haul-out",
    intro:
      "Attic cleanout across Minnesota. Decades of boxes, old furniture, insulation debris, holiday decorations, and forgotten storage. Crew brings everything down, sorts donations, and hauls the rest.",
    metaTitle: "Attic cleanout Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Attic cleanout across Minnesota. Text photos for a firm quote on boxes, furniture, holiday storage, and debris removal.",
    services: [
      "Full attic cleanout",
      "Selective box removal",
      "Old furniture from attic",
      "Insulation debris (loose, not asbestos)",
      "Holiday decoration bundles",
      "Trunk and chest removal",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'basement-cleanout': {
    name: 'Basement cleanout',
    icon: 'Home',
    headline: "Basement cleanout \u2014 furniture, storage, debris",
    intro:
      "Basement cleanout across Minnesota. Old furniture, exercise equipment, paint cans (empty only), storage bins, water-damaged debris, and the basement-junk that builds up over decades. Crew handles stairs.",
    metaTitle: "Basement cleanout Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Basement cleanout across Minnesota. Text photos for a firm quote on furniture, exercise equipment, storage bins, and debris.",
    services: [
      "Full basement cleanout",
      "Old furniture from basement",
      "Exercise equipment",
      "Water-damaged debris",
      "Empty paint cans + clean materials",
      "Storage shelving breakdown",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'fence-removal': {
    name: 'Fence removal',
    icon: 'Leaf',
    headline: "Fence removal and hauling across Minnesota",
    intro:
      "Fence removal \u2014 wood, chain-link, vinyl, wrought iron. Crew dismantles and hauls. Concrete footings broken up by request. Yard left clean and fillable.",
    metaTitle: "Fence removal Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Fence removal \u2014 wood, chain-link, vinyl, wrought iron. Crew dismantles and hauls. Concrete footings broken up by request. Yard left clean and fillable.",
    services: [
      "Wood fence removal",
      "Chain-link fence removal",
      "Vinyl/PVC fencing",
      "Wrought iron fence",
      "Concrete footing breakup (by quote)",
      "Gate hardware removal",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'shed-removal': {
    name: 'Shed removal',
    icon: 'Warehouse',
    headline: "Shed removal and demolition across Minnesota",
    intro:
      "Shed removal \u2014 wood, metal, plastic, brick. Crew breaks down the shed, hauls debris, and leaves the slab/site clean. Concrete pad demo quoted separately.",
    metaTitle: "Shed removal Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Shed removal \u2014 wood, metal, plastic, brick. Crew breaks down the shed, hauls debris, and leaves the slab/site clean. Concrete pad demo quoted separately.",
    services: [
      "Wood shed dismantling + haul",
      "Metal shed (Tuff Shed etc.) breakdown",
      "Plastic/resin shed removal",
      "Brick shed demolition (quote)",
      "Foundation pad demo (quote)",
      "Site cleanup + sweep",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'single-item-pickup': {
    name: 'Single-item pickup',
    icon: 'Truck',
    headline: "Single-item pickup \u2014 from $85",
    intro:
      "Single-item pickup across Minnesota. Flat per-item rates with no load minimum — mini fridge $45, TV from $50, tires $30; refrigerators and mattresses from $100. Bulky single items like a couch or dresser start at $85. Curbside or garage staging keeps it simple.",
    metaTitle: "Single-item pickup Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Single-item pickup across Minnesota from $85. Text photos for a firm price on furniture, TVs, mini fridges, mattresses, and appliances.",
    services: [
      "Single sofa or sectional",
      "Single refrigerator",
      "Single mattress + box",
      "Single piano (by quote)",
      "Single appliance",
      "Single bulky item (treadmill, etc.)",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
  'demolition': {
    name: 'Light demolition',
    icon: 'Warehouse',
    headline: "Light demolition \u2014 sheds, fences, decks, bathrooms",
    intro:
      "Light demolition across Minnesota. Sheds, fences, decks, interior bathroom and kitchen demo, light wall removal, hot tubs. Crew handles tear-down, hauling, and disposal. Quoted by job.",
    metaTitle: "Light demolition Minnesota | Dakota Valley Junk Removal",
    metaDescription:
      "Light demolition across Minnesota. Text photos for a written quote on sheds, fences, decks, interior demo, hot tubs, and hauling.",
    services: [
      "Deck demolition",
      "Shed demolition",
      "Fence demolition",
      "Bathroom interior demo",
      "Kitchen demo (cabinets, counters)",
      "Hot tub + spa demolition",
    ],
    process: [
      "Text photos and a quick description.",
      "Crew confirms quote and pickup window via text.",
      "Items go curbside or in the garage (or as agreed).",
      "Crew arrives, loads, and routes for donation or certified recycling.",
    ],
  },
};

export function getService(slug) {
  return services[slug] || null;
}

export function getServiceSlugs() {
  return Object.keys(services);
}
