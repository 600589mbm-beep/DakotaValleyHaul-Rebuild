// County landing pages at /counties/:slug.
// Top 12 MN counties by population — biggest local search demand.

export const counties = {
  'hennepin-county': {
    name: 'Hennepin County',
    slug: 'hennepin-county',
    population: '~1.28M',
    seat: 'Minneapolis',
    intro:
      'Hennepin County is the largest county in Minnesota and Dakota Valley\'s most-served region. Curbside and garage junk pickup throughout Minneapolis, Bloomington, Minnetonka, Plymouth, Maple Grove, Edina, Eden Prairie, St. Louis Park, and the rest of the metro.',
    cities: ['Minneapolis', 'Bloomington', 'Minnetonka', 'Plymouth', 'Maple Grove', 'Edina', 'Eden Prairie', 'St. Louis Park', 'Hopkins', 'Richfield'],
    metaTitle: 'Junk Removal Hennepin County MN | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Hennepin County — Minneapolis, Bloomington, Edina, Eden Prairie, Plymouth, and more. $85 minimum, photo quotes.',
  },
  'ramsey-county': {
    name: 'Ramsey County',
    slug: 'ramsey-county',
    population: '~552K',
    seat: 'St. Paul',
    intro:
      'Ramsey County serves the eastern Twin Cities metro. Curbside and garage junk pickup throughout St. Paul, Roseville, Maplewood, White Bear Lake, Shoreview, and surrounding cities.',
    cities: ['St. Paul', 'Roseville', 'Maplewood', 'White Bear Lake', 'Shoreview'],
    metaTitle: 'Junk Removal Ramsey County MN | St. Paul + Suburbs | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Ramsey County — St. Paul, Roseville, Maplewood, White Bear Lake, Shoreview. $85 minimum, photo quotes.',
  },
  'dakota-county': {
    name: 'Dakota County',
    slug: 'dakota-county',
    population: '~440K',
    seat: 'Hastings',
    intro:
      'Dakota County is Dakota Valley\'s home county. The densest route coverage we have. Same-day eligible curbside and garage junk pickup throughout Apple Valley, Eagan, Burnsville, Lakeville, Rosemount, Farmington, Hastings, Inver Grove Heights, and surrounding cities.',
    cities: ['Apple Valley', 'Eagan', 'Burnsville', 'Lakeville', 'Rosemount', 'Farmington', 'Hastings', 'Inver Grove Heights'],
    metaTitle: 'Junk Removal Dakota County MN | Same-Day Pickup | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Dakota County — Apple Valley, Eagan, Burnsville, Lakeville, Rosemount, Farmington, Hastings. Same-day available. $85 minimum.',
  },
  'anoka-county': {
    name: 'Anoka County',
    slug: 'anoka-county',
    population: '~363K',
    seat: 'Anoka',
    intro:
      'Anoka County serves the north Twin Cities suburbs. Curbside and garage junk pickup throughout Coon Rapids, Blaine, Anoka, Andover, Ramsey, Fridley, and surrounding cities.',
    cities: ['Coon Rapids', 'Blaine', 'Anoka', 'Andover', 'Ramsey', 'Fridley'],
    metaTitle: 'Junk Removal Anoka County MN | North Metro | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Anoka County — Coon Rapids, Blaine, Anoka, Andover, Fridley. $85 minimum, photo quotes.',
  },
  'washington-county': {
    name: 'Washington County',
    slug: 'washington-county',
    population: '~278K',
    seat: 'Stillwater',
    intro:
      'Washington County serves the east metro and the St. Croix Valley. Curbside and garage junk pickup throughout Woodbury, Cottage Grove, Stillwater, Oakdale, Forest Lake, and surrounding cities.',
    cities: ['Woodbury', 'Cottage Grove', 'Stillwater', 'Oakdale', 'Forest Lake'],
    metaTitle: 'Junk Removal Washington County MN | East Metro | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Washington County — Woodbury, Cottage Grove, Stillwater, Oakdale. $85 minimum, photo quotes.',
  },
  'scott-county': {
    name: 'Scott County',
    slug: 'scott-county',
    population: '~150K',
    seat: 'Shakopee',
    intro:
      'Scott County serves the southwest metro. Curbside and garage junk pickup throughout Shakopee, Prior Lake, Savage, and surrounding cities.',
    cities: ['Shakopee', 'Prior Lake', 'Savage', 'Jordan'],
    metaTitle: 'Junk Removal Scott County MN | Shakopee Area | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Scott County — Shakopee, Prior Lake, Savage, Jordan. $85 minimum, photo quotes.',
  },
  'carver-county': {
    name: 'Carver County',
    slug: 'carver-county',
    population: '~108K',
    seat: 'Chaska',
    intro:
      'Carver County serves the west metro along the Minnesota River. Curbside and garage junk pickup throughout Chaska, Chanhassen, Victoria, Waconia, and surrounding cities.',
    cities: ['Chaska', 'Chanhassen', 'Victoria', 'Waconia'],
    metaTitle: 'Junk Removal Carver County MN | Chaska/Chanhassen | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Carver County — Chaska, Chanhassen, Victoria, Waconia. $85 minimum, photo quotes.',
  },
  'olmsted-county': {
    name: 'Olmsted County',
    slug: 'olmsted-county',
    population: '~166K',
    seat: 'Rochester',
    intro:
      'Olmsted County is southeast Minnesota\'s main population center, anchored by Rochester and the Mayo Clinic. Curbside and garage junk pickup throughout Rochester, Byron, Stewartville, and surrounding communities.',
    cities: ['Rochester', 'Byron', 'Stewartville'],
    metaTitle: 'Junk Removal Olmsted County MN | Rochester Area | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Olmsted County — Rochester, Byron, Stewartville. $85 minimum, photo quotes.',
  },
  'st-louis-county': {
    name: 'St. Louis County',
    slug: 'st-louis-county',
    population: '~199K',
    seat: 'Duluth',
    intro:
      'St. Louis County covers Duluth, the Iron Range, and a huge expanse of northeastern Minnesota. Curbside and garage junk pickup throughout Duluth, Hibbing, Virginia, Hermantown, and surrounding cities.',
    cities: ['Duluth', 'Hibbing', 'Virginia', 'Hermantown'],
    metaTitle: 'Junk Removal St. Louis County MN | Duluth Area | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across St. Louis County — Duluth, Hibbing, Virginia, Hermantown. $85 minimum, photo quotes.',
  },
  'stearns-county': {
    name: 'Stearns County',
    slug: 'stearns-county',
    population: '~161K',
    seat: 'St. Cloud',
    intro:
      'Stearns County is central Minnesota\'s main hub, anchored by St. Cloud. Curbside and garage junk pickup throughout St. Cloud, Sartell, Sauk Centre, and surrounding cities.',
    cities: ['St. Cloud', 'Sartell', 'Sauk Centre', 'Waite Park'],
    metaTitle: 'Junk Removal Stearns County MN | St. Cloud Area | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Stearns County — St. Cloud, Sartell, Sauk Centre. $85 minimum, photo quotes.',
  },
  'wright-county': {
    name: 'Wright County',
    slug: 'wright-county',
    population: '~146K',
    seat: 'Buffalo',
    intro:
      'Wright County serves the northwest metro and central Minnesota. Curbside and garage junk pickup throughout Buffalo, Monticello, St. Michael, Albertville, and surrounding cities.',
    cities: ['Buffalo', 'Monticello', 'St. Michael', 'Albertville'],
    metaTitle: 'Junk Removal Wright County MN | Buffalo/Monticello | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Wright County — Buffalo, Monticello, St. Michael, Albertville. $85 minimum, photo quotes.',
  },
  'sherburne-county': {
    name: 'Sherburne County',
    slug: 'sherburne-county',
    population: '~99K',
    seat: 'Elk River',
    intro:
      'Sherburne County serves the I-94 corridor between the Twin Cities and St. Cloud. Curbside and garage junk pickup throughout Elk River, Big Lake, Becker, Princeton, and surrounding cities.',
    cities: ['Elk River', 'Big Lake', 'Becker', 'Princeton'],
    metaTitle: 'Junk Removal Sherburne County MN | Elk River Area | Dakota Valley',
    metaDescription: 'Curbside and garage junk removal across Sherburne County — Elk River, Big Lake, Becker, Princeton. $85 minimum, photo quotes.',
  },
};

export function getCounty(slug) {
  return counties[slug] || null;
}

export function getCountySlugs() {
  return Object.keys(counties);
}
