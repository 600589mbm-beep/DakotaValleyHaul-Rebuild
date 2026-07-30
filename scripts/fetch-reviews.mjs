#!/usr/bin/env node
// Refresh verified Google reviews without deleting manually verified reviews
// from other platforms. Run weekly or before a build:
//
//   GOOGLE_PLACES_API_KEY=xxx GOOGLE_PLACE_ID=yyy node scripts/fetch-reviews.mjs
//
// Without both environment variables, reviews.json is left untouched so builds
// remain safe. Google Places may return fewer review bodies than the public
// review count, so fetched reviews are merged with existing verified Google
// records instead of replacing the complete set.
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

function reviewKey(review) {
  const author = String(review.author || '').trim().toLowerCase();
  const text = String(review.text || '').trim().toLowerCase().slice(0, 100);
  return `${author}|${text}`;
}

try {
  const res = await fetch(url, { headers: { 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' } });
  if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`);
  const json = await res.json();

  const fetchedGoogle = (json.reviews || []).map((review) => ({
    platform: 'google',
    author: review.authorAttribution?.displayName || 'Google reviewer',
    rating: review.rating || 5,
    text: (review.text?.text || review.originalText?.text || '').trim(),
    publishedAt: review.publishTime || null,
  })).filter((review) => review.text);

  const existing = JSON.parse(readFileSync(OUT, 'utf8'));
  const existingReviews = existing.reviews || [];
  const existingGoogle = existingReviews.filter((review) => review.platform === 'google');
  const nonGoogle = existingReviews.filter((review) => review.platform && review.platform !== 'google');

  const mergedGoogle = new Map(existingGoogle.map((review) => [reviewKey(review), review]));
  for (const review of fetchedGoogle) mergedGoogle.set(reviewKey(review), review);
  const googleReviews = [...mergedGoogle.values()];

  const googleReviewCount = json.userRatingCount ?? existing.aggregate?.reviewCount ?? googleReviews.length;
  const data = {
    source: 'verified-third-party',
    updated: new Date().toISOString().slice(0, 10),
    aggregate: {
      ratingValue: json.rating ?? existing.aggregate?.ratingValue ?? 5.0,
      reviewCount: googleReviewCount,
      totalVerifiedReviewCount: googleReviewCount + nonGoogle.length,
    },
    reviews: [...googleReviews, ...nonGoogle],
  };

  writeFileSync(OUT, JSON.stringify(data, null, 2));
  console.log(`[fetch-reviews] kept ${googleReviews.length} Google review records and ${nonGoogle.length} other verified review(s) · Google rating ${data.aggregate.ratingValue} · public Google count ${data.aggregate.reviewCount}`);
} catch (error) {
  console.error('[fetch-reviews] failed, keeping existing reviews.json:', error.message);
  process.exit(0);
}
