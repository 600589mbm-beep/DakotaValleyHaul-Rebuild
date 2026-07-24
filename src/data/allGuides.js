import { guides as existingGuides } from './guides.js';
import { seoGuides } from './seoGuides.js';

export const guides = {
  ...seoGuides,
  ...existingGuides,
};

export function getGuideSlugs() {
  return Object.keys(guides);
}
