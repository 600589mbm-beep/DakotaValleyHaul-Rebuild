// CI-only setup using the existing Cloudflare/Telegram deployment credentials.
// Never print credential values, Telegram response bodies or webhook URLs.
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { createHmac } from 'node:crypto';
import { WORKER_URL } from '../src/data/booking.js';

const mode = process.argv[2];
const token = process.env.TELEGRAM_BOT_TOKEN;
const cfToken = process.env.CLOUDFLARE_API_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const target = `${WORKER_URL}/telegram-webhook`;
const namespaceTitle = 'dakota-valley-lead-reporting';
const webhookSecret = token ? createHmac('sha256', token).update('dakota-valley-lead-webhook-v1').digest('hex') : '';

async function telegram(method, payload) {
  let response;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload || {}), signal: AbortSignal.timeout(20000),
    });
  } catch { throw new Error(`Telegram ${method} could not be reached.`); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok !== true) throw new Error(`Telegram ${method} failed (HTTP ${response.status}).`);
  return data.result;
}

async function assertWebhookAvailable() {
  const current = await telegram('getWebhookInfo');
  if (current.url && current.url !== target) {
    throw new Error('The bot already has a different webhook. Existing integration preserved. Review it before enabling lead status reporting.');
  }
}

async function cloudflare(path, options = {}) {
  let response;
  try {
    response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}${path}`, {
      ...options, headers: { Authorization: `Bearer ${cfToken}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(20000),
    });
  } catch { throw new Error('Cloudflare KV setup could not be reached.'); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(`Cloudflare KV setup failed (HTTP ${response.status}, code ${Number(data.errors?.[0]?.code) || 'unknown'}). The existing token needs Workers KV Storage edit permission.`);
  return data;
}

try {
  if (!token) throw new Error('The existing TELEGRAM_BOT_TOKEN deployment secret is required.');
  if (mode === 'prepare') {
    if (!cfToken || !account || !process.env.GITHUB_ENV) throw new Error('Run setup in the authorized Worker deployment workflow with its existing Cloudflare secrets.');
    await assertWebhookAvailable();
    let namespace;
    for (let page = 1; page <= 100; page += 1) {
      const data = await cloudflare(`/storage/kv/namespaces?per_page=100&page=${page}`);
      namespace = data.result.find(item => item.title === namespaceTitle);
      if (namespace || data.result.length < 100) break;
    }
    if (!namespace) {
      const data = await cloudflare('/storage/kv/namespaces', { method: 'POST', body: JSON.stringify({ title: namespaceTitle }) });
      namespace = data.result;
    }
    if (!/^[a-f0-9]{32}$/i.test(namespace.id || '')) throw new Error('Cloudflare returned an invalid namespace identifier.');
    const config = await readFile('wrangler.toml', 'utf8');
    if (/binding\s*=\s*["']LEAD_STORE["']/.test(config)) throw new Error('LEAD_STORE is already configured in wrangler.toml. Keep a single namespace binding.');
    await writeFile('wrangler.generated.toml', `${config}\n[[kv_namespaces]]\nbinding = "LEAD_STORE"\nid = "${namespace.id}"\n`);
    // A stable, domain-separated secret avoids rotating the webhook on ordinary deploys.
    console.log(`::add-mask::${webhookSecret}`);
    await appendFile(process.env.GITHUB_ENV, `TELEGRAM_WEBHOOK_SECRET=${webhookSecret}\n`);
    console.log('Lead reporting storage prepared. Existing bot integration preflight passed.');
  } else if (mode === 'register') {
    await assertWebhookAvailable();
    let health;
    try { health = await fetch(WORKER_URL, { signal: AbortSignal.timeout(20000) }).then(response => response.json()); }
    catch { throw new Error('Cannot verify deployed Worker health. Webhook registration skipped.'); }
    if (!health.configured || !health.attributionStorage || !health.crewStatusTracking) throw new Error('Deployed Worker is not ready for stored lead status reporting.');
    await telegram('setWebhook', { url: target, secret_token: webhookSecret, allowed_updates: ['message', 'callback_query'], max_connections: 1, drop_pending_updates: false });
    const result = await telegram('getWebhookInfo');
    if (result.url !== target) throw new Error('Telegram webhook verification failed.');
    console.log('Private lead status webhook registered and verified. No test messages were sent.');
  } else {
    throw new Error('Usage: node scripts/configure-lead-tracking.mjs prepare|register');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
