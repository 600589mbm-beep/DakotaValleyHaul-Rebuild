import { PRICE_FLOOR_DETAIL, NO_INSIDE_PICKUP, PICKUP_REQUIREMENTS, QUOTE_POLICY, SCHEDULING_POLICY, SPECIALTY_POLICY, UNATTENDED_POLICY } from './servicePolicy.js';
import { isSpecialtyService, SERVICE_SEO_NAMES } from './services.js';
// Per-(city, service) unique content for the 1,098 combo pages.
//
// Local names and service details come from the shared data. Seeded FAQ
// ordering is for presentation only; it is not evidence of a local route,
// completed job or distinctive service availability. Service promises must
// agree with servicePolicy.js and services.js.

import { cities } from './cities.js';

// --- seeded selection -------------------------------------------------

export function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(seed, arr, salt = 0) {
  return arr[(seed + salt * 0x9e3779b1) % arr.length >>> 0 % arr.length];
}

function at(seed, salt, arr) {
  const idx = ((seed ^ Math.imul(salt + 1, 0x9e3779b1)) >>> 0) % arr.length;
  return arr[idx];
}

// Deterministic sample of n distinct items.
function sample(seed, arr, n, salt = 0) {
  const out = [];
  const pool = arr.slice();
  let s = (seed ^ Math.imul(salt + 1, 0x85ebca6b)) >>> 0;
  while (out.length < n && pool.length) {
    s = Math.imul(s ^ (s >>> 15), 0x2c1b3c6d) >>> 0;
    out.push(pool.splice(s % pool.length, 1)[0]);
  }
  return out;
}

// --- per-service angles (facts mined from services.js / pricing.js) ---

export const serviceAngles = {
  'junk-pickup': {
    items: ['old sofas', 'boxed-up garage clutter', 'move-out piles', 'multi-item bundles', 'office and warehouse small loads'],
    scenarios: ['a move-out or apartment turnover', 'a garage that finally needs clearing', 'a multi-item bundle staged at the curb'],
    disposal: 'Reusable items are donated through Savers; metal goes to certified recyclers; the rest goes to licensed disposal facilities.',
    faqs: [
      (c) => ({
        q: `What is the minimum charge for junk pickup in ${c.name}?`,
        a: PRICE_FLOOR_DETAIL,
      }),
      (c) => ({
        q: `Can you pick up junk from my curb in ${c.name} without an appointment visit?`,
        a: `Yes — there is no on-site estimate step. Text photos of the items with your ${c.name} address, get a firm quote back, and book a confirmed pickup window. Stage items curbside or in the garage and the crew handles the rest.`,
      }),
    ],
  },
  'furniture-removal': {
    items: ['sofas and sectionals', 'mattresses and box springs', 'dressers and wardrobes', 'dining tables and chairs', 'office desks and filing cabinets'],
    scenarios: ['a living room refresh', 'a move-out with furniture left behind', 'an office downsizing'],
    disposal: 'Usable furniture is donated through Savers; mattresses and box springs are routed to certified recycling; the rest goes to licensed disposal.',
    faqs: [
      (c) => ({
        q: `Do you donate furniture picked up in ${c.name}?`,
        a: `When it is in usable condition, yes — donatable furniture from ${c.name} pickups is routed through Savers rather than the landfill. Tell the crew which pieces are donation candidates when you text photos.`,
      }),
      (c) => ({
        q: `Can you break down bed frames and large furniture in ${c.name}?`,
        a: `Send photos of each piece and any disassembly needed before moving it. Furniture must be safely staged at the curb, in the driveway or in an accessible garage. Arrange suitable help for disassembly and staging; the crew does not carry furniture out of rooms. The accepted items and work are confirmed in your written quote.`,
      }),
    ],
  },
  'appliance-recycling': {
    items: ['refrigerators and freezers', 'washers and dryers', 'stoves and ovens', 'dishwashers', 'AC units and dehumidifiers'],
    scenarios: ['a kitchen remodel', 'a dead appliance swap', 'a rental turnover with old units'],
    disposal: 'Refrigerant is recovered EPA-certified from fridges, freezers, and AC units; appliance metals are routed to certified Minnesota recyclers.',
    faqs: [
      (c) => ({
        q: `How much does refrigerator removal cost in ${c.name}?`,
        a: PRICE_FLOOR_DETAIL,
      }),
      (c) => ({
        q: `Do you take appliances with freon from ${c.name} homes?`,
        a: `Send photos of refrigerators, freezers, AC units or dehumidifiers for acceptance and a written quote. Appliances must be safely disconnected by a qualified person and staged before pickup. Do not cut refrigerant lines; refrigerant handling is part of the recycling process.`,
      }),
    ],
  },
  'garage-cleanout': {
    items: ['boxes and clutter', 'old furniture stored in the garage', 'sports equipment', 'holiday decorations', 'shop tools and hardware'],
    scenarios: ['a half-garage downsize', 'a full clear-out before a move', 'a seasonal purge'],
    disposal: 'Donatable goods are routed through Savers; metal and electronics go to certified recyclers; the rest to licensed disposal.',
    faqs: [
      (c) => ({
        q: `What does a garage cleanout cost in ${c.name}?`,
        a: PRICE_FLOOR_DETAIL,
      }),
      (c) => ({
        q: `Do I need to sort my garage before the crew arrives in ${c.name}?`,
        a: `Yes. Select the items to remove, separate anything you are keeping and send photos of the complete load. Approved items need a clear loading path from an accessible garage, driveway or curb. The crew loads the agreed items; it does not sort your belongings or handle hazardous materials.`,
      }),
    ],
  },
  'yard-debris': {
    items: ['brush and branch piles', 'storm debris', 'old fencing and posts', 'deck debris and lumber', 'sod and garden waste'],
    scenarios: ['a storm cleanup', 'a fence or deck tear-out pile', 'a yard renovation'],
    disposal: 'Compostable material is routed to certified compost facilities; lumber and fencing go to licensed disposal or recycling.',
    faqs: [
      (c) => ({
        q: `Do you haul branches and brush piles in ${c.name}?`,
        a: `Yes, send photos of your brush or branch pile, any mixed materials and the loading access. Acceptance and price depend on the material, volume and weight. Stage approved debris curbside, in the driveway or in an accessible garage before the confirmed pickup window.`,
      }),
      (c) => ({
        q: `Where does yard waste from ${c.name} go?`,
        a: `Compostable material is routed to certified compost facilities rather than the landfill. Mixed piles are sorted so lumber, fencing, and metal each go to the right facility.`,
      }),
    ],
  },
  'dumpster-rental': {
    items: ['remodel debris', 'demo material', 'multi-day cleanout loads'],
    scenarios: ['a DIY remodel', 'a multi-day cleanout where you load at your own pace', 'a demo project'],
    disposal: 'Material is sorted at the transfer facility after pickup, so recyclables and compostables are recovered.',
    faqs: [
      (c) => ({
        q: `How does a dumpster drop in ${c.name} compare to full-service pickup?`,
        a: `With an approved rental, you load the container during the agreed rental period. With crew-loaded pickup, you safely stage the approved items at the curb, in the driveway or in an accessible garage and the crew loads them. Rental availability, container size, allowed materials, weight limits, dates and price are confirmed separately in writing.`,
      }),
      (c) => ({
        q: `How do I arrange a dumpster or trailer drop in ${c.name}?`,
        a: `Send your ${c.name} address, access photos, materials, estimated load and preferred dates to (952) 232-5107. The crew checks whether a rental is available and sends the terms and total in writing. Approve them before confirming delivery and collection. Sending a request does not reserve a container.`,
      }),
    ],
  },
  'mattress-removal': {
    items: ['queen and king mattresses', 'box springs', 'pillow-top and memory-foam mattresses', 'crib mattresses'],
    scenarios: ['a mattress upgrade', 'a move-out with beds left behind', 'a rental turnover'],
    disposal: 'Mattresses are recycled at certified Minnesota facilities where up to 80% of components — steel coils, foam, fiber, fabric — are recovered.',
    faqs: [
      (c) => ({
        q: `How much does mattress removal cost in ${c.name}?`,
        a: PRICE_FLOOR_DETAIL,
      }),
      (c) => ({
        q: `Are mattresses from ${c.name} actually recycled?`,
        a: `Yes — mattresses go to certified Minnesota recycling facilities where up to 80% of the materials (steel coils, foam, fiber, fabric) are recovered instead of landfilled. There are no hidden disposal fees on top of the pickup price.`,
      }),
    ],
  },
  'hot-tub-removal': {
    items: ['free-standing hot tubs', 'sunken and below-grade tubs', 'covers and spa equipment', 'inflatable hot tubs'],
    scenarios: ['a dead spa taking up the deck', 'a backyard remodel', 'a home sale that needs the tub gone'],
    disposal: 'Tub shells, frames, and spa equipment are broken down and hauled; metal components are routed to certified recyclers.',
    faqs: [
      (c) => ({
        q: `How much does hot tub removal cost in ${c.name}?`,
        a: `Hot tub removal in ${c.name} is quoted from photos — the price depends on the tub's size, location, and the access path from the deck to the street. Text photos of the tub, the deck, and the route for a firm quote.`,
      }),
      (c) => ({
        q: `Can you remove a sunken or deck-mounted hot tub in ${c.name}?`,
        a: `Send photos of the tub, installation and full access path. Sunken, deck-mounted and below-grade projects need individual review. Acceptance, preparation, disassembly and hauling are included only when confirmed in the written scope and price. No indoor spa removal is offered.`,
      }),
    ],
  },
  'scrap-metal-removal': {
    items: ['old appliances', 'exercise equipment', 'fencing and gutters', 'swing sets', 'filing cabinets'],
    scenarios: ['a pile of metal left from a project', 'a swing set the kids outgrew', 'an appliance graveyard in the garage'],
    disposal: 'Everything metal is routed to certified Minnesota metal recyclers, not the landfill.',
    faqs: [
      (c) => ({
        q: `What scrap metal do you pick up in ${c.name}?`,
        a: `Appliances, exercise equipment, fencing, gutters, swing sets, filing cabinets, and bulk piles of aluminum, copper, or steel — all standard ${c.name} pickups, all routed to certified Minnesota metal recyclers.`,
      }),
      (c) => ({
        q: `Is there a minimum for scrap metal pickup in ${c.name}?`,
        a: PRICE_FLOOR_DETAIL,
      }),
    ],
  },
  'electronics-removal': {
    items: ['CRT and flat-panel TVs', 'computer towers and laptops', 'printers', 'gaming consoles', 'audio equipment'],
    scenarios: ['a closet of dead electronics', 'an office refresh', 'an old CRT TV nobody will take'],
    disposal: 'Electronics are routed to R2-certified e-waste recyclers; hard drives are wiped or physically destroyed on request.',
    faqs: [
      (c) => ({
        q: `Do you take old CRT TVs from ${c.name}?`,
        a: `Yes — CRTs are one of the most common ${c.name} electronics pickups, since most donation centers refuse them. They go to R2-certified e-waste recyclers along with flat panels, computers, and printers.`,
      }),
      (c) => ({
        q: `What happens to hard drives in computers you haul from ${c.name}?`,
        a: `On request, drives are wiped or physically destroyed before the equipment enters the R2-certified recycling chain. Mention it when you text photos and the crew will flag the machines.`,
      }),
    ],
  },
  'hoarder-cleanout': {
    items: ['pre-staged household furniture', 'approved boxes and storage items', 'separately staged donation candidates'],
    scenarios: ['a family member who needs discreet help', 'a property that has to be cleared for sale', 'a multi-day project'],
    disposal: 'Separate donation candidates from disposal items before pickup and show both in your photos. Acceptance depends on condition and disposal requirements; no room sorting or hazardous cleanup is offered.',
    faqs: [
      (c) => ({
        q: `Is hoarder cleanout in ${c.name} handled discreetly?`,
        a: `Yes. Send photos of the approved nonhazardous items and loading access for a written quote. We can coordinate with a family member or property manager. All items must be safely staged at the curb, in the driveway or in an accessible garage; no inside-home cleanout or hazardous cleanup is offered.`,
      }),
      (c) => ({
        q: `Do you sort what is worth keeping during a ${c.name} hoarder cleanout?`,
        a: `No. You or your chosen helpers must decide what to keep, separate donation candidates and safely stage the approved pickup items. The crew loads only the items in your written quote and does not sort rooms, enter living areas or handle hazardous materials.`,
      }),
    ],
  },
  'estate-cleanout': {
    items: ['pre-selected furniture staged for pickup', 'approved boxes and household items', 'separately staged donation candidates'],
    scenarios: ['settling a family estate', 'downsizing a parent into senior living', 'getting a property show-ready for sale'],
    disposal: 'Separate donation candidates from disposal items before staging and identify them in your photos. Usable items are considered for donation where accepted; indoor sorting and property cleaning are not included.',
    faqs: [
      (c) => ({
        q: `How does an estate cleanout work in ${c.name}?`,
        a: `Choose the furniture and household items to remove, arrange safe staging at the curb, in the driveway or in an accessible garage, and send photos for a written quote. Approve the price before confirming an available pickup window. The crew does not enter rooms or decide which belongings to keep.`,
      }),
      (c) => ({
        q: `Can you work around family members sorting belongings in ${c.name}?`,
        a: `Yes, we can coordinate the pickup with a family member after sorting is complete. Your family chooses what leaves and safely stages those items before the confirmed window. No room-by-room sorting, inside-home carry-out or property cleaning is included.`,
      }),
    ],
  },
  'attic-cleanout': {
    items: ['decades of stored boxes', 'old furniture from the attic', 'holiday decoration bundles', 'trunks and chests'],
    scenarios: ['decades of storage that has to come down', 'prepping an attic for insulation work', 'a move where the attic got forgotten'],
    disposal: 'Donatable finds are routed through Savers; loose insulation debris (not asbestos) is bagged and disposed of at licensed facilities.',
    faqs: [
      (c) => ({
        q: `Does the crew carry everything down from the attic in ${c.name}?`,
        a: "No. Dakota Valley does not provide inside-home pickup or carry items through living areas, basements or attics. Items must be safely staged at the curb, in the driveway or in an accessible garage before pickup. Arrange suitable help with staging rather than moving heavy items unsafely.",
      }),
      (c) => ({
        q: `Can you remove old insulation debris from a ${c.name} attic?`,
        a: "Send photos of nonhazardous insulation debris that is already safely bagged and staged curbside, in the driveway or in an accessible garage for review. No attic entry, asbestos or hazardous-material removal is offered.",
      }),
    ],
  },
  'basement-cleanout': {
    items: ['old basement furniture', 'exercise equipment', 'storage bins', 'water-damaged debris', 'shelving'],
    scenarios: ['a flooded-basement cleanup', 'clearing a basement before finishing it', 'decades of storage downstairs'],
    disposal: 'Usable goods are donated through Savers; water-damaged material goes to licensed disposal; metal shelving and equipment are recycled.',
    faqs: [
      (c) => ({
        q: `Do you carry items up basement stairs in ${c.name}?`,
        a: "No. Dakota Valley does not provide inside-home pickup or carry items through living areas, basements or attics. Items must be safely staged at the curb, in the driveway or in an accessible garage before pickup. Arrange suitable help with staging rather than moving heavy items unsafely.",
      }),
      (c) => ({
        q: `Can you haul water-damaged items from a ${c.name} basement?`,
        a: "Send photos and describe any contamination before booking. Approved nonhazardous items must already be safely staged at the curb, in the driveway or in an accessible garage. No basement carry-out or hazardous-material pickup is offered.",
      }),
    ],
  },
  'fence-removal': {
    items: ['wood fencing', 'chain-link fencing', 'vinyl and PVC panels', 'wrought iron sections'],
    scenarios: ['a leaning fence past saving', 'a yard opening up before landscaping', 'a fence replacement where the old one has to go first'],
    disposal: 'Metal fencing goes to certified recyclers; wood and vinyl go to licensed disposal; the yard is left clean and fillable.',
    faqs: [
      (c) => ({
        q: `Do you tear out the fence or just haul it in ${c.name}?`,
        a: `You can request outdoor dismantling and hauling or pickup of fence debris that is already staged. Send photos of the fence line, posts, footings and access. The crew confirms acceptance and exactly which work is included in your written project quote before you confirm an appointment.`,
      }),
      (c) => ({
        q: `What happens to the post holes after fence removal in ${c.name}?`,
        a: `Describe any footing removal, post holes or cleanup you need and include photos. Those details must be accepted in the written project scope. Do not assume footing breakup, backfilling or landscaping is included in a hauling quote.`,
      }),
    ],
  },
  'shed-removal': {
    items: ['wood sheds', 'metal sheds', 'plastic and resin sheds', 'shed contents'],
    scenarios: ['a collapsing shed that has to go', 'clearing a corner for a new build', 'a property sale that needs the eyesore gone'],
    disposal: 'Shed metal is recycled; wood and resin debris go to licensed disposal; the slab or site is swept clean.',
    faqs: [
      (c) => ({
        q: `Do you demolish the shed or does it need to be taken down first in ${c.name}?`,
        a: `Outdoor shed dismantling can be requested, subject to review of the structure, materials, condition and access. Send photos before taking anything apart. The written quote confirms any accepted dismantling, hauling, cleanup or foundation work; no work is included until you approve that scope.`,
      }),
      (c) => ({
        q: `Can the shed still be full when you remove it in ${c.name}?`,
        a: `Show the contents as well as the structure in your photos and identify everything to keep. The crew must review and approve any contents removal in writing with the shed project. Hazardous materials are not accepted, and hidden contents or a changed scope need a revised quote you approve before work begins.`,
      }),
    ],
  },
  'single-item-pickup': {
    items: ['a single sofa', 'a refrigerator', 'a mattress and box spring', 'a treadmill', 'a single appliance'],
    scenarios: ['one big item the trash service will not take', 'a delivery swap where the old unit stays behind', 'a single piece left after a move'],
    disposal: 'Usable single items are donated through Savers; appliances get refrigerant recovery and metal recycling.',
    faqs: [
      (c) => ({
        q: `What does single-item pickup cost in ${c.name}?`,
        a: PRICE_FLOOR_DETAIL,
      }),
      (c) => ({
        q: `Is it worth booking a pickup for just one item in ${c.name}?`,
        a: PRICE_FLOOR_DETAIL,
      }),
    ],
  },
  'demolition': {
    items: ['decks', 'sheds', 'fences', "pre-staged bathroom renovation debris", 'kitchen cabinets and counters'],
    scenarios: ['a deck past its lifespan', "a pre-staged bathroom renovation pile", "a pre-staged kitchen renovation pile"],
    disposal: 'Demo debris is hauled the same visit; metal is recycled and the rest goes to licensed disposal facilities.',
    faqs: [
      (c) => ({
        q: `What kind of demolition do you handle in ${c.name}?`,
        a: `Light demolition: decks, sheds, fences, hot tubs, pre-staged renovation debris; no interior demolition. Each ${c.name} job is quoted individually from photos of the structure and access.`,
      }),
      (c) => ({
        q: `Is hauling included in demolition jobs in ${c.name}?`,
        a: `The written project quote states which dismantling, loading, hauling, disposal and cleanup are included. Send photos of the full outdoor project and access so those details can be agreed in advance. Approve the price and scope before confirming an available appointment.`,
      }),
    ],
  },
};

// --- nearest cities (geo-based internal linking) -----------------------

const citySlugList = Object.keys(cities);

export function nearestCities(citySlug, n = 12) {
  const base = cities[citySlug]?.geo;
  if (!base) return citySlugList.filter((s) => s !== citySlug).slice(0, n);
  return citySlugList
    .filter((s) => s !== citySlug && cities[s].geo)
    .map((s) => {
      const g = cities[s].geo;
      const dLat = g.latitude - base.latitude;
      // ~cos(45°) longitude correction for Minnesota latitudes
      const dLon = (g.longitude - base.longitude) * 0.707;
      return [s, dLat * dLat + dLon * dLon];
    })
    .sort((a, b) => a[1] - b[1])
    .slice(0, n)
    .map(([s]) => s);
}

// --- unique intro paragraph --------------------------------------------

export function comboIntro(city, service, citySlug, serviceSlug) {
  const seed = hashSeed(`${citySlug}/${serviceSlug}`);
  const angle = serviceAngles[serviceSlug];
  const svc = service.name.toLowerCase();
  const items = sample(seed, angle.items, 3, 3).join(', ');

  if (serviceSlug === 'dumpster-rental') {
    return `Request a dumpster or trailer rental in ${city.name}, ${city.county}, for DIY loading. Send your address, access photos, material list and preferred dates. Container availability, allowed materials, load limits, rental period and collection terms need written confirmation. Approve the price and terms before confirming delivery; a quote request does not reserve a container.`;
  }
  if (isSpecialtyService(serviceSlug)) {
    return `Request ${svc} in ${city.name}, ${city.county}. Send photos of the full outdoor project, loading access and any debris you want removed. The crew reviews acceptance and provides a written scope and price. Approve those details before confirming an available appointment. ${SPECIALTY_POLICY} No interior demolition or inside-home carry-out is offered.`;
  }
  if (citySlug === 'eagan' && serviceSlug === 'mattress-removal') {
    return `Need mattress disposal in Eagan? Dakota Valley offers paid pickup of pre-staged mattresses, box springs and disassembled bed-frame pieces. Send photos showing size, quantity, condition and access with your Eagan address. ${PRICE_FLOOR_DETAIL} Approve the written price before confirming an available pickup window. Items must be safely staged at the curb, in the driveway or in an accessible garage; there is no bedroom or stair carry-out.`;
  }
  return `Request paid ${svc} in ${city.name}, ${city.county}. Send photos of items such as ${items}, plus your pickup address and access, so the crew can confirm acceptance and the full written price. ${PRICE_FLOOR_DETAIL} Approve the price before confirming an available pickup window. All approved items must be safely staged at the curb, in the driveway or in an accessible garage; no inside-home pickup is offered.`;
}

// --- local notes paragraph ----------------------------------------------

export function comboLocalNotes(city, service, citySlug, serviceSlug) {
  const seed = hashSeed(`notes:${citySlug}/${serviceSlug}`);
  const svc = service.name.toLowerCase();
  const landmark = at(seed, 1, city.landmarks);
  const [na, nb] = sample(seed, city.neighborhoods, 2, 2);
  const variants = [
    SCHEDULING_POLICY,
    SCHEDULING_POLICY,
    SCHEDULING_POLICY,
  ];
  return at(seed, 3, variants);
}

// --- per-combo FAQ set (content + FAQPage JSON-LD) -----------------------

export function comboFaqs(city, service, citySlug, serviceSlug) {
  return buildFaqs(city, service.name.toLowerCase(), hashSeed(`faq:${citySlug}/${serviceSlug}`), serviceSlug);
}

// City pages get their own seeded FAQ set (different seed prefix, generic
// "junk removal" wording) so they never duplicate a combo page's FAQs.
export function cityFaqs(city, citySlug) {
  return buildFaqs(city, 'junk removal', hashSeed(`cityfaq:${citySlug}`), null);
}

function buildFaqs(city, svc, seed, serviceSlug) {
  const hoods = sample(seed, city.neighborhoods, Math.min(4, city.neighborhoods.length), 9).join(', ');
  const specialty = isSpecialtyService(serviceSlug);

  const generic = [
    {
      q: at(seed, 10, [
        `How much does ${svc} cost in ${city.name}, MN?`,
        `What does ${svc} cost in ${city.name}?`,
      ]),
      a: specialty ? SPECIALTY_POLICY : PRICE_FLOOR_DETAIL,
    },
    {
      q: at(seed, 11, [
        `Is same-day ${svc} available in ${city.name}?`,
        `How fast can you get to ${city.name} for ${svc}?`,
      ]),
      a: SCHEDULING_POLICY,
    },
    {
      q: `What parts of ${city.name} do you serve for ${svc}?`,
      a: `Send your pickup address in ${city.name}, including areas such as ${hoods}, or the surrounding ${city.county} area. The crew confirms service and route availability before you agree to an appointment. A listed location does not guarantee an available window.`,
    },
    {
      q: at(seed, 12, [
        `Do I need to be home for ${svc} in ${city.name}?`,
        `Do I need to be home for ${svc} in ${city.name}?`,
      ]),
      a: specialty ? 'The crew confirms access and whether someone needs to be present in the written project or rental agreement. Do not assume unattended access is possible before those details are agreed.' : UNATTENDED_POLICY,
    },
    {
      q: `How do I get a quote for ${svc} in ${city.name}?`,
      a: `Text photos of the items or outdoor project and loading access to (952) 232-5107 with your ${city.name} address. The crew reviews acceptance and sends a written quote. Approve the price and scope before confirming an available pickup, project or rental window. Sending a request does not reserve an appointment.`,
    },
  ];

  const specific = serviceSlug ? (serviceAngles[serviceSlug]?.faqs || []).map((fn) => fn(city)) : [];
  // 4 seeded picks from the generic pool + both service-specific QAs = 6 unique FAQs
  // (city pages: all 5 generic QAs in seeded order)
  return [...sample(seed, generic, specific.length ? 4 : 5, 13), ...specific];
}

export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// --- seeded title / meta description --------------------------------------

export function comboMeta(city, service, citySlug, serviceSlug) {
  const label = SERVICE_SEO_NAMES[serviceSlug] || service.name;
  const title = `${label} ${city.name}, MN | Dakota Valley`;
  let description = `Paid ${label.toLowerCase()} in ${city.name}, MN. Curbside or garage staging. Get a written photo quote before confirming pickup.`;
  if (serviceSlug === 'dumpster-rental') {
    description = `Request dumpster rental in ${city.name}, MN for DIY loading. Availability, load limits, dates and price confirmed in writing before rental confirmation.`;
  } else if (isSpecialtyService(serviceSlug)) {
    description = `Request ${label.toLowerCase()} in ${city.name}, MN. Send project and access photos; approve the written scope and price before confirming a time.`;
  } else if (citySlug === 'eagan' && serviceSlug === 'mattress-removal') {
    description = 'Mattress disposal in Eagan, MN. Paid pickup of staged mattresses and box springs. Get a written photo quote and approve the price before confirming pickup.';
  }
  return { title, description };
}

// --- quote pages (/quote/[city]) -----------------------------------------
// Quote intent is distinct from the service information on city pages.

export function quoteContent(city, citySlug) {
  const seed = hashSeed(`quote:${citySlug}`);
  const [n1, n2, n3] = sample(seed, city.neighborhoods, 3, 1);
  const titles = [
    `${city.name} Junk Removal Quote | Dakota Valley`,
  ];
  const descriptions = [
    `Get a written junk removal quote in ${city.name}, MN. Send photos and access details for paid staged pickup. Approve the price before confirming a time.`,
  ];
  const heroCopies = [
    `Send photos of everything you want collected, your ${city.name} address and the loading access. The crew reviews item acceptance and replies with a written total. Eligible curbside, driveway and accessible-garage pickups have an $85 minimum, not a flat price for every load. Approve the quote before confirming an available pickup window. Your request does not reserve an appointment.`,
  ];
  const routeCopies = [
    `For requests in ${city.name}, including ${n1}, ${n2} and ${n3}, share your exact address rather than relying on the city name alone. Route availability depends on your address, job size and current capacity in ${city.county}. The crew confirms an available window after you approve the written quote; a listed city does not guarantee a daily route or same-day pickup.`,
  ];

  const disposalCopies = [
    `Usable items from ${city.name} are donated through Bridging, Arc's Value Village, and Savers. Metal, electronics, and mattresses are recycled via ${city.county} and certified Minnesota programs.`,
    `What leaves ${city.name} doesn't head straight to a landfill: usable furniture and goods route to Bridging, Arc's Value Village, and Savers, while metal, electronics, and mattresses go to certified Minnesota recyclers.`,
    `Loads from ${n1} and the rest of ${city.name} get sorted, not dumped: donations to Savers, Bridging, and Arc's Value Village; metal, electronics, and mattresses to certified recycling.`,
  ];

  const faqPool = [
    {
      q: at(seed, 10, [
        `How fast do I get a junk removal quote in ${city.name}?`,
        `How long does a ${city.name} quote take?`,
      ]),
      a: 'The crew reviews your photos and replies by text with a written total. Response time depends on current jobs and the details needed to price your load. Send all items, access details and your address together to reduce follow-up questions. Your pickup window is confirmed separately after you approve the quote.',
    },
    {
      q: `What photos should I text for a ${city.name} quote?`,
      a: "Stage all approved items safely at the curb, in the driveway or in an accessible garage before the confirmed pickup window. The crew does not enter living areas or carry items out of basements, upstairs rooms or attics. Photograph the staged items and the clear path to legal truck parking. Appliances must be safely disconnected by a qualified person before staging; do not cut refrigerant lines.",
    },
    {
      q: at(seed, 11, [
        `Is the ${city.name} quote a firm price or an estimate?`,
        `Can the price change after I get a ${city.name} quote?`,
      ]),
      a: QUOTE_POLICY,
    },
    {
      q: `Do I have to call to book a pickup in ${city.name}?`,
      a: `No — the whole flow is text-first. Photos in, quote back, confirmed pickup window booked by text. If you prefer the form, the quote form reaches the same crew serving ${city.county}. You approve the written total before confirming an available pickup window.`,
    },
    {
      q: `What should I include with my ${city.name} quote request?`,
      a: "Stage all approved items safely at the curb, in the driveway or in an accessible garage before the confirmed pickup window. The crew does not enter living areas or carry items out of basements, upstairs rooms or attics. Photograph the staged items and the clear path to legal truck parking. Appliances must be safely disconnected by a qualified person before staging; do not cut refrigerant lines.",
    },
  ];

  return {
    title: at(seed, 5, titles),
    description: at(seed, 6, descriptions),
    heroCopy: at(seed, 7, heroCopies),
    routeCopy: at(seed, 8, routeCopies),
    disposalCopy: at(seed, 9, disposalCopies),
    faqs: sample(seed, faqPool, 3, 13),
  };
}

// --- county hub pages (/counties/[slug]) ----------------------------------

export function countyFaqs(county, slug) {
  const seed = hashSeed(`countyfaq:${slug}`);
  const cityNames = county.cities.slice(0, 5).join(', ');
  const pool = [
    {
      q: `How much does junk removal cost in ${county.name}?`,
      a: PRICE_FLOOR_DETAIL,
    },
    {
      q: `Which ${county.name} cities do you serve?`,
      a: `Send your pickup address in ${cityNames} or the surrounding ${county.name} communities. The crew checks service and route availability before confirming a pickup window. A listed city or county does not guarantee an available appointment.`,
    },
    {
      q: at(seed, 11, [
        `Is same-day junk removal available in ${county.name}?`,
        `How fast can you pick up in ${county.name}?`,
      ]),
      a: SCHEDULING_POLICY,
    },
    {
      q: `How do I book a pickup in ${county.name}?`,
      a: "Text photos of the items and loading access to (952) 232-5107 with your pickup address. The crew reviews acceptance and sends the full price in writing. Approve the price before confirming an available pickup window. A quote request does not reserve an appointment.",
    },
  ];
  return sample(seed, pool, 4, 13);
}
