#!/usr/bin/env node
// Refresh Google reviews while preserving verified reviews from other platforms.
// Run weekly (cron / GitHub Action) or before a build:
//
//   GOOGLE_PLACES_API_KEY=xxx GOOGLE_PLACE_ID=yyy node scripts/fetch-reviews.mjs
//
// Without both environment variables, the current verified review file is kept.
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

  const googleReviews = (json.reviews || []).map((r) => ({
    author: r.authorAttribution?.displayName || 'Google reviewer',
    location: '',
    rating: r.rating || 5,
    platform: 'Google',
    text: (r.text?.text || r.originalText?.text || '').trim(),
    publishedAt: r.publishTime || null,
  })).filter((r) => r.text);

  const existing = JSON.parse(readFileSync(OUT, 'utf8'));
  const otherVerifiedReviews = (existing.reviews || []).filter(
    (review) => String(review.platform || '').toLowerCase() !== 'google',
  );
  const preservedGoogleReviews = (existing.reviews || []).filter(
    (review) => String(review.platform || '').toLowerCase() === 'google',
  );
  const currentGoogleReviews = googleReviews.length ? googleReviews : preservedGoogleReviews;
  const reviews = [...currentGoogleReviews, ...otherVerifiedReviews];
  const googleReviewCount = json.userRatingCount ?? currentGoogleReviews.length;
  const yelpReviewCount = otherVerifiedReviews.filter(
    (review) => String(review.platform || '').toLowerCase() === 'yelp',
  ).length;

  const data = {
    source: 'verified-third-party',
    updated: new Date().toISOString().slice(0, 10),
    aggregate: {
      ratingValue: json.rating ?? existing.aggregate?.ratingValue ?? 5.0,
      reviewCount: googleReviewCount,
      googleReviewCount,
      yelpReviewCount,
      totalVerifiedCount: googleReviewCount + otherVerifiedReviews.length,
    },
    reviews,
  };
  writeFileSync(OUT, JSON.stringify(data, null, 2));
  console.log(`[fetch-reviews] wrote ${googleReviews.length} Google reviews, preserved ${otherVerifiedReviews.length} other verified review(s), rating ${data.aggregate.ratingValue}`);
} catch (err) {
  console.error('[fetch-reviews] failed, keeping existing reviews.json:', err.message);
  process.exit(0); // never break the build
}
