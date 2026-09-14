// Free Telegram bridge for GitHub Pages.
// Deploy this file as a Cloudflare Worker and set these Worker secrets:
// TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, optional TELEGRAM_THREAD_ID.
import { cleanAttribution, ID_PATTERN } from './src/lib/lead-attribution.js';
import { handleTelegramWebhook, leadButtons, readLead, recordVisit, saveLead, trackingEnabled } from './worker/lead-tracking.js';

const ALLOWED_ORIGINS = new Set([
  'https://dakotavalleyjunkremovalservice.com',
  'https://www.dakotavalleyjunkremovalservice.com',
  'https://jsmcommercialservice.com',
  'https://www.jsmcommercialservice.com',
  'https://600589mbm-beep.github.io',
]);

const JSM_PATHS = new Set(['/jsm', '/jsm/']);
const JSM_THANK_YOU_URL = 'https://jsmcommercialservice.com/thank-you/';
const JSM_RESERVED_FIELDS = new Set(['_subject', '_next', '_gotcha']);
const JSM_FIELD_ORDER = [
  'name',
  'company',
  'phone',
  'email',
  'best_contact_time',
  'contact_method',
  'facility_type',
  'building_name',
  'building_address',
  'city_zip',
  'number_of_locations',
  'frequency',
  'square_footage',
  'parking_capacity',
  'sidewalk_area',
  'services_needed',
  'trigger_depth',
  'business_hours',
  'open_by_time',
  'weekend_operation',
  'loading_access',
  'priority_areas',
  'current_challenge',
  'walkthrough_date',
  'walkthrough_time',
  'alternate_date',
  'rfp_due_date',
  'document_url',
  'rfp_notes',
  'contact_permission',
  'walkthrough_timezone',
];
const JSM_FIELD_LABELS = {
  name: 'Name',
  company: 'Company / management firm',
  phone: 'Phone',
  email: 'Email',
  best_contact_time: 'Best contact time',
  contact_method: 'Preferred contact method',
  facility_type: 'Facility / property type',
  building_name: 'Property / building name',
  building_address: 'Property address',
  city_zip: 'City / ZIP',
  number_of_locations: 'Number of locations',
  frequency: 'Service / agreement type',
  square_footage: 'Facility / lot size',
  parking_capacity: 'Parking capacity',
  sidewalk_area: 'Sidewalk area',
  services_needed: 'Services requested',
  trigger_depth: 'Snow trigger depth',
  business_hours: 'Business hours',
  open_by_time: 'Preferred open-by time',
  weekend_operation: 'Weekend operation',
  loading_access: 'Loading / delivery access',
  priority_areas: 'Priority areas / requirements',
  current_challenge: 'Service priorities / notes',
  walkthrough_date: 'Preferred site-walk date',
  walkthrough_time: 'Preferred site-walk time',
  alternate_date: 'Alternate date',
  rfp_due_date: 'Proposal / RFP due date',
  document_url: 'RFP / site-plan link',
  rfp_notes: 'RFP requirements / instructions',
  contact_permission: 'Contact permission',
  walkthrough_timezone: 'Walkthrough timezone',
};

function clean(value) {
  return String(value || '').trim();
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'https://dakotavalleyjunkremovalservice.com';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(request),
      'content-type': 'application/json; charset=utf-8',
    },
  });
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));
}

function titleCase(value) {
  const text = clean(value).replace(/[-_]+/g, ' ');
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'Not provided';
}

function telegramBody(env, body) {
  const payload = { chat_id: env.TELEGRAM_CHAT_ID, ...body };
  if (env.TELEGRAM_THREAD_ID) payload.message_thread_id = Number(env.TELEGRAM_THREAD_ID);
  return payload;
}

function telegramForm(env) {
  const form = new FormData();
  form.append('chat_id', env.TELEGRAM_CHAT_ID);
  if (env.TELEGRAM_THREAD_ID) form.append('message_thread_id', env.TELEGRAM_THREAD_ID);
  return form;
}

async function sendTelegramFile(apiBase, env, file, index, total, customerName) {
  const fileName = file.name || `job-photo-${index + 1}.jpg`;
  const caption = `Photo ${index + 1} of ${total} - ${customerName}`.slice(0, 1024);

  const photoForm = telegramForm(env);
  photoForm.append('caption', caption);
  photoForm.append('photo', file, fileName);
  const photoResponse = await fetch(`${apiBase}/sendPhoto`, { method: 'POST', body: photoForm });
  const photoResult = await photoResponse.json().catch(() => ({}));
  if (photoResponse.ok && photoResult.ok === true) return true;

  const documentForm = telegramForm(env);
  documentForm.append('caption', caption);
  documentForm.append('document', file, fileName);
  const documentResponse = await fetch(`${apiBase}/sendDocument`, { method: 'POST', body: documentForm });
  const documentResult = await documentResponse.json().catch(() => ({}));
  return documentResponse.ok && documentResult.ok === true;
}

function jsmValue(formData, key) {
  const values = formData.getAll(key).map((value) => clean(value)).filter(Boolean);
  return [...new Set(values)].join(', ');
}

function jsmTitle(formData) {
  const formType = clean(formData.get('form_type')).toLowerCase();
  const isSnow = formType.includes('snow');
  const isSiteWalk = Boolean(
    clean(formData.get('building_name'))
    || clean(formData.get('walkthrough_date'))
    || clean(formData.get('rfp_due_date'))
  );
  if (isSnow && isSiteWalk) return '❄️ NEW JSM SNOW SITE-WALK / RFP REQUEST';
  if (isSnow) return '❄️ NEW JSM SNOW QUOTE REQUEST';
  return '🧹 NEW JSM FACILITY / CLEANING REQUEST';
}

function jsmMessage(formData) {
  const formType = clean(formData.get('form_type')) || 'commercial-services';
  const lines = [
    jsmTitle(formData),
    'Source: jsmcommercialservice.com',
    `Request type: ${titleCase(formType)}`,
    '',
  ];
  const seen = new Set(['form_type']);

  const addField = (key) => {
    if (seen.has(key) || JSM_RESERVED_FIELDS.has(key)) return;
    const value = jsmValue(formData, key);
    seen.add(key);
    if (!value) return;
    const label = JSM_FIELD_LABELS[key] || titleCase(key);
    lines.push(`${label}: ${value}`);
  };

  for (const key of JSM_FIELD_ORDER) addField(key);
  for (const [key] of formData.entries()) addField(key);
  return lines.join('\n');
}

function telegramTextChunks(text, maxLength = 3800) {
  const chunks = [];
  let current = '';
  for (const line of String(text).split('\n')) {
    if (line.length > maxLength) {
      if (current) {
        chunks.push(current);
        current = '';
      }
      for (let offset = 0; offset < line.length; offset += maxLength) {
        chunks.push(line.slice(offset, offset + maxLength));
      }
      continue;
    }
    const next = current ? `${current}\n${line}` : line;
    if (next.length > maxLength) {
      if (current) chunks.push(current);
      current = line;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);
  return chunks.length ? chunks : ['JSM form submission received.'];
}

async function sendTelegramText(apiBase, env, text) {
  const chunks = telegramTextChunks(text);
  for (const [index, chunk] of chunks.entries()) {
    const messageText = index === 0 ? chunk : `JSM lead continued (${index + 1}/${chunks.length})\n${chunk}`;
    const response = await fetch(`${apiBase}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(telegramBody(env, {
        text: messageText,
        disable_web_page_preview: true,
      })),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok !== true) return false;
  }
  return true;
}

async function handleJsmForm(request, env, apiBase) {
  const formData = await request.formData();

  // Quietly accept honeypot submissions so bots do not learn how the filter works.
  if (clean(formData.get('_gotcha'))) return Response.redirect(JSM_THANK_YOU_URL, 303);

  const required = ['name', 'phone', 'city_zip', 'facility_type', 'frequency'];
  const missing = required.filter((field) => !clean(formData.get(field)));
  if (missing.length) {
    return json(request, { success: false, error: `Missing ${missing.join(', ')}.` }, 400);
  }

  const sent = await sendTelegramText(apiBase, env, jsmMessage(formData));
  if (!sent) {
    return json(request, { success: false, received: false, error: 'Telegram rejected the JSM form submission.' }, 502);
  }

  return Response.redirect(JSM_THANK_YOU_URL, 303);
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/telegram-webhook') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
      try { return await handleTelegramWebhook(request, env); }
      catch { return new Response('Could not process update; Telegram may retry.', { status: 503 }); }
    }
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    const token = clean(env.TELEGRAM_BOT_TOKEN);
    const chatId = clean(env.TELEGRAM_CHAT_ID);

    if (request.method === 'GET') {
      return json(request, {
        success: true,
        endpoint: 'dakota-valley-telegram-worker',
        configured: Boolean(token && chatId),
        attributionStorage: Boolean(env.LEAD_STORE),
        crewStatusTracking: trackingEnabled(env),
        needs: token && chatId ? [] : ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'].filter((key) => !clean(env[key])),
      });
    }

    if (request.method !== 'POST') {
      return json(request, { success: false, error: 'Method not allowed.' }, 405);
    }

    const origin = request.headers.get('Origin');
    if (origin && !ALLOWED_ORIGINS.has(origin)) return json(request, { success: false, error: 'Origin not allowed.' }, 403);
    if (path === '/events') {
      if (!origin || !ALLOWED_ORIGINS.has(origin)) return json(request, { recorded: false }, 403);
      try { return json(request, await recordVisit(request, env)); }
      catch { return json(request, { recorded: false }, 400); }
    }

    if (!token || !chatId) {
      return json(request, { success: false, error: 'Telegram is not configured yet.' }, 500);
    }

    const apiBase = `https://api.telegram.org/bot${token}`;
    if (JSM_PATHS.has(path)) {
      try { return await handleJsmForm(request, env, apiBase); }
      catch { return json(request, { success: false, error: 'Could not send the JSM request.' }, 500); }
    }

    try {
      const formData = await request.formData();
      const photos = formData
        .getAll('photos')
        .filter((file) => file && typeof file.arrayBuffer === 'function' && file.size > 0);

      const payload = {
        name: clean(formData.get('name')),
        phone: clean(formData.get('phone')),
        address: clean(formData.get('address')),
        city: clean(formData.get('city')),
        date: clean(formData.get('date')),
        details: clean(formData.get('details')),
        service: clean(formData.get('service')),
        loadSize: clean(formData.get('loadSize')),
        pickupSpot: clean(formData.get('pickupSpot')),
        preferredWindow: clean(formData.get('preferredWindow')),
        estimateMin: clean(formData.get('estimateMin')),
        estimateMax: clean(formData.get('estimateMax')),
      };

      const missing = ['name', 'phone', 'address', 'city', 'details'].filter((field) => !payload[field]);
      if (missing.length) {
        return json(request, { success: false, error: `Missing ${missing.join(', ')}.` }, 400);
      }

      if (!photos.length) {
        return json(request, { success: false, error: 'Please upload at least one photo.' }, 400);
      }

      if (photos.length > 6 || photos.some((photo) => photo.size > 10 * 1024 * 1024) || photos.reduce((sum, photo) => sum + photo.size, 0) > 25 * 1024 * 1024) {
        return json(request, { success: false, error: 'Use up to 6 photos, 10 MB each and 25 MB total.' }, 413);
      }
      const suppliedId = clean(formData.get('leadId'));
      const leadId = ID_PATTERN.test(suppliedId) ? suppliedId : crypto.randomUUID();
      let attribution = cleanAttribution();
      try { attribution = cleanAttribution(JSON.parse(clean(formData.get('attribution')) || '{}')); } catch { /* optional attribution never blocks a quote */ }
      let existing = null;
      try { existing = await readLead(env, leadId); } catch { /* Telegram remains available if reporting storage is down */ }
      if (existing) {
        return json(request, existing.delivery === 'received'
          ? { success: true, received: true, leadId, photos: existing.photos, duplicate: true }
          : { success: false, received: true, leadId, error: 'The request was received, but not every photo reached Telegram. Please text the photos as a backup.' }, existing.delivery === 'received' ? 200 : 502);
      }

      const estimate = payload.estimateMin && payload.estimateMax
        ? `$${payload.estimateMin} - $${payload.estimateMax}`
        : 'Not provided';

      const message = [
        '<b>New Dakota Valley Quote Request</b>',
        `<b>Lead ID:</b> ${leadId}`,
        '<i>A quote request is not a confirmed pickup. Send the written price, obtain approval, then confirm a window.</i>',
        '',
        `<b>Name:</b> ${escapeHtml(payload.name)}`,
        `<b>Phone:</b> ${escapeHtml(payload.phone)}`,
        `<b>Pickup address:</b> ${escapeHtml(payload.address)}`,
        `<b>City/county:</b> ${escapeHtml(payload.city)}`,
        `<b>Service:</b> ${escapeHtml(payload.service || 'Junk pickup')}`,
        `<b>Load size:</b> ${escapeHtml(titleCase(payload.loadSize))}`,
        `<b>Pickup spot:</b> ${escapeHtml(titleCase(payload.pickupSpot))}`,
        `<b>Preferred date:</b> ${escapeHtml(payload.date)}`,
        `<b>Preferred window:</b> ${escapeHtml(titleCase(payload.preferredWindow))}`,
        `<b>Estimate shown:</b> ${escapeHtml(estimate)}`,
        `<b>Photos:</b> ${photos.length}`,
        '',
        `<b>Details:</b> ${escapeHtml(payload.details)}`,
      ].join('\n');

      const messageResponse = await fetch(`${apiBase}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify(telegramBody(env, {
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        })),
      });

      const messageResult = await messageResponse.json().catch(() => ({}));
      if (!messageResponse.ok || messageResult.ok !== true || !messageResult.result?.message_id) {
        return json(request, { success: false, received: false, error: 'Telegram rejected the quote message.' }, 502);
      }

      const lead = {
        id: leadId, attribution, status: 'received', delivery: 'partial', photos: 0,
        message_id: messageResult.result.message_id,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      };
      let trackingSaved = false;
      try { trackingSaved = await saveLead(env, lead); } catch { /* a reporting outage must not lose the customer's request */ }

      let sentPhotos = 0;
      for (const [index, photo] of photos.entries()) {
        try {
          const sent = await sendTelegramFile(apiBase, env, photo, index, photos.length, payload.name);
          if (sent) sentPhotos += 1;
        } catch { /* details were received; preserve the partial-delivery acknowledgement */ }
      }

      lead.photos = sentPhotos;
      lead.delivery = sentPhotos === photos.length ? 'received' : 'partial';
      lead.updated_at = new Date().toISOString();
      try { trackingSaved = await saveLead(env, lead); } catch { /* Telegram message retains the lead reference */ }
      // Show crew status controls only after delivery finishes, so a crew tap
      // cannot be overwritten by the in-flight photo-delivery update.
      if (trackingEnabled(env) && trackingSaved) {
        try {
          await fetch(`${apiBase}/editMessageReplyMarkup`, {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, message_id: lead.message_id, reply_markup: leadButtons(leadId) }),
          });
        } catch { /* quote delivery is already acknowledged independently */ }
      }

      if (sentPhotos !== photos.length) {
        return json(request, { success: false, received: true, leadId, error: 'The request was received, but not every photo reached Telegram. Please text the photos as a backup.' }, 502);
      }

      return json(request, { success: true, received: true, leadId, photos: sentPhotos, trackingSaved });
    } catch (error) {
      return json(request, { success: false, error: 'Could not send the quote request.' }, 500);
    }
  },
};