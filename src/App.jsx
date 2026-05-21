import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  Clock,
  Home,
  Leaf,
  Mail,
  Map as MapIcon,
  MapPin,
  MessageSquareText,
  Phone,
  Recycle,
  ShieldCheck,
  Sofa,
  Sparkles,
  Truck,
  Warehouse,
  Wrench,
} from 'lucide-react';

const phoneDisplay = '(952) 232-5107';
const phoneLink = 'tel:9522325107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

const services = [
  { label: 'Junk pickup', icon: Truck, price: 'From $95', detail: 'Curbside, garage, basement, and full-home cleanouts.', tags: ['single items', 'multi-room', 'storage'] },
  { label: 'Furniture removal', icon: Sofa, price: 'From $85', detail: 'Sofas, beds, dressers, tables, sectionals, and office furniture.', tags: ['sofas', 'mattresses', 'desks'] },
  { label: 'Appliance recycling', icon: Recycle, price: 'From $90', detail: 'Refrigerators, washers, dryers, stoves, dishwashers, and metal items.', tags: ['certified', 'heavy lift', 'eco route'] },
  { label: 'Estate and rental cleanouts', icon: Home, price: 'Scoped', detail: 'Full homes, apartments, basements, garages, rentals, and move-outs.', tags: ['multi-load', 'scheduled', 'sweep up'] },
  { label: 'Yard waste and storm debris', icon: Leaf, price: 'From $100', detail: 'Brush, branches, fencing, deck debris, and storm cleanup piles.', tags: ['seasonal', 'branches', 'debris'] },
  { label: 'Dumpster and trailer rental', icon: Warehouse, price: '10 to 20 yd', detail: 'Short-term drop options for remodels, cleanouts, and DIY loading.', tags: ['renovation', 'drop-off', 'pickup'] },
];

const cities = [
  'Apple Valley', 'Burnsville', 'Eagan', 'Farmington', 'Hastings', 'Lakeville', 'Rosemount', 'Minneapolis',
  'St. Paul', 'Bloomington', 'Eden Prairie', 'Edina', 'Maple Grove', 'Woodbury', 'Rochester', 'Duluth',
  'St. Cloud', 'Mankato', 'Moorhead', 'Brainerd', 'Winona', 'Northfield', 'Owatonna', 'Faribault',
  'Roseville', 'White Bear Lake', 'Plymouth', 'Minnetonka', 'Cottage Grove', 'Stillwater',
];

const trust = [
  { icon: Clock, title: 'Same-day options', text: 'Fast dispatch windows when routes are open and the job details are clear.' },
  { icon: ShieldCheck, title: 'Upfront pricing', text: 'Clear ranges before lifting starts, with specialty fees called out early.' },
  { icon: Recycle, title: 'Eco-first disposal', text: 'Donation and recycling are prioritized before landfill disposal.' },
  { icon: Home, title: 'Clean handoff', text: 'The crew loads, sweeps the pickup area, and leaves the space ready to use.' },
];

const takeCategories = [
  { icon: Sofa, title: 'Household', text: 'Rooms, garages, basements, storage units, and apartments.', items: ['Mattresses', 'Furniture', 'Boxes and clutter'] },
  { icon: Wrench, title: 'Renovation', text: 'Project debris hauled quickly after remodels and repairs.', items: ['Cabinets', 'Flooring', 'Construction debris'] },
  { icon: Leaf, title: 'Outdoor', text: 'Storm cleanup, brush, fencing, deck tear-outs, and yard piles.', items: ['Branches', 'Brush', 'Old fencing'] },
  { icon: Building2, title: 'Commercial', text: 'Office, retail, rental, and move-out cleanouts with predictable timing.', items: ['Desks', 'Fixtures', 'Tenant debris'] },
];

const promises = [
  { title: 'No mystery arrival', text: 'Customers get a practical window and can call or text when plans change.' },
  { title: 'Disposal explained', text: 'Specialty items, recycling, donation, and dump fees are surfaced early.' },
  { title: 'Property respect', text: 'Crews plan access around floors, stairs, elevators, driveways, and tight entries.' },
  { title: 'Built for repeat work', text: 'Rentals, offices, and cleanout partners get a simple path back to booking.' },
];

const faqs = [
  { q: 'How fast can you pick up junk?', a: 'Same-day and next-day pickup may be available when routes are open. Photos, city, and access details help confirm the window faster.' },
  { q: 'How is the price calculated?', a: 'Pricing is based on volume, labor, access, weight, dump fees, and specialty disposal. The quote helper gives a starting range before booking.' },
  { q: 'Do I need to move items outside?', a: 'No. Curbside is fastest, but crews can remove items from garages, basements, apartments, offices, and inside rooms when access is clear.' },
  { q: 'What items need special handling?', a: 'Appliances, electronics, tires, mattresses, construction debris, and heavy materials may need extra disposal planning. Mention them when requesting a quote.' },
];

const loadSizes = [['small', 'Small'], ['medium', 'Medium'], ['large', 'Large'], ['truck', 'Truck']];
const accessOptions = [['curb', 'Curbside'], ['garage', 'Garage'], ['inside', 'Inside'], ['stairs', 'Stairs']];
const timingOptions = [['flex', 'Flexible'], ['soon', '48h'], ['today', 'Today']];
const basePrice = { small: 95, medium: 185, large: 325, truck: 495 };
const accessAdd = { curb: 0, garage: 25, inside: 60, stairs: 95 };
const timingAdd = { flex: 0, soon: 35, today: 75 };

function estimatePrice(loadSize, access, timing) {
  return basePrice[loadSize] + accessAdd[access] + timingAdd[timing];
}

export default function App() {
  const [loadSize, setLoadSize] = useState('medium');
  const [access, setAccess] = useState('garage');
  const [timing, setTiming] = useState('flex');
  const [selectedService, setSelectedService] = useState(services[0]);
  const [cityFilter, setCityFilter] = useState('');
  const [form, setForm] = useState({ name: '', city: '', details: '' });

  const estimate = useMemo(() => estimatePrice(loadSize, access, timing), [loadSize, access, timing]);
  const estimateHigh = estimate + 125 + (loadSize === 'truck' ? 95 : 0);
  const quoteBody = [
    `Name: ${form.name}`,
    `City: ${form.city}`,
    `Service: ${selectedService.label}`,
    `Load size: ${loadSize}`,
    `Access: ${access}`,
    `Timing: ${timing}`,
    `Estimated range: $${estimate} to $${estimateHigh}`,
    `Details: ${form.details}`,
  ].join('\n');
  const encodedQuote = encodeURIComponent(quoteBody);
  const mailto = `mailto:${email}?subject=${encodeURIComponent('Dakota Valley quote request')}&body=${encodedQuote}`;
  const sms = `${smsLink}?&body=${encodedQuote}`;
  const normalizedCityFilter = cityFilter.trim().toLowerCase();

  return (
    <main>
      <section className='hero' id='top'>
        <nav className='nav' aria-label='Primary navigation'>
          <a className='brand' href='#top' aria-label='Dakota Valley home'>
            <span className='brand-mark'><Truck size={22} /></span>
            <span>Dakota Valley</span>
          </a>
          <div className='nav-links'>
            <a href='#services'>Services</a>
            <a href='#pricing'>Pricing</a>
            <a href='#areas'>Areas</a>
            <a href='#faq'>FAQ</a>
          </div>
          <a className='nav-call' href={phoneLink}><Phone size={17} /> Call {phoneDisplay}</a>
        </nav>

        <div className='hero-content'>
          <p className='eyebrow'><Sparkles size={16} /> Minnesota junk removal, cleaned up</p>
          <h1>Dakota Valley Junk Removal</h1>
          <p className='hero-copy'>
            Fast hauling, fair pricing, and clean handoffs for homes, rentals, garages, offices, yard debris, and renovation messes across Minnesota.
          </p>
          <div className='hero-actions'>
            <a className='button primary' href='#quote'>Get a fast quote <ArrowRight size={18} /></a>
            <a className='button secondary' href={phoneLink}><Phone size={18} /> Call now</a>
            <a className='button ghost' href='#areas'><MapPin size={18} /> Check service area</a>
          </div>
          <div className='hero-proof' aria-label='Business highlights'>
            <span><CheckCircle2 size={16} /> Same-day when routes are open</span>
            <span><Camera size={16} /> Photo estimates</span>
            <span><Recycle size={16} /> Donation and recycling first</span>
          </div>
        </div>

        <div className='quick-panel' aria-label='Quick quote details'>
          <div className='route-card'>
            <div className='quick-stats'>
              <div className='quick-stat'><Clock size={22} /><div><strong>Open daily</strong><span>8 AM to 9 PM</span></div></div>
              <div className='quick-stat'><ShieldCheck size={22} /><div><strong>Clear range</strong><span>Before lifting starts</span></div></div>
              <div className='quick-stat'><MapIcon size={22} /><div><strong>Route aware</strong><span>Twin Cities and beyond</span></div></div>
            </div>
          </div>
          <div className='photo-card'>
            <strong>Fastest quote path</strong>
            <p>Send a pile photo, the city, and whether the crew needs stairs, basement, garage, or curbside access.</p>
          </div>
        </div>
      </section>

      <section className='band metrics' aria-label='Key service stats'>
        <div><strong>44+</strong><span>Minnesota cities</span></div>
        <div><strong>6</strong><span>Core hauling services</span></div>
        <div><strong>3 ways</strong><span>Call, photo, or form</span></div>
        <div><strong>Local</strong><span>Dakota Valley crew</span></div>
      </section>

      <section className='section split' id='services'>
        <div>
          <p className='section-kicker'>Services</p>
          <h2>Built for the jobs people actually put off.</h2>
          <p className='section-copy'>
            Pick the service that matches your situation. Pricing updates by volume, access, and timing so customers understand the range before booking.
          </p>
          <div className='service-list' role='list'>
            {services.map((service) => {
              const Icon = service.icon;
              const active = selectedService.label === service.label;
              return (
                <button key={service.label} className={`service-row ${active ? 'active' : ''}`} onClick={() => setSelectedService(service)} type='button'>
                  <span className='icon-box'><Icon size={22} /></span>
                  <span><strong>{service.label}</strong><small>{service.detail}</small></span>
                  <em>{service.price}</em>
                  <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </button>
              );
            })}
          </div>
        </div>

        <aside className='quote-card' id='quote'>
          <p className='section-kicker' id='pricing'>Fast quote helper</p>
          <h3>{selectedService.label}</h3>
          <p>{selectedService.detail}</p>

          <label>Load size</label>
          <div className='segmented'>
            {loadSizes.map(([value, label]) => (
              <button key={value} type='button' className={loadSize === value ? 'selected' : ''} onClick={() => setLoadSize(value)}>{label}</button>
            ))}
          </div>

          <label>Access</label>
          <div className='segmented two'>
            {accessOptions.map(([value, label]) => (
              <button key={value} type='button' className={access === value ? 'selected' : ''} onClick={() => setAccess(value)}>{label}</button>
            ))}
          </div>

          <label>Timing</label>
          <div className='segmented three'>
            {timingOptions.map(([value, label]) => (
              <button key={value} type='button' className={timing === value ? 'selected' : ''} onClick={() => setTiming(value)}>{label}</button>
            ))}
          </div>

          <div className='estimate'>
            <span>Estimated range</span>
            <strong>${estimate} - ${estimateHigh}</strong>
          </div>
          <p className='mini-note'>Final price depends on exact volume, weight, dump fees, and specialty items. Photos help tighten the range fast.</p>

          <input aria-label='Name' placeholder='Your name' value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input aria-label='City' placeholder='City' value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
          <textarea aria-label='Items' placeholder='What needs to go? Add photos when you email or text.' value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} />

          <div className='quote-actions'>
            <a className='button primary full' href={mailto}><Mail size={18} /> Send quote request</a>
            <a className='button secondary full' href={sms}><MessageSquareText size={18} /> Text the job details</a>
            <a className='button secondary full' href={phoneLink}><Phone size={18} /> Call {phoneDisplay}</a>
          </div>
        </aside>
      </section>

      <section className='band trust-grid'>
        {trust.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <span className='icon-box'><Icon size={24} /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className='section tight' id='items'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>What we take</p>
            <h2>From one bulky item to a full property reset.</h2>
          </div>
          <p className='section-copy'>Household items, renovation debris, outdoor piles, and business cleanouts each need a different crew plan. Mention anything heavy, sharp, or unusual when requesting a quote.</p>
        </div>
        <div className='take-grid'>
          {takeCategories.map((category) => {
            const Icon = category.icon;
            return (
              <article className='take-card' key={category.title}>
                <span className='icon-box'><Icon size={22} /></span>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
                <ul>{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className='section areas' id='areas'>
        <div className='areas-copy'>
          <p className='section-kicker'>Service areas</p>
          <h2>One statewide brand, local routes that make sense.</h2>
          <p className='section-copy'>
            Dakota Valley serves the Twin Cities metro and greater Minnesota communities with route-aware scheduling and practical hauling options.
          </p>
          <input className='city-search' aria-label='Search service cities' placeholder='Search your city' value={cityFilter} onChange={(event) => setCityFilter(event.target.value)} />
          <div className='city-grid' aria-label='Popular service cities'>
            {cities.map((city) => (
              <span key={city} className={normalizedCityFilter && city.toLowerCase().includes(normalizedCityFilter) ? 'match' : ''}>{city}</span>
            ))}
          </div>
        </div>
        <div className='route-map' aria-label='Minnesota service route map'>
          <span className='map-pin primary'>Apple Valley</span>
          <span className='map-pin'>Lakeville</span>
          <span className='map-pin'>Eagan</span>
          <span className='map-pin'>Minneapolis</span>
          <span className='map-pin'>St. Paul</span>
          <span className='map-pin'>Woodbury</span>
          <span className='map-pin'>Rochester</span>
          <span className='map-pin'>Duluth</span>
        </div>
      </section>

      <section className='section process'>
        <p className='section-kicker'>How it works</p>
        <h2>Three steps from clutter to clear.</h2>
        <div className='steps'>
          <article><span className='step-number'>1</span><h3>Send photos</h3><p>Show the pile, the access path, and anything heavy, sharp, or unusual.</p></article>
          <article><span className='step-number'>2</span><h3>Pick a window</h3><p>We match the job to the right crew, truck, disposal route, and arrival window.</p></article>
          <article><span className='step-number'>3</span><h3>We haul it away</h3><p>Items are loaded, the area is swept, and usable goods are routed for donation.</p></article>
        </div>
      </section>

      <section className='promise-band' aria-label='Customer promises'>
        <div className='promise-wrap'>
          <div>
            <p className='section-kicker'>Why choose Dakota Valley</p>
            <h2>Clean communication before, during, and after the haul.</h2>
          </div>
          <div className='promise-grid'>
            {promises.map((promise) => (
              <article className='promise' key={promise.title}><h3>{promise.title}</h3><p>{promise.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className='section' id='faq'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>FAQ</p>
            <h2>Quick answers before someone calls.</h2>
          </div>
          <a className='button secondary' href={phoneLink}><Phone size={18} /> Ask a question</a>
        </div>
        <div className='faq-list'>
          {faqs.map((faq, index) => (
            <details className='faq-card' key={faq.q} open={index === 0}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className='footer'>
        <div>
          <strong>Dakota Valley Junk Removal</strong>
          <p>Minnesota junk removal, cleanouts, trailer rental, dumpster rental, and labor help. Open daily from 8 AM to 9 PM.</p>
        </div>
        <div className='footer-actions'>
          <a href={phoneLink}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </footer>

      <div className='mobile-cta' aria-label='Mobile contact actions'>
        <a className='button primary' href='#quote'>Quote</a>
        <a className='button secondary' href={phoneLink}>Call</a>
      </div>
    </main>
  );
}
