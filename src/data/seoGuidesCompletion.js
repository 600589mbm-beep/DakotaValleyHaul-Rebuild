// Final coverage guides for the remaining distinct, service-relevant Google Business Profile searches.
// Close variants and misspellings intentionally resolve to one authoritative page per intent.

const recyclingGuideUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-guide';
const recyclingZoneUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-zone-locations/recycling-zone';
const recyclingLocationsUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-zone-locations';
const yardWasteUrl = 'https://dakotacountymn.gov/residents/recycling-waste/yard-waste-disposal';
const getRidOfStuffUrl = 'https://dakotacountymn.gov/residents/recycling-waste/get-rid-of-stuff';
const hazardousWasteUrl = 'https://dakotacountymn.gov/residents/recycling-waste/reduce-chemicals-home';
const appleValleyTrashUrl = 'https://applevalleymn.gov/126/Trash-Recycling';
const lakevilleRecyclingUrl = 'https://lakevillemn.gov/632/Recycling';
const rosemountRecyclingUrl = 'https://rosemountmn.gov/938/Recycling';
const rosemountTrashUrl = 'https://rosemountmn.gov/401/Trash-and-Recycling/1000';
const ighTrashUrl = 'https://www.ighmn.gov/173/Trash-and-Recycling/1000';
const anokaResidentialUrl = 'https://www.anokacountymn.gov/370/Residential-Recycling';
const anokaDirectoryUrl = 'https://www.anokacountymn.gov/1653/Search-the-Recycling-and-Disposal-Direct';
const saintPaulHhwUrl = 'https://www.stpaul.gov/hhw';
const ramseyHhwUrl = 'https://www.ramseycountymn.gov/residents/recycling-waste/collection-sites/household-hazardous-waste';

export const seoGuidesCompletion = {
  'apple-valley-recycling-disposal-guide': {
    priority: 62,
    category: 'Apple Valley disposal',
    shortTitle: 'Apple Valley recycling guide',
    title: 'Apple Valley Recycling and Disposal Guide: Curbside, Drop-Off and Pickup',
    metaTitle: 'Apple Valley Recycling Center & Disposal Guide | Pickup and Drop-Off Options',
    metaDescription: 'Find recycling, trash, food-scraps, bulky-item and junk-removal options in Apple Valley, Minnesota, with current city and Dakota County resources.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Apple Valley does not operate one universal drop-off center for every unwanted item. Residents use licensed private haulers for recurring trash and recycling, Dakota County programs for special materials, community recycling events when available and full-service pickup for bulky household items and cleanouts.',
    sections: [
      {
        h2: 'Recurring trash and recycling in Apple Valley',
        body: [
          'The City of Apple Valley licenses private trash haulers for residential and commercial collection. Residents choose from licensed providers, while city hauling zones assign collection days to reduce truck traffic. Ask the selected hauler about cart sizes, recycling frequency, yard waste and one-time bulky-item service.',
          'Apple Valley works with Eagan, Burnsville and Lakeville through Dakota Valley Recycling. Household recyclables should be empty, dry and placed loose in the cart; plastic bags, batteries, Styrofoam, food and tangling items do not belong in curbside recycling.',
        ],
      },
      {
        h2: 'Drop-off programs for special materials',
        body: [
          'Dakota County’s Recycling Zone in Eagan handles accepted household hazardous waste, electronics, small appliances and common recyclables. Apple Valley also has a registered food-scraps drop-off at the Central Maintenance Facility, and the city promotes annual recycling events for selected bulky or problem materials.',
          'A city event or county facility accepts only its published item list. Check the current official page and call when necessary before loading mattresses, appliances, furniture, yard waste or construction material.',
        ],
      },
      {
        h2: 'Pickup for furniture, appliances and cleanouts',
        body: [
          'Dakota Valley serves Apple Valley with written photo quotes for furniture, mattresses, appliances, electronics, garage clutter and property cleanouts. Pickup is useful when items are heavy, upstairs, difficult to transport or spread across several rooms.',
          'Text wide photos, close-ups of unusual items and the location of the material. Hazardous chemicals, medication, sharps and regulated waste must be separated for the appropriate county program.',
        ],
      },
    ],
    faqs: [
      { q: 'Is there an Apple Valley recycling center for every item?', a: 'No. Apple Valley uses curbside haulers, Dakota County facilities, special events and private recyclers. The correct option depends on the exact item.' },
      { q: 'Where can Apple Valley residents take household hazardous waste?', a: 'Dakota County directs residents to the Recycling Zone in Eagan for accepted household hazardous waste.' },
      { q: 'Can Dakota Valley pick up appliances in Apple Valley?', a: 'Yes. Send photos of the appliances, their location and access details for a written quote.' },
      { q: 'Does Apple Valley have food-scraps drop-off?', a: 'Yes. The city identifies a Dakota County food-scraps drop-off at the Central Maintenance Facility. Registration and current program rules apply.' },
    ],
    sources: [
      { label: 'City of Apple Valley Trash and Recycling', url: appleValleyTrashUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/cities/apple-valley/junk-pickup/',
    serviceLabel: 'View Apple Valley junk removal',
  },

  'lakeville-recycling-trash-disposal-guide': {
    priority: 61,
    category: 'Lakeville disposal',
    shortTitle: 'Lakeville recycling guide',
    title: 'Lakeville Recycling, Trash and Disposal Guide',
    metaTitle: 'Lakeville Recycling Center & Trash Disposal Guide | Pickup Options',
    metaDescription: 'Compare Lakeville curbside recycling, licensed haulers, food-scraps drop-off, Dakota County facilities and junk-removal pickup for bulky items.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Lakeville residents use licensed waste haulers for recurring trash and recycling, a city food-scraps drop-off for registered participants and Dakota County resources for hazardous waste, electronics and difficult materials. Bulky household loads can also be self-hauled to an approved facility or scheduled for full-service pickup.',
    sections: [
      {
        h2: 'Lakeville curbside recycling and licensed haulers',
        body: [
          'Lakeville states that licensed haulers provide recycling and compost collection on the same day as trash collection. Residents choose from licensed residential providers and should confirm cart size, collection day, yard-waste service and bulky-item policies directly with the hauler.',
          'Accepted household recyclables include paper, cardboard, cartons, cans, glass bottles and jars, and selected plastic containers. Keep batteries, food, plastic bags, Styrofoam, shredded paper, cords and trash out of the recycling cart.',
        ],
      },
      {
        h2: 'Lakeville drop-off options and Recycling Zone Plus',
        body: [
          'Lakeville operates a registered food-scraps drop-off at the Water Treatment Facility. Household hazardous waste drop-off days are no longer held by the city, so residents should use Dakota County’s current programs and Recycling Guide.',
          'Dakota County is developing Recycling Zone Plus in Lakeville for an anticipated 2027 opening. Until the facility officially opens, residents should continue using the existing Eagan Recycling Zone or another verified destination.',
        ],
      },
      {
        h2: 'Lakeville bulky-item and cleanout pickup',
        body: [
          'Dakota Valley can quote couches, mattresses, appliances, electronics, garage contents, move-out piles and business cleanouts in Lakeville. One photo set can include several item categories so the complete job is priced together.',
          'Separate chemicals, wet paint, sharps, medication, propane and suspected asbestos before requesting ordinary junk removal. Those materials need designated disposal routes.',
        ],
      },
    ],
    faqs: [
      { q: 'Is the Lakeville Recycling Zone Plus open?', a: 'No. Dakota County anticipates opening it in 2027. Verify the official county project page before visiting.' },
      { q: 'Where can Lakeville residents take hazardous waste now?', a: 'Use Dakota County’s existing Recycling Zone in Eagan for accepted household hazardous waste.' },
      { q: 'Does Lakeville offer food-scraps drop-off?', a: 'Yes. Lakeville identifies a registered Dakota County food-scraps drop-off at the Water Treatment Facility.' },
      { q: 'Can Dakota Valley remove furniture in Lakeville?', a: 'Yes. Send photos and identify stairs, elevators or inside access for the written quote.' },
    ],
    sources: [
      { label: 'City of Lakeville Recycling', url: lakevilleRecyclingUrl },
      { label: 'Dakota County Recycling Zone Locations', url: recyclingLocationsUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/cities/lakeville/junk-pickup/',
    serviceLabel: 'View Lakeville junk removal',
  },

  'rosemount-recycling-appliance-disposal-guide': {
    priority: 60,
    category: 'Rosemount disposal',
    shortTitle: 'Rosemount recycling guide',
    title: 'Rosemount Recycling and Appliance Disposal Guide',
    metaTitle: 'Rosemount Recycling Center & Appliance Disposal | Pickup and Drop-Off',
    metaDescription: 'Find Rosemount recycling, food-scraps, yard-waste, cleanup-event and appliance-disposal options, plus full-service pickup for bulky items.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Rosemount residents combine licensed curbside service, Dakota County recycling requirements, local food-scraps and yard-waste resources, seasonal city cleanup events and private disposal businesses. Appliances and bulky household items need routes outside the normal recycling cart.',
    sections: [
      {
        h2: 'Recycle correctly through your Rosemount hauler',
        body: [
          'Rosemount requires residents to maintain recycling service and follow Dakota County’s designated list. Paper, boxes, cartons, cans, glass bottles and jars, and selected plastic containers belong in curbside recycling when empty and dry.',
          'Electronics, major appliances, sharps, tires, hazardous waste, yard waste, propane cylinders, medication, plastic bags and tangling items do not belong in the recycling cart. Use the Recycling Guide for the correct destination.',
        ],
      },
      {
        h2: 'Local events, organics and special disposal',
        body: [
          'Rosemount promotes citywide cleanup events and operates food-scraps resources. Yard waste uses separate compost or mulch sites, while household chemicals and electronics can use accepted Dakota County programs.',
          'Event dates, item lists and fees can change. Review the city’s current Trash and Recycling page before treating a seasonal event as a guaranteed disposal option.',
        ],
      },
      {
        h2: 'Appliance and bulky-item pickup in Rosemount',
        body: [
          'Dakota Valley can quote refrigerators, washers, dryers, stoves, furniture, mattresses and mixed household cleanouts in Rosemount. Refrigerant appliances and unusually heavy equipment must be identified in advance.',
          'Send photos showing each item and the route out. Safely disconnect water, power or gas before appliance removal unless the written scope specifically includes another arrangement.',
        ],
      },
    ],
    faqs: [
      { q: 'Can appliances go in Rosemount curbside recycling?', a: 'No. Major appliances need an appliance recycler, approved facility, retailer take-back or pickup service.' },
      { q: 'Does Rosemount hold cleanup events?', a: 'The city promotes citywide cleanup events. Check the current official page for dates, eligibility, fees and accepted materials.' },
      { q: 'Where does Rosemount household hazardous waste go?', a: 'Dakota County residents can use the Recycling Zone in Eagan for accepted household hazardous waste.' },
      { q: 'Can Dakota Valley pick up a refrigerator in Rosemount?', a: 'Yes. Send photos, access information and confirmation that it will be safely disconnected.' },
    ],
    sources: [
      { label: 'City of Rosemount Recycling', url: rosemountRecyclingUrl },
      { label: 'City of Rosemount Trash and Recycling', url: rosemountTrashUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/cities/rosemount/appliance-recycling/',
    serviceLabel: 'View Rosemount appliance pickup',
  },

  'inver-grove-heights-recycling-disposal-guide': {
    priority: 59,
    category: 'Inver Grove Heights disposal',
    shortTitle: 'Inver Grove Heights recycling',
    title: 'Inver Grove Heights Recycling and Disposal Guide',
    metaTitle: 'Inver Grove Heights Recycling Center & Disposal Guide | Junk Pickup',
    metaDescription: 'Compare licensed trash haulers, curbside recycling, hazardous-waste programs, yard-waste options and bulky-item pickup in Inver Grove Heights.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Inver Grove Heights licenses private trash and recycling haulers rather than operating one universal disposal center. Residents use curbside service for normal household material, Dakota County programs for special waste, local or county-listed sites for yard waste and transfer-station material, and scheduled pickup for bulky cleanouts.',
    sections: [
      {
        h2: 'Licensed weekly service in Inver Grove Heights',
        body: [
          'The city licenses trash and recycling companies annually and requires haulers to provide weekly residential service. New residents and businesses should choose from the city’s current licensed list and confirm carts, collection days, yard waste and bulky-item charges directly.',
          'Curbside recycling follows Dakota County rules. Keep batteries, electronics, appliances, hazardous waste, yard waste, sharps, tires, plastic film and general trash out of the recycling cart.',
        ],
      },
      {
        h2: 'Drop-off and special-material routes',
        body: [
          'The city provides guidance for trash, recycling, hazardous waste, yard waste, food scraps, reuse and collection events. Dakota County’s Recycling Guide remains the best item-by-item directory when a material does not belong in curbside service.',
          'Call any transfer station, yard-waste site or private recycler before arriving. The closest facility may still reject the load because of material type, quantity, residency or hours.',
        ],
      },
      {
        h2: 'Bulky pickup in Inver Grove Heights',
        body: [
          'Dakota Valley can quote furniture, mattresses, appliances, electronics, garage piles and property cleanouts in Inver Grove Heights. Full-service pickup can be easier than making separate trips for a mixed household load.',
          'Photograph everything that should leave and identify heavy, sharp or regulated items. Household chemicals, medication, loose sharps and asbestos require specialized routes.',
        ],
      },
    ],
    faqs: [
      { q: 'Does Inver Grove Heights have one city recycling center?', a: 'The city relies on licensed curbside haulers and multiple specialized facilities or programs. Use the city page and Dakota County Recycling Guide for the exact item.' },
      { q: 'How do I start trash service in Inver Grove Heights?', a: 'Choose a provider from the city’s current licensed-hauler list and arrange service directly.' },
      { q: 'Where can I take household chemicals?', a: 'Dakota County residents can use the Eagan Recycling Zone for accepted household hazardous waste.' },
      { q: 'Does Dakota Valley serve Inver Grove Heights?', a: 'Yes. Approved non-hazardous bulky items and cleanouts can be quoted from photos.' },
    ],
    sources: [
      { label: 'City of Inver Grove Heights Trash and Recycling', url: ighTrashUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/cities/inver-grove-heights/junk-pickup/',
    serviceLabel: 'View Inver Grove Heights junk removal',
  },

  'anoka-county-tv-electronics-disposal': {
    priority: 58,
    category: 'Anoka County electronics',
    shortTitle: 'Anoka County TV disposal',
    title: 'TV and Electronics Disposal in Anoka County',
    metaTitle: 'Anoka County TV Disposal & Electronics Recycling | Current Drop-Off Guide',
    metaDescription: 'Find current Anoka County options for televisions, computers, monitors and electronics through community recycling centers, events and pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Anoka County electronics options vary by city and event. Some community recycling centers operate regular hours, while other cities hold monthly, seasonal or twice-yearly events. Televisions and monitors commonly have fees, size limits or residency rules, so residents should use the county directory and city-specific page before driving.',
    sections: [
      {
        h2: 'Start with Anoka County’s community directory',
        body: [
          'Anoka County publishes residential recycling information by community, including drop-off centers and events that accept televisions, computers, appliances, mattresses, scrap metal and other special materials. Availability and fees differ significantly between cities.',
          'Call ahead to confirm the event date, resident eligibility, television size, device limit, payment method and unloading instructions. An old listing or map result does not guarantee that a site is accepting electronics today.',
        ],
      },
      {
        h2: 'Prepare electronics and protect data',
        body: [
          'Back up files, sign out of accounts and perform a secure reset before releasing a computer, phone or tablet. Remove or destroy storage drives when the data requires a stronger level of protection.',
          'Keep batteries visible and identify damaged or swollen lithium batteries before transport. Do not hide batteries inside boxes or mix electronics with ordinary trash.',
        ],
      },
      {
        h2: 'Pickup for heavy TVs or larger electronics loads',
        body: [
          'Dakota Valley can quote heavy televisions, monitors, computers, printers and office electronics across Minnesota routes when service is available. Pickup is particularly useful for large CRT televisions, several devices or electronics combined with furniture.',
          'Send photos showing device size, quantity, location and stairs. Identify data-bearing equipment and any batteries requiring special attention.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of a TV in Anoka County?', a: 'Use Anoka County’s residential recycling pages or Recycling and Disposal Directory to find the current community event or site for your address.' },
      { q: 'Are TVs free to recycle in Anoka County?', a: 'Not always. Many community programs charge fees for televisions or monitors, and rules differ by city and event.' },
      { q: 'Can computers go in household recycling?', a: 'No. Use an approved electronics program or pickup service and protect personal data first.' },
      { q: 'Can Dakota Valley pick up a large TV?', a: 'Potentially, depending on route and location. Send photos, dimensions and access details for confirmation.' },
    ],
    sources: [
      { label: 'Anoka County Residential Recycling by Community', url: anokaResidentialUrl },
      { label: 'Anoka County Recycling and Disposal Directory', url: anokaDirectoryUrl },
    ],
    serviceLink: '/services/electronics-removal/',
    serviceLabel: 'Request electronics pickup',
  },

  'saint-paul-west-saint-paul-hazardous-waste-disposal': {
    priority: 57,
    category: 'Saint Paul hazardous waste',
    shortTitle: 'Saint Paul hazardous waste',
    title: 'Household Hazardous Waste Disposal for Saint Paul and West Saint Paul',
    metaTitle: 'Hazardous Waste Disposal Saint Paul & West Saint Paul | Drop-Off Guide',
    metaDescription: 'Find the correct household hazardous-waste program for Saint Paul and West Saint Paul, including paint, oil, chemicals, sharps and batteries.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Saint Paul and West Saint Paul are neighboring cities in different counties, so residents use different county hazardous-waste programs. Saint Paul is in Ramsey County and uses the Ramsey County Environmental Center. West Saint Paul is in Dakota County and uses Dakota County resources such as the Recycling Zone in Eagan.',
    sections: [
      {
        h2: 'Saint Paul residents use Ramsey County programs',
        body: [
          'Ramsey County’s year-round Environmental Center is at 1700 Kent Street in Roseville. The published schedule is Tuesday through Friday from 11 a.m. to 6 p.m. and Saturday from 9 a.m. to 4 p.m., with Sunday and Monday closed. Verify holidays and current instructions before visiting.',
          'Accepted household hazardous waste includes categories such as paint, cleaners, automotive fluids, solvents, pesticides, mercury products, sharps, propane tanks and batteries. Keep materials upright, labeled and separate during transport.',
        ],
      },
      {
        h2: 'West Saint Paul residents use Dakota County programs',
        body: [
          'West Saint Paul is in Dakota County. Dakota County directs residents to the Recycling Zone in Eagan for accepted household hazardous waste, electronics, small appliances and recyclables. Most accepted residential items are free, although selected electronics and tires can have fees.',
          'Do not choose a facility based only on the words “Saint Paul” in the search result. Residency and county determine which public program applies.',
        ],
      },
      {
        h2: 'Hazardous materials do not belong in junk loads',
        body: [
          'Dakota Valley does not haul wet chemicals, gasoline, pesticides, unknown liquids, loose sharps or other hazardous products with ordinary furniture and household junk. Separate these materials before sending cleanout photos.',
          'After hazardous products are removed, Dakota Valley can quote furniture, appliances, shelving, boxes and other approved non-hazardous material from Saint Paul, West Saint Paul and surrounding routes.',
        ],
      },
    ],
    faqs: [
      { q: 'Where does Saint Paul household hazardous waste go?', a: 'Saint Paul residents use Ramsey County’s Environmental Center in Roseville for accepted household hazardous waste.' },
      { q: 'Where does West Saint Paul hazardous waste go?', a: 'West Saint Paul is in Dakota County, so residents use Dakota County programs such as the Recycling Zone in Eagan.' },
      { q: 'Can paint and motor oil go in the trash?', a: 'Products with hazardous material remaining should use the appropriate county program rather than household trash.' },
      { q: 'Will Dakota Valley haul household chemicals?', a: 'No. Separate chemicals and hazardous materials before scheduling an ordinary junk-removal pickup.' },
    ],
    sources: [
      { label: 'City of Saint Paul Household Hazardous Waste', url: saintPaulHhwUrl },
      { label: 'Ramsey County Household Hazardous Waste', url: ramseyHhwUrl },
      { label: 'Dakota County Household Hazardous Waste', url: hazardousWasteUrl },
    ],
    serviceLink: '/services/garage-cleanout/',
    serviceLabel: 'Remove the non-hazardous cleanout material',
  },

  'paint-motor-oil-automotive-fluid-disposal-dakota-county': {
    priority: 56,
    category: 'Paint and oil disposal',
    shortTitle: 'Paint and motor-oil disposal',
    title: 'Paint, Motor Oil and Automotive-Fluid Disposal in Dakota County',
    metaTitle: 'Paint & Motor Oil Disposal Dakota County | Eagan Drop-Off Guide',
    metaDescription: 'Safely dispose of leftover paint, used motor oil, antifreeze, gasoline and automotive fluids through Dakota County household hazardous-waste programs.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Leftover paint, used oil, antifreeze, gasoline and many automotive products cannot be poured on the ground, placed in recycling or hidden inside a junk load. Dakota County residents should keep products in secure labeled containers and use the Recycling Zone or another approved program.',
    sections: [
      {
        h2: 'Use the Recycling Zone for accepted household products',
        body: [
          'Dakota County directs residents to the Recycling Zone in Eagan for household hazardous waste. Most accepted residential items are free. The facility handles common household chemicals and automotive products under published preparation and quantity rules.',
          'Keep each product in its original container when possible. Never mix fluids together, and do not use beverage or food containers that could be mistaken for something safe to consume.',
        ],
      },
      {
        h2: 'Empty containers follow different rules',
        body: [
          'Dakota County states that empty household chemical containers can go in regular trash, but containers that held motor oil or paint do not belong in home recycling. “Empty” means no usable liquid or hazardous product remains.',
          'Paint cans with liquid paint, oil cans with residue and unknown containers should be treated as hazardous until the county or receiving facility confirms otherwise.',
        ],
      },
      {
        h2: 'Separate fluids before a garage cleanout',
        body: [
          'Before a junk-removal pickup, set aside paint, oil, gasoline, antifreeze, pesticides, cleaners, propane and unidentified liquids. Do not place them inside opaque bags, boxes or cabinets that the crew has been told to remove.',
          'Dakota Valley can quote empty shelving, tools, furniture, appliances, tires routed appropriately and other approved garage material after hazardous products are separated.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of paint in Dakota County?', a: 'Dakota County residents can bring accepted leftover paint to the Recycling Zone in Eagan. Check current limits and hours first.' },
      { q: 'Can used motor oil go in household trash?', a: 'No. Use an approved used-oil or household hazardous-waste collection program.' },
      { q: 'Can empty paint cans go in recycling?', a: 'Dakota County says containers that held paint or motor oil should not go in home recycling. Follow the county’s current empty-container instructions.' },
      { q: 'Can Dakota Valley take gasoline or antifreeze?', a: 'No. Hazardous fluids must be removed through the appropriate county or licensed program before junk pickup.' },
    ],
    sources: [
      { label: 'Dakota County Household Hazardous Waste', url: hazardousWasteUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/garage-cleanout/',
    serviceLabel: 'Request the remaining garage cleanout',
  },

  'refrigerator-freezer-dehumidifier-disposal-dakota-county': {
    priority: 55,
    category: 'Refrigerant appliances',
    shortTitle: 'Refrigerator and dehumidifier disposal',
    title: 'Refrigerator, Freezer and Dehumidifier Disposal in Dakota County',
    metaTitle: 'Refrigerator & Dehumidifier Disposal Dakota County | Appliance Pickup',
    metaDescription: 'Dispose of refrigerators, freezers, air conditioners and dehumidifiers correctly in Dakota County through retailer take-back, verified recyclers or pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Refrigerators, freezers, air conditioners and dehumidifiers contain refrigerant and require a route that can recover or manage it properly. These appliances should not be abandoned, cut apart for scrap or taken to a site that has not confirmed acceptance.',
    sections: [
      {
        h2: 'Ask the replacement retailer about haul-away',
        body: [
          'When a new appliance is delivered, ask whether the retailer will remove the old unit and what preparation is required. Confirm whether doors, food, shelving, water lines and stairs affect the service.',
          'Retailer take-back can be the simplest option because the delivery team is already onsite, but the service and price must be confirmed before delivery day.',
        ],
      },
      {
        h2: 'Use the Recycling Guide—not the general Recycling Zone',
        body: [
          'Dakota County’s Recycling Zone accepts small household appliances but currently lists major appliances and several bulky categories as not accepted. Search the exact appliance in the Recycling Guide and call the listed recycler or facility.',
          'Do not release refrigerant, puncture lines or dismantle the sealed system. A metal scrap value does not eliminate refrigerant-handling requirements.',
        ],
      },
      {
        h2: 'Full-service appliance pickup',
        body: [
          'Dakota Valley can quote refrigerators, freezers, window air conditioners and dehumidifiers from a garage, curb, basement or interior location when access is safe. Send photos of the unit and the entire path out.',
          'Appliances should be empty and safely disconnected before removal unless the written scope states otherwise. Mention water lines, stairs, tight corners and unusually large commercial units.',
        ],
      },
    ],
    faqs: [
      { q: 'Does the Eagan Recycling Zone accept refrigerators?', a: 'The general Recycling Zone is not the normal destination for major appliances. Use Dakota County’s Recycling Guide to find an approved current option.' },
      { q: 'Where can I dispose of a dehumidifier?', a: 'A dehumidifier contains refrigerant. Use a recycler or pickup service that confirms proper refrigerant handling.' },
      { q: 'Can I cut the refrigerant lines before scrap recycling?', a: 'No. Do not release refrigerant or dismantle the sealed system yourself.' },
      { q: 'Can Dakota Valley remove a basement refrigerator?', a: 'Often, yes. Send photos of the appliance, stairs, doors and route out for confirmation and a written quote.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/appliance-recycling/',
    serviceLabel: 'Request refrigerant-appliance pickup',
  },

  'microwave-small-appliance-disposal-dakota-county': {
    priority: 54,
    category: 'Small appliances',
    shortTitle: 'Small-appliance disposal',
    title: 'Microwave and Small-Appliance Disposal in Dakota County',
    metaTitle: 'Microwave & Small Appliance Disposal Dakota County | Eagan Guide',
    metaDescription: 'Learn where microwaves, vacuums, coffee makers, toasters and small household appliances belong in Dakota County, including drop-off and pickup options.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: '“Small appliance” can describe anything from a toaster to a microwave or vacuum. Dakota County’s Recycling Zone accepts selected small household appliances but specifically lists microwaves among items not accepted. Search the exact item instead of assuming every plug-in device uses the same bin.',
    sections: [
      {
        h2: 'Check the exact appliance in the Recycling Guide',
        body: [
          'Coffee makers, toasters, fans, vacuums, humidifiers and microwaves can follow different routes based on electronics, motors, refrigerant, size and facility rules. Dakota County’s Recycling Guide provides current item-specific options.',
          'Remove food, liquids, bags and loose attachments before transport. Take out removable batteries and identify lithium batteries, which need their own safe route.',
        ],
      },
      {
        h2: 'Microwaves are not accepted at the Recycling Zone',
        body: [
          'Dakota County’s current Recycling Zone refused-material list includes microwaves. Do not drive there with a microwave unless the official item listing changes or staff confirms another program.',
          'Use the Recycling Guide, ask a retailer about take-back, contact a scrap or appliance recycler that accepts microwaves, or arrange pickup.',
        ],
      },
      {
        h2: 'Bundle small appliances with a larger cleanup',
        body: [
          'Dakota Valley can quote microwaves, vacuums, fans, kitchen appliances and electronics as part of a garage, basement, apartment or office cleanout. Combining several items can be more efficient than arranging separate trips.',
          'Photograph every device and identify batteries, refrigerant, fluids or unusual weight. Loose household trash and food should be removed before pickup.',
        ],
      },
    ],
    faqs: [
      { q: 'Can I take a microwave to the Eagan Recycling Zone?', a: 'No. Microwaves are currently listed as not accepted at the Recycling Zone.' },
      { q: 'Where can I dispose of a toaster or coffee maker?', a: 'Search the exact item in Dakota County’s Recycling Guide because accepted small-appliance categories vary.' },
      { q: 'Should batteries stay inside small appliances?', a: 'Remove accessible batteries when practical and use the correct battery-recycling route, especially for lithium batteries.' },
      { q: 'Can Dakota Valley pick up a group of small appliances?', a: 'Yes. Include all appliances and related cleanout items in the photo set for one written quote.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/appliance-recycling/',
    serviceLabel: 'Request appliance pickup',
  },

  'sink-toilet-bathroom-fixture-disposal-eagan': {
    priority: 53,
    category: 'Bathroom fixtures',
    shortTitle: 'Sink and toilet disposal',
    title: 'Sink, Toilet and Bathroom-Fixture Disposal in Eagan and Dakota County',
    metaTitle: 'Sink & Toilet Disposal Eagan MN | Bathroom Fixture Pickup Guide',
    metaDescription: 'Dispose of sinks, toilets, vanities, shower doors and bathroom-remodel debris correctly in Eagan and Dakota County through reuse, verified facilities or pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Bathroom fixtures contain a mix of porcelain, ceramic, glass, metal, wood and plumbing parts. A reusable vanity or sink may have donation value, while a broken toilet or remodel pile may need a transfer station or construction-debris route. Separate fixtures from chemicals and plumbing liquids before transport or pickup.',
    sections: [
      {
        h2: 'Consider reuse for clean fixtures',
        body: [
          'A clean, undamaged vanity, faucet, mirror or specialty sink may be accepted by a building-material reuse organization. Call first with dimensions, condition and photos because many organizations cannot accept used toilets, chipped porcelain or incomplete fixtures.',
          'Remove personal items and clean ordinary residue. Do not attempt to donate moldy cabinetry, broken glass or fixtures contaminated by sewage or chemicals.',
        ],
      },
      {
        h2: 'Broken fixtures need a verified disposal route',
        body: [
          'Use Dakota County’s Recycling Guide to look up toilets, sinks, mirrors, glass, metal plumbing and construction debris individually. A facility may accept one material but reject another, and dense porcelain can affect fees.',
          'The Eagan Recycling Zone is not a general construction-debris facility. Call a county-listed transfer station or recycler before loading bathroom-remodel material.',
        ],
      },
      {
        h2: 'Preparing fixtures for pickup',
        body: [
          'Fixtures should be safely disconnected and drained before pickup. Protect sharp glass edges, secure loose faucet parts and disclose broken porcelain or exposed fasteners. Photograph the fixture and the route out of the bathroom.',
          'Dakota Valley can quote sinks, toilets, vanities, shower doors, cabinets and approved light-remodel debris. Chemicals, asbestos and contaminated material require specialized handling.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of a sink in Eagan?', a: 'Search “sink” in Dakota County’s Recycling Guide and confirm acceptance with the listed facility, or request full-service pickup.' },
      { q: 'Can a toilet go to the Recycling Zone?', a: 'Do not treat the Recycling Zone as a general building-material drop-off. Use the Recycling Guide for the current toilet or porcelain route.' },
      { q: 'Can a usable vanity be donated?', a: 'Possibly. Building-material reuse organizations set their own condition, size and completeness requirements. Call first.' },
      { q: 'Will Dakota Valley disconnect plumbing fixtures?', a: 'Fixtures should normally be safely disconnected before pickup unless the written scope explicitly states otherwise.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Get Rid of Stuff', url: getRidOfStuffUrl },
    ],
    serviceLink: '/services/demolition/',
    serviceLabel: 'Request fixture and light-debris pickup',
  },

  'tree-trimming-branch-disposal-dakota-county': {
    priority: 52,
    category: 'Tree and branch disposal',
    shortTitle: 'Tree-trimming disposal',
    title: 'Tree Trimming, Branch and Brush Disposal in Dakota County',
    metaTitle: 'Tree Branch Disposal Dakota County | Eagan Yard-Waste Drop-Off & Pickup',
    metaDescription: 'Find current Dakota County options for branches, brush, tree trimmings, shrubs and storm debris through yard-waste sites, hauler service or pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Branches, brush, shrubs and tree trimmings are yard waste and cannot go in ordinary Dakota County trash. Residents can use a hauler’s seasonal yard-waste service, an approved compost or mulch site, or scheduled pickup for larger piles and storm debris.',
    sections: [
      {
        h2: 'Choose a site that accepts your exact woody material',
        body: [
          'Dakota County lists yard-waste facilities in Eagan, Inver Grove Heights, Burnsville, Rosemount, Northfield and Hastings. Sites differ on branches, trees, shrubs, stumps, sod, soil and leaf material, and some operate seasonally.',
          'Call before visiting to confirm branch diameter, length, quantity, fees, hours and whether bags or tie bundles are allowed. A leaf-compost site may not accept large limbs or stumps.',
        ],
      },
      {
        h2: 'Keep yard waste separate from construction debris',
        body: [
          'Clean branches and brush can be composted or chipped, but fencing, treated lumber, railroad ties, plastic landscape edging, concrete and general trash need different routes. Separate the pile before transport or pickup.',
          'Regular plastic bags are not accepted for compostable yard waste. Follow the selected site’s rules for paper bags, certified compostable bags, reusable containers or loose material.',
        ],
      },
      {
        h2: 'Pickup for storm debris and large piles',
        body: [
          'Dakota Valley can quote curbside branch piles, brush, shrubs, storm debris and mixed outdoor cleanouts. Send photos from several angles and include a person, cart or known dimension for scale.',
          'Identify stumps, soil, concrete footings, treated wood and fencing because those materials change the weight, equipment and destination required.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I drop off tree trimmings in Dakota County?', a: 'Use Dakota County’s official yard-waste list and call the selected facility to confirm it accepts your branch size and material.' },
      { q: 'Can branches go in regular trash?', a: 'No. Dakota County says yard waste, including branches and brush, cannot be placed in ordinary trash.' },
      { q: 'Does the Eagan Recycling Zone accept branches?', a: 'No. Yard waste is currently listed as not accepted at the Recycling Zone.' },
      { q: 'Can Dakota Valley pick up storm branches?', a: 'Yes, depending on pile size, access and material. Send several photos for a written quote.' },
    ],
    sources: [
      { label: 'Dakota County Yard Waste Disposal', url: yardWasteUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/yard-debris/',
    serviceLabel: 'Request branch and storm-debris pickup',
  },
};
