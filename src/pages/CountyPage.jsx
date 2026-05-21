import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Truck,
  MessageSquareText,
  CheckCircle2,
  MapPin,
  Camera,
} from 'lucide-react';
import { getCounty } from '../data/counties.js';
import { services as servicesData } from '../data/services.js';

const phoneDisplay = '(952) 232-5107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

export default function CountyPage() {
  const { slug } = useParams();
  const county = getCounty(slug);

  useEffect(() => {
    if (!county) return;
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const prevCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    document.title = county.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', county.metaDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    const countyCanonical = `https://dakotavalleyjunkremoval.com/counties/${slug}`;
    if (canonical) canonical.setAttribute('href', countyCanonical);

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dakotavalleyjunkremoval.com/' },
            { '@type': 'ListItem', position: 2, name: 'Counties' },
            { '@type': 'ListItem', position: 3, name: county.name },
          ],
        },
        {
          '@type': 'Service',
          name: `Junk Removal ${county.name}, MN`,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Dakota Valley Junk Removal',
            telephone: '+1-952-232-5107',
          },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: county.name,
            containedIn: { '@type': 'State', name: 'Minnesota' },
          },
          description: county.intro,
          serviceType: 'Curbside and garage junk pickup',
        },
      ],
    };
    const scriptEl = document.createElement('script');
    scriptEl.type = 'application/ld+json';
    scriptEl.id = 'county-schema';
    scriptEl.textContent = JSON.stringify(schema);
    document.getElementById('county-schema')?.remove();
    document.head.appendChild(scriptEl);

    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (desc && prevDesc) desc.setAttribute('content', prevDesc);
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical);
      document.getElementById('county-schema')?.remove();
    };
  }, [county, slug]);

  if (!county) return <Navigate to="/" replace />;

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
            <Link to='/' state={{ scrollTo: 'areas' }}>Counties</Link>
            <span aria-hidden='true'> / </span>
            <span>{county.name}</span>
          </p>
          <h1>Junk Removal in <span className='city-accent'>{county.name}, MN</span></h1>
          <p className='hero-copy'>{county.intro}</p>
          <div className='hero-actions'>
            <a className='button primary' href={smsLink}><MessageSquareText size={18} /> Text {phoneDisplay}</a>
            <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}><Camera size={18} /> Use the quote helper</Link>
          </div>
          <p className='hero-meta'>
            <MapPin size={15} /> Population {county.population} &middot; County seat {county.seat} &middot; $85 minimum
          </p>
        </div>
      </section>

      <section className='section city-locale'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>{county.name} cities served</p>
            <h2>Coverage across {county.name}.</h2>
          </div>
        </div>
        <div className='city-grid'>
          {county.cities.map((cityName) => (
            <span key={cityName} className='city-link' style={{ cursor: 'default' }}>{cityName}</span>
          ))}
        </div>
      </section>

      <section className='section city-locale'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>Services in {county.name}</p>
            <h2>All Dakota Valley services available.</h2>
          </div>
        </div>
        <div className='city-grid'>
          {Object.entries(servicesData).map(([sslug, s]) => (
            <Link key={sslug} to={`/services/${sslug}`} className='city-link'>
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      <section className='section city-cta'>
        <div>
          <h2>Ready for pickup in {county.name}?</h2>
          <p>Text photos, item details, and a preferred calendar window. Crew confirms and routes around your county.</p>
        </div>
        <div className='hero-actions'>
          <a className='button primary' href={smsLink}><MessageSquareText size={18} /> Text {phoneDisplay}</a>
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
        <a className='button primary' href={smsLink}>Text</a>
        <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Book</Link>
      </div>
    </main>
  );
}
