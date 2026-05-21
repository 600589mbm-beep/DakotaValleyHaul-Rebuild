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
} from 'lucide-react';
import { getService } from '../data/services.js';
import { cities as citiesData } from '../data/cities.js';

const phoneDisplay = '(952) 232-5107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

const iconMap = { Truck, Sofa, Recycle, Home: HomeIcon, Leaf, Warehouse };

export default function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug);

  useEffect(() => {
    if (!service) return;
    const restoreMeta = setPageMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      canonical: serviceCanonical,
    });

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dakotavalleyjunkremoval.com/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://dakotavalleyjunkremoval.com/#services' },
            { '@type': 'ListItem', position: 3, name: service.name },
          ],
        },
        {
          '@type': 'Service',
          name: service.name,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Dakota Valley Junk Removal',
            telephone: '+1-952-232-5107',
            email: 'info@dakotavalleyjunkremoval.com',
          },
          areaServed: [
            { '@type': 'State', name: 'Minnesota' },
            { '@type': 'AdministrativeArea', name: 'Dakota County' },
            { '@type': 'AdministrativeArea', name: 'Hennepin County' },
            { '@type': 'AdministrativeArea', name: 'Ramsey County' },
          ],
          description: service.intro,
          serviceType: service.name,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${service.name} options`,
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
    scriptEl.id = 'service-schema';
    scriptEl.textContent = JSON.stringify(schema);
    document.getElementById('service-schema')?.remove();
    document.head.appendChild(scriptEl);

    window.scrollTo(0, 0);
    return () => {
      restoreMeta();
      document.getElementById('service-schema')?.remove();
    };
  }, [service, slug]);

  if (!service) return <Navigate to="/" replace />;

  const Icon = iconMap[service.icon] || Truck;
  const serviceQueryBody = encodeURIComponent(
    `${service.name} request.\nPlease send photos and item details.`
  );
  const serviceSms = `${smsLink}?&body=${serviceQueryBody}`;

  // Show 12 popular city links for cross-linking
  const popularCities = Object.entries(citiesData).slice(0, 12);

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
            <Link to='/' state={{ scrollTo: 'services' }}>Services</Link>
            <span aria-hidden='true'> / </span>
            <span>{service.name}</span>
          </p>
          <h1><span className='city-accent'>{service.name}</span></h1>
          <p className='hero-copy'>{service.headline}</p>
          <p className='hero-copy' style={{ marginTop: 0 }}>{service.intro}</p>
          <div className='hero-actions'>
            <a className='button primary' href={serviceSms}>
              <MessageSquareText size={18} /> Text photos to start
            </a>
            <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>
              <Camera size={18} /> Use the quote helper
            </Link>
          </div>
        </div>
      </section>

      <section className='section city-services'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>What's included</p>
            <h2>{service.name} options</h2>
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
            <p className='section-kicker'>How it works</p>
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
            <p className='section-kicker'>{service.name} cities</p>
            <h2>Available across Minnesota.</h2>
          </div>
        </div>
        <div className='city-grid'>
          {popularCities.map(([citySlug, c]) => (
            <Link key={citySlug} to={`/cities/${citySlug}`} className='city-link'>
              {c.name}
            </Link>
          ))}
          <Link to='/' state={{ scrollTo: 'areas' }} className='city-link'>
            See all 44 cities
          </Link>
        </div>
      </section>

      <section className='section city-cta'>
        <div>
          <h2>Need {service.name.toLowerCase()}?</h2>
          <p>Text photos, item details, and a preferred calendar window. The crew confirms and handles the rest.</p>
        </div>
        <div className='hero-actions'>
          <a className='button primary' href={serviceSms}>
            <MessageSquareText size={18} /> Text {phoneDisplay}
          </a>
          <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Use the quote helper</Link>
        </div>
      </section>

      <SiteFooter />

      <div className='mobile-cta' aria-label='Mobile contact actions'>
        <a className='button primary' href={serviceSms}>Text</a>
        <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Book</Link>
      </div>
    </main>
  );
}
