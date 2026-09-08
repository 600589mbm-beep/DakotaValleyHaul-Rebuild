import assert from 'node:assert/strict';
import { cities } from '../src/data/cities.js';
import { serviceAreaZips } from '../src/data/serviceAreaZips.js';
import { searchServiceAreas, serviceAreaResultMessage } from '../src/lib/serviceAreaSearch.js';

const areas = Object.entries(cities).map(([slug, city]) => ({ slug, name: city.name, zipCodes: serviceAreaZips[slug] || [] }));
const slugsFor = (query) => searchServiceAreas(areas, query).matches.map((area) => area.slug);

assert.equal(areas.length, 61, 'The service finder must preserve every existing city page.');
for (const area of areas) {
  assert.ok(area.zipCodes.length, `${area.name} needs at least one verified ZIP hint.`);
  assert.ok(area.zipCodes.every((zip) => /^\d{5}$/.test(zip)), `${area.name} has an invalid ZIP.`);
  assert.ok(slugsFor(area.name).includes(area.slug), `${area.name} must remain searchable by name.`);
}
assert.deepEqual(slugsFor('55124'), ['apple-valley']);
assert.deepEqual(slugsFor('55124-1234'), ['apple-valley']);
assert.deepEqual(slugsFor('  APPLE VALLEY, MN  '), ['apple-valley']);
assert.deepEqual(slugsFor('Saint Paul'), ['st-paul']);
assert.deepEqual(slugsFor('st.paul'), ['st-paul']);
assert.deepEqual(slugsFor('St. Louis Park Minnesota'), ['st-louis-park']);
assert.deepEqual(slugsFor('55122'), ['eagan']);
assert.deepEqual(slugsFor('55435').sort(), ['bloomington', 'edina']);
assert.deepEqual(slugsFor('90210'), []);
assert.deepEqual(slugsFor('not-a-city'), []);
assert.equal(searchServiceAreas(areas, '5512').kind, 'incomplete-zip');
assert.match(serviceAreaResultMessage(searchServiceAreas(areas, '5512')), /5-digit ZIP/);
assert.match(serviceAreaResultMessage(searchServiceAreas(areas, '90210')), /No city pages found/);
assert.match(serviceAreaResultMessage(searchServiceAreas(areas, '55124')), /1 city found/);
// Both Clear and All Minnesota reset the input to this empty-query state.
assert.equal(searchServiceAreas(areas, '').matches.length, 61);
assert.equal(searchServiceAreas(areas, '   ').matches.length, 61);
assert.match(serviceAreaResultMessage(searchServiceAreas(areas, '')), /all 61 Minnesota cities/);
console.log('Service-area search passed: 61 cities, ZIP/ZIP+4, shared ZIPs, city aliases, empty states and reset.');
