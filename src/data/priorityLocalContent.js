import { PICKUP_REQUIREMENTS, SCHEDULING_POLICY } from './servicePolicy.js';
// High-value local content for the cities Dakota Valley serves most often.
//
// This file deliberately avoids invented jobs, customer locations, or fake
// neighborhood claims. Each entry provides practical pickup guidance and links
// to an official city or county disposal resource. Add completedJobExamples only
// after the owner has supplied a real date, location, items, access notes, and
// permission to publish any accompanying photos.

export const officialDisposalResources = {
  'dakota-county': {
    name: 'Dakota County Recycling Guide',
    url: 'https://www.co.dakota.mn.us/Environment/RecyclingDisposalGuide',
    summary:
      'Dakota County maintains a searchable guide for furniture, mattresses, appliances, electronics, yard waste, carpet, and other hard-to-dispose-of materials. Customers should call listed facilities before a self-haul trip because accepted materials, fees, and hours can change.',
    verifiedAsOf: 'July 2026',
  },
  'hennepin-county': {
    name: 'Hennepin County Green Disposal Guide',
    url: 'https://www.hennepin.us/en/green-disposal-guide',
    summary:
      'Hennepin County publishes reuse, recycling, transfer-station, and disposal options for bulky items, appliances, remodeling debris, electronics, yard waste, and household problem materials.',
    verifiedAsOf: 'July 2026',
  },
  'scott-county': {
    name: 'Scott County Household Hazardous Waste and Waste Navigator',
    url: 'https://www.scottcountymn.gov/hhw',
    summary:
      'Scott County provides a household hazardous-waste facility, reuse room, recycling guidance, and a Waste Navigator for materials that should not go in ordinary trash or recycling.',
    verifiedAsOf: 'July 2026',
  },
  minneapolis: {
    name: 'City of Minneapolis Large Item Collection',
    url: 'https://www.minneapolismn.gov/resident-services/garbage-recycling-cleanup/large-items/',
    summary:
      "Minneapolis city-serviced properties may set out limited large items under city rules. Private hauling is useful for larger cleanouts, pickup of pre-staged items, building materials, privately serviced buildings, or jobs that cannot wait for a municipal collection day.",
    verifiedAsOf: 'July 2026',
  },
  'st-paul': {
    name: 'Saint Paul Bulky Item Collection',
    url: 'https://www.stpaul.gov/departments/public-works/garbage-and-recycling/residential-collection/bulky-item-collection',
    summary:
      'Saint Paul includes a limited annual bulky-item allowance for eligible city garbage customers. Five-plus-unit buildings use private garbage service, and construction debris and tires are outside the city bulky-item program.',
    verifiedAsOf: 'July 2026',
  },
};

export const priorityLocalContent = {
  eagan: {
    resourceKey: 'dakota-county',
    intro:
      'Dakota Valley is based in Eagan, so Eagan requests are the closest to the company base and are the easiest to combine with existing South Metro routes. The most accurate quote still starts with photos, the pickup address, and a clear description of where the items are located.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'How Eagan scheduling works',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Local disposal planning',
    disposalText:
      'Do not mix paint, chemicals, fuel, batteries, or other hazardous materials into an ordinary junk load. Separate those items in the photos so the crew can identify what can be hauled and what needs a county-approved disposal option.',
    quoteChecklist: ['Wide photo of the full load', 'Close photo of appliances or electronics', "Safe curbside, driveway or accessible-garage staging", 'Preferred pickup day and ZIP code'],
    popularServices: ['junk-pickup', 'garage-cleanout', 'furniture-removal', 'appliance-recycling', 'mattress-removal'],
  },
  burnsville: {
    resourceKey: 'dakota-county',
    intro:
      'Burnsville pickups range from single bulky items to basement, garage, apartment, office, and move-out cleanouts. A useful request shows both the material and the path from the material to the truck—not just a close-up of one item.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Planning a Burnsville pickup',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Sort problem materials before booking',
    disposalText:
      'Keep chemicals, wet paint, propane cylinders, fuel, batteries, and unknown containers separate from furniture and ordinary household junk. Clear photos prevent a rejected item from delaying the rest of the pickup.',
    quoteChecklist: ['Full-room or full-garage overview', "Safe curbside, driveway or accessible-garage staging", 'Parking or loading instructions', 'Separate photos of restricted materials'],
    popularServices: ['basement-cleanout', 'garage-cleanout', 'furniture-removal', 'appliance-recycling', 'estate-cleanout'],
  },
  'apple-valley': {
    resourceKey: 'dakota-county',
    intro:
      'Apple Valley customers commonly need a simple answer to two questions: how much material is leaving and how difficult is it to reach. Photos should show the whole garage, room, curb pile, or appliance location so the written quote reflects the complete job.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Apple Valley route planning',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Keep reusable items identifiable',
    disposalText:
      'If furniture, household goods, tools, or equipment may still be usable, photograph them before they are mixed with broken or wet material. Clean, intact items have a better chance of being routed toward reuse or donation.',
    quoteChecklist: ['One photo showing total volume', 'Heavy-item close-ups', 'Driveway or association restrictions', 'Items that may be reusable'],
    popularServices: ['garage-cleanout', 'furniture-removal', 'single-item-pickup', 'appliance-recycling', 'estate-cleanout'],
  },
  bloomington: {
    resourceKey: 'hennepin-county',
    intro:
      'Bloomington jobs may involve detached homes, apartments, condominiums, offices, retail spaces, or storage areas. The quote needs to account for the load itself and any building rules that control when and where a crew may park, enter, or use an elevator.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Bloomington scheduling details',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Use Hennepin County guidance for excluded items',
    disposalText:
      'Hennepin County’s Green Disposal Guide helps residents find options for household hazardous waste and other materials that cannot ride in a normal junk load. Identify those materials before the crew arrives.',
    quoteChecklist: ['Property type and floor number', "Safe curbside, driveway or accessible-garage staging", 'Complete load photos', 'Building contact or access hours'],
    popularServices: ['furniture-removal', 'apartment-cleanout', 'office-cleanout', 'appliance-recycling', 'estate-cleanout'],
  },
  lakeville: {
    resourceKey: 'dakota-county',
    intro:
      'Lakeville requests often include garage storage, basement furniture, exercise equipment, yard material, sheds, or move-related cleanouts. Wide photos are especially important when items are spread between a house, garage, driveway, and yard.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Lakeville load and route planning',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Separate yard, metal, and household materials',
    disposalText:
      'Keep brush, clean metal, appliances, electronics, and ordinary household junk visually separated when possible. Clear separation helps determine the appropriate facility and avoids mixing restricted material into the load.',
    quoteChecklist: ['Photos of each pickup area', "Safe curbside, driveway or accessible-garage staging", 'Anything requiring dismantling', 'All expected add-on items'],
    popularServices: ['garage-cleanout', 'basement-cleanout', 'exercise-equipment-removal', 'yard-debris', 'shed-removal'],
  },
  rosemount: {
    resourceKey: 'dakota-county',
    intro:
      'Rosemount pickups can include household clutter, garages, sheds, fencing, yard debris, appliances, and move-out loads. The best quote request separates household junk from demolition, soil, chemicals, and other materials with different handling requirements.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Rosemount project scheduling',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Identify demolition and hazardous materials',
    disposalText:
      'Do not describe all material as “junk” when a pile includes concrete, dirt, treated wood, shingles, paint, fuel, or chemicals. Itemizing those materials improves the quote and prevents disposal surprises.',
    quoteChecklist: ['Whole structure or pile', 'Gate and path to the truck', 'Materials that require demolition', 'Restricted or hazardous items'],
    popularServices: ['yard-debris', 'shed-removal', 'fence-removal', 'hot-tub-removal', 'garage-cleanout'],
  },
  'inver-grove-heights': {
    resourceKey: 'dakota-county',
    intro:
      'Inver Grove Heights jobs may be concentrated in a garage or basement, or spread across a larger property, outbuilding, driveway, and yard. The crew needs to understand travel distance and terrain between the items and the truck.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Inver Grove Heights route information',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Photograph farm, shop, and garage materials clearly',
    disposalText:
      'Unknown containers, automotive fluids, batteries, compressed cylinders, tires, and equipment with fuel require separate review. Do not hide them behind ordinary furniture or bagged trash in the photos.',
    quoteChecklist: ['Driveway and truck-access photo', 'Distance from items to parking', "Safe curbside, driveway or accessible-garage staging", 'Separate automotive or chemical items'],
    popularServices: ['garage-cleanout', 'basement-cleanout', 'scrap-metal-removal', 'estate-cleanout', 'yard-debris'],
  },
  farmington: {
    resourceKey: 'dakota-county',
    intro:
      'Farmington customers often combine several smaller removal needs into one visit: garage clutter, furniture, appliances, yard items, or move-out leftovers. Bundling the full list in the first message helps the crew price the job once and reserve enough space.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Farmington scheduling',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Keep yard and household loads distinct',
    disposalText:
      'Brush, logs, fencing, household furniture, electronics, and appliances may follow different disposal paths. Separate piles and photos make it easier to plan responsible handling.',
    quoteChecklist: ['Everything included in the visit', 'Items that must remain', "Safe curbside, driveway or accessible-garage staging", 'Flexible pickup windows'],
    popularServices: ['single-item-pickup', 'garage-cleanout', 'furniture-removal', 'appliance-recycling', 'yard-debris'],
  },
  savage: {
    resourceKey: 'scott-county',
    intro:
      'Savage pickups are scheduled from photos so the crew can reserve the correct vehicle space before driving the route. Customers should show the complete pile and any barriers between the items and the nearest safe parking position.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Savage route planning',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Scott County problem-material options',
    disposalText:
      'Scott County provides a Household Hazardous Waste facility and Waste Navigator for chemicals, fuels, paints, batteries, and other materials that should not be mixed into a normal junk load.',
    quoteChecklist: ['Exact address and ZIP', 'Complete pile and access route', 'Association or parking restrictions', 'Separate hazardous-material photos'],
    popularServices: ['garage-cleanout', 'furniture-removal', 'yard-debris', 'hot-tub-removal', 'appliance-recycling'],
  },
  'prior-lake': {
    resourceKey: 'scott-county',
    intro:
      'Prior Lake requests may include household furniture, garages, sheds, lake-property storage, yard material, docks or outdoor equipment. Photos should show condition, size, access, and whether any item contains fuel, batteries, water, or other material that must be removed first.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Prior Lake scheduling',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Prepare powered and outdoor equipment',
    disposalText:
      'Fuel, oil, propane cylinders, and batteries must be identified before pickup. Outdoor equipment should be empty and safe to move unless the written quote says otherwise.',
    quoteChecklist: ['Path from item to driveway', "Safe curbside, driveway or accessible-garage staging", 'Fuel and battery status', 'Several angles of large outdoor items'],
    popularServices: ['yard-debris', 'shed-removal', 'hot-tub-removal', 'scrap-metal-removal', 'estate-cleanout'],
  },
  edina: {
    resourceKey: 'hennepin-county',
    intro:
      'Edina work may involve single-family homes, condos, apartments, senior moves, offices, or estate cleanouts. Building protection, parking, elevator reservations, and selective removal can matter as much as the total load volume.',
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Edina appointment planning',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Reuse before disposal when condition allows',
    disposalText:
      'Photograph usable furniture and household goods before they are mixed with damaged material. Clean, complete items are easier to evaluate for reuse, while wet, broken, or incomplete items need a different plan.',
    quoteChecklist: ["Safe curbside, driveway or accessible-garage staging", 'Loading and parking rules', 'Items that stay versus leave', 'Usable items separated from damaged material'],
    popularServices: ['estate-cleanout', 'furniture-removal', 'apartment-cleanout', 'office-cleanout', 'single-item-pickup'],
  },
  minneapolis: {
    resourceKey: 'minneapolis',
    intro:
      "Stage all approved items safely at the curb, in the driveway or in an accessible garage before the confirmed pickup window. The crew does not enter living areas or carry items out of basements, upstairs rooms or attics. Photograph the staged items and the clear path to legal truck parking. The written quote covers the items, volume, weight, access and disposal needs shown in your photos and details. When those match, the approved total stays the same. Any change to the agreed scope requires a revised quote that you approve before work begins.",
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'When private hauling solves the problem',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Do not mix building materials or hazardous waste into household junk',
    disposalText:
      'Minneapolis directs building materials, tires, rechargeable batteries, household hazardous waste, liquids, and several other materials to separate programs or drop-off options. Identify these materials before requesting a private quote.',
    quoteChecklist: ['Alley or street collection point', 'Parking and loading restrictions', "Safe curbside, driveway or accessible-garage staging", 'Deadline or move-out date'],
    popularServices: ['apartment-cleanout', 'furniture-removal', 'office-cleanout', 'estate-cleanout', 'construction-debris'],
  },
  'st-paul': {
    resourceKey: 'st-paul',
    intro:
      "Saint Paul’s city bulky-item program can help eligible residents with a limited number of curbside items, but private hauling is still useful for apartment buildings, pre-staged curbside or garage loads, construction debris, larger cleanouts, tight deadlines, and jobs that exceed municipal limits.",
    accessTitle: "Curbside, driveway and garage access",
    accessText:
      PICKUP_REQUIREMENTS,
    routeTitle: 'Compare city collection with full-service removal',
    routeText:
      SCHEDULING_POLICY,
    disposalTitle: 'Know the city program exclusions',
    disposalText:
      'Construction debris and tires are not accepted through Saint Paul’s ordinary bulky-item program. Electronics, appliances, mattresses, fuels, batteries, and hazardous products also have specific preparation or recycling rules.',
    quoteChecklist: ['Alley or street access', 'Property size and unit count', "Safe curbside, driveway or accessible-garage staging", 'Materials outside the city program'],
    popularServices: ['apartment-cleanout', 'furniture-removal', 'mattress-removal', 'appliance-recycling', 'construction-debris'],
  },
};

export function getPriorityLocalContent(citySlug) {
  const content = priorityLocalContent[citySlug];
  if (!content) return null;
  return {
    ...content,
    officialResource: officialDisposalResources[content.resourceKey] || null,
  };
}
