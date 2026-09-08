// Optional Vercel edge deployment uses the same validated quote-delivery code.
// Cloudflare's LEAD_STORE binding is available only on the production Worker.
import worker from '../telegram-worker.js';

export const config = { runtime: 'edge' };

export default function handler(request) {
  return worker.fetch(request, {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    TELEGRAM_THREAD_ID: process.env.TELEGRAM_THREAD_ID,
  });
}
