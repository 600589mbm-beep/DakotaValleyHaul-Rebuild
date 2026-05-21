import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter.jsx';
import { Truck, MessageSquareText, CheckCircle2, Camera } from 'lucide-react';

const phoneDisplay = '(952) 232-5107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

const tiers = [
  {
    label: 'Single item',
    price: '$85',
    detail: '$85 minimum',
    examples: ['One sofa', 'One mattress + box', 'One refrigerator', 'One dresser', 'One desk', 'One large item'],
  },
  {
    label: 'Small load',
    price: '$120 – $185',
    detail: '~1/8 to 1/4 truck',
    examples: ['Living room set', 'Bedroom set', '2-3 appliances', 'Yard waste pile (small)', 'Garage corner load'],
  },
  {
    label: 'Medium load',
    price: '$220 – $320',
    detail: '~1/4 to 1/2 truck',
    examples: ['Half garage cleanout', 'Multi-room furniture', 'Apartment move-out', 'Estate cleanout (partial)', 'Storm debris pile'],
  },
  {
    label: 'Large load',
    price: '$380 – $520',
    detail: '~1/2 to 3/4 truck',
    examples: ['Full garage cleanout', 'Multi-room cleanout', 'Estate cleanout (most)', 'Office cleanout', 'Hot tub removal (base)'],
  },
  {
    label: 'Full truck',
    price: '$580 – $750',
    detail: 'Full truckload',
    examples: ['Full house cleanout', 'Hoarder cleanout (per truck)', 'Large estate', 'Large yard renovation debris', 'Multi-room remodel debris'],
  },
];

const surcharges = [
  { item: 'Refrigerator / freezer', surcharge: '+ $25 (refrigerant recovery)' },
  { item: 'CRT TV / monitor', surcharge: '+ $25 (e-waste)' },
  { item: 'Mattress + box', surcharge: '+ $20 (recycling fee)' },
  { item: 'Tires (per tire)', surcharge: '+ $10' },
  { item: 'Heavy appliance with stairs', surcharge: '+ $20 per flight' },
  { item: 'Hot tub disassembly', surcharge: 'Quoted separately' },
];

export default function PricingPage() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const prevCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    document.title = 'Junk Removal Pricing Minnesota | Transparent Tiers | Dakota Valley';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Transparent junk removal pricing across Minnesota. $85 minimum, volume-based tiers, no hidden fees. Text photos for a precise quote.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://dakotavalleyjunkremoval.com/pricing');

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
            <span>Pricing</span>
          </p>
          <h1><span className='city-accent'>Transparent</span> junk removal pricing.</h1>
          <p className='hero-copy'>
            $85 minimum. Volume-based tiers. Text photos for a precise quote. No hidden fees — surcharges shown below for items that require certified recycling.
          </p>
          <div className='hero-actions'>
            <a className='button primary' href={smsLink}><MessageSquareText size={18} /> Text for a precise quote</a>
            <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}><Camera size={18} /> Use the quote helper</Link>
          </div>
        </div>
      </section>

      <section className='section'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>Volume tiers</p>
            <h2>You pay for the space your stuff takes up.</h2>
          </div>
        </div>
        <div className='city-service-grid'>
          {tiers.map((tier) => (
            <article className='city-service-card' key={tier.label}>
              <span className='city-service-icon'><Truck size={20} /></span>
              <h3>{tier.label}</h3>
              <p style={{ fontSize: 22, fontWeight: 900, color: 'var(--blue)', margin: '4px 0' }}>{tier.price}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>{tier.detail}</p>
              <ul style={{ paddingLeft: 18, margin: 0, color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>
                {tier.examples.map((ex) => <li key={ex}>{ex}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className='section'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>Surcharges (full disclosure)</p>
            <h2>Items that require certified recycling.</h2>
          </div>
        </div>
        <div className='city-service-grid'>
          {surcharges.map((s) => (
            <article className='city-service-card' key={s.item}>
              <span className='city-service-icon'><CheckCircle2 size={20} /></span>
              <h3>{s.item}</h3>
              <p>{s.surcharge}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='section city-cta'>
        <div>
          <h2>Need a precise quote?</h2>
          <p>Text 3-5 photos of what you need hauled. Crew sends a firm quote within a few hours. No surprises at pickup.</p>
        </div>
        <div className='hero-actions'>
          <a className='button primary' href={smsLink}><MessageSquareText size={18} /> Text {phoneDisplay}</a>
          <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Use the quote helper</Link>
        </div>
      </section>

      <SiteFooter />

      <div className='mobile-cta' aria-label='Mobile contact actions'>
        <a className='button primary' href={smsLink}>Text</a>
        <Link className='button secondary' to='/' state={{ scrollTo: 'quote' }}>Book</Link>
      </div>
    </main>
  );
}
