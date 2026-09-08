import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { initQuoteForm } from './quote-form.js';

// Test the built page with every request mocked; never send a real quote lead.
const html = readFileSync(new URL('../../dist/quote/index.html', import.meta.url), 'utf8');

function fixture(t, query = '') {
  const dom = new JSDOM(html, { url: `https://dakotavalleyjunkremovalservice.com/quote/${query}` });
  const { window } = dom;
  let urlCount = 0;
  const revoked = [];
  window.URL.createObjectURL = () => `blob:quote-test-${++urlCount}`;
  window.URL.revokeObjectURL = (url) => revoked.push(url);
  const requests = [];
  window.fetch = async (...args) => {
    requests.push(args);
    return { ok: true, status: 200, json: async () => ({ success: true }) };
  };
  initQuoteForm(window.document);
  t.after(() => window.close());
  const form = window.document.getElementById('tg-form');
  const field = (name) => form.elements.namedItem(name);
  const fill = () => {
    for (const [name, value] of Object.entries({ name: 'Jamie Test', phone: '(952) 555-0123', address: '123 Test Street', city: 'Apple Valley', details: 'One test sofa in the garage.' })) {
      field(name).value = value;
    }
  };
  const file = (name) => new window.File(['test-photo-bytes'], name, { type: 'image/jpeg', lastModified: 1 });
  const select = (files) => {
    Object.defineProperty(field('photos'), 'files', { configurable: true, value: files });
    field('photos').dispatchEvent(new window.Event('change', { bubbles: true }));
  };
  const submit = async () => {
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setImmediate(resolve));
  };
  return { window, document: window.document, form, field, fill, file, select, submit, requests, revoked };
}

test('built form blocks blank fields and malformed phones before any request, focusing the first error', async (t) => {
  const f = fixture(t);
  await f.submit();
  assert.equal(f.requests.length, 0);
  assert.equal(f.document.activeElement, f.field('name'));
  assert.equal(f.form.querySelectorAll('[aria-invalid="true"]').length, 6);
  assert.match(f.document.getElementById('tg-name-error').textContent, /Enter your name/);
  f.fill();
  f.select([f.file('sofa.jpg')]);
  f.field('phone').value = '952';
  await f.submit();
  assert.equal(f.requests.length, 0);
  assert.equal(f.document.activeElement, f.field('phone'));
  assert.match(f.document.getElementById('tg-phone-error').textContent, /10-digit/);
  f.field('phone').value = '(952) 555-0123';
  f.field('phone').dispatchEvent(new f.window.Event('input'));
  assert.equal(f.field('phone').hasAttribute('aria-invalid'), false);
});

test('multiple selections add thumbnails, unsupported previews explain fallback, and removal updates focus and required state', (t) => {
  const f = fixture(t);
  f.select([f.file('sofa.jpg')]);
  f.select([f.file('chair.jpg')]);
  assert.equal(f.form.querySelectorAll('.tg-photo-card').length, 2);
  assert.match(f.document.getElementById('tg-photos-count').textContent, /2 of 6/);
  const preview = f.form.querySelector('.tg-photo-preview');
  preview.dispatchEvent(new f.window.Event('error'));
  assert.equal(preview.hidden, true);
  assert.equal(f.form.querySelector('.tg-photo-unavailable').hidden, false);
  f.form.querySelector('.tg-photo-remove').click();
  assert.equal(f.form.querySelectorAll('.tg-photo-card').length, 1);
  assert.match(f.form.querySelector('.tg-photo-name').textContent, /chair/);
  assert.equal(f.document.activeElement, f.form.querySelector('.tg-photo-remove'));
  f.form.querySelector('.tg-photo-remove').click();
  assert.equal(f.document.getElementById('tg-photo-list').hidden, true);
  assert.equal(f.document.activeElement, f.field('photos'));
  assert.equal(f.field('photos').getAttribute('aria-invalid'), 'true');
  assert.ok(f.revoked.length > 0);
});

test('network failures keep all details and photos, and a successful retry sends only remaining files then clears', async (t) => {
  const f = fixture(t);
  f.fill();
  f.select([f.file('sofa.jpg'), f.file('chair.jpg')]);
  let attempts = 0;
  const payloads = [];
  f.window.fetch = async (url, request) => {
    attempts += 1;
    assert.match(url, /dakota-valley-telegram-bridge/);
    assert.equal(request.method, 'POST');
    payloads.push(request.body);
    if (attempts === 1) throw new Error('Offline test');
    return { ok: true, status: 200, json: async () => ({ success: true }) };
  };
  await f.submit();
  assert.equal(f.field('name').value, 'Jamie Test');
  assert.equal(f.form.querySelectorAll('.tg-photo-card').length, 2);
  assert.match(f.document.getElementById('tg-form-status').textContent, /details and photos are still here/);
  assert.equal(f.form.querySelector('.tg-form-submit').disabled, false);
  f.form.querySelector('.tg-photo-remove').click();
  await f.submit();
  assert.deepEqual(payloads[0].getAll('photos').map((file) => file.name), ['sofa.jpg', 'chair.jpg']);
  assert.deepEqual(payloads[1].getAll('photos').map((file) => file.name), ['chair.jpg']);
  assert.equal(payloads[1].get('city'), 'Apple Valley');
  assert.equal(payloads[1].get('phone'), '(952) 555-0123');
  assert.equal(f.field('name').value, '');
  assert.equal(f.form.querySelectorAll('.tg-photo-card').length, 0);
  assert.equal(f.form.hasAttribute('aria-busy'), false);
  assert.match(f.document.getElementById('tg-form-status').textContent, /approve the price before confirming pickup/);
  assert.equal(f.document.activeElement, f.document.getElementById('tg-form-status'));
});

test('partial delivery response preserves the form and directs customers to text missing photos', async (t) => {
  const f = fixture(t);
  f.fill();
  f.select([f.file('sofa.jpg')]);
  f.window.fetch = async () => ({ ok: false, status: 502, json: async () => ({ success: false, error: 'The request was received, but not every photo reached Telegram.' }) });
  await f.submit();
  assert.equal(f.field('name').value, 'Jamie Test');
  assert.equal(f.form.querySelectorAll('.tg-photo-card').length, 1);
  assert.match(f.document.getElementById('tg-form-status').textContent, /instead of resubmitting/);
});

test('city query values prefill safely, are length-limited and never replace entered values', (t) => {
  const f = fixture(t, '?city=Eagan');
  assert.equal(f.field('city').value, 'Eagan');
  f.field('city').value = 'Apple Valley';
  initQuoteForm(f.document);
  assert.equal(f.field('city').value, 'Apple Valley');
  const injection = fixture(t, `?city=${encodeURIComponent('<img src=x onerror=alert(1)>' + 'a'.repeat(200))}`);
  assert.equal(injection.field('city').value.length, 100);
  assert.equal(injection.form.querySelector('[onerror]'), null);
});
