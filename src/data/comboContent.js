// Per-(city, service) unique content for the 1,098 combo pages.
//
// Every paragraph, FAQ set, title, and description is deterministically
// seeded from the citySlug+serviceSlug pair, so each combo page renders
// structurally different copy instead of the city intro + service blocks
// being reshuffled. All factual claims (prices, disposal routing, hours,
// process) come from pricing.js / booking.js / services.js — do not add
// claims here that those files can't back up.

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
        a: `$85. A single small item — small sofa, kids mattress, mini fridge, small dresser — is $85 flat in ${c.name}. Bundling more items into the same pickup is the cheapest way to use the minimum.`,
      }),
      (c) => ({
        q: `Can you pick up junk from my curb in ${c.name} without an appointment visit?`,
        a: `Yes — there is no on-site estimate step. Text photos of the items with your ${c.name} address, get a firm quote back, and book a calendar window. Stage items curbside or in the garage and the crew handles the rest.`,
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
        a: `Yes. Bed frame and headboard breakdown is part of the service, and crews disassemble sectionals or wardrobes that will not move in one piece. It is included in the volume-based price, not billed separately.`,
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
        a: `A single refrigerator is from $100 in ${c.name} — a flat per-item rate including EPA-certified refrigerant recovery. Two or three appliances together fit a pickup-bed load ($85–$170), usually the better per-unit deal.`,
      }),
      (c) => ({
        q: `Do you take appliances with freon from ${c.name} homes?`,
        a: `Yes. Refrigerators, freezers, AC units, and dehumidifiers are accepted; refrigerant is recovered through an EPA-certified process before the metal is recycled. You do not need to drain or prep the unit.`,
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
        a: `A half-garage cleanout in ${c.name} is typically a van load ($255–$550); a full garage runs from a van load up to a full box-truck load (up to $750). Text a photo of the garage with the door open and you will get a firm number before booking.`,
      }),
      (c) => ({
        q: `Do I need to sort my garage before the crew arrives in ${c.name}?`,
        a: `No. Stage what you can or just point — the crew loads everything you flag. Empty paint cans are fine; full paint, chemicals, and other hazardous materials are the only things that cannot go on the truck.`,
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
        a: `Yes — brush, branches, storm debris, old fencing, and deck lumber are all standard ${c.name} pickups. A small yard-waste pile is a pickup-bed load ($85–$170); bigger renovation piles are quoted from photos.`,
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
        a: `A drop is best when you want to load over several days at your own pace; full-service is best when you want the crew to do the lifting. For most single-day ${c.name} jobs the crew-loaded option costs about the same once your labor is counted.`,
      }),
      (c) => ({
        q: `How do I arrange a dumpster or trailer drop in ${c.name}?`,
        a: `Text your project size and timeline to (952) 232-5107. Drops are by request — you get a driveway-friendly dumpster or trailer, a multi-day loading window, and pickup once you signal the load is complete.`,
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
        a: `A mattress is from $100 in ${c.name}, picked up curbside or from the garage — a flat per-item recycling rate with no load minimum. Multi-mattress bundles from move-outs are quoted from photos.`,
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
        a: `Yes. The crew handles disassembly, lifting, and hauling for free-standing, deck-mounted, and below-grade installations, including the cover, pump, and spa equipment. Saunas are quoted separately.`,
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
        a: `A single treadmill or filing cabinet is $85 — the single-item load rate. Bundling a metal pile with other junk in the same pickup is the most cost-effective way to clear it.`,
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
    items: ['full-property cleanouts', 'single-room cleanouts', 'mixed donation and disposal loads'],
    scenarios: ['a family member who needs discreet help', 'a property that has to be cleared for sale', 'a multi-day project'],
    disposal: 'The crew sorts donations versus trash on-site; donatable goods are routed through Savers and the rest to licensed disposal.',
    faqs: [
      (c) => ({
        q: `Is hoarder cleanout in ${c.name} handled discreetly?`,
        a: `Yes. Crews work judgment-free and at your pace, in unmarked staging where requested. Jobs in ${c.name} are quoted on-site rather than from photos, since volume is hard to judge remotely, and multi-day projects are normal.`,
      }),
      (c) => ({
        q: `Do you sort what is worth keeping during a ${c.name} hoarder cleanout?`,
        a: `The crew sorts donations versus trash on-site and coordinates with family or the landlord on anything that looks like it should stay. Biohazard situations are prepped around, with hazmat itself deferred to licensed specialists.`,
      }),
    ],
  },
  'estate-cleanout': {
    items: ['full-house estate loads', 'selective room cleanouts', 'donation runs with tax receipts'],
    scenarios: ['settling a family estate', 'downsizing a parent into senior living', 'getting a property show-ready for sale'],
    disposal: 'Donation-first: usable items are routed to Bridging, Arc, or Savers with tax receipts available; the property is left show-ready.',
    faqs: [
      (c) => ({
        q: `How does an estate cleanout work in ${c.name}?`,
        a: `The crew walks the property with you, helps flag valuables versus haul items, photo-documents before loading, and routes donatable goods to Bridging, Arc, or Savers with tax receipts. Most ${c.name} estates run from a van load to a full box-truck load — roughly $255–$750 per truck.`,
      }),
      (c) => ({
        q: `Can you work around family members sorting belongings in ${c.name}?`,
        a: `Yes — selective room-by-room cleanouts are common, and the crew coordinates timing with family so nothing leaves before it has been reviewed. Donation receipts are provided for tax purposes.`,
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
        a: `Yes — the crew brings boxes, furniture, and debris down the stairs or ladder themselves, sorts donations, and hauls the rest. You point at what goes; nobody asks you to stage an attic.`,
      }),
      (c) => ({
        q: `Can you remove old insulation debris from a ${c.name} attic?`,
        a: `Loose insulation debris is fine and gets bagged for licensed disposal. Asbestos-containing material is the exception — that requires a licensed abatement contractor before the cleanout.`,
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
        a: `Yes — stairs are part of the job, including treadmills, sofas, and shelving units. The crew breaks down storage shelving and large pieces that will not turn the corner. Pricing stays volume-based; stairs are not a surcharge.`,
      }),
      (c) => ({
        q: `Can you haul water-damaged items from a ${c.name} basement?`,
        a: `Yes. Water-damaged furniture, carpet, and debris are standard basement pickups and go to licensed disposal. Empty paint cans and clean materials can ride along; full paint and chemicals cannot.`,
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
        a: `Both — the crew dismantles wood, chain-link, vinyl, or wrought iron fencing and hauls it the same visit. Concrete footings can be broken up by request, quoted from photos of the fence line.`,
      }),
      (c) => ({
        q: `What happens to the post holes after fence removal in ${c.name}?`,
        a: `The yard is left clean and fillable — posts and footings out (footing breakup is quoted separately), debris swept, holes ready for fill or new posts. Gate hardware is removed as part of the job.`,
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
        a: `The crew handles the full breakdown — wood, metal (Tuff Shed style), plastic, or brick — then hauls the debris and sweeps the site. Brick demolition and concrete pad demo are quoted separately from photos.`,
      }),
      (c) => ({
        q: `Can the shed still be full when you remove it in ${c.name}?`,
        a: `Yes — contents just become part of the volume quote. Text photos of the shed inside and out with your ${c.name} address and you will get one number covering contents, structure, and site cleanup.`,
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
        a: `Small bulky items — a small sofa, a dresser, a single mattress — start at $85 flat in ${c.name}. Refrigerators and mattresses are flat per-item rates from $100. Pianos and unusual items are quoted from photos.`,
      }),
      (c) => ({
        q: `Is it worth booking a pickup for just one item in ${c.name}?`,
        a: `That is exactly what the $85 single-item load rate is for, and curbside or garage staging keeps it at the floor price. If you have a second item, add it — extra volume within the same tier does not change the price.`,
      }),
    ],
  },
  'demolition': {
    items: ['decks', 'sheds', 'fences', 'bathroom interiors', 'kitchen cabinets and counters'],
    scenarios: ['a deck past its lifespan', 'a bathroom gut before remodel', 'a kitchen demo ahead of the contractor'],
    disposal: 'Demo debris is hauled the same visit; metal is recycled and the rest goes to licensed disposal facilities.',
    faqs: [
      (c) => ({
        q: `What kind of demolition do you handle in ${c.name}?`,
        a: `Light demolition: decks, sheds, fences, hot tubs, interior bathroom demo, and kitchen tear-outs (cabinets and counters). Each ${c.name} job is quoted individually from photos of the structure and access.`,
      }),
      (c) => ({
        q: `Is hauling included in demolition jobs in ${c.name}?`,
        a: `Yes — tear-down, loading, hauling, and disposal are one quoted price, so there is no debris pile waiting for a second contractor. The site is swept before the crew leaves.`,
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
  const [n1, n2, n3] = sample(seed, city.neighborhoods, 3, 1);
  const landmark = at(seed, 2, city.landmarks);
  const item = at(seed, 3, angle.items);
  const scenario = at(seed, 4, angle.scenarios);

  const openers = [
    `Need ${svc} in ${city.name}? Dakota Valley Junk Removal runs ${city.county} routes six days a week, with regular pickups in ${n1}, ${n2}, and ${n3}.`,
    `Dakota Valley Junk Removal handles ${svc} across ${city.name} — from ${n1} over to ${n2} — with curbside and garage pickup and an loads from $85.`,
    `${city.name} homeowners call us for ${svc} covering everything from ${item} to full cleanout loads, in every neighborhood from ${n1} to ${n3}.`,
    `From ${landmark} to the streets of ${n1}, our Isuzu NPR box trucks cover all of ${city.name} for ${svc}.`,
  ];
  const middles = [
    `The most common ${city.name} job is ${scenario}: text photos of the ${item} to (952) 232-5107 and a firm quote comes back by text — no estimate visit needed.`,
    `Whether it's ${scenario} or just ${item} that has overstayed its welcome, you text photos, get a firm price, and book a calendar window without a phone call.`,
    `Most requests here start as ${scenario}. Photos by text get a real quote (not a range that changes on arrival), and booking is a calendar link, not phone tag.`,
  ];
  const closers = [
    `Pricing is volume-based: single items from $85, up to $750 for a full box-truck load. ${angle.disposal}`,
    `${angle.disposal} Single items start at $85; a full box-truck load runs up to $750, disclosed before the crew rolls.`,
    `Loads are priced by volume, not by the hour — $85 single items up to $750 for a full box-truck load. ${angle.disposal}`,
  ];
  return `${at(seed, 5, openers)} ${at(seed, 6, middles)} ${at(seed, 7, closers)}`;
}

// --- local notes paragraph ----------------------------------------------

export function comboLocalNotes(city, service, citySlug, serviceSlug) {
  const seed = hashSeed(`notes:${citySlug}/${serviceSlug}`);
  const svc = service.name.toLowerCase();
  const landmark = at(seed, 1, city.landmarks);
  const [na, nb] = sample(seed, city.neighborhoods, 2, 2);
  const variants = [
    `Crews stage ${svc} pickups along existing ${city.county} routes, so ${city.name} addresses near ${landmark} or in ${na} often qualify for same-day or next-day windows. The crew calls about 30 minutes before arrival and texts a completion photo when the load is gone.`,
    `Because ${city.name} sits on our regular ${city.county} loop, ${svc} requests from ${na} and ${nb} are usually scheduled within 2–3 business days — sooner when a truck is already nearby. Expect a 30-minute heads-up call and a completion photo by text.`,
    `Our trucks pass through ${city.name} on ${city.county} routes most working days, which keeps ${svc} scheduling tight for ${na}, ${nb}, and the blocks around ${landmark}. You get a 30-minute arrival call and a photo when the job is done.`,
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

  const generic = [
    {
      q: at(seed, 10, [
        `How much does ${svc} cost in ${city.name}, MN?`,
        `What does ${svc} cost in ${city.name}?`,
      ]),
      a: `Single items start at $85 in ${city.name}. A pickup-bed load runs $85–$170, a van load $255–$550, and a full box-truck load up to $750. Common recyclables — mattresses, fridges, TVs, tires — are flat per-item rates with no load minimum. Text photos to (952) 232-5107 for a firm quote — the price is set before the crew arrives.`,
    },
    {
      q: at(seed, 11, [
        `Is same-day ${svc} available in ${city.name}?`,
        `How fast can you get to ${city.name} for ${svc}?`,
      ]),
      a: `${city.name} is on our regular ${city.county} routes, so most pickups are scheduled within 2–3 business days and same-day windows open when a truck is already nearby. Texting photos early in the day gives the best shot at same-day service.`,
    },
    {
      q: `What parts of ${city.name} do you serve for ${svc}?`,
      a: `All of ${city.name}, including ${hoods}, plus the surrounding ${city.county} area. If you are just outside the city line, text your address — the route likely still covers you.`,
    },
    {
      q: at(seed, 12, [
        `Do I need to be home for ${svc} in ${city.name}?`,
        `Can you do the pickup while I'm at work in ${city.name}?`,
      ]),
      a: `No. Most ${city.name} pickups are curbside or garage-staged: leave the items out or tell the crew where they are, and they send a completion photo by text when the job is done.`,
    },
    {
      q: `How do I get a quote for ${svc} in ${city.name}?`,
      a: `Text photos of the items to (952) 232-5107 with your ${city.name} address or neighborhood. Quotes come back by text — no on-site estimate visit — and you book a calendar window once the price works.`,
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
  const seed = hashSeed(`meta:${citySlug}/${serviceSlug}`);
  const [n1, n2] = sample(seed, city.neighborhoods, 2, 4);
  const titles = [
    `${service.name} in ${city.name}, MN | From $85, Same-Day | Dakota Valley`,
    `${city.name} ${service.name} | Text-a-Photo Quotes from $85 | Dakota Valley`,
    `${service.name} ${city.name} MN — From $85, Book by Text | Dakota Valley`,
  ];
  const descriptions = [
    `${service.name} in ${city.name}, MN from $85. Serving ${n1}, ${n2} and all of ${city.county}. Text photos to (952) 232-5107 for a firm quote and same-day eligible pickup.`,
    `Need ${service.name.toLowerCase()} in ${city.name}? Curbside & garage pickup from $85 across ${n1}, ${n2} and ${city.county}. Firm quotes by text, calendar booking, no estimate visit.`,
    `${city.name} ${service.name.toLowerCase()} from $85 — ${n1} to ${n2}. Text photos for a firm quote, book a window, crew handles loading. Same-day eligible on ${city.county} routes.`,
  ];
  return { title: at(seed, 5, titles), description: at(seed, 6, descriptions) };
}

// --- quote pages (/quote/[city]) — seeded differentiation ------------------
// These 61 pages were 91% identical; each now gets seeded copy + a
// quote-intent FAQ set distinct from the city/combo FAQ pools.

export function quoteContent(city, citySlug) {
  const seed = hashSeed(`quote:${citySlug}`);
  const [n1, n2, n3] = sample(seed, city.neighborhoods, 3, 1);
  const landmark = at(seed, 2, city.landmarks);

  const titles = [
    `Junk Removal Quote ${city.name} MN | Firm Price by Text | Dakota Valley`,
    `Get a ${city.name} Junk Removal Quote | Photos In, Price Out | Dakota Valley`,
    `${city.name} Junk Removal Quote in Hours | $85 Min | Dakota Valley`,
  ];
  const descriptions = [
    `Get a firm junk removal quote in ${city.name}, MN: text photos to (952) 232-5107 and the ${city.county} crew prices it in hours. From $85, no estimate visit, no phone call.`,
    `Junk removal quote for ${city.name} — text photos, get a firm price and pickup window back. Serving ${n1}, ${n2} and all of ${city.county}. loads from $85.`,
    `Fast ${city.name} junk removal quote: photos by text, firm price back in hours, calendar booking. From $85 across ${n1} and ${n2}. No phone call required.`,
  ];
  const heroCopies = [
    `Text a few photos of what needs to go. The crew that routes through ${city.name} — ${n1}, ${n2}, ${n3} — prices it from the photos and texts back a firm quote and a pickup window, usually within hours. loads from $85, no phone call required.`,
    `Snap photos of the pile, the sofa, or the garage and text them over. ${city.name} sits on our regular ${city.county} loop, so a firm price and a calendar window come back fast — typically the same day you text. loads from $85, no call needed.`,
    `From ${n1} to ${n3}, ${city.name} quotes work the same way: photos by text, a firm number back in hours, and a booking link. No walkthrough appointment, no phone tag. loads from $85.`,
  ];
  const routeCopies = [
    `Because we schedule by route through ${city.county}, ${city.name} pickups stay efficient — which keeps your price down. We regularly serve ${n1}, ${n2}, ${n3} and the rest of ${city.name}.`,
    `Trucks already pass near ${landmark} on ${city.county} routes most working days, so your ${city.name} pickup slots into an existing loop instead of a special trip — that efficiency is why the $85 floor holds.`,
    `${city.name} quotes come back fast because the routing is already done: crews loop through ${city.county} daily, covering ${n1}, ${n2}, and the surrounding grid. Your pickup joins the loop.`,
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
      a: `Usually within hours. Crews respond to photo texts between 8 AM and 9 PM, seven days a week. Send photos of the items with your ${city.name} address or neighborhood and the quote comes back as a firm number with available pickup windows.`,
    },
    {
      q: `What photos should I text for a ${city.name} quote?`,
      a: `One wide shot showing everything that needs to go, plus a close-up of anything bulky or unusual. Mention whether items are at the curb, in the garage, or up stairs — access affects the crew plan, and the photo set is what makes the price firm.`,
    },
    {
      q: at(seed, 11, [
        `Is the ${city.name} quote a firm price or an estimate?`,
        `Can the price change after I get a ${city.name} quote?`,
      ]),
      a: `Firm. The price is set from your photos before the crew rolls — it only changes if the load on the day is materially different from what was photographed. No arrival-day surprises, no hourly meter.`,
    },
    {
      q: `Do I have to call to book a pickup in ${city.name}?`,
      a: `No — the whole flow is text-first. Photos in, quote back, calendar window booked by text. If you prefer the form, the booking form on the homepage feeds the same ${city.county} crew.`,
    },
    {
      q: `What should I include with my ${city.name} quote request?`,
      a: `The photos, your ${city.name} neighborhood (${n1}, ${n2}, etc.), where the items sit (curb, garage, basement), and your preferred pickup window. That's everything the crew needs to send a firm price.`,
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
      a: `The same pricing applies county-wide: single items from $85, pickup-bed loads $85–$170, van loads $255–$550, and a full box-truck load up to $750, plus flat per-item recyclable rates with no load minimum. Text photos to (952) 232-5107 for a firm quote anywhere in ${county.name}.`,
    },
    {
      q: `Which ${county.name} cities do you serve?`,
      a: `${cityNames}, and the surrounding ${county.name} communities. If your town isn't listed, text your address — county routes usually cover the gaps between the bigger cities.`,
    },
    {
      q: at(seed, 11, [
        `Is same-day junk removal available in ${county.name}?`,
        `How fast can you pick up in ${county.name}?`,
      ]),
      a: `Most ${county.name} pickups are scheduled within 2–3 business days, and same-day windows open when a truck is already routing through the area around ${county.seat}. Texting photos early in the day gives the best odds.`,
    },
    {
      q: `How do I book a pickup in ${county.name}?`,
      a: `Text photos of the items to (952) 232-5107 with your city or zip. A firm quote comes back by text — no estimate visit — and you pick a calendar window. The crew calls about 30 minutes before arrival.`,
    },
  ];
  return sample(seed, pool, 4, 13);
}
