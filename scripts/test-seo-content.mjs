import assert from 'node:assert/strict';
import test from 'node:test';
import { cities } from '../src/data/cities.js';
import { services, SPECIALTY_SERVICE_SLUGS } from '../src/data/services.js';
import { comboMeta, comboIntro, comboFaqs, quoteContent, serviceAngles } from '../src/data/comboContent.js';

const cityEntries = Object.entries(cities);
const serviceEntries = Object.entries(services);

test('city, service, combination and quote metadata remains distinct and readable', () => {
  const rows = serviceEntries.map(([slug, service]) => ({
    path: `/services/${slug}/`, title: service.metaTitle, description: service.metaDescription,
  }));
  for (const [citySlug, city] of cityEntries) {
    rows.push({ path: `/cities/${citySlug}/`, title: city.metaTitle, description: city.metaDescription });
    rows.push({ path: `/quote/${citySlug}/`, ...quoteContent(city, citySlug) });
    for (const [serviceSlug, service] of serviceEntries) {
      rows.push({ path: `/cities/${citySlug}/${serviceSlug}/`, ...comboMeta(city, service, citySlug, serviceSlug) });
    }
  }
  assert.equal(new Set(rows.map((row) => row.title)).size, rows.length, 'Titles must be unique.');
  assert.equal(new Set(rows.map((row) => row.description)).size, rows.length, 'Descriptions must be unique.');
  for (const row of rows) {
    assert.ok(row.title && row.description, `${row.path}: metadata is required`);
    assert.doesNotMatch(`${row.title} ${row.description}`, /Dakota Valley Haul|\. an \$85|undefined/i, row.path);
    // Editorial budgets for this site, not search-engine eligibility limits.
    assert.ok(row.title.length <= 70, `${row.path}: title needs editing (${row.title.length})`);
    assert.ok(row.description.length <= 170, `${row.path}: description needs editing (${row.description.length})`);
  }
});

test('all specialty projects and rentals require their own written quote', () => {
  assert.deepEqual(new Set(SPECIALTY_SERVICE_SLUGS), new Set([
    'hot-tub-removal', 'fence-removal', 'shed-removal', 'demolition', 'dumpster-rental',
  ]));
  for (const [citySlug, city] of cityEntries) {
    for (const slug of SPECIALTY_SERVICE_SLUGS) {
      const service = services[slug];
      const intro = comboIntro(city, service, citySlug, slug);
      const faqs = comboFaqs(city, service, citySlug, slug);
      const metadata = comboMeta(city, service, citySlug, slug);
      assert.doesNotMatch(JSON.stringify({ intro, faqs, metadata }), /\$\s*85\b/, `${citySlug}/${slug}: pickup minimum is not a project price`);
      assert.match(intro, /writ(?:ten|ing)/i, `${citySlug}/${slug}: requires written project terms`);
      assert.match(intro, /approv/i, `${citySlug}/${slug}: approval must precede confirmation`);
    }
  }
});

test('cleanout and appliance answers agree with staged pickup requirements', () => {
  for (const [, city] of cityEntries) {
    for (const slug of ['hoarder-cleanout', 'estate-cleanout']) {
      const faqs = serviceAngles[slug].faqs.map((getFaq) => getFaq(city));
      for (const { a } of faqs) {
        assert.match(a, /stag/i, `${city.name}/${slug}: safe staging must be explained`);
        assert.doesNotMatch(a, /quoted on-site|crew sorts donations|selective room-by-room cleanouts|tax receipts|prepped around/i);
      }
    }
    const appliance = serviceAngles['appliance-recycling'].faqs[1](city).a;
    assert.match(appliance, /disconnected by a qualified person/i);
    assert.doesNotMatch(appliance, /do not need to .*prep/i);
    const garage = serviceAngles['garage-cleanout'].faqs[1](city).a;
    assert.match(garage, /^Yes\./);
    assert.doesNotMatch(garage, /just point|stage what you can/i);
  }
});

test('rental loading and route availability avoid unsupported promises', () => {
  for (const [slug, city] of cityEntries) {
    const quote = quoteContent(city, slug);
    assert.doesNotMatch(quote.routeCopy, /crews loop .* daily|most working days|routing is already done|regular .* loop|floor holds/i, slug);
    assert.match(quote.heroCopy, /does not reserve an appointment/i, slug);
    const rental = comboIntro(city, services['dumpster-rental'], slug, 'dumpster-rental');
    assert.match(rental, /DIY loading/);
    assert.match(rental, /load limits/);
    assert.match(rental, /does not reserve a container/);
  }
  assert.ok(!cities.eagan.neighborhoods.includes('Denmark Township'));
  assert.match(cities.faribault.intro, /Shattuck-St\. Mary's School/);
});
