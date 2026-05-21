import { useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cities as citiesData } from '../data/cities.js';
import { counties as countiesData } from '../data/counties.js';

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  Home,
  Leaf,
  Mail,
  Map as MapIcon,
  MapPin,
  MessageSquareText,
  Recycle,
  ShieldCheck,
  Sofa,
  Sparkles,
  Truck,
  Warehouse,
  Wrench,
} from 'lucide-react';

const phoneDisplay = '(952) 232-5107';
const smsLink = 'sms:+19522325107';
const email = 'info@dakotavalleyjunkremoval.com';

const services = [
  { slug: 'junk-pickup', label: 'Junk pickup', icon: Truck, price: 'From $85', detail: 'Affordable pickup for items placed at the curb or in the garage.', tags: ['curbside', 'garage', '$85 minimum'] },
  { slug: 'furniture-removal', label: 'Furniture removal', icon: Sofa, price: 'From $85', detail: 'Sofas, beds, dressers, tables, sectionals, and office furniture staged for pickup.', tags: ['sofas', 'mattresses', 'desks'] },
  { slug: 'appliance-recycling', label: 'Appliance recycling', icon: Recycle, price: 'From $85', detail: 'Refrigerators, washers, dryers, stoves, dishwashers, and metal items staged curbside or in the garage.', tags: ['appliances', 'metal', 'eco route'] },
  { slug: 'garage-cleanout', label: 'Garage cleanout pickup', icon: Home, price: 'From $85', detail: 'Garage-staged boxes, clutter, furniture, and bulky items ready for quick loading.', tags: ['garage', 'multi-item', 'fast load'] },
  { slug: 'yard-debris', label: 'Yard waste and storm debris', icon: Leaf, price: 'From $85', detail: 'Brush, branches, fencing, deck debris, and storm cleanup piles staged outside.', tags: ['seasonal', 'branches', 'debris'] },
  { slug: 'dumpster-rental', label: 'Dumpster and trailer rental', icon: Warehouse, price: 'By request', detail: 'Short-term drop options for remodels, cleanouts, and DIY loading.', tags: ['renovation', 'drop-off', 'pickup'] },
];

const counties = [
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

const trust = [
  { icon: MessageSquareText, title: 'Text preferred', text: 'Photos and details by text help quote jobs faster than back-and-forth calls.' },
  { icon: ShieldCheck, title: '$85 minimum', text: 'Clear minimum pricing with specialty fees called out before booking.' },
  { icon: Home, title: 'Curb or garage', text: 'Customers stage items in the easiest pickup spots to keep labor costs low.' },
  { icon: CalendarDays, title: 'Calendar booking', text: 'Choose a preferred pickup date and window through the form.' },
];

const takeCategories = [
  { icon: Sofa, title: 'Household', text: 'Items placed at the curb or staged in the garage.', items: ['Mattresses', 'Furniture', 'Boxes and clutter'] },
  { icon: Wrench, title: 'Renovation', text: 'Bagged or stacked debris ready for quick pickup.', items: ['Cabinets', 'Flooring', 'Construction debris'] },
  { icon: Leaf, title: 'Outdoor', text: 'Yard piles, brush, branches, and storm debris staged outside.', items: ['Branches', 'Brush', 'Old fencing'] },
  { icon: Building2, title: 'Commercial', text: 'Office or rental items staged for efficient loading.', items: ['Desks', 'Fixtures', 'Tenant debris'] },
];

const promises = [
  { title: 'Text-first service', text: 'Customers can send details and photos without needing a phone call.' },
  { title: 'Lower labor model', text: 'Curbside and garage pickup reduces time on site and helps keep prices down.' },
  { title: 'Photo-based estimates', text: 'Photos help confirm volume, truck space, and any specialty disposal notes.' },
  { title: 'All MN coverage', text: 'City and county coverage is built into the quote and scheduling flow.' },
];

const faqs = [
  { q: 'What is the minimum pickup price?', a: 'The minimum pickup price is $85 for eligible curbside or garage pickup. Final pricing depends on volume, weight, dump fees, and specialty disposal.' },
  { q: 'Why curbside and garage only?', a: 'This keeps labor time low, helps the crew move faster, and lets Dakota Valley pass savings directly back to customers.' },
  { q: 'Do I need to call?', a: 'No. Text and the booking form are preferred. Photos, item details, city or county, and your preferred calendar window are usually enough to start.' },
  { q: 'Do you serve my city or county?', a: 'Yes. Dakota Valley is set up for all Minnesota cities and counties, with route-aware scheduling based on your location.' },
  { q: 'When is the soonest you can pick up?', a: 'Appointments are typically scheduled about two business days out so the crew is prepared with the right equipment. Most customers book within 2–3 business days. Text or use the booking form to check current availability.' },
  { q: 'Do I need to be home during the pickup?', a: 'No — as long as the items are accessible at the curb or in the garage. The crew calls before arrival and sends a confirmation photo when the job is complete.' },
  { q: 'What items do you remove?', a: 'Furniture, appliances, mattresses, yard waste, construction debris, exercise equipment, office furniture, and general household items. Larger jobs like hot tubs and estate cleanouts are quoted by request — send photos to start.' },
  { q: 'What items do you NOT accept?', a: 'For safety and legal reasons, hazardous waste (paint, chemicals, pesticides, motor oil), medical waste, asbestos, biological waste, and explosives. If unsure about an item, text a photo first.' },
  { q: 'Do you recycle or donate items?', a: 'Yes. Furniture in good condition goes to Bridging, Arc’s Value Village, and Goodwill Twin Cities. Electronics go to R2-certified recyclers. Mattresses are recycled at certified Minnesota facilities. Target is 60%+ diverted from landfill.' },
  { q: 'How long does junk removal take?', a: 'Most residential pickups take 30–90 minutes depending on volume. Full estate cleanouts may take 2–4 hours. The crew works efficiently and never rushes — the property is left clean.' },
];

const loadSizes = [['small', 'Small'], ['medium', 'Medium'], ['large', 'Large'], ['truck', 'Truck']];
const accessOptions = [['curb', 'Curbside'], ['garage', 'Garage']];
const timingOptions = [['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Evening']];
const basePrice = { small: 85, medium: 145, large: 275, truck: 425 };
const accessAdd = { curb: 0, garage: 0 };

function estimatePrice(loadSize, access) {
  return basePrice[loadSize] + accessAdd[access];
}

export default function HomePage() {
  const [loadSize, setLoadSize] = useState('medium');
  const [access, setAccess] = useState('garage');
  const [timing, setTiming] = useState('morning');
  const [selectedService, setSelectedService] = useState(services[0]);
  const [cityFilter, setCityFilter] = useState('');
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [countiesOpen, setCountiesOpen] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', date: '', details: '', photoCount: 0 });

  const debouncedFilter = useDebouncedValue(cityFilter, 100);
  const normalizedFilter = debouncedFilter.trim().toLowerCase();
  const filteredCities = Object.entries(citiesData).filter(
    ([, c]) => !normalizedFilter || c.name.toLowerCase().includes(normalizedFilter)
  );
  const filteredCounties = counties.filter(
    (c) => !normalizedFilter || c.toLowerCase().includes(normalizedFilter)
  );
  const countySlugsWithPages = useMemo(() => new Set(Object.keys(countiesData)), []);
  const areaFilterAnnouncement = normalizedFilter
    ? (filteredCities.length === 0 && filteredCounties.length === 0
        ? 'No matches'
        : `Showing ${filteredCities.length} cities and ${filteredCounties.length} counties`)
    : '';

  const location = useLocation();

  // Cross-page scroll-on-arrive: city pages link back here with state.scrollTo.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    const el = document.getElementById(target);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, [location.state]);

  const estimate = useMemo(() => estimatePrice(loadSize, access), [loadSize, access]);
  const estimateHigh = estimate + 90 + (loadSize === 'truck' ? 80 : 0);
  const quoteBody = [
    `Name: ${form.name}`,
    `City or county: ${form.city}`,
    `Service: ${selectedService.label}`,
    `Load size: ${loadSize}`,
    `Pickup spot: ${access}`,
    `Preferred window: ${timing}`,
    `Preferred date: ${form.date}`,
    `Photos selected in form: ${form.photoCount}`,
    `Estimated range: $${estimate} to $${estimateHigh}`,
    `Details: ${form.details}`,
  ].join('\n');
  const encodedQuote = encodeURIComponent(quoteBody);
  const mailto = `mailto:${email}?subject=${encodeURIComponent('Dakota Valley quote request')}&body=${encodedQuote}`;
  const sms = `${smsLink}?&body=${encodedQuote}`;

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
            <a href='#about'>About</a>
            <a href='#faq'>FAQ</a>
          </div>
          <a className='nav-call' href={smsLink}><MessageSquareText size={17} /> Text {phoneDisplay}</a>
        </nav>

        <div className='hero-content'>
          <p className='eyebrow'><Sparkles size={16} /> Minnesota junk removal, cleaned up</p>
          <h1>Dakota Valley Junk Removal</h1>
          <p className='hero-copy'>
            Affordable curbside and garage junk pickup across Minnesota. Text photos, choose a calendar window, and book without a phone call.
          </p>
          <div className='hero-actions'>
            <a className='button primary' href={smsLink}>Text a photo quote <ArrowRight size={18} /></a>
            <a className='button secondary' href='#quote'><CalendarDays size={18} /> Book pickup</a>
            <a className='button ghost' href='#areas'><MapPin size={18} /> Check service area</a>
          </div>
          <div className='hero-proof' aria-label='Business highlights'>
            <span><CheckCircle2 size={16} /> $85 minimum pickup</span>
            <span><Camera size={16} /> Photo estimates by text or form</span>
            <span><Home size={16} /> Curbside and garage only</span>
          </div>
        </div>

        <div className='quick-panel' aria-label='Quick quote details'>
          <div className='route-card'>
            <div className='quick-stats'>
              <div className='quick-stat'><MessageSquareText size={22} /><div><strong>Text-first</strong><span>Faster than calls</span></div></div>
              <div className='quick-stat'><Camera size={22} /><div><strong>Photo quote</strong><span>Upload or text photos</span></div></div>
              <div className='quick-stat'><CalendarDays size={22} /><div><strong>Calendar</strong><span>Request a pickup window</span></div></div>
            </div>
          </div>
          <div className='photo-card'>
            <strong>Fastest quote path</strong>
            <p>Send a pile photo, your city or county, curbside vs garage pickup, and the date window that works best.</p>
          </div>
        </div>
      </section>

      <section className='band metrics' aria-label='Key service stats'>
        <div><strong>$85</strong><span>Minimum pickup</span></div>
        <div><strong>18</strong><span>Service categories</span></div>
        <div><strong>44</strong><span>Cities served</span></div>
        <div><strong>Since 2009</strong><span>Locally owned</span></div>
      </section>

      <section className='band trust-grid' aria-label='Trust signals'>
        <article>
          <ShieldCheck size={22} />
          <h3>Licensed and insured</h3>
          <p>Fully licensed for waste hauling. General liability insurance covers your property during pickup.</p>
        </article>
        <article>
          <CalendarDays size={22} />
          <h3>Same-day eligible</h3>
          <p>Most pickups scheduled within 2-3 business days. Same-day jobs available based on crew capacity.</p>
        </article>
        <article>
          <Recycle size={22} />
          <h3>60%+ diverted from landfill</h3>
          <p>Furniture donated to Bridging, Arc, Goodwill. Electronics to R2-certified recyclers. Mattresses recycled.</p>
        </article>
        <article>
          <CheckCircle2 size={22} />
          <h3>Transparent pricing</h3>
          <p>$85 minimum. Volume-based tiers. Surcharges disclosed upfront. <Link to='/pricing'>See pricing</Link>.</p>
        </article>
      </section>

      <section className='section split' id='services'>
        <div>
          <p className='section-kicker'>Services</p>
          <h2>Built for the jobs people actually put off.</h2>
          <p className='section-copy'>
            Pick the service that matches your situation. Keeping pickup to curbside and garage jobs lowers labor time so savings can go back to customers.
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
          <div className='service-deep-links' aria-label='Service pages'>
            {services.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`} className='service-deep-link'>
                {service.label} →
              </Link>
            ))}
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

          <label>Pickup spot</label>
          <div className='segmented two'>
            {accessOptions.map(([value, label]) => (
              <button key={value} type='button' className={access === value ? 'selected' : ''} onClick={() => setAccess(value)}>{label}</button>
            ))}
          </div>

          <label>Preferred window</label>
          <div className='segmented three'>
            {timingOptions.map(([value, label]) => (
              <button key={value} type='button' className={timing === value ? 'selected' : ''} onClick={() => setTiming(value)}>{label}</button>
            ))}
          </div>

          <label>Preferred date</label>
          <input aria-label='Preferred pickup date' type='date' value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />

          <label>Photos</label>
          <input aria-label='Job photos' type='file' accept='image/*' multiple onChange={(event) => setForm({ ...form, photoCount: event.target.files?.length || 0 })} />

          <div className='estimate'>
            <span>Estimated range</span>
            <strong>${estimate} - ${estimateHigh}</strong>
          </div>
          <p className='mini-note'>Minimum pickup is $85. Final price depends on volume, weight, dump fees, and specialty items. Curbside and garage-only pickup keeps labor lower.</p>

          <input aria-label='Name' placeholder='Your name' value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input aria-label='City or county' placeholder='City or county' value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
          <textarea aria-label='Items' placeholder='What needs to go? Include item count, size, and curbside or garage location.' value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} />

          <div className='quote-actions'>
            <a className='button primary full' href={sms}><MessageSquareText size={18} /> Text job photos</a>
            <a className='button secondary full' href={mailto}><Mail size={18} /> Send form request</a>
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
          <p className='section-copy'>Stage items at the curb or in the garage. Mention anything heavy, sharp, oversized, or unusual when requesting a quote.</p>
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

      <section className='areas-v2' id='areas'>
        <header className='areas-head'>
          <p className='section-kicker'>Service areas</p>
          <h2>One statewide brand, local routes that make sense.</h2>
          <p className='section-copy'>
            Dakota Valley serves all Minnesota cities and counties with route-aware scheduling and practical curbside or garage pickup.
          </p>
        </header>

        <div className='areas-search'>
          <label htmlFor='areas-search-input' className='sr-only'>
            Search Minnesota cities and counties
          </label>
          <input
            id='areas-search-input'
            type='search'
            className='areas-search-input'
            placeholder='Search your city or county'
            value={cityFilter}
            onChange={(event) => setCityFilter(event.target.value)}
            aria-controls='areas-cities-list areas-counties-list'
          />
          {cityFilter && (
            <button
              type='button'
              className='areas-search-clear'
              onClick={() => setCityFilter('')}
              aria-label='Clear search'
            >×</button>
          )}
        </div>

        <div className='areas-featured' role='group' aria-label='Featured counties and statewide'>
          <Link to='/counties/dakota-county' className='areas-pill'>Dakota County</Link>
          <Link to='/counties/hennepin-county' className='areas-pill'>Hennepin County</Link>
          <Link to='/counties/ramsey-county' className='areas-pill'>Ramsey County</Link>
          <Link to='/counties/washington-county' className='areas-pill'>Washington County</Link>
          <Link to='/counties/scott-county' className='areas-pill'>Scott County</Link>
          <Link to='/counties/olmsted-county' className='areas-pill'>Olmsted County</Link>
          <Link to='/counties/st-louis-county' className='areas-pill'>St. Louis County</Link>
          <button
            type='button'
            className='areas-pill areas-pill-allmn'
            onClick={() => {
              setCitiesOpen(true);
              setCountiesOpen(true);
              document.getElementById('areas-cities-details')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >All Minnesota</button>
        </div>

        <div aria-live='polite' className='sr-only'>{areaFilterAnnouncement}</div>

        <details
          className='areas-accordion'
          id='areas-cities-details'
          open={!!cityFilter || citiesOpen}
          onToggle={(event) => setCitiesOpen(event.currentTarget.open)}
        >
          <summary>
            <h3>View all 44 Minnesota cities</h3>
          </summary>
          <div className='areas-link-grid' id='areas-cities-list'>
            {filteredCities.length === 0 && cityFilter && (
              <p className='areas-no-match'>No matching cities</p>
            )}
            {filteredCities.map(([slug, c]) => (
              <Link key={slug} to={`/cities/${slug}`} className='areas-link'>
                {c.name}
              </Link>
            ))}
          </div>
        </details>

        <details
          className='areas-accordion'
          id='areas-counties-details'
          open={!!cityFilter || countiesOpen}
          onToggle={(event) => setCountiesOpen(event.currentTarget.open)}
        >
          <summary>
            <h3>View all 87 Minnesota counties</h3>
          </summary>
          <div className='areas-link-grid' id='areas-counties-list'>
            {filteredCounties.length === 0 && cityFilter && (
              <p className='areas-no-match'>No matching counties</p>
            )}
            {filteredCounties.map((county) => {
              const slug = county.toLowerCase().replace(/[. ]+/g, '-') + '-county';
              const hasPage = countySlugsWithPages.has(slug);
              return hasPage ? (
                <Link key={county} to={`/counties/${slug}`} className='areas-link'>
                  {county} County
                </Link>
              ) : (
                <span key={county} className='areas-link areas-link-text'>
                  {county} County
                </span>
              );
            })}
          </div>
        </details>
      </section>

      <section className='section process'>
        <p className='section-kicker'>How it works</p>
        <h2>Three steps from clutter to clear.</h2>
        <div className='steps'>
          <article><span className='step-number'>1</span><h3>Text or upload photos</h3><p>Show the pile, item count, and whether pickup is curbside or garage.</p></article>
          <article><span className='step-number'>2</span><h3>Pick a calendar window</h3><p>Request the date and morning, afternoon, or evening window that works best.</p></article>
          <article><span className='step-number'>3</span><h3>Stage and save</h3><p>Items stay at the curb or garage so pickup is faster and more affordable.</p></article>
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

      <section className='section about' id='about'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>About Dakota Valley</p>
            <h2>Twin Cities-grown since 2009.</h2>
          </div>
        </div>
        <div className='about-grid'>
          <div className='about-body'>
            <p>
              Dakota Valley Junk Removal started in 2009 with one truck serving
              Uptown Minneapolis and Highland Park St. Paul. The routes now reach
              the full metro and beyond, but the principles haven't changed:
              honest pricing, exceptional service, and environmental responsibility.
            </p>
            <p>
              Donation partners include <strong>Bridging</strong>, <strong>Arc's
              Value Village</strong>, and <strong>Goodwill Twin Cities</strong>.
              Through county recycling programs in Hennepin, Ramsey, and Dakota,
              more than 60% of materials are diverted from landfills.
            </p>
            <p>
              Locally-owned. The team lives in the same communities it serves —
              from Edina to Eagan to Northeast Minneapolis. Every job gets the
              same care, whether it's a Kenwood mansion or a Frogtown bungalow.
            </p>
          </div>
          <div className='about-stats'>
            <div className='about-stat'>
              <div className='about-stat-number'>60%+</div>
              <div className='about-stat-label'>Materials diverted from landfill</div>
            </div>
            <div className='about-stat'>
              <div className='about-stat-number'>44+</div>
              <div className='about-stat-label'>Tons diverted annually</div>
            </div>
            <div className='about-stat'>
              <div className='about-stat-number'>15+</div>
              <div className='about-stat-label'>Local charity partners</div>
            </div>
          </div>
        </div>
      </section>

      <section className='section' id='faq'>
        <div className='section-head'>
          <div>
            <p className='section-kicker'>FAQ</p>
            <h2>Quick answers before someone texts.</h2>
          </div>
          <a className='button secondary' href={smsLink}><MessageSquareText size={18} /> Ask by text</a>
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
          <p>Minnesota curbside and garage junk pickup. Text or use the form for photo quotes, calendar booking, and service across all cities and counties.</p>
        </div>
        <div className='footer-actions'>
          <a href={smsLink}>Text {phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </footer>

      <div className='mobile-cta' aria-label='Mobile contact actions'>
        <a className='button primary' href={smsLink}>Text</a>
        <a className='button secondary' href='#quote'>Book</a>
      </div>
    </main>
  );
}
