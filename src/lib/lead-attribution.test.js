import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { attributionDetails, captureAttribution, cleanAttribution, clearPendingLead, pendingLeadId } from './lead-attribution.js';
import { initLeadTracking, safeEventProps } from './lead-tracking.js';

const page = (query = '') => new JSDOM('<link rel="canonical" href="https://dakotavalleyjunkremovalservice.com/cities/apple-valley/"><span id="dv-tracking-config" data-endpoint="https://worker.invalid"></span>', { url: `https://dakotavalleyjunkremovalservice.com/cities/apple-valley/${query}` });

test('recognized Business Profile tags survive navigation without retaining other query values', (t) => {
  const dom = page('?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile&email=private@example.com&city=Personal');
  t.after(() => dom.window.close());
  const first = captureAttribution(dom.window, 1000);
  dom.window.history.replaceState({}, '', '/quote/?city=Eagan');
  const next = captureAttribution(dom.window, 2000);
  assert.equal(first.session_id, next.session_id);
  assert.equal(next.campaign, 'google_business_profile');
  assert.equal(next.landing_path, '/cities/apple-valley/');
  assert.doesNotMatch(JSON.stringify(next), /email|private|Personal|Eagan|\?/);
  assert.notEqual(captureAttribution(dom.window, 2_000_000).session_id, first.session_id);
});

test('arbitrary UTM values, unsafe paths, and forged identifiers are removed', () => {
  const data = cleanAttribution({ source: 'private@example.com', medium: '5551234567', campaign: 'customer-name', landing_path: '/quote/?name=Private', session_id: 'customer-name' });
  assert.deepEqual(data, { source: 'direct', medium: 'none', campaign: '', landing_path: '/quote/', session_id: '' });
  assert.equal(cleanAttribution({ landing_path: '/name@example.com/' }).landing_path, '/');
  assert.doesNotMatch(attributionDetails(data, 'fake'), /example|555|customer-name/);
});

test('retry lead references are stable until acknowledgement and storage errors do not block them', (t) => {
  const dom = page();
  t.after(() => dom.window.close());
  const first = pendingLeadId(dom.window);
  assert.equal(pendingLeadId(dom.window), first);
  clearPendingLead(dom.window);
  assert.notEqual(pendingLeadId(dom.window), first);
  Object.defineProperty(dom.window, 'sessionStorage', { get() { throw new Error('Blocked'); } });
  assert.doesNotThrow(() => captureAttribution(dom.window));
  assert.equal(pendingLeadId(dom.window), pendingLeadId(dom.window));
});

test('analytics strips contact details, photos, full hrefs and query strings', (t) => {
  assert.deepEqual(safeEventProps({ name: 'Private', phone: '123', address: 'Private', details: 'Private', href: 'sms:123?body=Private', photos: ['Private'], step: 'full', delivery: 'received', target_path: '/quote/?city=Private' }), { step: 'full', delivery: 'received', target_path: '/quote/' });
  const dom = page('?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile&name=Private');
  t.after(() => dom.window.close());
  const requests = [];
  dom.window.fetch = async (...args) => { requests.push(args); return { json: async () => ({ recorded: true }) }; };
  initLeadTracking(dom.window.document);
  dom.window.dvTrack('quote_form_submitted', { step: 'full', phone: '123', name: 'Private' });
  dom.window.dvTrack('job_completed', { step: 'full' });
  assert.equal(requests.length, 1);
  assert.doesNotMatch(requests[0][1].body, /Private|name|\?/);
  assert.deepEqual(dom.window.dataLayer.at(-1), { event: 'dv_quote_form_submitted', step: 'full' });
  assert.doesNotMatch(JSON.stringify(dom.window.dataLayer), /Private|123|job_completed/);
});
