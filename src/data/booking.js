// Booking form configuration.
//
// The site posts directly to a Cloudflare Worker that bridges to Telegram.
// The Worker code lives at /telegram-worker.js in this repo and is deployed
// via .github/workflows/deploy-worker.yml.
//
// HOW TO ACTIVATE (one-time):
// 1. Cloudflare account → Workers & Pages → publish the worker (the GitHub
//    Actions workflow handles this automatically on push to main).
// 2. Set these Worker secrets in the Cloudflare dashboard:
//      TELEGRAM_BOT_TOKEN     (from BotFather)
//      TELEGRAM_CHAT_ID       (your personal Telegram numeric ID)
//      TELEGRAM_THREAD_ID     (optional, for topic-mode chats)
// 3. Replace WORKER_URL below with the deployed URL — looks like
//    https://dakota-valley-telegram-bridge.<your-handle>.workers.dev
// 4. Done — every form submission on the site routes to Telegram.

export const WORKER_URL = 'https://dakota-valley-telegram-bridge.workers.dev';

export const PRICE_FLOOR = '$85 minimum';
export const PRICE_FLOOR_DETAIL = 'Curbside pickups start at $85. Final price based on volume.';
