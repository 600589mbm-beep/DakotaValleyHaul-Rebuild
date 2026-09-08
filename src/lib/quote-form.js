import { attributionDetails, captureAttribution, cleanAttribution, clearPendingLead, hasPartialPendingLead, markPendingLeadPartial, pendingLeadId } from './lead-attribution.js';

// Customer upload limits keep a photo quote practical on a mobile connection.
// The existing Worker accepts the same repeated `photos` multipart field.
export const PHOTO_LIMITS = Object.freeze({ count: 6, perFile: 10 * 1024 * 1024, total: 25 * 1024 * 1024 });

const requiredMessages = {
  name: 'Enter your name.',
  phone: 'Enter a phone number so we can text your quote.',
  address: 'Enter the street address for pickup.',
  city: 'Enter your city, county or ZIP code.',
  details: 'Tell us which items you need removed.',
};

export function validateQuoteField(name, value, photos = []) {
  if (name === 'photos') return photos.length ? '' : 'Add at least one photo of the items for your written quote.';
  const text = String(value || '').trim();
  if (!text) return requiredMessages[name] || 'Complete this field.';
  if (name === 'phone') {
    const digits = text.replace(/\D/g, '');
    if (!/^\+?[\d\s().-]+$/.test(text) || !(digits.length === 10 || (digits.length === 11 && digits.startsWith('1')))) {
      return 'Enter a 10-digit US phone number, with an optional +1 country code.';
    }
  }
  return '';
}

function isPhoto(file) {
  const type = String(file.type || '').toLowerCase();
  if (/^image\/(jpeg|png|webp|heic|heif|heic-sequence|heif-sequence)$/.test(type)) return true;
  return (!type || type === 'application/octet-stream') && /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);
}

function photoKey(file) {
  return JSON.stringify([file.name, file.size, file.lastModified, file.type]);
}

export function addQuotePhotos(current, incoming) {
  const photos = [...current];
  const keys = new Set(current.map(photoKey));
  const errors = [];
  let bytes = photos.reduce((sum, file) => sum + file.size, 0);
  let duplicates = 0;

  for (const file of incoming) {
    if (keys.has(photoKey(file))) { duplicates += 1; continue; }
    let error = '';
    if (!isPhoto(file)) error = 'Use a JPG, PNG, WebP or HEIC/HEIF photo.';
    else if (!file.size) error = 'This file is empty. Choose another photo.';
    else if (file.size > PHOTO_LIMITS.perFile) error = 'This photo is over 10 MB. Choose a smaller copy.';
    else if (photos.length >= PHOTO_LIMITS.count) error = 'The limit is 6 photos. Remove one before adding another.';
    else if (bytes + file.size > PHOTO_LIMITS.total) error = 'The total limit is 25 MB. Remove a photo or choose a smaller copy.';
    if (error) { errors.push(`${file.name}: ${error}`); continue; }
    photos.push(file);
    bytes += file.size;
    keys.add(photoKey(file));
  }
  return { photos, errors, duplicates };
}

export function quoteFailureMessage(httpStatus, error = '') {
  if (/request was received.*not every photo/i.test(error)) {
    return 'Your quote details were received, but some photos did not arrive. Please text the photos to (952) 232-5107 instead of resubmitting the form. Your details and photos are still here.';
  }
  if (httpStatus === 413) {
    return 'The upload was too large to send. Your details and photos are still here. Remove a photo or choose smaller photos, then try again. You can also text the photos to (952) 232-5107.';
  }
  if (httpStatus === 429) {
    return 'There have been too many requests. Your details and photos are still here. Wait a minute before trying again, or text us at (952) 232-5107.';
  }
  if (httpStatus === 400) {
    return 'The request could not be accepted. Your details and photos are still here. Check the required fields and attach at least one photo, then try again. If it still fails, text us at (952) 232-5107.';
  }
  return 'We could not confirm that your quote request arrived. Your details and photos are still here. Check with us by text at (952) 232-5107 before trying again so your request is not sent twice.';
}

export function initQuoteForm(root = document) {
  const view = root.defaultView;
  const form = root.getElementById('tg-form');
  const status = root.getElementById('tg-form-status');
  const submit = form?.querySelector('.tg-form-submit');
  const submitLabel = form?.querySelector('.tg-submit-label');
  const photoInput = root.getElementById('tg-photos');
  const photoList = root.getElementById('tg-photo-list');
  const photoCount = root.getElementById('tg-photos-count');
  const photoNotice = root.getElementById('tg-photos-notice');
  const workerUrl = form?.dataset.workerUrl;
  if (!view || !form || !status || !submit || !submitLabel || !photoInput || !photoList || !photoCount || !photoNotice || !workerUrl || form.dataset.enhanced) return;

  form.dataset.enhanced = 'true';
  // Custom validation replaces native bubbles only after the form is enhanced.
  // Required attributes still provide a native fallback without JavaScript.
  form.noValidate = true;
  let started = false;
  let sending = false;
  let photos = [];
  let previewUrls = [];
  const fieldNames = ['name', 'phone', 'address', 'city', 'photos', 'details'];
  const track = (event, parameters) => {
    // Analytics must never interrupt a customer's quote request.
    try { if (typeof view.dvTrack === 'function') view.dvTrack(event, parameters); } catch { /* optional analytics */ }
  };
  const field = (name) => form.elements.namedItem(name);
  const cityParameter = new view.URLSearchParams(view.location.search).get('city');
  if (cityParameter && !field('city').value) field('city').value = cityParameter.trim().slice(0, 100);
  const setFieldError = (name, message) => {
    const input = field(name);
    const error = root.getElementById(`tg-${name}-error`);
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    if (error) { error.textContent = message; error.hidden = !message; }
    return !message;
  };
  const validateField = (name) => setFieldError(name, validateQuoteField(name, field(name).value, photos));
  const setStatus = (kind, message) => {
    status.className = `tg-form-status is-${kind}`;
    status.textContent = message;
  };
  const clearPreviews = () => {
    previewUrls.forEach((url) => view.URL.revokeObjectURL(url));
    previewUrls = [];
  };
  const formatSize = (bytes) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  const renderPhotos = () => {
    clearPreviews();
    photoList.replaceChildren();
    photoList.hidden = photos.length === 0;
    const total = photos.reduce((sum, file) => sum + file.size, 0);
    photoCount.textContent = photos.length ? `${photos.length} of ${PHOTO_LIMITS.count} photos selected · ${formatSize(total)} of 25 MB` : 'No photos selected.';
    photos.forEach((file, index) => {
      const item = root.createElement('li');
      item.className = 'tg-photo-card';
      const preview = root.createElement('img');
      preview.className = 'tg-photo-preview';
      preview.alt = `Selected photo: ${file.name}`;
      const unavailable = root.createElement('p');
      unavailable.className = 'tg-photo-unavailable';
      unavailable.textContent = 'Preview unavailable. The original photo will still be sent.';
      unavailable.hidden = true;
      preview.addEventListener('error', () => { preview.hidden = true; unavailable.hidden = false; });
      const url = view.URL.createObjectURL(file);
      previewUrls.push(url);
      preview.src = url;
      const name = root.createElement('p');
      name.className = 'tg-photo-name';
      name.textContent = file.name;
      const size = root.createElement('p');
      size.className = 'tg-photo-size';
      size.textContent = formatSize(file.size);
      const remove = root.createElement('button');
      remove.type = 'button';
      remove.className = 'tg-photo-remove';
      remove.textContent = 'Remove photo';
      remove.setAttribute('aria-label', `Remove ${file.name}`);
      remove.addEventListener('click', () => {
        if (sending) return;
        photos.splice(index, 1);
        renderPhotos();
        validateField('photos');
        photoNotice.textContent = `${file.name} removed.`;
        const buttons = photoList.querySelectorAll('button');
        (buttons[Math.min(index, buttons.length - 1)] || photoInput).focus();
      });
      item.append(preview, unavailable, name, size, remove);
      photoList.append(item);
    });
  };

  const startAnother = root.createElement('button');
  startAnother.type = 'button';
  startAnother.className = 'button secondary tg-start-another';
  startAnother.textContent = 'Start another quote';
  startAnother.setAttribute('aria-describedby', status.id);
  const updateStartAnother = () => {
    startAnother.hidden = !hasPartialPendingLead(view);
    // Keep the hidden state authoritative over the shared button display rule.
    startAnother.style.display = startAnother.hidden ? 'none' : '';
  };
  updateStartAnother();
  status.after(startAnother);
  if (!startAnother.hidden) {
    setStatus('error', 'Your earlier quote details were received, but some photos did not arrive. Text missing photos to (952) 232-5107. For a separate pickup request, choose Start another quote.');
  }
  startAnother.addEventListener('click', () => {
    if (sending) return;
    clearPendingLead(view);
    form.reset();
    photos = [];
    renderPhotos();
    photoNotice.textContent = '';
    fieldNames.forEach((name) => setFieldError(name, ''));
    started = false;
    updateStartAnother();
    setStatus('success', 'A new quote form is ready for a separate pickup request. Your earlier quote details were already received; text any missing photos for that request to (952) 232-5107.');
    field('name').focus();
  });

  form.addEventListener('focusin', () => {
    if (!started) { started = true; track('quote_form_started', { step: 'full' }); }
  });
  for (const name of fieldNames.filter((name) => name !== 'photos')) {
    const input = field(name);
    input.addEventListener('blur', () => validateField(name));
    input.addEventListener('input', () => {
      if (input.hasAttribute('aria-invalid')) validateField(name);
    });
  }
  photoInput.addEventListener('change', () => {
    const result = addQuotePhotos(photos, Array.from(photoInput.files || []));
    photos = result.photos;
    // Retain selections separately so choosing more photos adds to the list.
    photoInput.value = '';
    renderPhotos();
    validateField('photos');
    photoNotice.textContent = result.errors.join('\n') || (result.duplicates ? 'Photos already selected were skipped.' : '');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || field('botcheck').checked) return;
    const invalid = fieldNames.filter((name) => !validateField(name));
    if (invalid.length) {
      setStatus('error', `Please check ${invalid.length === 1 ? 'the highlighted field' : `the ${invalid.length} highlighted fields`} before sending your quote request.`);
      field(invalid[0]).focus();
      return;
    }

    const data = new view.FormData(form);
    data.delete('photos');
    photos.forEach((file) => data.append('photos', file, file.name));
    fieldNames.filter((name) => name !== 'photos').forEach((name) => data.set(name, field(name).value.trim()));
    const attribution = cleanAttribution(captureAttribution(view));
    const leadId = pendingLeadId(view);
    data.set('leadId', leadId);
    data.set('attribution', JSON.stringify(attribution));
    // Older deployed bridges forward details unchanged, so source/reference
    // remain useful even before the upgraded Worker reaches production.
    data.set('details', `${field('details').value.trim()}\n\n${attributionDetails(attribution, leadId)}`);
    sending = true;
    form.setAttribute('aria-busy', 'true');
    const controls = Array.from(form.querySelectorAll('input, textarea, button'));
    controls.forEach((control) => { control.disabled = true; });
    submitLabel.textContent = 'Sending your request…';
    setStatus('sending', 'Sending your details and photos. This can take a moment on a mobile connection.');
    const controller = new view.AbortController();
    const timeout = view.setTimeout(() => controller.abort(), 90000);

    try {
      const response = await view.fetch(workerUrl, { method: 'POST', body: data, signal: controller.signal });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result?.success === true) {
        clearPendingLead(view);
        form.reset();
        photos = [];
        renderPhotos();
        photoNotice.textContent = '';
        fieldNames.forEach((name) => setFieldError(name, ''));
        setStatus('success', 'Your quote request was received. We will text you the total price and available pickup windows. You approve the price before confirming pickup; this request does not reserve an appointment.');
        track('quote_form_submitted', { step: 'full', delivery: 'received' });
      } else {
        setStatus('error', quoteFailureMessage(response.status, typeof result?.error === 'string' ? result.error : ''));
        const partial = result?.received === true || /request was received.*not every photo/i.test(result?.error || '');
        if (partial) markPendingLeadPartial(view);
        track(partial ? 'quote_form_partial' : 'quote_form_failed', { step: 'full', delivery: partial ? 'partial' : 'failed' });
      }
    } catch {
      setStatus('error', quoteFailureMessage(0));
      track('quote_form_failed', { step: 'full', delivery: 'failed' });
    } finally {
      view.clearTimeout(timeout);
      sending = false;
      form.removeAttribute('aria-busy');
      controls.forEach((control) => { control.disabled = false; });
      updateStartAnother();
      submitLabel.textContent = 'Request my written quote';
      status.focus();
    }
  });
  view.addEventListener('pagehide', clearPreviews);
  view.addEventListener('pageshow', (event) => { if (event.persisted) renderPhotos(); });
}
