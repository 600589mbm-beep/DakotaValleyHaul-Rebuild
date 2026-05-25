# Photo shot list — Dakota Valley Junk Removal

**Why this exists:** the site currently ships brand-safe vector *illustrations*
(`public/illustrations/*.svg`) as placeholders. The originals in this folder
were removed on 2026-05-25 because they were **not real job photos** — they were
screenshots of a competitor's booking app and CRM screens that exposed customer
names, emails, home addresses and phone numbers. Do not re-add them.

In junk removal, **proof = trust**. Real photos will move conversion more than
any copy change. Shoot these, then follow "How to swap in" below.

## Priority shots (shoot first)

1. **Hero** — the branded truck loaded with junk, parked at a Twin Cities home,
   landscape, shot slightly low so the truck looks big. Daylight. (LCP image.)
2. **Before/after × 3 pairs** — same framing, two photos each:
   - Garage cleanout (cluttered → empty/swept)
   - Curbside furniture pile (pile → clean curb)
   - Estate / full room (full → cleared)
3. **Crew in action** — two people loading a sofa or fridge into the truck.
4. **Truck close-up** — logo/wrap visible, clean.
5. **Heavy/awkward items** — hot tub, piano, treadmill, shed, riding mower
   (one each if you have them; these are the moat — competitors duck them).

## How to swap in
1. Optimize: max 1600px wide, ~80% quality JPEG/WebP. Drop into
   `public/attached_assets/`.
2. Edit `src/data/photos.js` — replace `src`/`width`/`height`/`desc` and set
   `illustration: false`. Write `desc` describing what's literally in the frame.
3. Before/after pairs go in `src/data/beforeAfter.js`.
4. `npm run build` — alt text + `image-sitemap.xml` regenerate across all pages.

## Alt-text rule
Describe what's IN the frame: truck model if visible, the items (sofa, fridge,
branches), the setting (curbside, garage, driveway), the crew action (loading,
sweeping). Wrong alt text is worse than none.
