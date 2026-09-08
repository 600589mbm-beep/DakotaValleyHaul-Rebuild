import { captureAttribution, cleanAttribution, markVisitReported, safeSitePath } from './lead-attribution.js';

const EVENTS = new Set(['profile_landing', 'quote_form_started', 'quote_form_submitted', 'quote_form_partial', 'quote_form_failed', 'quote_helper_opened', 'pricing_view', 'sms_click', 'phone_click', 'reviews_click', 'city_click', 'county_click', 'service_click', 'guide_click']);

export function safeEventProps(props = {}) {
  const result = {};
  if (['full', 'quick'].includes(props.step)) result.step = props.step;
  if (['received', 'partial', 'failed'].includes(props.delivery)) result.delivery = props.delivery;
  if (props.target_path) result.target_path = safeSitePath(props.target_path);
  return result;
}

export function initLeadTracking(root = document) {
  const view = root.defaultView;
  if (!view || view.__dvTrackingInitialized) return;
  view.__dvTrackingInitialized = true;
  const attribution = captureAttribution(view);
  view.dataLayer = view.dataLayer || [];
  view.dvTrack = (event, raw = {}) => {
    if (!EVENTS.has(event)) return;
    const props = safeEventProps(raw);
    view.dataLayer.push({ event: `dv_${event}`, ...props });
    try { view.dispatchEvent(new view.CustomEvent(`dv:${event}`, { detail: props })); } catch { /* optional analytics */ }
    try { view.gtag?.('event', event, props); } catch { /* optional analytics */ }
    try {
      if (event === 'quote_form_submitted' && props.step === 'full') view.fbq?.('track', 'Lead', { content_name: 'Written quote request', ...props });
      else if (event === 'sms_click' || event === 'phone_click') view.fbq?.('track', 'Contact', { contact_method: event === 'sms_click' ? 'sms' : 'phone' });
      else view.fbq?.('trackCustom', `DV_${event}`, props);
    } catch { /* optional analytics */ }
  };
  // One anonymous session record; the Worker ignores events until storage is configured.
  const endpoint = root.getElementById('dv-tracking-config')?.dataset.endpoint;
  if (endpoint && !attribution.reported) {
    view.fetch(`${endpoint.replace(/\/$/, '')}/events`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ event: 'visit', ...cleanAttribution(attribution) }), keepalive: true,
    }).then((response) => response.json()).then((result) => {
      if (result?.recorded === true) markVisitReported(view);
    }).catch(() => {});
  }
  if (attribution.campaign === 'google_business_profile' && !attribution.reported) view.dvTrack('profile_landing');
  root.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href], [data-track]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const named = link.getAttribute('data-track');
    const eventName = named || (href.startsWith('sms:') ? 'sms_click' : href.startsWith('tel:') ? 'phone_click' : '');
    if (!eventName) return;
    let targetPath;
    if (href.startsWith('/') && !href.startsWith('//')) targetPath = safeSitePath(href);
    view.dvTrack(eventName, targetPath ? { target_path: targetPath } : {});
  }, true);
  const pricing = root.getElementById('pricing-preview');
  if (pricing && view.IntersectionObserver) {
    const observer = new view.IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { view.dvTrack('pricing_view'); observer.disconnect(); }
    }, { threshold: 0.4 });
    observer.observe(pricing);
  }
}
