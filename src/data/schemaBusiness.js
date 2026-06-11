// Shared JSON-LD LocalBusiness node. Every page whose Service schema points at
// provider {'@id': `${SITE}/#business`} must embed this node in its own @graph —
// JSON-LD @id references don't resolve across pages, so without it the provider
// reference dangles for crawlers reading a city/service page in isolation.
// Single source of truth: edit NAP/hours/links here and every page updates.

export const SITE = 'https://dakotavalleyjunkremovalservice.com';
export const BUSINESS_ID = `${SITE}/#business`;

export const SAME_AS = [
  'https://www.facebook.com/dakotavalleyjunkremoval',
  'https://www.yelp.com/biz/dakota-valley-junk-removal-eagan',
];

export const businessNode = {
  '@type': 'LocalBusiness',
  '@id': BUSINESS_ID,
  name: 'Dakota Valley Junk Removal',
  url: SITE,
  telephone: '+1-952-232-5107',
  email: 'info@dakotavalleyjunkremovalservice.com',
  priceRange: 'From $85',
  image: `${SITE}/og-card.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1964 Rahncliff Ct, Ste 200, #22342',
    addressLocality: 'Eagan',
    addressRegion: 'MN',
    postalCode: '55122',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 44.8041, longitude: -93.1666 },
  foundingDate: '2023',
  sameAs: SAME_AS,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    // All 7 days — confirmed by owner 2026-05-22; keep in sync with city pages.
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '21:00',
  },
};
