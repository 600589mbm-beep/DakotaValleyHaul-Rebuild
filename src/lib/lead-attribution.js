// Only recognized campaign values and site-owned canonical paths are retained.
// Never store a full URL, search term, referrer URL, or customer form value.
export const ATTRIBUTION_KEY = 'dv_attribution_v1';
export const PENDING_LEAD_KEY = 'dv_pending_lead_v1';
const PARTIAL_LEAD_KEY = 'dv_partial_lead_v1';
const SESSION_MS = 30 * 60 * 1000;
export const ID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

export function safeSitePath(value) {
  const path = String(value || '').split(/[?#]/)[0];
  return /^\/(?:[a-z-]+\/){0,3}$/.test(path) && path.length <= 180 ? path : '/';
}

export function cleanAttribution(value = {}) {
  const source = ['google', 'bing', 'facebook', 'direct', 'other'].includes(value.source) ? value.source : 'direct';
  const medium = ['organic', 'referral', 'none'].includes(value.medium) ? value.medium : 'none';
  return {
    source,
    medium,
    campaign: source === 'google' && medium === 'organic' && value.campaign === 'google_business_profile' ? 'google_business_profile' : '',
    landing_path: safeSitePath(value.landing_path),
    session_id: ID_PATTERN.test(value.session_id || '') ? value.session_id : '',
  };
}

export function randomId(view = globalThis) {
  if (view.crypto?.randomUUID) return view.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  view.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  return [...bytes].map((byte, index) => ([4, 6, 8, 10].includes(index) ? '-' : '') + byte.toString(16).padStart(2, '0')).join('');
}

function readStorage(view, key) {
  try { return JSON.parse(view.sessionStorage.getItem(key) || 'null'); } catch { return null; }
}
function writeStorage(view, key, value) {
  try { view.sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* private browsing must not block a quote */ }
}

export function captureAttribution(view, now = Date.now()) {
  const cached = view.__dvAttribution || readStorage(view, ATTRIBUTION_KEY);
  if (cached && ID_PATTERN.test(cached.session_id || '') && now - cached.last_seen < SESSION_MS) {
    const record = { ...cleanAttribution(cached), last_seen: now, reported: Boolean(cached.reported) };
    view.__dvAttribution = record;
    writeStorage(view, ATTRIBUTION_KEY, record);
    return record;
  }
  const query = new view.URLSearchParams(view.location.search);
  const fromProfile = query.get('utm_source') === 'google' && query.get('utm_medium') === 'organic' && query.get('utm_campaign') === 'google_business_profile';
  let source = fromProfile ? 'google' : 'direct';
  let medium = fromProfile ? 'organic' : 'none';
  try {
    const referrer = new view.URL(view.document.referrer);
    if (referrer.origin !== view.location.origin && !fromProfile) {
      if (/(^|\.)google\.[a-z.]+$/.test(referrer.hostname)) { source = 'google'; medium = 'organic'; }
      else if (/(^|\.)bing\.com$/.test(referrer.hostname)) { source = 'bing'; medium = 'organic'; }
      else if (/(^|\.)facebook\.com$/.test(referrer.hostname)) { source = 'facebook'; medium = 'referral'; }
      else { source = 'other'; medium = 'referral'; }
    }
  } catch { /* no external referrer */ }
  let landingPath = '/';
  try {
    const canonical = view.document.querySelector('link[rel="canonical"]')?.href;
    if (canonical) landingPath = new view.URL(canonical).pathname;
  } catch { /* default to homepage; never fall back to arbitrary user URLs */ }
  const record = { ...cleanAttribution({ source, medium, campaign: fromProfile ? 'google_business_profile' : '', landing_path: landingPath, session_id: randomId(view) }), last_seen: now, reported: false };
  view.__dvAttribution = record;
  writeStorage(view, ATTRIBUTION_KEY, record);
  return record;
}

export function markVisitReported(view) {
  const record = captureAttribution(view);
  record.reported = true;
  writeStorage(view, ATTRIBUTION_KEY, record);
}

export function pendingLeadId(view) {
  const saved = view.__dvPendingLead || readStorage(view, PENDING_LEAD_KEY);
  const id = ID_PATTERN.test(saved || '') ? saved : randomId(view);
  view.__dvPendingLead = id;
  writeStorage(view, PENDING_LEAD_KEY, id);
  return id;
}

export function clearPendingLead(view) {
  delete view.__dvPendingLead;
  delete view.__dvPartialLead;
  try {
    view.sessionStorage.removeItem(PENDING_LEAD_KEY);
    view.sessionStorage.removeItem(PARTIAL_LEAD_KEY);
  } catch { /* optional persistence */ }
}

export function markPendingLeadPartial(view) {
  const id = pendingLeadId(view);
  view.__dvPartialLead = id;
  writeStorage(view, PARTIAL_LEAD_KEY, id);
}

export function hasPartialPendingLead(view) {
  const partial = view.__dvPartialLead || readStorage(view, PARTIAL_LEAD_KEY);
  const pending = view.__dvPendingLead || readStorage(view, PENDING_LEAD_KEY);
  return ID_PATTERN.test(partial || '') && partial === pending;
}

export function attributionDetails(attribution, leadId) {
  const data = cleanAttribution(attribution);
  return [
    '[Website lead reference]',
    `Lead ID: ${ID_PATTERN.test(leadId || '') ? leadId : 'unavailable'}`,
    `Source: ${data.source} / ${data.medium}`,
    `Campaign: ${data.campaign || 'none'}`,
    `Landing page: ${data.landing_path}`,
  ].join('\n');
}
