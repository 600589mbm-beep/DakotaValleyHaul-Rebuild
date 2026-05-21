// City data for /#/cities/:slug pages.
// Each city: name, slug (derived), county, neighborhoods, landmarks, testimonial.
// Keep entries lean — heavier per-page copy lives in the CityPage template.

export const cities = {
  'apple-valley': {
    name: 'Apple Valley',
    county: 'Dakota County',
    intro:
      "Apple Valley is one of Dakota Valley's most-served cities. Same-day curbside and garage pickup for homes near the Minnesota Zoo, Cobblestone Lake, and the wider Apple Valley grid.",
    metaTitle: 'Junk Removal Apple Valley, MN | Dakota Valley',
    metaDescription:
      "Curbside and garage junk removal in Apple Valley, MN. Photo quotes, calendar booking, $85 minimum. Serving all Apple Valley neighborhoods and Dakota County.",
    neighborhoods: [
      'Downtown Apple Valley',
      'Cobblestone Lake',
      'Palomino Hills',
      'Greenleaf',
      'Quarry Ponds',
      'Galaxie',
      'Southcross',
      'Huntington',
      'Pennock',
      'Echo Park',
      'Founders Lane',
      'Kelley Park',
    ],
    landmarks: [
      'Minnesota Zoo',
      'Lebanon Hills Regional Park',
      'Apple Valley Community Center',
      'Cobblestone Lake',
      'Valleywood Golf Course',
      'Apple Valley Aquatic Center',
      'Eastview High School',
      'Apple Valley Transit Station',
    ],
    testimonial: {
      name: 'Brian Nelson',
      location: 'Cobblestone Lake, Apple Valley',
      text: 'Great experience. They cleared out years of accumulated stuff from our garage. Professional and affordable.',
    },
    geo: { latitude: 44.7319, longitude: -93.2177 },
  },
};

export function getCity(slug) {
  return cities[slug] || null;
}

export function getCitySlugs() {
  return Object.keys(cities);
}
