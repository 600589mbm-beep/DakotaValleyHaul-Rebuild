import { guides as existingGuides } from './guides.js';
import { seoGuides } from './seoGuides.js';
import { seoGuidesRoundTwo } from './seoGuidesRoundTwo.js';

export const guides = {
  ...seoGuides,
  ...seoGuidesRoundTwo,
  ...existingGuides,
};

export function getGuideSlugs() {
  return Object.keys(guides);
}
