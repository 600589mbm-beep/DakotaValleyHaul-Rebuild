import { Link } from 'react-router-dom';
import { Truck, MessageSquareText, Mail, Facebook, Star } from 'lucide-react';
import { cities as citiesData } from '../data/cities.js';
import { counties as countiesData } from '../data/counties.js';
import { services as servicesData } from '../data/services.js';

const phoneDisplay = '(952) 232-5107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

// Social profiles — update these when exact URLs are confirmed.
// These are also wired into the LocalBusiness JSON-LD `sameAs` array
// in index.html. Keep both in sync.
const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/dakotavalleyjunkremoval', icon: Facebook },
  { name: 'Yelp', url: 'https://www.yelp.com/biz/dakota-valley-junk-removal-eagan', icon: Star },
  // Add Google Business Profile, Instagram, etc. as accounts are created.
];

const allCountyNames = [
  'Aitkin', 'Anoka', 'Becker', 'Beltrami', 'Benton', 'Big Stone', 'Blue Earth', 'Brown', 'Carlton', 'Carver', 'Cass',
  'Chippewa', 'Chisago', 'Clay', 'Clearwater', 'Cook', 'Cottonwood', 'Crow Wing', 'Dakota', 'Dodge', 'Douglas',
  'Faribault', 'Fillmore', 'Freeborn', 'Goodhue', 'Grant', 'Hennepin', 'Houston', 'Hubbard', 'Isanti', 'Itasca',
  'Jackson', 'Kanabec', 'Kandiyohi', 'Kittson', 'Koochiching', 'Lac qui Parle', 'Lake', 'Lake of the Woods',
  'Le Sueur', 'Lincoln', 'Lyon', 'Mahnomen', 'Marshall', 'Martin', 'McLeod', 'Meeker', 'Mille Lacs', 'Morrison',
  'Mower', 'Murray', 'Nicollet', 'Nobles', 'Norman', 'Olmsted', 'Otter Tail', 'Pennington', 'Pine', 'Pipestone',
  'Polk', 'Pope', 'Ramsey', 'Red Lake', 'Redwood', 'Renville', 'Rice', 'Rock', 'Roseau', 'St. Louis', 'Scott',
  'Sherburne', 'Sibley', 'Stearns', 'Steele', 'Stevens', 'Swift', 'Todd', 'Traverse', 'Wabasha', 'Wadena', 'Waseca',
  'Washington', 'Watonwan', 'Wilkin', 'Winona', 'Wright', 'Yellow Medicine',
];

const countySlugsWithPages = new Set(Object.keys(countiesData));

export default function SiteFooter() {
  return (
    <footer className='site-footer'>
      <div className='site-footer-inner'>
        <section className='site-footer-block'>
          <h4>Services</h4>
          <div className='site-footer-grid'>
            {Object.entries(servicesData).map(([slug, s]) => (
              <Link key={slug} to={`/services/${slug}`} className='site-footer-link'>
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        <section className='site-footer-block'>
          <h4>Service areas — cities</h4>
          <div className='site-footer-grid site-footer-grid-dense'>
            {Object.entries(citiesData).map(([slug, c]) => (
              <Link key={slug} to={`/cities/${slug}`} className='site-footer-link'>
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        <section className='site-footer-block'>
          <h4>Service areas — counties</h4>
          <div className='site-footer-grid site-footer-grid-dense'>
            {allCountyNames.map((county) => {
              const slug = county.toLowerCase().replace(/[. ]+/g, '-') + '-county';
              const hasPage = countySlugsWithPages.has(slug);
              return hasPage ? (
                <Link key={county} to={`/counties/${slug}`} className='site-footer-link'>
                  {county} County
                </Link>
              ) : (
                <span key={county} className='site-footer-link site-footer-text'>
                  {county} County
                </span>
              );
            })}
          </div>
        </section>

        <div className='site-footer-bottom'>
          <div className='site-footer-brand'>
            <strong>
              <span className='site-footer-mark'><Truck size={18} /></span>
              Dakota Valley Junk Removal
            </strong>
            <p>
              Minnesota curbside and garage junk pickup. Text or use the form for photo quotes,
              calendar booking, and service across all cities and counties.
            </p>
          </div>
          <div className='site-footer-actions'>
            <a href={smsLink}><MessageSquareText size={14} /> Text {phoneDisplay}</a>
            <a href={`mailto:${email}`}><Mail size={14} /> {email}</a>
            <nav className='site-footer-nav' aria-label='Footer navigation'>
              <Link to='/'>Home</Link>
              <Link to='/pricing'>Pricing</Link>
              <Link to='/reviews'>Reviews</Link>
            </nav>
            <div className='site-footer-social' aria-label='Follow Dakota Valley on social'>
              {socialLinks.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`${name} (opens in new tab)`}
                  className='site-footer-social-link'
                  title={name}
                >
                  <Icon size={16} />
                  <span>{name}</span>
                </a>
              ))}
            </div>
            <p className='site-footer-copy'>© {new Date().getFullYear()} Dakota Valley Junk Removal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
