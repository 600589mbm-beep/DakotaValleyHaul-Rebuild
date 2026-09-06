import { PRICE_FLOOR_DETAIL } from './servicePolicy.js';
// Informational guides at /guides/:slug — top-of-funnel content targeting
// "how much / how to" queries before someone is ready to book.
// Every price and process claim comes from pricing.js / booking.js /
// services.js. Generic Minnesota disposal facts are kept verifiable
// (county HHW programs, retailer take-back) — no invented stats.

export const guides = {
  'junk-removal-cost-minnesota': {
    shortTitle: 'Junk removal cost guide',
    title: 'What does junk removal cost in Minnesota? (2026 guide)',
    metaTitle: "Junk Removal Cost in Minnesota | $85 Minimum & Photo Quotes | Dakota Valley",
    metaDescription:
      "Understand Dakota Valley junk-removal pricing: an $85 minimum for eligible pickups, written photo quotes, staging requirements and the factors that affect your total.",
    datePublished: '2026-06-11',
    intro:
      "The useful number is the complete price for your actual load, not a truck-size example that may not match it. Dakota Valley uses photos and item details to confirm your total in writing before you book. Eligible curbside, driveway and accessible-garage pickups have an $85 minimum; that is not a flat price for every item.",
    sections: [
  {
    "h2": "What the $85 minimum means",
    "body": [
      "Eligible curbside, driveway or accessible-garage pickups have an $85 minimum. This is not a flat price for every item. Send photos for the exact total in writing before booking.",
      "Photograph every item to include. A large sectional, dense debris or items with special disposal requirements can cost more than the minimum. The written quote states what is included; a list of old example prices is not a booking quote."
    ]
  },
  {
    "h2": "What affects your written quote",
    "body": [
      "The crew reviews the amount to load, weight, material type, disposal requirements and access between the staged items and truck parking. Appliances must be safely disconnected before staging. Standard pickup does not include indoor carrying or stairs.",
      "The written quote covers the items, volume, weight, access and disposal needs shown in your photos and details. When those match, the approved total stays the same. Any change to the agreed scope requires a revised quote that you approve before work begins."
    ]
  },
  {
    "h2": "Plan an efficient pickup",
    "body": [
      "Send one complete photo set for the whole job, identify items that stay and keep the loading path clear. Ask for a combined quote rather than assuming extra items are free. Donation or recycling depends on condition and acceptance; it does not create an automatic discount.",
      "Compare providers using the complete written scope, not just an advertised starting price. Consider whether you need an approved drop-off, a rental or collection of pre-staged items. Your price and appointment must both be confirmed before pickup."
    ]
  }
],
    faqs: [
  {
    "q": "What is the minimum Dakota Valley pickup price?",
    "a": "Eligible curbside, driveway or accessible-garage pickups have an $85 minimum. This is not a flat price for every item. Send photos for the exact total in writing before booking."
  },
  {
    "q": "Why can an appliance quote differ from a furniture quote?",
    "a": "Weight, size, access and disposal requirements differ. Include the appliance type and condition in your photos so those requirements are included in the written total."
  },
  {
    "q": "Will the quoted total change on arrival?",
    "a": "The written quote covers the items, volume, weight, access and disposal needs shown in your photos and details. When those match, the approved total stays the same. Any change to the agreed scope requires a revised quote that you approve before work begins."
  }
],
  },

  'get-rid-of-mattress-minnesota': {
    shortTitle: 'Mattress disposal guide',
    title: 'How to get rid of a mattress in Minnesota (all 5 options)',
    metaTitle: 'How to Get Rid of a Mattress in Minnesota | 5 Options Compared | Dakota Valley',
    metaDescription:
      "Compare Minnesota mattress disposal options, including retailer take-back, donation, drop-off and pickup of pre-staged items with a written photo quote.",
    datePublished: '2026-06-11',
    intro:
      'Mattresses are the single most awkward item in household disposal: garbage haulers refuse them or charge bulky-item fees, donation centers reject most of them, and they are too big for any car. Minnesota actually has good mattress-recycling infrastructure — certified facilities recover up to 80% of a mattress (steel coils, foam, fiber, fabric). Here are the five realistic ways to use it.',
    sections: [
      {
        h2: 'Option 1: retailer take-back when you buy new',
        body: [
          'If you are replacing the mattress, the cheapest path is usually the delivery crew taking the old one. Most large retailers offer haul-away for a small fee (sometimes free during promotions) when delivering a new mattress. Ask before checkout — once the new mattress is delivered, that window closes and you are into the other four options.',
        ],
      },
      {
        h2: 'Option 2: donation — but the bar is high',
        body: [
          'Donation centers only accept mattresses that are genuinely clean: no stains, tears, odors, or sagging. In practice most used mattresses are declined, and some metro donation centers no longer take mattresses at all. Call before you load one in a truck. If yours qualifies, donation is free and the mattress gets reused rather than recycled.',
        ],
      },
      {
        h2: 'Options 3 and 4: city cleanup days and recycling drop-off',
        body: [
          'Many Minnesota cities run spring or fall cleanup days where residents drop bulky items for a modest fee — check your city\'s public works page for dates, and expect lines. Year-round, several metro counties and private recyclers accept mattresses at drop-off sites, typically charging a per-piece fee. Both options require a vehicle that fits a mattress and a free morning.',
        ],
      },
      {
        h2: 'Option 5: pickup of a pre-staged mattress',
        body: [
          PRICE_FLOOR_DETAIL,
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I put a mattress in the garbage in Minnesota?',
        a: 'Usually not in the regular bin. Most haulers require scheduling a bulky-item pickup at an extra fee, and some refuse mattresses entirely. Mattresses also recycle unusually well, so the landfill is the worst-value option.',
      },
      {
        q: 'What happens to a recycled mattress?',
        a: 'Certified facilities strip it into commodity streams: steel coils to metal recyclers, foam to carpet padding, fiber and fabric to industrial uses. Up to 80% of the mattress by weight avoids the landfill.',
      },
      {
        q: 'How much does mattress pickup cost in the Twin Cities?',
        a: PRICE_FLOOR_DETAIL,
      },
    ],
  },

  'get-rid-of-old-appliances-minnesota': {
    shortTitle: 'Appliance disposal guide',
    title: 'How to get rid of old appliances in Minnesota',
    metaTitle: 'How to Get Rid of Old Appliances in Minnesota | Fridge, Washer, Stove | Dakota Valley',
    metaDescription:
      "Compare old-appliance disposal options in Minnesota. Learn how to prepare an appliance and request a written quote for curbside or garage pickup.",
    datePublished: '2026-06-11',
    intro:
      'Appliances are the most regulated item in household junk. Refrigerators, freezers, AC units, and dehumidifiers contain refrigerant that federal law says must be recovered by certified technicians before scrapping — which is why you cannot just leave a fridge in the alley. The good news: appliance metal is valuable, so the recycling chain is well developed in Minnesota and several disposal paths are cheap or free.',
    sections: [
      {
        h2: 'Check your utility first',
        body: [
          'If the appliance still runs, check your electric utility before anything else. Minnesota utilities have periodically offered appliance-recycling programs with free pickup and a rebate for working refrigerators and freezers — the utility wants the old energy hog off the grid. Program availability changes, so check your utility\'s current offers; when it is running, this is the best deal for a working fridge.',
        ],
      },
      {
        h2: 'Scrap value: free pickup for metal-heavy appliances',
        body: [
          'Washers, dryers, stoves, and dishwashers are mostly steel, and scrap haulers will often take them free if you get them to the curb — the metal is their payment. The catch is refrigerant: most scrappers cannot legally take fridges, freezers, or AC units unless they handle certified recovery, and curbside scavengers who cut lines and vent refrigerant create exactly the problem the law exists to prevent.',
        ],
      },
      {
        h2: 'Retailer haul-away and pre-staged pickup',
        body: [
          PRICE_FLOOR_DETAIL,
        ],
      },
    ],
    faqs: [
      {
        q: 'Why can\'t I just put a refrigerator out for the garbage truck?',
        a: 'Federal rules require the refrigerant to be recovered by a certified technician before the fridge is scrapped. Garbage haulers are not equipped for that, so fridges need an appliance-recycling chain — utility programs, retailer haul-away, or a hauler that does certified recovery.',
      },
      {
        q: 'Do I need to empty or unplug the appliance before pickup?',
        a: "Empty the appliance and arrange safe disconnection from power, water and gas by a qualified person before staging. Never cut refrigerant lines. Show the appliance and its curbside, driveway or garage pickup location in your photos.",
      },
      {
        q: 'What does appliance removal cost in the Twin Cities?',
        a: PRICE_FLOOR_DETAIL,
      },
    ],
  },

  'garage-cleanout-checklist': {
    shortTitle: 'Garage cleanout checklist',
    title: 'The Minnesota garage cleanout checklist (one weekend, start to done)',
    metaTitle: "Garage Cleanout Checklist | Staging & Written Photo Quotes | Dakota Valley",
    metaDescription:
      "Plan a garage cleanout, separate items, prepare a safe loading area and request a written photo quote. Pickup requires an appointment confirmed by the crew.",
    datePublished: '2026-06-11',
    intro:
      'A garage cleanout fails when it turns into archaeology — every box opened, every item debated, momentum gone by noon. The version that works is mechanical: four piles, hard rules, and the haul scheduled before you start so there is a deadline. Here is the plan, plus what the haul itself costs.',
    sections: [
      {
        h2: 'Before you start: plan pickup and safe staging',
        body: [
          'Plan the items to remove and send clear photos of the complete load. Approve the written total and confirm an available pickup window with the crew before treating it as booked. When the load changes, send updated photos and approve any revised quote before work begins.',
        ],
      },
      {
        h2: 'The four-pile sort',
        body: [
          'Work zone by zone — one wall at a time, never the whole garage at once — and give every item exactly one of four destinations. KEEP: it has a home and gets used; back on the shelf it goes. DONATE: usable goods — furniture, sports equipment, tools, decorations — staged separately for Savers, Bridging, or Arc. HAZARDOUS: paint, stains, chemicals, automotive fluids, propane, batteries — these go to your county household hazardous waste site, not on any truck (every metro county runs one; drop-off is typically free for residents). HAUL: everything else — broken furniture, dead equipment, mystery boxes nobody has opened since the last move.',
          'The one rule that keeps speed up: a box unopened for five-plus years gets one minute of triage, not an hour of reminiscing. Pull obvious keepsakes, then the box rides the donate or haul pile.',
        ],
      },
      {
        h2: 'What the haul costs and how to stage it',
        body: [
          PRICE_FLOOR_DETAIL,
        ],
      },
    ],
    faqs: [
      {
        q: 'Where do I take paint and chemicals from a garage cleanout in Minnesota?',
        a: 'Your county household hazardous waste (HHW) facility — every Twin Cities metro county operates one, and resident drop-off is typically free for paint, stains, automotive fluids, and chemicals. Junk crews can legally take empty paint cans, but never full ones.',
      },
      {
        q: 'Do I have to sort everything before the junk crew arrives?',
        a: 'No — the crew loads whatever you flag, sorted or not. Sorting only matters for what you want to keep, donate, or take to HHW. Many customers just point at one side of the garage.',
      },
      {
        q: 'How much does a full garage cleanout cost?',
        a: PRICE_FLOOR_DETAIL,
      },
    ],
  },

  'what-junk-removal-wont-take': {
    shortTitle: 'What haulers won\'t take',
    title: 'What junk removal companies won\'t take (and where it goes instead)',
    metaTitle: 'What Junk Removal Companies Won\'t Take in Minnesota | Dakota Valley',
    metaDescription:
      'Items junk haulers must refuse — paint, chemicals, asbestos, propane — and the Minnesota disposal route for each. Plus surprising things crews WILL take.',
    datePublished: '2026-06-11',
    intro:
      'Junk removal crews can take far more than people expect — hot tubs, pianos, water-damaged debris, whole sheds. What they cannot take is anything classed as hazardous waste, because licensed disposal facilities will reject the whole load over one bad item. Knowing the short refusal list (and the right route for each item) saves an awkward conversation at the curb.',
    sections: [
      {
        h2: 'The hard no list',
        body: [
          'Wet paint, stains, and solvents; household and automotive chemicals; gasoline, oil, and antifreeze; propane tanks and other pressurized cylinders; asbestos-containing material (old pipe insulation, some vermiculite, certain floor tiles); commercial quantities of fluorescent tubes; and anything biohazardous. No legitimate full-service hauler in Minnesota takes these — a crew that shrugs and loads them is a crew sending them somewhere they should not go.',
          'The good news: every Twin Cities metro county runs a household hazardous waste (HHW) facility where residents drop these items, typically free. Asbestos is the exception — suspected asbestos needs a licensed abatement contractor before any cleanout proceeds.',
        ],
      },
      {
        h2: 'The "yes, with handling" list',
        body: [
          PRICE_FLOOR_DETAIL,
        ],
      },
      {
        h2: 'The "almost anything else" reality',
        body: [
          'Beyond the hazardous list, full-service crews take essentially anything two people can carry or break down: furniture, appliances, hot tubs (disassembled on-site), sheds (demolished and hauled), fencing, decks, exercise equipment, pianos (by quote), and whole-property cleanouts. The practical test: if it is solid waste and not chemically hazardous, it can go on the truck. Not sure about an item? Text a photo to (952) 232-5107 — a photo answer is faster than a refusal at the curb.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can junk removal take a propane tank if it\'s empty?',
        a: 'Generally no — even "empty" tanks hold residual pressure and disposal facilities refuse them. Exchange it at any retailer with a tank-swap cage, or take it to a county HHW site that accepts cylinders.',
      },
      {
        q: 'Who removes asbestos in Minnesota?',
        a: 'Licensed asbestos abatement contractors only — it is a regulated removal with containment and air-testing requirements. Junk crews can work around suspected asbestos (and should flag it) but cannot remove it.',
      },
      {
        q: 'Will junk removal take old TVs and computers?',
        a: 'Yes — including CRT TVs that donation centers refuse. With Dakota Valley they route to R2-certified e-waste recyclers, and hard drives are wiped or physically destroyed on request.',
      },
    ],
  },
};

export function getGuideSlugs() {
  return Object.keys(guides);
}
