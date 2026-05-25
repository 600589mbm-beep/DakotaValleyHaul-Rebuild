#!/usr/bin/env node
// Refresh src/data/reviews.json from the Google Places API so on-site reviews
// stay current. Run weekly (cron / GitHub Action) or before a build:
//
//   GOOGLE_PLACES_API_KEY=xxx GOOGLE_PLACE_ID=yyy node scripts/fetch-reviews.mjs
//
// Behavior:
//   - With both env vars set: pulls the latest reviews + rating and writes them
//     with source:'google'. Only 'google' reviews are emitted as Review JSON-LD.
//   - Without them: leaves reviews.json untouched and exits 0 (build-safe), so
//     deploys never fail just because the key isn't wired yet.
//
// Get a Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'reviews.json');

const KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

if (!KEY || !PLACE_ID) {
  console.warn('[fetch-reviews] GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID not set — keeping existing reviews.json. Skipping.');
  process.exit(0);
}

const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount,reviews&key=${KEY}`;

try {
  const res = await fetch(url, { headers: { 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' } });
  if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`);
  const json = await res.json();

  const reviews = (json.reviews || []).map((r) => ({
    author: r.authorAttribution?.displayName || 'Google reviewer',
    location: '',
    rating: r.rating || 5,
    text: (r.text?.text || r.originalText?.text || '').trim(),
    publishedAt: r.publishTime || null,
  })).filter((r) => r.text);

  const existing = JSON.parse(readFileSync(OUT, 'utf8'));
  const data = {
    source: 'google',
    updated: new Date().toISOString().slice(0, 10),
    aggregate: {
      ratingValue: json.rating ?? existing.aggregate?.ratingValue ?? 5.0,
      reviewCount: json.userRatingCount ?? reviews.length,
    },
    reviews: reviews.length ? reviews : existing.reviews,
  };
  writeFileSync(OUT, JSON.stringify(data, null, 2));
  console.log(`[fetch-reviews] wrote ${reviews.length} Google reviews · rating ${data.aggregate.ratingValue} · count ${data.aggregate.reviewCount}`);
} catch (err) {
  console.error('[fetch-reviews] failed, keeping existing reviews.json:', err.message);
  process.exit(0); // never break the build
}
