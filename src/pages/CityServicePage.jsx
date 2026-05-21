import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { setPageMeta } from '../lib/seoMeta.js';
import SiteFooter from '../components/SiteFooter.jsx';
import {
  Truck,
  Sofa,
  Recycle,
  Home as HomeIcon,
  Leaf,
  Warehouse,
  MessageSquareText,
  CheckCircle2,
  Camera,
  MapPin,
} from 'lucide-react';
import { getCity, cities as citiesData } from '../data/cities.js';
import { getService, services as servicesData } from '../data/services.js';

const phoneDisplay = '(952) 232-5107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

const iconMap = { Truck, Sofa, Recycle, Home: HomeIcon, Leaf, Warehouse };

export default function CityServicePage() {
  const { citySlug, serviceSlug } = useParams();
  const city = getCity(citySlug);
  const service = getService(serviceSlug);

  const canonical = `https://dakotavalleyjunkremoval.com/cities/${citySlug}/${serviceSlug}`;
  const title = city && service ? `${service.name} in ${city.name}, MN | Dakota Valley` : '';
  const description = city && service
    ? `${service.name} in ${city.name}, ${city.county}. Curbside and garage pickup with $85 minimum. Text photos for a quote, calendar booking, route-aware scheduling for ${city.name} neighborhoods.`
    : '';

  useEffect(() => {
    if (!city || !service) return;
    const restoreMeta = setPageMeta({
      title: title,
      description: description,
      canonical: canonical,
    });

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dakotavalleyjunkremoval.com/' },
            { '@type': 'ListItem', position: 2, name: `${city.name}, MN`, item: `https://dakotavalleyjunkremoval.com/cities/${citySlug}` },
            { '@type': 'ListItem', position: 3, name: service.name },
          ],
        },
        {
          '@type': 'Service',
          name: `${service.name} in ${city.name}, MN`,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Dakota Valley Junk Removal',
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
              geo: { '@type': 'GeoCoordinates', latitude: city.geo.latitude, longitude: city.geo.longitude },
            }),
          },
          areaServed: {
            '@type': 'City',
            name: city.name,
            containedIn: { '@type': 'AdministrativeArea', name: city.county },
          },
          description: description,
          serviceType: service.name,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${service.name} options in ${city.name}`,
            itemListElement: service.services.map((s) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: s },
            })),
          },
        },
      ],
    };
    const scriptEl = document.createElement('script');
    scriptEl.type = 'application/ld+json';
    scriptEl.id = 'city-service-schema';
    scriptEl.textContent = JSON.stringify(schema);
    document.getElementById('city-service-schema')?.remove();
    document.head.appendChild(scriptEl);

    window.scrollTo(0, 0);
    return () => {
      restoreMeta();
      document.getElementById('city-service-schema')?.remove();
    };
  }, [city, service, citySlug, serviceSlug, title, description, canonical]);

  if (!city || !service) return <Navigate to="/" replace />;

  const Icon = iconMap[service.icon] || Truck;
  const queryBody = encodeURIComponent(
    `${service.name} request for ${city.name}, MN.\nPlease send photos and item details.`
  );
  const ctaSms = `${smsLink}?&body=${queryBody}`;

  // Cross-link: other services in this city (5 others)
  const otherServices = Object.entries(servicesData).filter(([slug]) => slug !== serviceSlug);
  // Cross-link: same service in other cities (12 others)
  const otherCities = Object.entries(citiesData).filter(([slug]) => slug !== citySlug).slice(0, 12);

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
            <Link to={`/cities/${citySlug}`}>{city.name}, MN</Link>
            <span aria-hidden='true'> / </span>
            <span>{service.name}</span>
          </p>
          <h1>
            <span className='city-accent'>{service.name}</span> in {city.name}, MN
          </h1>
          <p className='hero-copy'>
            {service.headline} for {city.name} residents. {city.intro}
          </p>
          <div className='hero-actions'>
            <a className='button primary' href={ctaSms}>
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
            <p className='section-kicker'>{service.name} in {city.name}</p>
            <h2>What we include</h2>
          </div>
        </div>
        <div className='city-service-grid'>
          {service.services.map((s) => (
            <article className='city-service-card' key={s}>
              <span className='city-service-icon'><CheckCircle2 size={20} /></span>
              <h3>{s}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className='section'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>{city.name} pickup process</p>
            <h2>Four steps, mostly text.</h2>
          </div>
        </div>
        <div className='city-service-grid'>
          {service.process.map((step, i) => (
            <article className='city-service-card' key={i}>
              <span className='city-service-icon'><Icon size={20} /></span>
              <h3>Step {i + 1}</h3>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='section city-locale'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>{city.name} coverage</p>
            <h2>Routes covering every neighborhood.</h2>
          </div>
        </div>
        <div className='city-locale-grid'>
          <div>
            <h3 className='city-list-title'>{city.name} neighborhoods we serve</h3>
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

      <section className='section city-locale'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>Other services in {city.name}</p>
            <h2>What else we haul.</h2>
          </div>
        </div>
        <div className='city-grid'>
          {otherServices.map(([slug, s]) => (
            <Link key={slug} to={`/cities/${citySlug}/${slug}`} className='city-link'>
              {s.name}
            </Link>
          ))}
          <Link to={`/cities/${citySlug}`} className='city-link'>
            All services in {city.name}
          </Link>
        </div>
      </section>

      <section className='section city-locale'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>{service.name} in other cities</p>
            <h2>We also serve…</h2>
          </div>
        </div>
        <div className='city-grid'>
          {otherCities.map(([slug, c]) => (
            <Link key={slug} to={`/cities/${slug}/${serviceSlug}`} className='city-link'>
              {c.name}
            </Link>
          ))}
          <Link to={`/services/${serviceSlug}`} className='city-link'>
            See all 44 cities
          </Link>
        </div>
      </section>

      <section className='section city-cta'>
        <div>
          <h2>Need {service.name.toLowerCase()} in {city.name}?</h2>
          <p>Text photos, item details, and a preferred calendar window. Crew confirms within a few hours.</p>
        </div>
        <div className='hero-actions'>
          <a className='button primary' href={ctaSms}>
            <MessageSquareText size={18} /> Text {phoneDisplay}
          </a>
          <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Use the quote helper</Link>
        </div>
      </section>

      <SiteFooter />

      <div className='mobile-cta' aria-label='Mobile contact actions'>
        <a className='button primary' href={ctaSms}>Text</a>
        <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Book</Link>
      </div>
    </main>
  );
}
