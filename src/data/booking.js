// Booking form configuration.
//
// The site posts directly to a Cloudflare Worker that bridges to Telegram.
// The Worker code lives at /telegram-worker.js in this repo and is deployed
// via .github/workflows/deploy-worker.yml.
//
// Public Worker endpoint:
// https://dakota-valley-telegram-bridge.dakota-valley-haul-600589.workers.dev

export const WORKER_URL = 'https://dakota-valley-telegram-bridge.dakota-valley-haul-600589.workers.dev';

export const PRICE_FLOOR = '$85 minimum';
export const PRICE_FLOOR_DETAIL = 'Curbside pickups start at $85. Final price based on volume.';
