// Before/after pairs for the homepage <BeforeAfter> slider.
//
// These currently point at brand-safe ILLUSTRATIONS (illustration: true) so the
// section works today. Real before/after PHOTOS will convert far better — see
// public/PHOTO-SHOT-LIST.md. To swap: drop photo pairs in public/attached_assets/,
// update src/before/src/after + alt here, and set illustration: false.

export const beforeAfter = [
  {
    title: 'Garage cleanout',
    before: { src: '/illustrations/garage.svg', alt: 'Garage stacked with boxes, a bike and paint cans before pickup' },
    after: { src: '/illustrations/garage-clean.svg', alt: 'The same garage empty and swept after the cleanout' },
    illustration: true,
  },
  {
    title: 'Curbside furniture',
    before: { src: '/illustrations/curbside.svg', alt: 'Sofa, chairs and boxes piled at the curb before pickup' },
    after: { src: '/illustrations/curb-clean.svg', alt: 'A clean, clear curb after the furniture was hauled away' },
    illustration: true,
  },
  {
    title: 'Staged estate items',
    before: { src: '/illustrations/curbside.svg', alt: 'Illustration of household items safely staged at the curb before pickup' },
    after: { src: '/illustrations/curb-clean.svg', alt: 'Illustration of a clear curb after staged items are removed' },
    illustration: true,
  },
];
