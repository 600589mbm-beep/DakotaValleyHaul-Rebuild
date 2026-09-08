import assert from 'node:assert/strict';
import test from 'node:test';
import { PHOTO_LIMITS, addQuotePhotos, quoteFailureMessage, validateQuoteField } from './quote-form.js';

const photo = (name = 'sofa.jpg', size = 1024, type = 'image/jpeg') => ({ name, size, type, lastModified: 1 });

test('each required field rejects whitespace and photos are required', () => {
  for (const field of ['name', 'phone', 'address', 'city', 'details']) {
    assert.notEqual(validateQuoteField(field, '  '), '');
  }
  assert.notEqual(validateQuoteField('photos', '', []), '');
  assert.equal(validateQuoteField('photos', '', [photo()]), '');
  assert.equal(validateQuoteField('city', '55124'), '');
});

test('phone validation accepts normal US formatting and rejects incomplete or letter-filled numbers', () => {
  for (const value of ['9522325107', '(952) 232-5107', '952.232.5107', '+1 (952) 232-5107', '1-952-232-5107']) {
    assert.equal(validateQuoteField('phone', value), '', value);
  }
  for (const value of ['952', '952232510', '29522325107', 'call 9522325107', '+44 20 1234 5678', '952++2325107']) {
    assert.notEqual(validateQuoteField('phone', value), '', value);
  }
});

test('later selections append photos and deduplicate without changing previous selection', () => {
  const first = photo();
  const existing = [first];
  const added = photo('chair.png', 2048, 'image/png');
  const result = addQuotePhotos(existing, [first, added]);
  assert.deepEqual(result.photos, [first, added]);
  assert.deepEqual(existing, [first]);
  assert.equal(result.duplicates, 1);
  assert.deepEqual(result.errors, []);
});

test('file-count limit preserves six photos and explains how to replace one', () => {
  const result = addQuotePhotos([], Array.from({ length: 7 }, (_, index) => photo(`${index}.jpg`)));
  assert.equal(result.photos.length, PHOTO_LIMITS.count);
  assert.match(result.errors[0], /Remove one/);
});

test('size limits accept exact boundary and reject larger files and batches', () => {
  const exact = photo('exact.jpg', PHOTO_LIMITS.perFile);
  assert.equal(addQuotePhotos([], [exact]).photos.length, 1);
  const oversized = addQuotePhotos([], [photo('large.jpg', PHOTO_LIMITS.perFile + 1)]);
  assert.equal(oversized.photos.length, 0);
  assert.match(oversized.errors[0], /over 10 MB/);
  const full = [photo('one.jpg', 10 * 1024 * 1024), photo('two.jpg', 10 * 1024 * 1024), photo('three.jpg', 5 * 1024 * 1024)];
  assert.equal(addQuotePhotos([], full).photos.length, 3);
  const overflow = addQuotePhotos(full, [photo('four.jpg', 1)]);
  assert.equal(overflow.photos.length, 3);
  assert.match(overflow.errors[0], /total limit is 25 MB/);
});

test('common photos including HEIC without a MIME type are accepted, other or empty files rejected', () => {
  const result = addQuotePhotos([], [photo('phone.HEIC', 1024, ''), photo('scan.pdf', 1024, 'application/pdf'), photo('empty.jpg', 0)]);
  assert.equal(result.photos.length, 1);
  assert.equal(result.errors.length, 2);
  assert.match(result.errors[0], /Use a JPG/);
  assert.match(result.errors[1], /empty/);
});

test('partially delivered requests ask for photo backup without duplicate resubmission', () => {
  const message = quoteFailureMessage(502, 'The request was received, but not every photo reached Telegram. Please text the photos as a backup.');
  assert.match(message, /details were received/);
  assert.match(message, /instead of resubmitting/);
  assert.doesNotMatch(message, /Telegram/);
});

test('failed uploads give actionable guidance while preserving customer information', () => {
  assert.match(quoteFailureMessage(413), /Remove a photo/);
  assert.match(quoteFailureMessage(429), /Wait a minute/);
  assert.match(quoteFailureMessage(400), /Check the required fields/);
  for (const status of [0, 400, 413, 429, 500, 502]) {
    assert.match(quoteFailureMessage(status), /details and photos are still here/);
    assert.match(quoteFailureMessage(status), /952/);
  }
});
