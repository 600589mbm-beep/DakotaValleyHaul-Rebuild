import { guides as existingGuides } from './guides.js';
import { seoGuides } from './seoGuides.js';
import { seoGuidesRoundTwo } from './seoGuidesRoundTwo.js';
import { seoGuidesFinal } from './seoGuidesFinal.js';

export const guides = {
  ...seoGuides,
  ...seoGuidesRoundTwo,
  ...seoGuidesFinal,
  ...existingGuides,
};

export function getGuideSlugs() {
  return Object.keys(guides);
}
