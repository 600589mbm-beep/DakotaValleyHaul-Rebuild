// Keep the optional machine-readable guide aligned with actual public policies.
import { writeFile } from 'node:fs/promises';
import { businessNode, SITE } from '../src/data/schemaBusiness.js';
import { services } from '../src/data/services.js';
import { cities } from '../src/data/cities.js';
import { counties } from '../src/data/counties.js';
import { PICKUP_SCOPE, PICKUP_REQUIREMENTS, PRICE_FLOOR_DETAIL, QUOTE_POLICY, SCHEDULING_POLICY, COVERAGE_POLICY, SPECIALTY_POLICY } from '../src/data/servicePolicy.js';

const sections = [
  ['/', 'Home'], ['/services/', 'Services'], ['/service-areas/', 'Service areas'],
  ['/pricing/', 'Pricing'], ['/quote/', 'Get a Quote'], ['/faq/', 'FAQ'],
  ['/reviews/', 'Reviews'], ['/guides/', 'Local disposal guides'], ['/about/', 'About'],
].map(([path, name]) => ({ name, url: `${SITE}${path}` }));
const servicePages = Object.entries(services).map(([slug, service]) => ({
  name: service.name, url: `${SITE}/services/${slug}/`, description: service.metaDescription || service.intro,
}));
const cityPages = Object.entries(cities).map(([slug, city]) => ({
  name: city.name, url: `${SITE}/cities/${slug}/`, quote: `${SITE}/quote/${slug}/`,
}));
const countyPages = Object.entries(counties).map(([slug, county]) => ({name: county.name, url: `${SITE}/counties/${slug}/`}));
const data = {
  name: businessNode.name, url: SITE, telephone: businessNode.telephone, email: businessNode.email,
  description: 'Paid junk pickup for approved items staged at the curb, in a driveway or in an accessible garage. Customers approve a written photo quote before confirming pickup.',
  basedIn: 'Eagan, Minnesota',
  hours: businessNode.openingHoursSpecification,
  policies: { pickupScope: PICKUP_SCOPE, preparation: PICKUP_REQUIREMENTS, pricing: PRICE_FLOOR_DETAIL, writtenQuote: QUOTE_POLICY, scheduling: SCHEDULING_POLICY, serviceArea: COVERAGE_POLICY, specialtyProjects: SPECIALTY_POLICY },
  exclusions: 'No inside-home pickup. Hazardous waste, medical waste, asbestos, biological waste and explosives are not accepted. Ask about unknown materials before requesting pickup.',
  serviceModel: 'Customers request paid pickup. This website does not offer a public drop-off site or represent a municipal recycling program.',
  sitemap: `${SITE}/sitemap-index.xml`, sections, services: servicePages, cities: cityPages, counties: countyPages,
};
const list = rows => rows.map(row => `- [${row.name}](${row.url})${row.description ? `: ${row.description}` : ''}`).join('\n');
const text = `# ${data.name}\n\n> ${data.description}\n\nPhone / text: ${data.telephone}\nEmail: ${data.email}\nBased in: ${data.basedIn}\nHours: daily 8:00 AM–9:00 PM\n\n## How pickup works\n\n${PICKUP_SCOPE}\n\n${PICKUP_REQUIREMENTS}\n\n${QUOTE_POLICY}\n\n${SCHEDULING_POLICY}\n\n## Pricing and specialty requests\n\n${PRICE_FLOOR_DETAIL}\n\n${SPECIALTY_POLICY}\n\n## Coverage and exclusions\n\n${COVERAGE_POLICY}\n\n${data.exclusions}\n\n${data.serviceModel}\n\n## Website pages\n\n${list(sections)}\n\n## Services\n\n${list(servicePages)}\n\n## Cities\n\n${list(cityPages)}\n\n## Counties\n\n${list(countyPages)}\n`;
await writeFile(new URL('../public/llms.txt', import.meta.url), text);
await writeFile(new URL('../public/llm-sitemap.json', import.meta.url), `${JSON.stringify(data, null, 2)}\n`);
console.log(`Machine-readable information generated from current policies: ${servicePages.length} services, ${cityPages.length} cities.`);
