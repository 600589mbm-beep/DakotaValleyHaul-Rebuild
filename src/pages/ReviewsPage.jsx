import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, MessageSquareText, Camera, Star } from 'lucide-react';
import { cities as citiesData } from '../data/cities.js';

const phoneDisplay = '(952) 232-5107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

export default function ReviewsPage() {
  const allReviews = Object.entries(citiesData)
    .filter(([, c]) => c.testimonial)
    .map(([slug, c]) => ({ slug, city: c.name, ...c.testimonial }));

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const prevCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    document.title = 'Reviews from Across Minnesota | Dakota Valley Junk Removal';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', `Customer reviews from across all 44 Minnesota cities Dakota Valley serves. Real testimonials from real Minnesota neighborhoods.`);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://dakotavalleyjunkremoval.com/reviews');
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (desc && prevDesc) desc.setAttribute('content', prevDesc);
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical);
    };
  }, []);

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
            <span>Reviews</span>
          </p>
          <h1>What <span className='city-accent'>Minnesotans</span> are saying.</h1>
          <p className='hero-copy'>
            Real reviews from real Minnesota neighborhoods. Click into any city for that city's full landing page.
          </p>
          <div className='hero-actions'>
            <a className='button primary' href={smsLink}><MessageSquareText size={18} /> Text for a quote</a>
            <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}><Camera size={18} /> Use the quote helper</Link>
          </div>
        </div>
      </section>

      <section className='section'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>{allReviews.length} reviews across Minnesota</p>
            <h2>From {allReviews[0]?.city} to {allReviews[allReviews.length - 1]?.city}.</h2>
          </div>
        </div>
        <div className='city-service-grid'>
          {allReviews.map((r) => (
            <article className='city-service-card' key={r.slug}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 10, color: '#f5b401' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill='#f5b401' />)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink)', marginBottom: 14 }}>&ldquo;{r.text}&rdquo;</p>
              <div>
                <strong style={{ display: 'block', color: 'var(--ink)' }}>{r.name}</strong>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>{r.location}</span>
              </div>
              <Link to={`/cities/${r.slug}`} style={{ display: 'inline-block', marginTop: 10, color: 'var(--blue)', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
                {r.city} pickup details →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className='section city-cta'>
        <div>
          <h2>Ready to add yours?</h2>
          <p>Text photos for a quote. Once the job is done, the crew will share a link to leave a review.</p>
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
