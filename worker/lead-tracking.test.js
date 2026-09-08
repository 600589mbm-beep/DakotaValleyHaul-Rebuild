import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../telegram-worker.js';
import { leadReport, saveLead } from './lead-tracking.js';

const ID = '11111111-1111-4111-8111-111111111111';
const SESSION = '22222222-2222-4222-8222-222222222222';
const origin = 'https://dakotavalleyjunkremovalservice.com';

function store() {
  const records = new Map();
  return {
    records,
    async get(key, type) { const value = records.get(key)?.value; return value === undefined ? null : type === 'json' ? JSON.parse(value) : value; },
    async put(key, value, options = {}) { records.set(key, { value, metadata: options.metadata }); },
    async list({ prefix }) { return { keys: [...records].filter(([key]) => key.startsWith(prefix)).map(([name, value]) => ({ name, metadata: value.metadata })), list_complete: true }; },
  };
}

function fixture(t, options = {}) {
  const env = { TELEGRAM_BOT_TOKEN: 'mock-token', TELEGRAM_CHAT_ID: '-12345', TELEGRAM_WEBHOOK_SECRET: 'mock-secret', LEAD_STORE: store() };
  const calls = [];
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async (url, request) => {
    calls.push({ url, body: request.body });
    const fileRequest = /sendPhoto|sendDocument/.test(url);
    if (fileRequest && options.photoNetworkError) throw new Error('Mock photo network error');
    const ok = !(fileRequest && options.photoError) && !options.messageError;
    return new Response(JSON.stringify({ ok, result: { message_id: 55 } }), { status: 200 });
  };
  t.after(() => { globalThis.fetch = previousFetch; });
  const quote = () => {
    const form = new FormData();
    for (const [key, value] of Object.entries({ name: 'Private Test Person', phone: '(952) 555-0123', address: '123 Private Street', city: 'Eagan', details: 'Private sofa details', leadId: ID, attribution: JSON.stringify({ source: 'google', medium: 'organic', campaign: 'google_business_profile', session_id: SESSION, landing_path: '/cities/eagan/?secret=Private' }) })) form.set(key, value);
    form.set('photos', new Blob(['test bytes'], { type: 'image/jpeg' }), 'private-test.jpg');
    return new Request('https://worker.invalid/', { method: 'POST', headers: { Origin: origin }, body: form });
  };
  const webhook = (data, secret = 'mock-secret') => new Request('https://worker.invalid/telegram-webhook', { method: 'POST', headers: { 'content-type': 'application/json', 'X-Telegram-Bot-Api-Secret-Token': secret }, body: JSON.stringify(data) });
  return { env, calls, quote, webhook };
}

test('acknowledged quote stores no customer information and sequential retries do not send duplicate leads', async (t) => {
  const f = fixture(t);
  const result = await (await worker.fetch(f.quote(), f.env)).json();
  assert.equal(result.success, true);
  assert.equal(result.received, true);
  const lead = await f.env.LEAD_STORE.get(`lead:${ID}`, 'json');
  assert.equal(lead.status, 'received');
  assert.equal(lead.delivery, 'received');
  assert.equal(lead.attribution.campaign, 'google_business_profile');
  assert.doesNotMatch(JSON.stringify([...f.env.LEAD_STORE.records]), /Private|555|private-test|\?/);
  const sent = JSON.parse(f.calls[0].body);
  assert.match(sent.text, /Quote Request/);
  assert.equal(sent.reply_markup, undefined);
  assert.equal(JSON.parse(f.calls.find((call) => /editMessageReplyMarkup/.test(call.url)).body).reply_markup.inline_keyboard[2][0].callback_data, `dv:completed:${ID}`);
  const sentCount = f.calls.length;
  const retry = await (await worker.fetch(f.quote(), f.env)).json();
  assert.equal(retry.duplicate, true);
  assert.equal(f.calls.length, sentCount);
});

test('partial delivery is acknowledged when photo APIs reject or the network fails, and does not resubmit details', async (t) => {
  const f = fixture(t, { photoNetworkError: true });
  const response = await worker.fetch(f.quote(), f.env);
  const data = await response.json();
  assert.equal(response.status, 502);
  assert.equal(data.received, true);
  assert.equal(data.success, false);
  assert.equal((await f.env.LEAD_STORE.get(`lead:${ID}`, 'json')).delivery, 'partial');
  const sentCount = f.calls.length;
  assert.equal((await (await worker.fetch(f.quote(), f.env)).json()).received, true);
  assert.equal(f.calls.length, sentCount);
});

test('HTTP 200 alone does not acknowledge a rejected Telegram message or count a lead', async (t) => {
  const f = fixture(t, { messageError: true });
  const response = await worker.fetch(f.quote(), f.env);
  assert.equal(response.status, 502);
  assert.equal((await response.json()).received, false);
  assert.equal(f.env.LEAD_STORE.records.size, 0);
});

test('quotes remain available with missing or failing reporting storage', async (t) => {
  const f = fixture(t);
  delete f.env.LEAD_STORE;
  assert.equal((await (await worker.fetch(f.quote(), f.env)).json()).success, true);
  assert.equal(JSON.parse(f.calls[0].body).reply_markup, undefined);
  f.env.LEAD_STORE = { async get() { throw new Error('Storage unavailable'); }, async put() { throw new Error('Storage unavailable'); } };
  assert.equal((await (await worker.fetch(f.quote(), f.env)).json()).success, true);
});

test('only authenticated callbacks from the configured chat and original message can mark jobs complete', async (t) => {
  const f = fixture(t);
  await worker.fetch(f.quote(), f.env);
  const update = { callback_query: { id: 'callback-1', data: `dv:completed:${ID}`, message: { message_id: 55, chat: { id: -12345 } } } };
  assert.equal((await worker.fetch(f.webhook(update, 'wrong'), f.env)).status, 401);
  await worker.fetch(f.webhook({ callback_query: { ...update.callback_query, message: { message_id: 55, chat: { id: 999 } } } }), f.env);
  assert.equal((await f.env.LEAD_STORE.get(`lead:${ID}`, 'json')).status, 'received');
  await worker.fetch(f.webhook({ callback_query: { ...update.callback_query, message: { message_id: 99, chat: { id: -12345 } } } }), f.env);
  assert.equal((await f.env.LEAD_STORE.get(`lead:${ID}`, 'json')).status, 'received');
  assert.equal((await worker.fetch(f.webhook(update), f.env)).status, 200);
  assert.equal((await f.env.LEAD_STORE.get(`lead:${ID}`, 'json')).status, 'completed');
  await worker.fetch(f.webhook(update), f.env);
  const report = await leadReport(f.env, new Date().toISOString().slice(0, 7));
  assert.match(report, /Job completed: 1 \(1 from Business Profile\)/);
  assert.match(report, /Quote requests received: 1/);
  assert.doesNotMatch(report, /Private|555/);
});

test('public events only record anonymous visits; reports are restricted to the Telegram chat', async (t) => {
  const f = fixture(t);
  const event = (event = 'visit') => new Request('https://worker.invalid/events', { method: 'POST', headers: { Origin: origin, 'content-type': 'application/json' }, body: JSON.stringify({ event, source: 'google', medium: 'organic', campaign: 'google_business_profile', session_id: SESSION, details: 'Private' }) });
  assert.equal((await worker.fetch(event('completed'), f.env)).status, 400);
  assert.equal((await (await worker.fetch(event(), f.env)).json()).recorded, true);
  assert.equal((await (await worker.fetch(event(), f.env)).json()).recorded, true);
  assert.equal([...f.env.LEAD_STORE.records.keys()].filter((key) => key.startsWith('visit:')).length, 1);
  assert.doesNotMatch(JSON.stringify([...f.env.LEAD_STORE.records]), /Private/);
  const before = f.calls.length;
  await worker.fetch(f.webhook({ message: { chat: { id: 999 }, text: '/leadreport' } }), f.env);
  assert.equal(f.calls.length, before);
  await worker.fetch(f.webhook({ message: { chat: { id: -12345 }, text: '/leadreport' } }), f.env);
  assert.match(JSON.parse(f.calls.at(-1).body).text, /Tagged Google Business Profile sessions: 1/);
});

test('KV rate-limited writes retry before acknowledging a saved crew status', async (t) => {
  const f = fixture(t);
  await worker.fetch(f.quote(), f.env);
  const lead = await f.env.LEAD_STORE.get(`lead:${ID}`, 'json');
  const original = f.env.LEAD_STORE.put;
  let attempts = 0;
  f.env.LEAD_STORE.put = async (...args) => {
    attempts += 1;
    if (attempts === 1) throw new Error('KV PUT failed: 429 Too Many Requests');
    return original(...args);
  };
  lead.status = 'completed';
  assert.equal(await saveLead(f.env, lead), true);
  assert.equal((await f.env.LEAD_STORE.get(`lead:${ID}`, 'json')).status, 'completed');
  assert.equal(attempts, 3);
});

test('a replayed callback repairs a failed keyboard edit without rewriting status, and accepts an unchanged keyboard', async (t) => {
  const f = fixture(t);
  await worker.fetch(f.quote(), f.env);
  const normalFetch = globalThis.fetch;
  const editedKeyboards = [];
  globalThis.fetch = async (url, request) => {
    if (/editMessageReplyMarkup/.test(url)) {
      editedKeyboards.push(JSON.parse(request.body).reply_markup);
      if (editedKeyboards.length === 1) return new Response(JSON.stringify({ ok: false, error_code: 500, description: 'Temporary failure' }), { status: 500 });
      if (editedKeyboards.length === 3) return new Response(JSON.stringify({ ok: false, error_code: 400, description: 'Bad Request: message is not modified' }), { status: 400 });
    }
    return normalFetch(url, request);
  };
  const originalPut = f.env.LEAD_STORE.put;
  let writes = 0;
  f.env.LEAD_STORE.put = async (...args) => { writes += 1; return originalPut(...args); };
  const update = { callback_query: { id: 'retry-callback', data: `dv:completed:${ID}`, message: { message_id: 55, chat: { id: -12345 } } } };

  assert.equal((await worker.fetch(f.webhook(update), f.env)).status, 503);
  assert.equal((await f.env.LEAD_STORE.get(`lead:${ID}`, 'json')).status, 'completed');
  assert.equal(writes, 2);
  assert.equal((await worker.fetch(f.webhook(update), f.env)).status, 200);
  assert.equal(editedKeyboards.length, 2);
  assert.equal(editedKeyboards[1].inline_keyboard[0][0].text, 'Status: Job completed');
  assert.equal(writes, 2);
  assert.equal((await worker.fetch(f.webhook(update), f.env)).status, 200);
  assert.equal(editedKeyboards.length, 3);
  assert.equal(writes, 2);
});
