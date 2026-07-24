import { guides as existingGuides } from './guides.js';
import { seoGuides } from './seoGuides.js';
import { seoGuidesRoundTwo } from './seoGuidesRoundTwo.js';
import { seoGuidesFinal } from './seoGuidesFinal.js';
import { seoGuidesCompletion } from './seoGuidesCompletion.js';

export const guides = {
  ...seoGuides,
  ...seoGuidesRoundTwo,
  ...seoGuidesFinal,
  ...seoGuidesCompletion,
  ...existingGuides,
};

export function getGuideSlugs() {
  return Object.keys(guides);
}
