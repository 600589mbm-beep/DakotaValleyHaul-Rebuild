// Local SEO guides based on real Google Business Profile search terms.
// These pages answer distinct user intents and cite current official resources.
// Keep them useful and factual; do not turn keyword variants into duplicate pages.

const recyclingGuideUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-guide';
const recyclingZoneUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-zone-locations/recycling-zone';
const recyclingLocationsUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-zone-locations';
const yardWasteUrl = 'https://dakotacountymn.gov/residents/recycling-waste/yard-waste-disposal';
const getRidOfStuffUrl = 'https://dakotacountymn.gov/residents/recycling-waste/get-rid-of-stuff';
const hazardousWasteUrl = 'https://dakotacountymn.gov/residents/recycling-waste/reduce-chemicals-home';

export const seoGuides = {
  'dakota-valley-recycling': {
    priority: 100,
    category: 'Recycling and pickup',
    shortTitle: 'Dakota Valley recycling',
    title: 'Dakota Valley Recycling: Pickup, Donation and Responsible Disposal',
    metaTitle: 'Dakota Valley Recycling & Junk Pickup | What We Take and Where It Goes',
    metaDescription: 'Looking for Dakota Valley recycling? Dakota Valley Junk Removal provides home and business pickup, donation routing and responsible recycling across Eagan, Apple Valley and Minnesota.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Dakota Valley Junk Removal is a pickup and haul-away company, not a walk-in recycling center. We collect unwanted furniture, appliances, mattresses, electronics, metal, yard debris and general junk, then route reusable and recyclable material responsibly whenever practical. If you want to drop items off yourself, this guide also points you to Dakota County’s official facilities and Recycling Guide.',
    sections: [
      {
        h2: 'What “Dakota Valley recycling” means for customers',
        body: [
          'Customers often search our name with the word recycling because they want more than a truck that sends everything to a landfill. Our service begins at your home, garage, curb, apartment, office or property. You text photos, receive a written quote, choose a pickup window and let the crew handle the lifting and routing.',
          'Usable household goods may be directed toward donation partners when accepted. Metals, electronics, appliances, mattresses and compostable material follow appropriate recycling or processing routes when practical. The exact route depends on item condition, local acceptance rules and facility requirements.',
        ],
      },
      {
        h2: 'Pickup service versus a public recycling center',
        body: [
          'Choose pickup when the item is heavy, bulky, upstairs, difficult to transport or part of a larger cleanout. Dakota Valley’s eligible curbside and garage pickups have an $85 minimum, and the complete job quote is confirmed from photos before booking.',
          'Choose a public drop-off when you can safely transport the material yourself and know the facility accepts it. Dakota County operates the Recycling Zone in Eagan for household hazardous waste, electronics, small household appliances and common recyclables. Furniture, mattresses, yard waste and several other bulky materials are not accepted there, so check the county’s Recycling Guide before loading your vehicle.',
        ],
      },
      {
        h2: 'The fastest way to know which option fits',
        body: [
          'For Dakota Valley pickup, text wide photos showing everything that needs to go, close-ups of unusual items, your city and where the items are located. The crew can then identify access, volume and special handling needs before sending the written quote.',
          'For self-haul disposal, search the exact item in Dakota County’s Recycling Guide and call the listed facility before leaving. Acceptance, fees and hours can change, and a directory listing is not the same as guaranteed acceptance on a particular day.',
        ],
      },
    ],
    faqs: [
      { q: 'Is Dakota Valley Junk Removal a recycling center?', a: 'No. Dakota Valley is a pickup and haul-away service. We come to the property, load the items and route donation or recycling material when practical. The Dakota County Recycling Zone is a public drop-off facility in Eagan.' },
      { q: 'Does Dakota Valley pick up appliances and electronics?', a: 'Yes. Refrigerators, freezers, washers, dryers, televisions, computers and other appliances or electronics can be quoted from photos. Item type and required processing affect the final quote.' },
      { q: 'Can I bring junk to Dakota Valley?', a: 'Dakota Valley is not operated as a public walk-in drop-off site. Text photos to arrange pickup, or use Dakota County’s Recycling Guide to find a facility that accepts your specific item.' },
      { q: 'What is the minimum pickup price?', a: 'Eligible curbside or garage pickups have an $85 minimum. The exact total is based on the items, access and disposal requirements and is confirmed in writing before booking.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Recycling Zone locations', url: recyclingLocationsUrl },
    ],
    serviceLink: '/services/junk-pickup/',
    serviceLabel: 'View junk removal services',
  },

  'mattress-disposal-eagan-dakota-county': {
    priority: 98,
    category: 'Mattress disposal',
    shortTitle: 'Mattress disposal in Eagan',
    title: 'Mattress Disposal in Eagan and Dakota County: Pickup and Drop-Off Options',
    metaTitle: 'Mattress Disposal Eagan MN | Dakota County Pickup and Recycling Options',
    metaDescription: 'Need mattress disposal in Eagan or Dakota County? Compare retailer take-back, county-listed drop-off options and convenient mattress pickup with a written photo quote.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'An old mattress is difficult to move, rarely fits in a car and is not accepted at every recycling or trash facility. Eagan and Dakota County residents generally have three practical choices: retailer take-back, a county-listed drop-off location or full-service pickup. The right option depends on whether you have transportation, how quickly it must leave and whether a box spring or bed frame is included.',
    sections: [
      {
        h2: 'Important: the Eagan Recycling Zone does not accept mattresses',
        body: [
          'Dakota County’s current Recycling Zone page lists mattresses and box springs among the materials not accepted at the Eagan facility. Do not load a mattress and drive there without checking another option first.',
          'Use the county’s online Recycling Guide and search “mattresses and box springs” for current businesses and facilities. Dakota County advises residents to call ahead because accepted materials, hours and fees can change.',
        ],
      },
      {
        h2: 'Your three realistic mattress disposal options',
        body: [
          'When a new mattress is being delivered, ask the retailer whether it offers take-back of the old mattress. This is often the easiest self-service option because the delivery truck is already at the home. Confirm the rules before delivery day, especially for stained, damaged or infested mattresses.',
          'A county-listed drop-off can work when you have a truck or trailer and can secure the mattress safely. Full-service pickup is usually the simplest choice when the mattress is upstairs, paired with a box spring or frame, or part of a move-out or bedroom cleanout.',
        ],
      },
      {
        h2: 'How Dakota Valley mattress pickup works',
        body: [
          'Text a photo of the mattress, box spring and any bed-frame pieces, plus your city and the pickup location. Mention stairs, narrow hallways or whether everything will be staged in the garage or at the curb. You receive the written quote before selecting a pickup window.',
          'Adding related bedroom items can be more efficient than scheduling separate trips. Include headboards, frames, dressers, nightstands, rugs and bagged household items in the same photo set so the quote covers the complete job.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of a mattress in Eagan?', a: 'The Dakota County Recycling Zone does not accept mattresses. Search the county Recycling Guide for current drop-off options, ask a mattress retailer about take-back or arrange full-service pickup.' },
      { q: 'Does Dakota Valley pick up mattresses from inside the home?', a: 'Yes, subject to access and job details. Send photos and mention stairs or tight hallways so the labor is included in the written quote.' },
      { q: 'Can a box spring and metal bed frame go with the mattress?', a: 'Yes. Photograph all pieces together so the quote includes the mattress, box spring, frame and headboard rather than treating them as separate requests.' },
      { q: 'Is free mattress disposal available in Eagan?', a: 'Free options are limited and change. Retailer take-back or special community programs may occasionally help, but residents should verify current rules. Do not leave a mattress outside a facility or donation center without approval.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Recycling Zone accepted and refused materials', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/mattress-removal/',
    serviceLabel: 'View mattress pickup service',
  },

  'recycling-center-near-eagan': {
    priority: 96,
    category: 'Recycling and drop-off',
    shortTitle: 'Recycling center near Eagan',
    title: 'Recycling Center Near Eagan: What the Dakota County Recycling Zone Accepts',
    metaTitle: 'Recycling Center Near Eagan MN | Recycling Zone Guide and Pickup Options',
    metaDescription: 'Looking for a recycling center near Eagan? See the Dakota County Recycling Zone location, current 2026 hours, accepted materials, refused bulky items and pickup alternatives.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'The main public recycling and household hazardous-waste facility in Eagan is Dakota County’s Recycling Zone at 3365 Dodd Road. It is useful for many household chemicals, electronics, small appliances and common recyclables, but it is not a general dump and does not accept every bulky item. Check the item list before driving there.',
    sections: [
      {
        h2: 'Recycling Zone location and current resident hours',
        body: [
          'The Recycling Zone is located at 3365 Dodd Road, also identified as Highway 149, in Eagan. Dakota County’s published 2026 resident schedule is Wednesday 9 a.m.–8 p.m., Thursday noon–8 p.m., Friday 9 a.m.–5 p.m. and Saturday 8 a.m.–5 p.m. Holiday closures apply, so verify the official page before leaving.',
          'Visitors remain in their vehicle while staff unload most materials from the trunk or rear cargo area. Items should be labeled, upright and secured. Special instructions apply to sharps, gas cans and other hazardous materials.',
        ],
      },
      {
        h2: 'What it is good for—and what it is not',
        body: [
          'Dakota County describes the Recycling Zone as a drop-off for household hazardous waste, electronics, small household appliances and recyclables. It also operates a Reuse Zone where residents can take usable products that others have dropped off.',
          'The current refused-material list includes furniture, mattresses and box springs, water heaters, wood and lumber, yard waste and other bulky materials. For those items, use the county Recycling Guide, a transfer station or a pickup service instead of treating the Recycling Zone like a landfill.',
        ],
      },
      {
        h2: 'When home pickup is the better option',
        body: [
          'A drop-off center works best for smaller materials you can safely transport. Pickup is usually better for couches, mattresses, large appliances, exercise equipment, multiple electronics, construction debris and full-room or garage cleanouts.',
          'Dakota Valley is not the county Recycling Zone. It is a local pickup service that comes to the property, loads the items and routes materials responsibly when practical. Text photos for the written quote before booking.',
        ],
      },
    ],
    faqs: [
      { q: 'Is the Dakota County Recycling Zone a dump?', a: 'No. It is a specialized recycling and household hazardous-waste facility. Furniture, mattresses, yard waste, lumber and several bulky materials are not accepted.' },
      { q: 'Where is the Recycling Zone in Eagan?', a: 'It is at 3365 Dodd Road, also known as Highway 149, in Eagan, Minnesota.' },
      { q: 'Does the Eagan Recycling Zone accept furniture or mattresses?', a: 'No. Dakota County’s current refused-material list includes furniture, mattresses and box springs. Use the Recycling Guide or arrange pickup.' },
      { q: 'Can Dakota Valley pick up items the Recycling Zone refuses?', a: 'Many bulky non-hazardous items can be picked up, including furniture, mattresses, appliances, electronics and general junk. Hazardous waste must go through the appropriate county program.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/junk-pickup/',
    serviceLabel: 'Compare pickup instead of drop-off',
  },

  'furniture-couch-disposal-dakota-county': {
    priority: 94,
    category: 'Furniture disposal',
    shortTitle: 'Furniture disposal in Dakota County',
    title: 'Furniture and Couch Disposal in Dakota County: Donation, Drop-Off or Pickup',
    metaTitle: 'Furniture Disposal Dakota County MN | Couch Pickup, Donation and Drop-Off',
    metaDescription: 'Get rid of a couch, recliner, dresser or broken furniture in Dakota County. Compare donation, county-listed drop-off and full-service furniture pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Furniture disposal is not one-size-fits-all. A clean couch may qualify for donation, a damaged dresser may need a transfer station, and a sectional in a basement may be best handled by a pickup crew. Dakota County residents should choose based on condition, transportation and access—not simply leave furniture beside a recycling container.',
    sections: [
      {
        h2: 'Start with condition: donate, recycle or dispose',
        body: [
          'Furniture that is clean, usable and free of major damage may be accepted by a donation organization or community reuse program. Call first and describe stains, tears, pet exposure, smoke exposure and missing parts honestly. Donation centers can refuse items that are unsafe or difficult to resell.',
          'Broken, wet, heavily worn or incomplete furniture usually needs disposal or material recovery. Dakota County’s Recycling Guide can help locate current businesses for furniture, mattresses, carpet and related items.',
        ],
      },
      {
        h2: 'The Eagan Recycling Zone is not a furniture drop-off',
        body: [
          'Dakota County currently lists furniture among the items not accepted at the Recycling Zone in Eagan. The site is designed for household hazardous waste, electronics, small appliances and recyclables—not couches, sectionals or bedroom sets.',
          'Residents who can self-haul may use a transfer station or another business listed in the county Recycling Guide. Call first for acceptance rules, unloading procedures, fees and hours.',
        ],
      },
      {
        h2: 'When furniture pickup makes sense',
        body: [
          'Pickup is practical for heavy couches, reclining furniture, sectionals, sleeper sofas, dressers, desks and furniture located upstairs or in basements. It is also useful when several items need to leave together during a move, estate cleanout or remodel.',
          'For a Dakota Valley quote, send one wide photo of the full group and close-ups of oversized pieces. Mention floors, elevators, narrow doors and whether disassembly is required. The quote is confirmed in writing before booking.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of a couch in Dakota County?', a: 'A usable couch may qualify for donation. Otherwise use Dakota County’s Recycling Guide to locate a transfer station or disposal business, or schedule furniture pickup.' },
      { q: 'Does the Eagan Recycling Zone take couches or furniture?', a: 'No. Furniture is currently listed as not accepted at the Recycling Zone.' },
      { q: 'Can Dakota Valley remove a couch from a basement or upstairs room?', a: 'Yes, depending on access. Send photos of the couch and the route out so stairs, corners and any disassembly are included in the quote.' },
      { q: 'Can I include a rug, bookcase and end tables with the couch?', a: 'Yes. Include every item in the original photo set so one written quote covers the complete furniture pickup.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
      { label: 'Dakota County large-item disposal options', url: getRidOfStuffUrl },
    ],
    serviceLink: '/services/furniture-removal/',
    serviceLabel: 'View furniture removal service',
  },

  'appliance-disposal-apple-valley-dakota-county': {
    priority: 92,
    category: 'Appliance disposal',
    shortTitle: 'Appliance disposal in Apple Valley',
    title: 'Appliance Disposal in Apple Valley and Dakota County: Pickup and Recycling Options',
    metaTitle: 'Appliance Disposal Apple Valley MN | Refrigerator and Appliance Pickup',
    metaDescription: 'Need appliance disposal near Apple Valley? Learn where to check drop-off rules and how to arrange refrigerator, washer, dryer, microwave or dehumidifier pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Appliance disposal depends on the appliance. A microwave or toaster is different from a refrigerator containing refrigerant, and a working washer may have reuse value while a rusted unit may need metal recycling. Apple Valley and Dakota County residents should identify the item type before choosing drop-off or pickup.',
    sections: [
      {
        h2: 'Check retailer take-back and the Dakota County Recycling Guide',
        body: [
          'When a replacement appliance is being delivered, ask the retailer whether haul-away is available and whether the old unit must be disconnected or moved. Confirm this before delivery day so the old appliance is not left behind unexpectedly.',
          'For self-haul options, search the exact appliance in Dakota County’s Recycling Guide. The county maintains separate categories for refrigerators, dehumidifiers, microwaves, electronics and other equipment, and advises residents to call ahead to verify acceptance and hours.',
        ],
      },
      {
        h2: 'Do not assume every appliance belongs at the Recycling Zone',
        body: [
          'Dakota County describes the Eagan Recycling Zone as accepting electronics and small household appliances, but its current item list excludes several bulky categories. Refrigerators, water heaters, large exercise equipment and other items may require a different facility or a pickup service.',
          'Refrigerators, freezers, air conditioners and dehumidifiers require appropriate refrigerant handling. Never cut refrigerant lines or leave an appliance beside a drop-off container.',
        ],
      },
      {
        h2: 'Appliance pickup from Apple Valley homes and businesses',
        body: [
          'Dakota Valley can quote refrigerators, freezers, washers, dryers, stoves, dishwashers, microwaves, dehumidifiers and appliance bundles from photos. Mention whether the unit is disconnected, where it is located and whether stairs or tight access are involved.',
          'A garage or curbside pickup is usually the simplest, but inside removal can be quoted when the path is clear and utilities are safely disconnected. Include any surrounding junk or remodeling debris in the same photo set if it should leave at the same time.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of an appliance near Apple Valley?', a: 'Search the appliance in Dakota County’s Recycling Guide, ask the replacement retailer about take-back or arrange pickup. Acceptance differs for refrigerators, microwaves, washers and small appliances.' },
      { q: 'Does Dakota Valley pick up refrigerators and freezers?', a: 'Yes. Send photos, location and access details. Refrigerant appliances are routed through appropriate processing rather than handled like ordinary scrap.' },
      { q: 'Can you remove a washer or dryer from a basement?', a: 'Often, yes. Photograph the machines, stairs and doorway path so the crew can include the access requirements in the quote.' },
      { q: 'Do appliances need to be disconnected before pickup?', a: 'They should be safely disconnected from electricity, water or gas before removal unless the written job scope says otherwise. Mention any connection that remains when requesting the quote.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/appliance-recycling/',
    serviceLabel: 'View appliance pickup service',
  },

  'yard-waste-disposal-dakota-county': {
    priority: 90,
    category: 'Yard waste',
    shortTitle: 'Yard waste disposal in Dakota County',
    title: 'Yard Waste Disposal in Dakota County: Eagan, Rosemount and Burnsville Options',
    metaTitle: 'Yard Waste Disposal Near Eagan and Dakota County | Drop-Off or Pickup',
    metaDescription: 'Find Dakota County yard-waste disposal options for leaves, grass, brush, branches, sod and storm debris, including Eagan-area drop-off sites and pickup alternatives.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Grass, leaves, brush and branches do not belong in ordinary trash in Dakota County. Residents can compost at home, arrange seasonal collection through a trash hauler, use a yard-waste drop-off site or schedule removal for larger piles. Materials and bag requirements matter, so separate clean yard waste from treated lumber, fencing, rocks and general junk.',
    sections: [
      {
        h2: 'Dakota County’s yard-waste rules',
        body: [
          'Dakota County states that yard waste such as grass clippings, leaves, twigs and branches cannot be placed in the trash. Bagged material must use paper bags or BPI-certified compostable bags; regular plastic bags contaminate compost.',
          'The county recommends calling a drop-off site before visiting to verify current fees, hours, accepted materials and unloading instructions. A site that accepts leaves may not accept brush, stumps or soil.',
        ],
      },
      {
        h2: 'Nearby drop-off choices listed by Dakota County',
        body: [
          'The county’s current list includes the seasonal Gertens R.E.S. Facility at 805 Yankee Doodle Road in Eagan for leaves, grass, trees, shrubs, sod and soil. It also lists year-round options in Inver Grove Heights, Burnsville and Rosemount, with different accepted materials.',
          'The Rosemount Mulch Store is listed for leaves, grass, trees, shrubs, sod and soil and also accepts food scraps separately. The Burnsville Mulch Store and Gertens brickyard are additional year-round options. Always call before loading because rules change by material and season.',
        ],
      },
      {
        h2: 'When yard-debris pickup is easier',
        body: [
          'Pickup can make sense for storm branches, brush piles, old fencing, deck lumber and mixed outdoor cleanups that do not fit in a car. Send photos that show the pile from more than one angle and identify any soil, sod, concrete, treated wood or metal mixed in.',
          'Clean compostable material and construction debris may need different routes. Keeping them separated improves the quote and makes responsible processing more practical.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I drop off yard waste in Eagan?', a: 'Dakota County currently lists the seasonal Gertens R.E.S. Facility at 805 Yankee Doodle Road. Call first to verify that it is open and accepts your specific material.' },
      { q: 'Can yard waste go in regular trash in Dakota County?', a: 'No. Dakota County says grass, leaves, twigs and branches must be composted, collected through a yard-waste service or taken to an approved drop-off.' },
      { q: 'Does the Dakota County Recycling Zone accept yard waste?', a: 'No. Yard waste is listed among the materials not accepted at the Recycling Zone.' },
      { q: 'Can Dakota Valley pick up branches and storm debris?', a: 'Yes, depending on material and access. Send photos of the full pile and identify anything mixed with it, including soil, concrete, fencing or treated lumber.' },
    ],
    sources: [
      { label: 'Dakota County Yard Waste Disposal', url: yardWasteUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/yard-debris/',
    serviceLabel: 'View yard and storm-debris pickup',
  },

  'hazardous-waste-disposal-eagan': {
    priority: 88,
    category: 'Hazardous waste',
    shortTitle: 'Hazardous waste disposal in Eagan',
    title: 'Household Hazardous Waste Disposal in Eagan: Use the Dakota County Recycling Zone',
    metaTitle: 'Hazardous Waste Disposal Eagan MN | Paint, Oil and Chemical Drop-Off',
    metaDescription: 'Safely dispose of household paint, oil, cleaners and chemicals in Eagan through the Dakota County Recycling Zone. Learn what a junk crew cannot legally haul.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Paint, solvents, pesticides, fuels, automotive fluids and other household chemicals require a specialized disposal route. Dakota Valley Junk Removal does not load hazardous waste with ordinary junk. Dakota County residents should use the Recycling Zone in Eagan or another approved hazardous-waste program.',
    sections: [
      {
        h2: 'Where Eagan residents should take household hazardous waste',
        body: [
          'Dakota County directs residents to the Recycling Zone at 3365 Dodd Road in Eagan for household hazardous waste. The facility handles materials such as household chemicals, lawn and garden products, automotive products, paint-related materials and other accepted hazardous items.',
          'Check the official accepted-material list and current hours before visiting. Keep products in original containers when possible, make sure lids are secure, keep labels readable and never mix chemicals together.',
        ],
      },
      {
        h2: 'Why hazardous waste cannot ride with a junk load',
        body: [
          'Transfer stations and disposal facilities can reject or quarantine a load containing prohibited chemicals. Mixing hazardous products with furniture, cardboard or general debris also creates fire, exposure and spill risks for customers, crews and facility workers.',
          'Separate wet paint, solvents, pesticides, gasoline, oil, antifreeze, propane cylinders, asbestos and medical waste before requesting junk pickup. Tell the crew about questionable containers rather than hiding them inside boxes or bags.',
        ],
      },
      {
        h2: 'What Dakota Valley can remove after hazardous items are separated',
        body: [
          'Once hazardous products are removed, Dakota Valley can quote empty paint cans, shelving, furniture, appliances, boxes, non-hazardous garage clutter and other cleanout material. Photograph the full area and clearly identify what is staying for county disposal.',
          'This split approach is often the fastest way to finish a garage, basement or estate cleanout: hazardous products go to the county program, while the bulky non-hazardous material is picked up from the property.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of paint and chemicals in Eagan?', a: 'Dakota County residents can use the Recycling Zone at 3365 Dodd Road in Eagan. Verify the accepted-material list and current hours before visiting.' },
      { q: 'Will Dakota Valley haul wet paint or household chemicals?', a: 'No. Hazardous liquids and chemicals require an approved hazardous-waste facility. Empty, dry containers may be considered with other junk after you describe them in the quote request.' },
      { q: 'Can I bring used oil to the Recycling Zone?', a: 'Dakota County lists automotive and household hazardous products among the facility’s accepted categories. Check the current item instructions and transport containers upright and secured.' },
      { q: 'What should I do with unknown chemicals?', a: 'Do not open, smell, mix or pour them out. Keep the container secure and contact Dakota County’s Recycling Zone for item-specific instructions.' },
    ],
    sources: [
      { label: 'Dakota County Household Hazardous Waste', url: hazardousWasteUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/garage-cleanout/',
    serviceLabel: 'Remove the non-hazardous cleanout material',
  },

  'electronics-tv-recycling-dakota-county': {
    priority: 86,
    category: 'Electronics recycling',
    shortTitle: 'TV and electronics recycling',
    title: 'TV and Electronics Recycling in Eagan and Dakota County',
    metaTitle: 'TV Recycling Near Eagan MN | Electronics Drop-Off and Pickup Options',
    metaDescription: 'Find TV and electronics recycling options in Eagan and Dakota County. Compare the Recycling Zone with convenient pickup for heavy televisions and office electronics.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Televisions, computer equipment, printers and other electronics should not be treated like ordinary household trash. Dakota County provides electronics drop-off at the Recycling Zone in Eagan, while pickup can be more practical for heavy televisions, multiple devices or office cleanouts.',
    sections: [
      {
        h2: 'Electronics drop-off at the Eagan Recycling Zone',
        body: [
          'Dakota County lists electronics among the materials accepted at the Recycling Zone. The county’s current visitor instructions say fees apply to televisions and monitors, while many other accepted residential items are free. Verify the current fee and item rules before visiting.',
          'Keep electronics in the trunk or rear cargo area for staff unloading. If a computer contains sensitive information, remove the storage drive or confirm the receiving facility’s data-destruction practices before drop-off.',
        ],
      },
      {
        h2: 'When electronics pickup is more practical',
        body: [
          'Large CRT televisions, oversized flat screens, commercial printers, server racks and multiple computer systems can be difficult to lift and transport safely. Pickup avoids loading a personal vehicle and can combine electronics with desks, filing cabinets and other office junk.',
          'Send photos of screens from the front and side, show the location and identify stairs or elevators. For computers, mention whether hard drives need special handling or should be returned to you before the equipment leaves.',
        ],
      },
      {
        h2: 'Do not leave electronics beside recycling containers',
        body: [
          'A cardboard or bottle-and-can recycling drop-off is not automatically an electronics site. Leaving a television or computer beside a collection container can be illegal dumping and exposes equipment to weather and breakage.',
          'Use the official Recycling Zone, a business listed in the county Recycling Guide or a scheduled pickup. Call ahead when using any third-party site because accepted device types and fees vary.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I recycle a TV near Eagan?', a: 'Dakota County accepts televisions and monitors at the Recycling Zone in Eagan, with fees applying. Verify current rules and hours on the official page.' },
      { q: 'Can Dakota Valley pick up a heavy television?', a: 'Yes. Send photos showing the TV size, stand or cabinet, location and exit path so the lifting requirements are included in the quote.' },
      { q: 'Does the Recycling Zone accept computers and printers?', a: 'Dakota County lists electronics as an accepted category. Check the current item list for the exact device and any preparation instructions.' },
      { q: 'Can electronics be combined with office furniture pickup?', a: 'Yes. Photograph computers, monitors, printers, desks and filing cabinets together so one written quote covers the office cleanout.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/electronics-removal/',
    serviceLabel: 'View electronics pickup service',
  },

  'dakota-county-dump-transfer-station-guide': {
    priority: 84,
    category: 'Dump and transfer stations',
    shortTitle: 'Dakota County dump guide',
    title: 'Dump and Transfer Stations Near Eagan and Dakota County: Know Where Your Load Belongs',
    metaTitle: 'Dump Near Eagan and Dakota County | Transfer Station and Junk Drop-Off Guide',
    metaDescription: 'Looking for a dump near Eagan? Learn the difference between the Recycling Zone, transfer stations, landfills, yard-waste sites and full-service junk pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Searches for “dump near me” often mix together four very different places: recycling drop-offs, transfer stations, landfills and yard-waste compost sites. Driving to the wrong one can mean a rejected load. Identify the material first, then verify acceptance, hours and unloading rules before leaving.',
    sections: [
      {
        h2: 'Recycling Zone, transfer station or landfill?',
        body: [
          'The Dakota County Recycling Zone in Eagan is for household hazardous waste, electronics, small appliances and recyclables. It is not a general dump and does not accept furniture, mattresses, lumber, yard waste or many bulky household loads.',
          'Transfer stations and landfills handle broader solid-waste loads, but each site controls what it accepts. Dakota County’s current “Get Rid of Stuff” page lists facilities in Burnsville, Rosemount, Inver Grove Heights and nearby communities and tells residents to call for fees, hours and accepted materials.',
        ],
      },
      {
        h2: 'Choose the site based on the material',
        body: [
          'Use a recycling drop-off for accepted bottles, cans, paper, cardboard, electronics or household hazardous waste. Use a yard-waste site for clean leaves, grass, brush, trees, sod or soil according to that site’s rules. Use a transfer station or landfill for accepted bulky trash and mixed debris.',
          'Mattresses, furniture, appliances, treated lumber, railroad ties, concrete, dirt and construction debris can have special rules. Search the exact item in the Dakota County Recycling Guide and call the facility before loading.',
        ],
      },
      {
        h2: 'When paying for pickup saves the trip',
        body: [
          'Self-haul is economical when you have the right vehicle, help loading, safe tie-downs and a facility that accepts the complete load. Pickup is easier when the job includes stairs, heavy furniture, multiple disposal categories or more volume than a personal vehicle can safely carry.',
          'Dakota Valley quotes the complete non-hazardous job from photos. The crew loads at the property and handles the route, which removes the risk of driving to the wrong facility or making several separate trips.',
        ],
      },
    ],
    faqs: [
      { q: 'Is the Dakota County Recycling Zone a landfill or dump?', a: 'No. It is a specialized recycling and household hazardous-waste facility with a defined accepted-material list.' },
      { q: 'Where can I take bulky trash in Dakota County?', a: 'Dakota County lists transfer stations and landfills on its “Get Rid of Stuff” page. Call the selected facility to confirm it accepts your exact items.' },
      { q: 'Where can I drop off extra cardboard in Eagan?', a: 'Dakota County lists cardboard among the recyclables accepted at the Recycling Zone, with size and preparation guidelines. Check the current instructions before visiting.' },
      { q: 'Can Dakota Valley take a mixed load instead?', a: 'Many mixed non-hazardous household loads can be quoted for pickup. Separate hazardous chemicals, wet paint, propane, asbestos and other prohibited materials first.' },
    ],
    sources: [
      { label: 'Dakota County Get Rid of Stuff', url: getRidOfStuffUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/junk-pickup/',
    serviceLabel: 'Skip the dump trip with pickup',
  },
};
