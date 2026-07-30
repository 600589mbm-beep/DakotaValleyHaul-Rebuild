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
      'Minneapolis city-serviced properties may set out limited large items under city rules. Private hauling is useful for larger cleanouts, carry-out service, building materials, privately serviced buildings, or jobs that cannot wait for a municipal collection day.',
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
    accessTitle: 'Eagan access details that affect a quote',
    accessText:
      'Tell the crew whether the load is at the curb, inside a garage, in a basement, at a townhome, or inside an apartment building. Include stair count, elevator availability, doorway width, and the closest legal parking or loading position.',
    routeTitle: 'How Eagan scheduling works',
    routeText:
      'Because the company base is in Eagan, smaller furniture, appliance, mattress, and garage pickups can often be grouped efficiently with nearby Dakota County work. Same-day service is never guaranteed; send photos early and provide more than one preferred window.',
    disposalTitle: 'Local disposal planning',
    disposalText:
      'Do not mix paint, chemicals, fuel, batteries, or other hazardous materials into an ordinary junk load. Separate those items in the photos so the crew can identify what can be hauled and what needs a county-approved disposal option.',
    quoteChecklist: ['Wide photo of the full load', 'Close photo of appliances or electronics', 'Stairs, elevator, gate, or garage access', 'Preferred pickup day and ZIP code'],
    popularServices: ['junk-pickup', 'garage-cleanout', 'furniture-removal', 'appliance-recycling', 'mattress-removal'],
  },
  burnsville: {
    resourceKey: 'dakota-county',
    intro:
      'Burnsville pickups range from single bulky items to basement, garage, apartment, office, and move-out cleanouts. A useful request shows both the material and the path from the material to the truck—not just a close-up of one item.',
    accessTitle: 'Basements, apartments, and loading access',
    accessText:
      'For basement or multi-level pickups, photograph the stairs and any tight turns. For apartments or commercial spaces, confirm elevator rules, loading-door access, parking restrictions, and whether management requires a certificate of insurance or scheduled loading window.',
    routeTitle: 'Planning a Burnsville pickup',
    routeText:
      'Send the Burnsville address or ZIP, photos, and at least two preferred times. Jobs near an existing South Metro route may have earlier availability, while full cleanouts and demolition debris require enough truck space and disposal planning.',
    disposalTitle: 'Sort problem materials before booking',
    disposalText:
      'Keep chemicals, wet paint, propane cylinders, fuel, batteries, and unknown containers separate from furniture and ordinary household junk. Clear photos prevent a rejected item from delaying the rest of the pickup.',
    quoteChecklist: ['Full-room or full-garage overview', 'Basement stairs or elevator route', 'Parking or loading instructions', 'Separate photos of restricted materials'],
    popularServices: ['basement-cleanout', 'garage-cleanout', 'furniture-removal', 'appliance-recycling', 'estate-cleanout'],
  },
  'apple-valley': {
    resourceKey: 'dakota-county',
    intro:
      'Apple Valley customers commonly need a simple answer to two questions: how much material is leaving and how difficult is it to reach. Photos should show the whole garage, room, curb pile, or appliance location so the written quote reflects the complete job.',
    accessTitle: 'Garage, townhome, and household access',
    accessText:
      'For attached garages and townhomes, explain whether the truck can use the driveway and whether an association limits parking. For indoor removal, show stairs, narrow halls, finished floors, and doors that may need protection during carry-out.',
    routeTitle: 'Apple Valley route planning',
    routeText:
      'Apple Valley work is scheduled with other Dakota County stops whenever practical. Sending photos early, identifying heavy items, and providing a flexible pickup window makes it easier to place the job on an efficient route.',
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
    accessTitle: 'Building and loading information',
    accessText:
      'For apartments, condos, offices, or retail pickups, provide the loading entrance, elevator dimensions, dock instructions, floor number, and property-contact requirements. For homes, show basement stairs, garage staging, or the path from a backyard item to the driveway.',
    routeTitle: 'Bloomington scheduling details',
    routeText:
      'Give the ZIP code and a realistic pickup window rather than only asking for “as soon as possible.” Larger commercial, estate, and move-out loads may require a dedicated route instead of being added between smaller stops.',
    disposalTitle: 'Use Hennepin County guidance for excluded items',
    disposalText:
      'Hennepin County’s Green Disposal Guide helps residents find options for household hazardous waste and other materials that cannot ride in a normal junk load. Identify those materials before the crew arrives.',
    quoteChecklist: ['Property type and floor number', 'Elevator or loading-dock instructions', 'Complete load photos', 'Building contact or access hours'],
    popularServices: ['furniture-removal', 'apartment-cleanout', 'office-cleanout', 'appliance-recycling', 'estate-cleanout'],
  },
  lakeville: {
    resourceKey: 'dakota-county',
    intro:
      'Lakeville requests often include garage storage, basement furniture, exercise equipment, yard material, sheds, or move-related cleanouts. Wide photos are especially important when items are spread between a house, garage, driveway, and yard.',
    accessTitle: 'Show every pickup area',
    accessText:
      'If items are in more than one location, send a separate overview of each area and identify anything that must be dismantled. For treadmills, safes, sectionals, or large appliances, include stair turns and door measurements when access is tight.',
    routeTitle: 'Lakeville load and route planning',
    routeText:
      'A complete photo set helps the crew assign enough truck space before entering the Lakeville route. Last-minute additions can change the volume tier or require a second trip, so include everything you expect removed.',
    disposalTitle: 'Separate yard, metal, and household materials',
    disposalText:
      'Keep brush, clean metal, appliances, electronics, and ordinary household junk visually separated when possible. Clear separation helps determine the appropriate facility and avoids mixing restricted material into the load.',
    quoteChecklist: ['Photos of each pickup area', 'Heavy-item and stair details', 'Anything requiring dismantling', 'All expected add-on items'],
    popularServices: ['garage-cleanout', 'basement-cleanout', 'exercise-equipment-removal', 'yard-debris', 'shed-removal'],
  },
  rosemount: {
    resourceKey: 'dakota-county',
    intro:
      'Rosemount pickups can include household clutter, garages, sheds, fencing, yard debris, appliances, and move-out loads. The best quote request separates household junk from demolition, soil, chemicals, and other materials with different handling requirements.',
    accessTitle: 'Outdoor and structure access',
    accessText:
      'For sheds, fences, hot tubs, or yard piles, show the entire structure or pile plus the route to the street. Include gates, slopes, landscaping, deck stairs, and the distance from the work area to legal truck parking.',
    routeTitle: 'Rosemount project scheduling',
    routeText:
      'Single items and staged garage loads may fit an existing Dakota County route. Tear-downs, mixed debris, and full-property cleanouts need more planning, so provide photos from several angles and describe what stays versus what goes.',
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
    accessTitle: 'Long carries and property access',
    accessText:
      'Show gates, gravel or narrow drives, slopes, detached buildings, basement exits, and any area where the truck cannot park close to the material. Long carries and difficult access affect crew time even when the load volume is modest.',
    routeTitle: 'Inver Grove Heights route information',
    routeText:
      'Provide the complete address, not only the city name, because route time can vary significantly across the community. Include a phone number the crew can use for arrival and access instructions.',
    disposalTitle: 'Photograph farm, shop, and garage materials clearly',
    disposalText:
      'Unknown containers, automotive fluids, batteries, compressed cylinders, tires, and equipment with fuel require separate review. Do not hide them behind ordinary furniture or bagged trash in the photos.',
    quoteChecklist: ['Driveway and truck-access photo', 'Distance from items to parking', 'Outbuilding or basement access', 'Separate automotive or chemical items'],
    popularServices: ['garage-cleanout', 'basement-cleanout', 'scrap-metal-removal', 'estate-cleanout', 'yard-debris'],
  },
  farmington: {
    resourceKey: 'dakota-county',
    intro:
      'Farmington customers often combine several smaller removal needs into one visit: garage clutter, furniture, appliances, yard items, or move-out leftovers. Bundling the full list in the first message helps the crew price the job once and reserve enough space.',
    accessTitle: 'Bundle the complete job',
    accessText:
      'Photograph every item or pile that may be added, including material in a shed, basement, side yard, or second garage bay. Mark items that stay so the crew can distinguish them from the removal load.',
    routeTitle: 'Farmington scheduling',
    routeText:
      'Farmington work is grouped with nearby Dakota County routes when truck space and timing align. Flexible scheduling is especially helpful for single-item, appliance, mattress, and curbside pickups.',
    disposalTitle: 'Keep yard and household loads distinct',
    disposalText:
      'Brush, logs, fencing, household furniture, electronics, and appliances may follow different disposal paths. Separate piles and photos make it easier to plan responsible handling.',
    quoteChecklist: ['Everything included in the visit', 'Items that must remain', 'Curb, garage, shed, or basement location', 'Flexible pickup windows'],
    popularServices: ['single-item-pickup', 'garage-cleanout', 'furniture-removal', 'appliance-recycling', 'yard-debris'],
  },
  savage: {
    resourceKey: 'scott-county',
    intro:
      'Savage pickups are scheduled from photos so the crew can reserve the correct vehicle space before driving the route. Customers should show the complete pile and any barriers between the items and the nearest safe parking position.',
    accessTitle: 'Driveway, townhome, and backyard access',
    accessText:
      'Include gates, shared drives, association restrictions, retaining walls, stairs, and backyard access. For indoor pickups, note finished floors, tight corners, or doors that may need to be removed from hinges.',
    routeTitle: 'Savage route planning',
    routeText:
      'Savage is served through South Metro routing rather than a permanent local branch. Send the exact address, photos, and multiple scheduling options so the request can be matched with an efficient route.',
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
    accessTitle: 'Outdoor, lake-property, and long-carry access',
    accessText:
      'For items behind a home or near the water, photograph the path to the driveway and identify stairs, retaining walls, slopes, soft ground, narrow gates, or seasonal access limitations. Do not assume the crew can park near the item.',
    routeTitle: 'Prior Lake scheduling',
    routeText:
      'Provide the exact address and a flexible window so the pickup can be placed on a Scott County route. Larger outdoor removals and cleanouts require several angles and enough detail to plan labor, dismantling, and truck capacity.',
    disposalTitle: 'Prepare powered and outdoor equipment',
    disposalText:
      'Fuel, oil, propane cylinders, and batteries must be identified before pickup. Outdoor equipment should be empty and safe to move unless the written quote says otherwise.',
    quoteChecklist: ['Path from item to driveway', 'Slopes, gates, stairs, or soft ground', 'Fuel and battery status', 'Several angles of large outdoor items'],
    popularServices: ['yard-debris', 'shed-removal', 'hot-tub-removal', 'scrap-metal-removal', 'estate-cleanout'],
  },
  edina: {
    resourceKey: 'hennepin-county',
    intro:
      'Edina work may involve single-family homes, condos, apartments, senior moves, offices, or estate cleanouts. Building protection, parking, elevator reservations, and selective removal can matter as much as the total load volume.',
    accessTitle: 'Protect the property and confirm building rules',
    accessText:
      'For indoor carry-out, show finished floors, stairs, elevators, narrow halls, and the loading entrance. Ask property management whether the crew needs a scheduled service elevator, loading reservation, proof of insurance, or limited work hours.',
    routeTitle: 'Edina appointment planning',
    routeText:
      'Selective estate and downsizing work should be labeled carefully so items that stay are not confused with the removal load. Use separate rooms or colored notes when family members are still sorting.',
    disposalTitle: 'Reuse before disposal when condition allows',
    disposalText:
      'Photograph usable furniture and household goods before they are mixed with damaged material. Clean, complete items are easier to evaluate for reuse, while wet, broken, or incomplete items need a different plan.',
    quoteChecklist: ['Floor and elevator information', 'Loading and parking rules', 'Items that stay versus leave', 'Usable items separated from damaged material'],
    popularServices: ['estate-cleanout', 'furniture-removal', 'apartment-cleanout', 'office-cleanout', 'single-item-pickup'],
  },
  minneapolis: {
    resourceKey: 'minneapolis',
    intro:
      'Minneapolis has a municipal large-item program for eligible city-serviced properties, but it does not cover every building or every project. Dakota Valley is most useful when customers need indoor carry-out, more than a small weekly allowance, privately serviced apartment or commercial pickup, a move-out deadline, or materials outside normal city collection.',
    accessTitle: 'Alleys, street parking, elevators, and loading zones',
    accessText:
      'State whether collection is from the alley, curb, garage, basement, apartment, or loading dock. Include parking restrictions, one-way access, stair count, elevator reservations, floor number, and the distance from the building exit to the truck.',
    routeTitle: 'When private hauling solves the problem',
    routeText:
      'City collection can be a good option for a small number of eligible items. Private removal adds value when a crew must enter the property, dismantle or carry items, remove a larger cleanout, meet a deadline, or serve a property that uses a private hauler.',
    disposalTitle: 'Do not mix building materials or hazardous waste into household junk',
    disposalText:
      'Minneapolis directs building materials, tires, rechargeable batteries, household hazardous waste, liquids, and several other materials to separate programs or drop-off options. Identify these materials before requesting a private quote.',
    quoteChecklist: ['Alley or street collection point', 'Parking and loading restrictions', 'Floor, stairs, and elevator details', 'Deadline or move-out date'],
    popularServices: ['apartment-cleanout', 'furniture-removal', 'office-cleanout', 'estate-cleanout', 'construction-debris'],
  },
  'st-paul': {
    resourceKey: 'st-paul',
    intro:
      'Saint Paul’s city bulky-item program can help eligible residents with a limited number of curbside items, but private hauling is still useful for apartment buildings, indoor carry-out, construction debris, larger cleanouts, tight deadlines, and jobs that exceed municipal limits.',
    accessTitle: 'Alleys, curbs, multi-unit buildings, and stairs',
    accessText:
      'Explain whether access is from an alley or street and whether the items are already outside. For apartments and older multi-level homes, show stair turns, porch steps, elevator access, loading rules, and the nearest legal parking position.',
    routeTitle: 'Compare city collection with full-service removal',
    routeText:
      'Saint Paul’s municipal program is intended for eligible curbside bulky items. Dakota Valley provides the labor to carry material from inside, handle larger or mixed loads, and serve buildings or projects that fall outside the city program.',
    disposalTitle: 'Know the city program exclusions',
    disposalText:
      'Construction debris and tires are not accepted through Saint Paul’s ordinary bulky-item program. Electronics, appliances, mattresses, fuels, batteries, and hazardous products also have specific preparation or recycling rules.',
    quoteChecklist: ['Alley or street access', 'Property size and unit count', 'Indoor carry-out requirements', 'Materials outside the city program'],
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
