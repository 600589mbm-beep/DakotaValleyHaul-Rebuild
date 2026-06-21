// Free Telegram bridge for GitHub Pages.
// Deploy this file as a Cloudflare Worker and set these Worker secrets:
// TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, optional TELEGRAM_THREAD_ID.

const ALLOWED_ORIGINS = new Set([
  'https://dakotavalleyjunkremovalservice.com',
  'https://www.dakotavalleyjunkremovalservice.com',
  'https://600589mbm-beep.github.io',
]);

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
  if (photoResponse.ok) return true;

  const documentForm = telegramForm(env);
  documentForm.append('caption', caption);
  documentForm.append('document', file, fileName);
  const documentResponse = await fetch(`${apiBase}/sendDocument`, { method: 'POST', body: documentForm });
  return documentResponse.ok;
}

export default {
  async fetch(request, env) {
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
        needs: token && chatId ? [] : ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'].filter((key) => !clean(env[key])),
      });
    }

    if (request.method !== 'POST') {
      return json(request, { success: false, error: 'Method not allowed.' }, 405);
    }

    if (!token || !chatId) {
      return json(request, { success: false, error: 'Telegram is not configured yet.' }, 500);
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

      const apiBase = `https://api.telegram.org/bot${token}`;
      const estimate = payload.estimateMin && payload.estimateMax
        ? `$${payload.estimateMin} - $${payload.estimateMax}`
        : 'Not provided';

      const message = [
        '<b>New Dakota Valley Booking Request</b>',
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

      if (!messageResponse.ok) {
        return json(request, { success: false, error: 'Telegram rejected the booking message.' }, 502);
      }

      let sentPhotos = 0;
      for (const [index, photo] of photos.entries()) {
        const sent = await sendTelegramFile(apiBase, env, photo, index, photos.length, payload.name);
        if (sent) sentPhotos += 1;
      }

      if (sentPhotos !== photos.length) {
        return json(request, { success: false, error: 'The request was received, but not every photo reached Telegram. Please text the photos as a backup.' }, 502);
      }

      return json(request, { success: true, photos: sentPhotos });
    } catch (error) {
      return json(request, { success: false, error: 'Could not send the booking request.' }, 500);
    }
  },
};
