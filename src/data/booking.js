// Booking form configuration.
//
// The site posts directly to a Cloudflare Worker that bridges to Telegram.
// The Worker code lives at /telegram-worker.js in this repo and is deployed
// via .github/workflows/deploy-worker.yml.
//
// Public Worker endpoint:
// https://dakota-valley-telegram-bridge.dakota-valley-haul-600589.workers.dev

export const WORKER_URL = 'https://dakota-valley-telegram-bridge.dakota-valley-haul-600589.workers.dev';

export const PRICE_FLOOR = 'Loads from $85';
export const PRICE_FLOOR_DETAIL = 'Curbside pickups start at $85. Final price based on volume.';

// The per-city `testimonial` entries in cities.js are PLACEHOLDER copy, not real
// attributed customer reviews. Keep this false (no fabricated testimonials shown)
// until they are replaced with real, verifiable reviews. Flipping it on without
// real data is an FTC false-endorsement risk.
export const CITY_TESTIMONIALS_ENABLED = false;
