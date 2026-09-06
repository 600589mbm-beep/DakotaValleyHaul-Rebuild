import { NO_INSIDE_PICKUP } from './servicePolicy.js';
// Second local SEO expansion based on uncovered Google Business Profile searches.
// Each page owns a separate search intent and links to current government resources.

const recyclingGuideUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-guide';
const recyclingZoneUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-zone-locations/recycling-zone';
const recyclingLocationsUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-zone-locations';
const recyclingZonePlusUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-zone-locations/recycling-zone-plus';
const recyclingRightUrl = 'https://dakotacountymn.gov/residents/recycling-waste/recycling-right';
const getRidOfStuffUrl = 'https://dakotacountymn.gov/residents/recycling-waste/get-rid-of-stuff';
const medicationUrl = 'https://dakotacountymn.gov/residents/recycling-waste/medication-disposal';
const foodScrapsUrl = 'https://dakotacountymn.gov/residents/recycling-waste/food-scraps-drop-off';
const fixItUrl = 'https://dakotacountymn.gov/residents/recycling-waste/fix-it-clinics';
const mpcaBuildingReuseUrl = 'https://www.pca.state.mn.us/business-with-us/building-material-reuse-and-recycling';
const mpcaBuildingMaterialsUrl = 'https://www.pca.state.mn.us/air-water-land-climate/managing-building-materials';
const mpcaLandfillsUrl = 'https://www.pca.state.mn.us/business-with-us/landfills';

export const seoGuidesRoundTwo = {
  'cardboard-recycling-eagan-south-metro': {
    priority: 83,
    category: 'Cardboard recycling',
    shortTitle: 'Cardboard recycling near Eagan',
    title: 'Cardboard Recycling Near Eagan and the South Metro: Drop-Off and Pickup Options',
    metaTitle: 'Cardboard Recycling Eagan MN | South Metro Drop-Off and Pickup Guide',
    metaDescription: 'Find cardboard recycling near Eagan, Apple Valley, Lakeville and the south metro. Learn preparation rules, public drop-off options and pickup choices for large volumes.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Moving boxes, shipping cartons and retail cardboard can overwhelm a home recycling cart quickly. Clean flattened cardboard should be recycled, but wet, greasy or contaminated material may need a different route. Eagan and south-metro residents can use approved recycling drop-offs or arrange pickup when the volume is too large to transport safely.',
    sections: [
      {
        h2: 'Prepare cardboard before taking it to a drop-off',
        body: [
          'Remove plastic film, foam, packing straps, food residue and loose trash. Flatten boxes so they take less space and do not jam collection equipment. Dakota County’s current Recycling Zone instructions require cardboard to be flattened and cut to no larger than 3 feet by 3 feet.',
          'Pizza boxes and food-service cardboard can only be recycled when clean and dry. Tear off clean sections and place greasy or heavily soiled portions in the trash or an approved organics stream when accepted.',
        ],
      },
      {
        h2: 'Public cardboard drop-off options in Dakota County',
        body: [
          'Dakota County lists the Recycling Zone at 3365 Dodd Road in Eagan for bottles, cans, paper and cardboard. Its “Get Rid of Stuff” page also lists a paper-and-cardboard site in Hastings and Recycle Minnesota in Lakeville. Always verify current hours, quantity limits and unloading rules before visiting.',
          'Do not leave boxes beside a closed or overflowing container. Cardboard abandoned outside a site becomes litter and may be treated as illegal dumping even when the material itself is recyclable.',
        ],
      },
      {
        h2: 'When cardboard pickup is more practical',
        body: [
          'Pickup is useful after moves, retail fixture changes, warehouse cleanouts and appliance deliveries that leave a large volume of flattened boxes and packing material. Keep cardboard separate from Styrofoam, plastic film, pallets and general trash so each material can be routed correctly.',
          'Text photos showing the full volume and identify whether the cardboard is flattened, dry and accessible. Include surrounding household junk in the same photo set when it should leave during the same visit.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I drop off extra cardboard in Eagan?', a: 'Dakota County lists the Recycling Zone at 3365 Dodd Road for cardboard. Flatten it, follow the current size rules and confirm hours before visiting.' },
      { q: 'Can wet cardboard be recycled?', a: 'Wet or heavily contaminated cardboard is often not recyclable because moisture weakens fibers and contaminates other paper. Keep recyclable cardboard clean and dry.' },
      { q: 'Does Dakota Valley pick up large amounts of cardboard?', a: 'Yes, especially as part of a move, garage cleanout, retail cleanout or mixed non-hazardous pickup. Send photos of the full volume for a written quote.' },
      { q: 'Can packing foam and plastic film go with cardboard recycling?', a: 'No. Separate them. Use Dakota County’s Recycling Guide to find current options for plastic film, foam and other packing materials.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
      { label: 'Dakota County Get Rid of Stuff', url: getRidOfStuffUrl },
      { label: 'Dakota County Recycle Right', url: recyclingRightUrl },
    ],
    serviceLink: '/services/junk-pickup/',
    serviceLabel: 'Request large-volume pickup',
  },

  'scrap-metal-recycling-pickup-dakota-county': {
    priority: 82,
    category: 'Scrap metal',
    shortTitle: 'Scrap metal recycling',
    title: 'Scrap Metal Recycling and Pickup in Dakota County',
    metaTitle: 'Scrap Metal Recycling Dakota County MN | Metal Pickup Near Eagan',
    metaDescription: 'Recycle metal appliances, shelving, exercise equipment, fencing and household scrap in Dakota County. Compare self-haul scrap yards with convenient pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Scrap metal includes much more than loose steel. Old appliances, bed frames, shelving, filing cabinets, exercise equipment, fencing, gutters and renovation metal may all have recycling value. The correct route depends on size, contamination, refrigerant, fuel, pressure cylinders and whether the item can be transported safely.',
    sections: [
      {
        h2: 'Keep scrap metal out of curbside recycling carts',
        body: [
          'Dakota County’s Recycle Right guidance says scrap metal, electronics, major appliances, tires and other bulky materials do not belong in ordinary household recycling carts. Large metal can damage sorting equipment, while cords and chains can wrap around machinery.',
          'Use the county Recycling Guide to find a scrap dealer or specialized recycler that accepts the exact material. Call first because some yards accept only certain metals, require identification or have rules for appliances and vehicles.',
        ],
      },
      {
        h2: 'Special handling for appliances and equipment',
        body: [
          'Refrigerators, freezers, air conditioners and dehumidifiers require proper refrigerant handling. Lawn equipment may contain fuel or oil, and propane cylinders remain pressurized even when they seem empty. Do not cut lines, drain fluids onto the ground or hide cylinders inside a scrap load.',
          'Separate clean metal from wood, plastic, concrete and general trash when possible. A cleaner load is easier to evaluate and more likely to reach an appropriate recycler.',
        ],
      },
      {
        h2: 'When scrap-metal pickup makes sense',
        body: [
          'Pickup is useful for treadmills, swing sets, filing cabinets, commercial shelving, multiple appliances, fence sections and mixed renovation metal that does not fit safely in a personal vehicle. The crew can combine metal with other non-hazardous junk in one written quote.',
          'Photograph the items from more than one angle and identify any fluids, batteries, refrigerant, concrete footings or attached wood. These details determine equipment, labor and routing requirements.',
        ],
      },
    ],
    faqs: [
      { q: 'Can scrap metal go in my recycling cart?', a: 'Generally no. Dakota County says scrap metal and bulky metal items do not belong in normal household recycling carts. Use a scrap recycler or pickup service.' },
      { q: 'Can Dakota Valley pick up a treadmill or metal bed frame?', a: "Yes, for items safely staged at the curb, in the driveway or in an accessible garage. Send photos and dimensions for a written quote; no inside-home carry-out." },
      { q: 'Is free scrap-metal pickup always available?', a: 'No. Scrap value changes, and heavy labor, access, fuel, disposal and non-metal attachments affect the job. Get a written quote instead of assuming every metal item has enough value to cover pickup.' },
      { q: 'Can a refrigerator go directly to a scrap yard?', a: 'Only through a route that handles refrigerant properly. Verify acceptance before transporting a refrigerator, freezer, air conditioner or dehumidifier.' },
    ],
    sources: [
      { label: 'Dakota County Recycle Right', url: recyclingRightUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/scrap-metal-removal/',
    serviceLabel: 'View scrap-metal pickup',
  },

  'medication-sharps-disposal-dakota-county': {
    priority: 81,
    category: 'Medication and sharps',
    shortTitle: 'Medication and sharps disposal',
    title: 'Medication and Sharps Disposal in Eagan and Dakota County',
    metaTitle: 'Medication & Sharps Disposal Dakota County | Eagan Drop-Off Guide',
    metaDescription: 'Safely dispose of unused medication, needles, syringes and lancets in Dakota County. See current police drop boxes and Recycling Zone sharps instructions.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Unused medication and household sharps must be separated from ordinary trash, recycling and junk-removal loads. Dakota County provides anonymous medication drop boxes at law-enforcement locations and accepts properly contained household sharps at the Recycling Zone in Eagan.',
    sections: [
      {
        h2: 'Medication drop boxes across Dakota County',
        body: [
          'Dakota County’s current medication-disposal program accepts household prescription, over-the-counter and pet medication. Drop-off is anonymous, no identification is required and no questions are asked.',
          'The county lists 24-hour boxes at the Eagan Police Station, Dakota County Law Enforcement Center, Lakeville Police Station, Mendota Heights Police Station and West St. Paul Police Station. Additional weekday locations are listed in Farmington, Inver Grove Heights, Rosemount and South St. Paul. Verify the official page before visiting.',
        ],
      },
      {
        h2: 'Sharps go to the Recycling Zone—not medication boxes',
        body: [
          'Needles, syringes and lancets are not accepted in medication drop boxes. Dakota County instructs residents to place home sharps in a rigid container such as a plastic laundry-detergent bottle, tape the lid shut and label it “Do not recycle: household sharps.”',
          'At the Recycling Zone, keep the sharps container near you in the front seat. Staff direct residents to place it into the sharps bin while remaining in the vehicle. Never place loose needles in bags, recycling carts or junk boxes.',
        ],
      },
      {
        h2: 'Keep medication and medical waste out of junk pickups',
        body: [
          'Dakota Valley does not accept loose sharps, medication, infectious medical waste or unknown medical containers with ordinary household junk. Remove these materials before photographing a bathroom, bedroom, estate or senior cleanout.',
          'After prohibited items are separated, the crew can quote furniture, mobility equipment, empty shelving, household goods and other non-hazardous material from the same property.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of old medication in Eagan?', a: 'Dakota County lists a 24-hour medication drop box at the Eagan Police Station, 3830 Pilot Knob Road. Verify current access on the county page.' },
      { q: 'Where do used needles go in Dakota County?', a: 'Properly contained household sharps go to the Recycling Zone in Eagan, not medication drop boxes or household recycling.' },
      { q: 'Can I put sharps in a glass jar?', a: 'Follow Dakota County’s current instructions. The county recommends a rigid plastic container such as a laundry-detergent bottle with a taped lid and a clear warning label.' },
      { q: 'Will Dakota Valley remove medication or medical sharps?', a: 'No. Separate them and use the county’s approved programs before the junk-removal crew arrives.' },
    ],
    sources: [
      { label: 'Dakota County Medication Disposal', url: medicationUrl },
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/estate-cleanout/',
    serviceLabel: 'Plan the remaining estate cleanout',
  },

  'carpet-rug-disposal-eagan-dakota-county': {
    priority: 80,
    category: 'Carpet and rugs',
    shortTitle: 'Carpet and rug disposal',
    title: 'Carpet and Rug Disposal in Eagan and Dakota County',
    metaTitle: 'Carpet & Rug Disposal Eagan MN | Pickup and Drop-Off Options',
    metaDescription: 'Learn how to dispose of area rugs, rolled carpet, padding and flooring debris in Eagan and Dakota County through reuse, drop-off or pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Area rugs, carpet rolls and padding are bulky, dusty and difficult to fit in normal trash containers. Clean rugs may have reuse value, while removed wall-to-wall carpet usually needs disposal or specialized recycling. The right option depends on condition, moisture, contamination and how the material is prepared.',
    sections: [
      {
        h2: 'Check reuse before disposal',
        body: [
          'A clean, odor-free area rug without stains, pet damage or mold may be accepted by a reuse organization or sold directly. Call before delivering because donation standards vary and many organizations do not accept used carpet or oversized rugs.',
          'Carpet removed because of flooding, sewage, mold or pest contamination should not be donated. Describe contamination honestly when contacting a disposal provider so the material can be handled safely.',
        ],
      },
      {
        h2: 'Use the Dakota County Recycling Guide for current outlets',
        body: [
          'Dakota County lists carpet among the most commonly searched materials in its Recycling Guide. Search the exact item and call the listed business to confirm whether it accepts carpet, padding, area rugs or flooring remnants.',
          'The Eagan Recycling Zone is not a general carpet or construction-debris drop-off. Do not bring rolled flooring there unless the current county guide specifically directs you to that facility.',
        ],
      },
      {
        h2: 'Preparing carpet or rugs for pickup',
        body: [
          'Roll carpet tightly, secure it with tape or twine and keep tack strips, nails and loose blades separate. Bag small padding pieces and disclose wet, moldy or contaminated sections. Large rolls may need to be cut into manageable lengths.',
          'Dakota Valley can quote rugs, carpet rolls, padding and related room-cleanout material from photos. Include furniture, bed frames or renovation debris in the same photo set when everything should leave together.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of carpet in Dakota County?', a: 'Search “carpet” in Dakota County’s Recycling Guide and call the listed facility before visiting. Acceptance differs for carpet, padding and area rugs.' },
      { q: 'Can a clean area rug be donated?', a: 'Possibly. It must generally be clean, dry, odor-free and in reusable condition. Confirm acceptance before transporting it.' },
      { q: 'Can Dakota Valley pick up rolled carpet and padding?', a: 'Yes, depending on condition and access. Send photos and disclose water, mold, pet or sewage contamination.' },
      { q: 'Should tack strips and nails stay attached?', a: 'Remove or clearly secure sharp materials when possible. Tell the crew about exposed nails, staples and tack strips before pickup.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Get Rid of Stuff', url: getRidOfStuffUrl },
    ],
    serviceLink: '/services/junk-pickup/',
    serviceLabel: 'Request carpet or rug pickup',
  },

  'construction-debris-dirt-concrete-treated-wood-dakota-county': {
    priority: 79,
    category: 'Construction debris',
    shortTitle: 'Construction-debris disposal',
    title: 'Construction Debris Disposal in Dakota County: Concrete, Dirt, Lumber and Railroad Ties',
    metaTitle: 'Construction Debris Disposal Dakota County | Concrete, Dirt & Treated Wood',
    metaDescription: 'Dispose of concrete, dirt, lumber, railroad ties and remodeling debris correctly in Dakota County. Learn why material separation and facility verification matter.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Construction and demolition debris is not a single waste stream. Clean concrete, soil, untreated lumber, drywall, shingles and treated railroad ties may require different facilities. Mixing everything together can increase cost or cause a load to be rejected, so identify and separate materials before hauling or requesting pickup.',
    sections: [
      {
        h2: 'Call a permitted facility before loading',
        body: [
          'Dakota County lists transfer stations, demolition landfills and landfills on its “Get Rid of Stuff” page and tells residents to call for accepted materials, fees and hours. A facility that accepts ordinary household trash may not accept soil, concrete, shingles or treated wood.',
          'Minnesota Pollution Control Agency permits specify the waste types each landfill or transfer facility may accept. Never assume that all construction debris can go to the nearest “dump.”',
        ],
      },
      {
        h2: 'Separate clean material from hazardous material',
        body: [
          'Keep clean concrete, brick, metal, untreated lumber and soil separated when possible. Material-recovery facilities may recycle certain clean streams, while mixed debris is more likely to require disposal.',
          'Railroad ties and pressure-treated lumber contain preservatives and need an approved disposal route. Suspected asbestos, lead-contaminated debris, chemicals and fuel-contaminated soil require specialized evaluation and cannot ride with an ordinary junk load.',
        ],
      },
      {
        h2: 'What to send for a debris-removal quote',
        body: [
          'Photograph the pile from several angles and identify each material. Include approximate dimensions, access width, distance to the truck and whether the debris is loose, bagged or in containers. Dense material is evaluated differently from household furniture because weight increases quickly.',
          'Dakota Valley can review light demolition debris, fencing, deck lumber, cabinets and mixed remodel material. Concrete, dirt, treated wood and unusually dense loads require confirmation before booking.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I dispose of concrete or dirt in Dakota County?', a: 'Use Dakota County’s Recycling Guide or call a county-listed transfer or demolition facility. Verify the exact material, quantity and contamination before transporting it.' },
      { q: 'Can railroad ties go in ordinary trash?', a: 'Do not assume they can. Railroad ties are treated wood and require a facility that specifically accepts them.' },
      { q: 'Does Dakota Valley remove construction debris?', a: 'Dakota Valley can quote many light-demolition and remodeling materials. Send detailed photos and identify concrete, dirt, shingles, treated lumber or suspected hazardous material.' },
      { q: 'Can asbestos be included in a debris pickup?', a: 'No. Suspected asbestos requires licensed inspection and abatement procedures before ordinary debris removal continues.' },
    ],
    sources: [
      { label: 'Dakota County Get Rid of Stuff', url: getRidOfStuffUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'MPCA Building Material Reuse and Recycling', url: mpcaBuildingReuseUrl },
      { label: 'MPCA Landfills', url: mpcaLandfillsUrl },
    ],
    serviceLink: '/services/demolition/',
    serviceLabel: 'View light-demolition service',
  },

  'water-heater-disposal-dakota-county': {
    priority: 78,
    category: 'Water heaters',
    shortTitle: 'Water-heater disposal',
    title: 'Water Heater Disposal and Pickup in Eagan and Dakota County',
    metaTitle: 'Water Heater Disposal Dakota County MN | Pickup Near Eagan',
    metaDescription: 'Get rid of an old water heater in Eagan or Dakota County. Compare installer haul-away, scrap recycling, transfer-station drop-off and full-service pickup.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Old water heaters are heavy steel appliances that may still contain water, sediment, gas connections or sharp metal. They are not accepted at every public recycling site. The easiest options are usually installer haul-away, a facility confirmed through the Dakota County Recycling Guide or scheduled pickup after safe disconnection.',
    sections: [
      {
        h2: 'Ask the installer before replacement day',
        body: [
          'When a contractor installs the new water heater, ask whether removal of the old tank is included. Confirm the price, whether stairs are involved and whether the contractor takes both gas and electric units. This is often the simplest option because the equipment and labor are already onsite.',
          'If the installer leaves the tank, make sure it is fully disconnected, drained and placed in an accessible location before arranging another disposal route.',
        ],
      },
      {
        h2: 'The Eagan Recycling Zone does not accept water heaters',
        body: [
          'Dakota County’s current Recycling Zone page lists water heaters among the materials not accepted at that facility. Use the county Recycling Guide to locate a current appliance recycler, scrap outlet, transfer station or other approved destination.',
          'Call first and describe tank size, gas or electric type and whether insulation or plumbing remains attached. Acceptance and unloading rules vary.',
        ],
      },
      {
        h2: 'Preparing a water heater for pickup',
        body: [
          "Stage all approved items safely at the curb, in the driveway or in an accessible garage before the confirmed pickup window. The crew does not enter living areas or carry items out of basements, upstairs rooms or attics. Photograph the staged items and the clear path to legal truck parking. Appliances must be safely disconnected by a qualified person before staging; do not cut refrigerant lines.",
          'Dakota Valley can quote a water heater alone or combine it with furnace parts, plumbing fixtures, appliances and non-hazardous remodeling debris. Photograph the tank and the full exit path.',
        ],
      },
    ],
    faqs: [
      { q: 'Does the Dakota County Recycling Zone accept water heaters?', a: 'No. Water heaters are currently listed among the materials not accepted at the Eagan Recycling Zone.' },
      { q: 'Can Dakota Valley remove a water heater from a basement?', a: NO_INSIDE_PICKUP },
      { q: 'Can a water heater be recycled as scrap metal?', a: 'Many tanks contain recyclable metal, but facilities set their own preparation and acceptance rules. Call before transporting it.' },
      { q: 'Will the pickup crew disconnect gas or water lines?', a: 'Do not assume disconnection is included. The unit should normally be safely disconnected before pickup unless the written scope specifically says otherwise.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Zone', url: recyclingZoneUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/appliance-recycling/',
    serviceLabel: 'Request water-heater pickup',
  },

  'senior-junk-removal-downsizing-dakota-county': {
    priority: 77,
    category: 'Senior cleanouts',
    shortTitle: 'Senior junk removal',
    title: 'Senior Junk Removal and Downsizing Help in Dakota County',
    metaTitle: 'Senior Junk Removal Dakota County | Downsizing & Estate Cleanout Help',
    metaDescription: 'Respectful junk removal for seniors and families in Eagan, Apple Valley, Lakeville and Dakota County. Plan downsizing, donation sorting and pickup without rushing.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'Senior downsizing is different from an ordinary junk pickup. Families may need time to identify keepsakes, documents, medication, donation items and furniture that will move to the next home. A clear sorting system and written scope help the process stay respectful, predictable and manageable.',
    sections: [
      {
        h2: 'Sort by decision—not by room',
        body: [
          'Use four categories: keep, family, donate and remove. Mark containers clearly and create a separate secure area for documents, jewelry, medication, firearms, financial records and irreplaceable items. Do not ask a hauling crew to decide what has sentimental or financial value.',
          'Photograph only the confirmed removal group when possible. If sorting is still underway, explain which rooms are final and which must remain untouched.',
        ],
      },
      {
        h2: 'Separate medication, sharps and hazardous products',
        body: [
          'Unused medicine, needles, chemicals, wet paint and other hazardous materials need county-approved disposal routes. Dakota County operates medication drop boxes and accepts properly contained household sharps and hazardous waste through designated programs.',
          'Removing prohibited materials before the crew arrives protects the senior, family, crew and receiving facilities and prevents delays during the cleanout.',
        ],
      },
      {
        h2: 'Choose a pace that fits the family',
        body: [
          'Some downsizes are completed in one pickup; others need room-by-room visits around family schedules, estate paperwork or a move to senior living. A written quote and clearly marked scope reduce misunderstandings and prevent approved belongings from leaving accidentally.',
          'Dakota Valley can quote furniture, garage contents, household items, appliances and property cleanouts. Tell the crew whether donation candidates are separated and whether completion photos or remote coordination are needed.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you help seniors who cannot move items to the curb?', a: NO_INSIDE_PICKUP },
      { q: 'Can family coordinate a cleanout from another city?', a: 'Many pickups can be coordinated by text with clear authorization, photos, access instructions and a defined list of what may leave.' },
      { q: 'Will usable furniture be donated?', a: 'Donation routing is attempted when items are usable and accepted by a partner or facility. Acceptance is never guaranteed, so separate true keepsakes before the pickup.' },
      { q: 'Can medication and sharps be included?', a: 'No. Use Dakota County’s medication and sharps programs before the cleanout crew arrives.' },
    ],
    sources: [
      { label: 'Dakota County Medication Disposal', url: medicationUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
      { label: 'Dakota County Fix-It Clinics and Reuse Resources', url: fixItUrl },
    ],
    serviceLink: '/services/estate-cleanout/',
    serviceLabel: 'View estate-cleanout service',
  },

  'bagster-pickup-alternatives-dakota-county': {
    priority: 76,
    category: 'Bagster and dumpsters',
    shortTitle: 'Bagster pickup alternatives',
    title: 'Bagster Pickup and Alternatives in Dakota County',
    metaTitle: 'Bagster Pickup Alternatives Dakota County | Junk Removal or Dumpster',
    metaDescription: 'Compare Bagster service, temporary dumpsters, transfer-station self-haul and full-service junk removal for Dakota County cleanouts and remodeling debris.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'A Bagster-style disposable cleanup bag can work for some projects, but the bag purchase is only one part of the decision. You still load it, follow material and weight restrictions, place it where collection equipment can reach it and schedule pickup with the authorized provider. Full-service removal or a temporary dumpster may fit better depending on labor, access and project length.',
    sections: [
      {
        h2: 'When a cleanup bag works well',
        body: [
          'A bag can suit a small do-it-yourself project when materials are approved, the bag can stay in an accessible outdoor location and the household is comfortable doing all loading. Confirm local service availability, total collection cost and placement rules before buying the bag.',
          'Do not fill first and investigate later. Overweight, prohibited or inaccessible bags may not be collected until material is removed or the bag is repositioned.',
        ],
      },
      {
        h2: 'Compare three alternatives',
        body: [
          'A temporary dumpster provides more capacity and a multi-day loading window but may require driveway space, permits or protection beneath the container. Self-haul to a transfer station can be economical when you have a suitable vehicle and know the site accepts the complete load.',
          'Full-service junk removal includes loading and hauling and is often better for furniture, appliances, stairs, mixed household cleanouts and jobs that need to finish in one visit.',
        ],
      },
      {
        h2: 'What Dakota Valley needs to quote the job',
        body: [
          'Send photos of the materials before placing them in a bag whenever possible. Once debris is hidden, it is harder to identify prohibited, hazardous or unusually dense material. Include dimensions and identify concrete, dirt, shingles, treated wood or chemicals.',
          'Dakota Valley can quote crew-loaded pickup, certain trailer or dumpster options and removal of approved material that has already been staged. The written scope determines which option is available.',
        ],
      },
    ],
    faqs: [
      { q: 'Who picks up Bagsters in Dakota County?', a: 'Bagster collection is arranged through the authorized Bagster provider. Confirm local availability and collection requirements on the product’s official site before purchasing.' },
      { q: 'Can Dakota Valley pick up a filled Bagster?', a: 'Do not assume the bag itself can be mechanically collected. Send photos of the bag, contents and access so the crew can determine whether approved material can be manually transferred and hauled.' },
      { q: 'Is a Bagster cheaper than junk removal?', a: 'It depends on bag cost, collection fee, your loading labor, material limits and whether the provider can access it. Compare complete totals rather than the bag’s retail price alone.' },
      { q: 'What cannot go in a cleanup bag?', a: 'Restrictions vary, but hazardous chemicals, asbestos and certain dense or prohibited materials commonly require separate routes. Follow the provider’s current rules.' },
    ],
    sources: [
      { label: 'Dakota County Get Rid of Stuff', url: getRidOfStuffUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/dumpster-rental/',
    serviceLabel: 'Compare dumpster and crew-loaded options',
  },

  'reuse-donation-center-dakota-county': {
    priority: 75,
    category: 'Reuse and donation',
    shortTitle: 'Reuse and donation options',
    title: 'Reuse and Donation Options in Dakota County Before You Throw It Away',
    metaTitle: 'Reuse Center Near Eagan MN | Donation, Repair and Pickup Options',
    metaDescription: 'Find reuse, donation and repair options in Dakota County before disposing of furniture, household goods, tools and building materials.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'The best disposal outcome is often avoiding disposal entirely. Clean furniture, household goods, tools, building materials and repairable items may qualify for donation, resale, repair or community reuse. Acceptance changes by organization, so condition and advance confirmation matter.',
    sections: [
      {
        h2: 'Use Dakota County’s reuse resources first',
        body: [
          'Dakota County’s “Get Rid of Stuff” guidance encourages residents to use the Reuse Map, donation options and community reuse events before choosing a landfill. The county also holds Fix-It Clinics where volunteers help troubleshoot and repair eligible household items.',
          'The Recycling Zone’s Reuse Zone offers free usable products that residents have dropped off, including paints, stains, cleaners and lawn chemicals. It is not a furniture thrift store, and inventory changes daily.',
        ],
      },
      {
        h2: 'Donation depends on condition and demand',
        body: [
          'Donation organizations generally require items to be clean, safe, complete and practical to resell or redistribute. Stains, odors, structural damage, missing parts, pests and excessive size can lead to refusal.',
          'Call ahead with an accurate description. Leaving rejected items outside a donation center transfers your disposal problem to the organization and can be treated as dumping.',
        ],
      },
      {
        h2: 'Donation-first pickup for larger cleanouts',
        body: [
          'When a property contains a mix of reusable and disposable items, separate likely donation candidates and photograph everything. Dakota Valley can route usable goods when practical while hauling broken or rejected material through an appropriate disposal path.',
          'Donation acceptance cannot be guaranteed from a photo alone. Remove valuable, sentimental and essential items before the crew arrives and keep tax-document expectations clear in advance.',
        ],
      },
    ],
    faqs: [
      { q: 'Is there a reuse center in Eagan?', a: 'The Dakota County Recycling Zone includes a Reuse Zone for usable household products such as paint and cleaners. It is not a general furniture donation center.' },
      { q: 'Where can I donate furniture in Dakota County?', a: 'Use Dakota County’s reuse resources and contact local donation organizations directly. Confirm item condition, size and pickup availability before making plans.' },
      { q: 'Can broken items go to a Fix-It Clinic?', a: 'Many household items can be evaluated, but oversized items, fuel-containing equipment and certain repairs are excluded. Check the current clinic rules and schedule.' },
      { q: 'Does Dakota Valley guarantee donation?', a: 'No. Donation depends on condition and partner acceptance. Dakota Valley uses a donation-first approach when practical but provides removal even when an item is not accepted for reuse.' },
    ],
    sources: [
      { label: 'Dakota County Get Rid of Stuff', url: getRidOfStuffUrl },
      { label: 'Dakota County Fix-It Clinics', url: fixItUrl },
      { label: 'Dakota County Recycling Zone and Reuse Zone', url: recyclingZoneUrl },
    ],
    serviceLink: '/services/furniture-removal/',
    serviceLabel: 'Request donation-first pickup',
  },

  'south-metro-recycling-centers-apple-valley-lakeville-rosemount': {
    priority: 74,
    category: 'South metro drop-off',
    shortTitle: 'South metro recycling centers',
    title: 'Recycling and Disposal Options Near Apple Valley, Lakeville and Rosemount',
    metaTitle: 'Recycling Centers Apple Valley, Lakeville & Rosemount | 2026 Guide',
    metaDescription: 'Compare current recycling and disposal options near Apple Valley, Lakeville and Rosemount, including Eagan’s Recycling Zone and the future Lakeville Recycling Zone Plus.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: 'South-metro searches for a “recycling center” often return facilities with very different purposes. Some accept paper and cardboard, some handle household hazardous waste, some are transfer stations and some are private recyclers. Verify the exact item rather than choosing a site only because it is nearby.',
    sections: [
      {
        h2: 'Apple Valley and Eagan residents: start with the item',
        body: [
          'Dakota County’s main household hazardous-waste, electronics and recycling facility is the Recycling Zone at 3365 Dodd Road in Eagan. It accepts defined categories and is not a general dump for bulky household material.',
          'Apple Valley residents can use the county Recycling Guide to locate current outlets for appliances, furniture, mattresses, carpet, yard waste and other items. The closest correct facility may be in Eagan, Lakeville, Rosemount, Burnsville or Inver Grove Heights depending on the material.',
        ],
      },
      {
        h2: 'Lakeville Recycling Zone Plus is not open yet',
        body: [
          'Dakota and Scott counties are building Recycling Zone Plus in Lakeville. As of July 24, 2026, Dakota County anticipates opening the facility in spring 2027. The existing Eagan Recycling Zone remains open and will stay open after the Lakeville facility begins operating.',
          'Do not drive to the construction site expecting public drop-off. Check Dakota County’s official project page for the current opening timeline and accepted-material plans.',
        ],
      },
      {
        h2: 'Rosemount and Burnsville have different disposal roles',
        body: [
          'Dakota County’s current large-item guide lists transfer stations and landfills in Rosemount, Burnsville and Inver Grove Heights. The county’s yard-waste page separately lists compost and mulch facilities in Rosemount and Burnsville. Each site has different materials, fees and hours.',
          'For a mixed household load, pickup can avoid multiple trips. Dakota Valley can quote bulky non-hazardous items from Apple Valley, Lakeville, Rosemount, Burnsville and surrounding communities.',
        ],
      },
    ],
    faqs: [
      { q: 'Is there a county recycling center in Apple Valley?', a: 'Dakota County’s main Recycling Zone is in Eagan. Use the county Recycling Guide to find the correct facility for a specific Apple Valley item.' },
      { q: 'Is the new Lakeville Recycling Zone open?', a: 'No. As of July 24, 2026, Dakota County anticipates the Recycling Zone Plus opening in spring 2027.' },
      { q: 'Is a Rosemount transfer station the same as a recycling center?', a: 'No. Transfer stations, landfills, scrap recyclers, yard-waste sites and household hazardous-waste centers accept different materials.' },
      { q: 'Can Dakota Valley pick up items from these cities?', a: 'Yes. Dakota Valley serves Apple Valley, Lakeville, Rosemount, Burnsville and surrounding Minnesota communities for approved non-hazardous pickups.' },
    ],
    sources: [
      { label: 'Dakota County Recycling Zone Locations', url: recyclingLocationsUrl },
      { label: 'Dakota County Recycling Zone Plus', url: recyclingZonePlusUrl },
      { label: 'Dakota County Get Rid of Stuff', url: getRidOfStuffUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/junk-pickup/',
    serviceLabel: 'Request south-metro pickup',
  },

  'compost-food-scraps-drop-off-dakota-county': {
    priority: 73,
    category: 'Compost and food scraps',
    shortTitle: 'Compost and food-scraps drop-off',
    title: 'Compost and Food-Scraps Drop-Off in Dakota County',
    metaTitle: 'Compost Site Near Me Dakota County | Food Scraps & Yard Waste Guide',
    metaDescription: 'Understand the difference between Dakota County food-scraps drop-offs, yard-waste compost sites and junk pickup for branches, brush and outdoor cleanup debris.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    intro: '“Compost site near me” can mean two different programs: food-scraps collection for kitchen organics or yard-waste sites for leaves, grass, branches and soil. These streams should not be mixed. Dakota County offers free residential food-scraps drop-offs and separately lists yard-waste facilities with their own rules and fees.',
    sections: [
      {
        h2: 'Food-scraps drop-offs are for kitchen organics',
        body: [
          'Dakota County’s residential program accepts food scraps such as produce, meat, bones, dairy, coffee grounds and eggshells, plus certain BPI-certified compostable products. Residents sign up and use approved compostable bags.',
          'The county lists sites in Apple Valley, Burnsville, Eagan, Lakeville, Rosemount and other communities. Most are open daily during published hours, but confirm the current location and access instructions before visiting.',
        ],
      },
      {
        h2: 'Yard waste goes to a different facility',
        body: [
          'Grass, leaves, brush, branches, trees, sod and soil are not accepted at food-scraps bins. Dakota County lists separate seasonal and year-round yard-waste sites in Eagan, Inver Grove Heights, Burnsville, Rosemount, Northfield and Hastings.',
          'Use paper bags, reusable containers or BPI-certified yard-waste bags according to the site’s rules. Ordinary plastic bags contaminate compost and are not allowed for yard waste.',
        ],
      },
      {
        h2: 'Pickup for large outdoor cleanup piles',
        body: [
          'Dakota Valley can quote branch piles, storm debris, old fencing, deck lumber and mixed outdoor cleanouts. Food scraps, loose household garbage and hazardous chemicals are not part of a normal yard-debris pickup.',
          'Keep clean compostable yard material separate from treated lumber, metal, concrete and trash. Send wide photos and identify each material so the correct route can be planned.',
        ],
      },
    ],
    faqs: [
      { q: 'Where can I drop off food scraps in Apple Valley?', a: 'Dakota County lists the Apple Valley Central Maintenance Facility among its residential food-scraps sites. Sign up and follow the current bag rules.' },
      { q: 'Can branches go in a food-scraps drop-off?', a: 'No. Branches and other yard waste use separate compost or yard-waste facilities.' },
      { q: 'Are Dakota County food-scraps sites free?', a: 'Dakota County describes the residential food-scraps program as free, with registration and approved compostable-bag requirements.' },
      { q: 'Can Dakota Valley remove a large brush pile?', a: 'Yes, depending on material and access. Photograph the pile and identify soil, concrete, treated wood, fencing or trash mixed into it.' },
    ],
    sources: [
      { label: 'Dakota County Food Scraps Drop-Off', url: foodScrapsUrl },
      { label: 'Dakota County Recycling Guide', url: recyclingGuideUrl },
    ],
    serviceLink: '/services/yard-debris/',
    serviceLabel: 'Request large yard-debris pickup',
  },
};
