import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  MapPin,
  MessageSquareText,
  Truck,
  Sofa,
  Recycle,
  Home as HomeIcon,
  Leaf,
  Warehouse,
  CheckCircle2,
  Camera,
} from 'lucide-react';
import { getCity } from '../data/cities.js';

const phoneDisplay = '(952) 232-5107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

const services = [
  { label: 'Junk pickup', icon: Truck, detail: 'Curbside or garage pickup for everyday clutter, single items, or a full garage worth of stuff.' },
  { label: 'Furniture removal', icon: Sofa, detail: 'Sofas, beds, dressers, tables, sectionals, and office furniture staged for quick load-out.' },
  { label: 'Appliance recycling', icon: Recycle, detail: 'Refrigerators, washers, dryers, stoves, and dishwashers routed through certified recyclers.' },
  { label: 'Garage cleanout', icon: HomeIcon, detail: 'Garage-staged boxes, clutter, and bulky items ready for one efficient pickup.' },
  { label: 'Yard and storm debris', icon: Leaf, detail: 'Brush, branches, fencing, deck debris, and storm cleanup piles.' },
  { label: 'Dumpster and trailer rental', icon: Warehouse, detail: 'Short-term drop options for remodels, cleanouts, and DIY loading. By request.' },
];

export default function CityPage() {
  const { slug } = useParams();
  const city = getCity(slug);

  useEffect(() => {
    if (!city) return;
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const prevCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    document.title = city.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', city.metaDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    const cityCanonical = `https://dakotavalleyjunkremoval.com/cities/${slug}`;
    if (canonical) canonical.setAttribute('href', cityCanonical);

    // Inject per-city JSON-LD (BreadcrumbList + LocalBusiness + Service)
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dakotavalleyjunkremoval.com/' },
            { '@type': 'ListItem', position: 2, name: 'Service areas', item: 'https://dakotavalleyjunkremoval.com/#areas' },
            { '@type': 'ListItem', position: 3, name: `${city.name}, MN` },
          ],
        },
        {
          '@type': 'LocalBusiness',
          name: `Dakota Valley Junk Removal — ${city.name}`,
          url: cityCanonical,
          telephone: '+1-952-232-5107',
          email: 'info@dakotavalleyjunkremoval.com',
          priceRange: 'From $85',
          address: {
            '@type': 'PostalAddress',
            addressLocality: city.name,
            addressRegion: 'MN',
            addressCountry: 'US',
          },
          ...(city.geo && {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: city.geo.latitude,
              longitude: city.geo.longitude,
            },
          }),
          areaServed: {
            '@type': 'City',
            name: city.name,
            containedIn: { '@type': 'AdministrativeArea', name: city.county },
          },
          serviceType: ['Curbside junk pickup', 'Garage junk pickup', 'Furniture removal', 'Appliance recycling'],
        },
        {
          '@type': 'Service',
          name: `Junk Removal in ${city.name}, MN`,
          provider: { '@type': 'LocalBusiness', name: 'Dakota Valley Junk Removal' },
          areaServed: { '@type': 'City', name: city.name },
          description: city.intro,
          serviceType: 'Curbside and garage junk pickup',
        },
      ],
    };
    const scriptEl = document.createElement('script');
    scriptEl.type = 'application/ld+json';
    scriptEl.id = 'city-schema';
    scriptEl.textContent = JSON.stringify(schema);
    // Remove any prior city schema, then add the new one
    document.getElementById('city-schema')?.remove();
    document.head.appendChild(scriptEl);

    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (desc && prevDesc) desc.setAttribute('content', prevDesc);
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical);
      document.getElementById('city-schema')?.remove();
    };
  }, [city, slug]);

  if (!city) return <Navigate to="/" replace />;

  const cityQueryBody = encodeURIComponent(
    `Junk removal quote for ${city.name}, MN.\nPlease send photos and item details.`
  );
  const citySms = `${smsLink}?&body=${cityQueryBody}`;

  return (
    <main>
      <section className='city-hero'>
        <nav className='nav' aria-label='Primary navigation'>
          <Link className='brand' to='/' aria-label='Dakota Valley home'>
            <span className='brand-mark'><Truck size={22} /></span>
            <span>Dakota Valley</span>
          </Link>
          <a className='nav-call' href={smsLink}><MessageSquareText size={17} /> Text {phoneDisplay}</a>
        </nav>

        <div className='city-hero-content'>
          <p className='breadcrumb'>
            <Link to='/'>Home</Link>
            <span aria-hidden='true'> / </span>
            <Link to='/' state={{ scrollTo: 'areas' }}>Service areas</Link>
            <span aria-hidden='true'> / </span>
            <span>{city.name}</span>
          </p>
          <h1>Junk Removal in <span className='city-accent'>{city.name}, MN</span></h1>
          <p className='hero-copy'>{city.intro}</p>
          <div className='hero-actions'>
            <a className='button primary' href={citySms}>
              <MessageSquareText size={18} /> Text photos to start
            </a>
            <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>
              <Camera size={18} /> Use the quote helper
            </Link>
          </div>
          <p className='hero-meta'>
            <MapPin size={15} /> {city.county} &middot; $85 minimum &middot; Curbside and garage pickup
          </p>
        </div>
      </section>

      <section className='section city-services'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>What we haul in {city.name}</p>
            <h2>Built for the jobs people actually put off.</h2>
          </div>
        </div>
        <div className='city-service-grid'>
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article className='city-service-card' key={s.label}>
                <span className='city-service-icon'><Icon size={20} /></span>
                <h3>{s.label}</h3>
                <p>{s.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className='section city-locale'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>{city.name} neighborhoods</p>
            <h2>Routes that cover the whole city.</h2>
          </div>
        </div>
        <div className='city-locale-grid'>
          <div>
            <h3 className='city-list-title'>Neighborhoods served</h3>
            <ul className='city-list'>
              {city.neighborhoods.map((n) => (
                <li key={n}><CheckCircle2 size={14} /> {n}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='city-list-title'>Nearby landmarks</h3>
            <ul className='city-list'>
              {city.landmarks.map((l) => (
                <li key={l}><MapPin size={14} /> {l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {city.testimonial && (
        <section className='section city-testimonial'>
          <blockquote>
            <p>&ldquo;{city.testimonial.text}&rdquo;</p>
            <footer>
              <strong>{city.testimonial.name}</strong>
              <span>{city.testimonial.location}</span>
            </footer>
          </blockquote>
        </section>
      )}

      <section className='section city-cta'>
        <div>
          <h2>Ready for pickup in {city.name}?</h2>
          <p>Text photos, item details, and a preferred calendar window. The crew confirms and handles the rest.</p>
        </div>
        <div className='hero-actions'>
          <a className='button primary' href={citySms}>
            <MessageSquareText size={18} /> Text {phoneDisplay}
          </a>
          <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Use the quote helper</Link>
        </div>
      </section>

      <footer className='footer'>
        <div>
          <strong>Dakota Valley Junk Removal</strong>
          <p>Minnesota curbside and garage junk pickup. Text or use the form for photo quotes, calendar booking, and service across all cities and counties.</p>
        </div>
        <div className='footer-actions'>
          <a href={smsLink}>Text {phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <Link to='/'>Back to home</Link>
        </div>
      </footer>

      <div className='mobile-cta' aria-label='Mobile contact actions'>
        <a className='button primary' href={citySms}>Text</a>
        <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Book</Link>
      </div>
    </main>
  );
}
