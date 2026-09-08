import { cleanAttribution, ID_PATTERN } from '../src/lib/lead-attribution.js';

const RETENTION_SECONDS = 400 * 24 * 60 * 60;
const STATUS_LABELS = { received: 'Quote received', quoted: 'Price sent', confirmed: 'Pickup confirmed', completed: 'Job completed', closed: 'Closed without pickup' };
const MONTH_PATTERN = /^20\d\d-(?:0[1-9]|1[0-2])$/;
const monthNow = () => new Date().toISOString().slice(0, 7);
export const trackingEnabled = (env) => Boolean(env.LEAD_STORE && env.TELEGRAM_WEBHOOK_SECRET);

export function leadButtons(id, status = 'received') {
  return { inline_keyboard: [
    [{ text: `Status: ${STATUS_LABELS[status] || STATUS_LABELS.received}`, callback_data: `dv:noop:${id}` }],
    [{ text: 'Price sent', callback_data: `dv:quoted:${id}` }, { text: 'Pickup confirmed', callback_data: `dv:confirmed:${id}` }],
    [{ text: 'Job completed', callback_data: `dv:completed:${id}` }, { text: 'Closed', callback_data: `dv:closed:${id}` }],
    [{ text: 'Reset to received', callback_data: `dv:received:${id}` }],
  ] };
}

export async function readLead(env, id) {
  if (!env.LEAD_STORE || !ID_PATTERN.test(id || '')) return null;
  return env.LEAD_STORE.get(`lead:${id}`, 'json');
}

export async function saveLead(env, lead) {
  if (!env.LEAD_STORE) return false;
  const options = { expirationTtl: RETENTION_SECONDS };
  await putWithRetry(env.LEAD_STORE, `lead:${lead.id}`, JSON.stringify(lead), options);
  // Metadata supports a private monthly summary without reading contact data.
  await putWithRetry(env.LEAD_STORE, `lead-month:${lead.created_at.slice(0, 7)}:${lead.id}`, '', {
    ...options, metadata: { status: lead.status, campaign: lead.attribution.campaign, delivery: lead.delivery },
  });
  return true;
}

async function putWithRetry(store, key, value, options) {
  // KV permits one write per key per second. Small uploads and quick crew
  // taps can cross that limit, so retry a rate-limited write after one second.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try { await store.put(key, value, options); return; }
    catch (error) {
      if (attempt === 2 || !/429|rate.limit|too many requests/i.test(String(error?.message))) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1100 * (attempt + 1)));
    }
  }
}

export async function recordVisit(request, env) {
  if (!env.LEAD_STORE) return { recorded: false, configured: false };
  const text = await request.text();
  if (text.length > 2048) throw new Error('Invalid event');
  const input = JSON.parse(text);
  if (input.event !== 'visit' || !ID_PATTERN.test(input.session_id || '')) throw new Error('Invalid event');
  const attribution = cleanAttribution(input);
  const key = `visit:${monthNow()}:${attribution.session_id}`;
  // One key per session prevents retries/page navigation from inflating visits.
  if (!await env.LEAD_STORE.get(key)) {
    await env.LEAD_STORE.put(key, '1', { expirationTtl: RETENTION_SECONDS, metadata: { campaign: attribution.campaign } });
  }
  return { recorded: true };
}

async function telegram(env, method, body) {
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  // Replayed callbacks repair a previously failed edit. Telegram rejects an
  // already-correct keyboard with this 400 response, which is safe to accept.
  if (method === 'editMessageReplyMarkup' && response.status === 400 && result.error_code === 400 && /message is not modified/i.test(result.description || '')) return true;
  if (!response.ok || result.ok !== true) throw new Error('Telegram action failed');
  return result.result;
}

async function listMetadata(store, prefix) {
  const rows = [];
  let cursor;
  do {
    const result = await store.list({ prefix, limit: 1000, ...(cursor ? { cursor } : {}) });
    rows.push(...result.keys.map((key) => key.metadata || {}));
    cursor = result.list_complete ? undefined : result.cursor;
    if (!result.list_complete && !cursor) throw new Error('Incomplete report');
  } while (cursor);
  return rows;
}

export async function leadReport(env, month) {
  if (!MONTH_PATTERN.test(month)) return 'Use /leadreport or /leadreport YYYY-MM.';
  const [visits, leads] = await Promise.all([
    listMetadata(env.LEAD_STORE, `visit:${month}:`),
    listMetadata(env.LEAD_STORE, `lead-month:${month}:`),
  ]);
  const isProfile = (row) => row.campaign === 'google_business_profile';
  const profileLeads = leads.filter(isProfile);
  return [
    `Dakota Valley lead report — ${month} (UTC)`,
    '',
    `Website sessions recorded: ${visits.length}`,
    `Tagged Google Business Profile sessions: ${visits.filter(isProfile).length}`,
    `Quote requests received: ${leads.length}`,
    `From tagged Business Profile sessions: ${profileLeads.length}`,
    `Photo delivery incomplete: ${leads.filter((row) => row.delivery === 'partial').length}`,
    '',
    'Current status of requests received this month:',
    ...Object.entries(STATUS_LABELS).map(([status, label]) => `${label}: ${leads.filter((row) => row.status === status).length} (${profileLeads.filter((row) => row.status === status).length} from Business Profile)`),
    '',
    'Tap the status buttons on each quote after the real action occurs. A quote request never counts as a completed job. This report groups jobs by the month their request arrived, not completion month.',
    'Sessions are visits recorded by this website, not Google profile views or all clicks. Blocked scripts, disabled storage and untagged visits can cause differences. Recent updates can take about a minute to appear. Records are retained for 400 days.',
  ].join('\n');
}

export async function handleTelegramWebhook(request, env) {
  if (!trackingEnabled(env)) return new Response('Tracking unavailable', { status: 503 });
  if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.TELEGRAM_WEBHOOK_SECRET) return new Response('Unauthorized', { status: 401 });
  const update = await request.json();
  const callback = update.callback_query;
  const message = callback?.message || update.message;
  if (!message || String(message.chat?.id) !== String(env.TELEGRAM_CHAT_ID) || (env.TELEGRAM_THREAD_ID && String(message.message_thread_id) !== String(env.TELEGRAM_THREAD_ID))) return new Response('Ignored');

  if (callback) {
    const match = /^dv:(noop|received|quoted|confirmed|completed|closed):([a-f0-9-]+)$/i.exec(callback.data || '');
    if (!match || !ID_PATTERN.test(match[2])) return new Response('Ignored');
    const [, status, id] = match;
    const lead = await readLead(env, id);
    if (!lead || lead.message_id !== message.message_id) {
      await telegram(env, 'answerCallbackQuery', { callback_query_id: callback.id, text: 'This lead record is unavailable. Check the original quote message.', show_alert: true });
      return new Response('OK');
    }
    if (status !== 'noop' && lead.status !== status) {
      lead.status = status;
      lead.updated_at = new Date().toISOString();
      await saveLead(env, lead);
    }
    if (status !== 'noop') {
      // Persisting the status and updating Telegram are separate operations.
      // Retry the keyboard update even when the stored status already matches.
      await telegram(env, 'editMessageReplyMarkup', { chat_id: env.TELEGRAM_CHAT_ID, message_id: message.message_id, reply_markup: leadButtons(id, lead.status) });
    }
    await telegram(env, 'answerCallbackQuery', { callback_query_id: callback.id, text: status === 'noop' ? STATUS_LABELS[lead.status] : `Saved: ${STATUS_LABELS[status]}` });
  } else {
    const command = /^\/leadreport(?:@[a-z0-9_]+)?(?:\s+(\S+))?\s*$/i.exec(message.text || '');
    if (command) {
      await telegram(env, 'sendMessage', {
        chat_id: env.TELEGRAM_CHAT_ID,
        ...(env.TELEGRAM_THREAD_ID ? { message_thread_id: Number(env.TELEGRAM_THREAD_ID) } : {}),
        text: await leadReport(env, command[1] || monthNow()),
      });
    }
  }
  return new Response('OK');
}
