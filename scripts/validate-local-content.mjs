#!/usr/bin/env node
import { cities } from '../src/data/cities.js';
import { services } from '../src/data/services.js';
import {
  officialDisposalResources,
  priorityLocalContent,
} from '../src/data/priorityLocalContent.js';

const serviceAliases = {
  'apartment-cleanout': 'junk-pickup',
  'office-cleanout': 'furniture-removal',
  'exercise-equipment-removal': 'scrap-metal-removal',
  'construction-debris': 'demolition',
};

const requiredTextFields = [
  'intro',
  'accessTitle',
  'accessText',
  'routeTitle',
  'routeText',
  'disposalTitle',
  'disposalText',
];

const errors = [];

for (const [citySlug, content] of Object.entries(priorityLocalContent)) {
  if (!cities[citySlug]) errors.push(`Unknown city slug: ${citySlug}`);

  for (const field of requiredTextFields) {
    if (typeof content[field] !== 'string' || content[field].trim().length < 20) {
      errors.push(`${citySlug}.${field} is missing or too short`);
    }
  }

  if (!Array.isArray(content.quoteChecklist) || content.quoteChecklist.length < 4) {
    errors.push(`${citySlug}.quoteChecklist must contain at least four items`);
  }

  if (!Array.isArray(content.popularServices) || content.popularServices.length < 3) {
    errors.push(`${citySlug}.popularServices must contain at least three services`);
  } else {
    for (const requestedSlug of content.popularServices) {
      const resolvedSlug = services[requestedSlug] ? requestedSlug : serviceAliases[requestedSlug];
      if (!resolvedSlug || !services[resolvedSlug]) {
        errors.push(`${citySlug} references unknown service slug: ${requestedSlug}`);
      }
    }
  }

  const resource = officialDisposalResources[content.resourceKey];
  if (!resource) {
    errors.push(`${citySlug} references unknown resourceKey: ${content.resourceKey}`);
  } else if (!resource.url.startsWith('https://')) {
    errors.push(`${content.resourceKey} must use an https URL`);
  }
}

if (errors.length) {
  console.error('[validate-local-content] failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `[validate-local-content] ${Object.keys(priorityLocalContent).length} priority cities and ${Object.keys(officialDisposalResources).length} official resources validated.`,
);
