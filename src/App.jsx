import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Camera,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  MessageSquareText,
  Phone,
  Recycle,
  ShieldCheck,
  Sofa,
  Sparkles,
  Truck,
  Warehouse,
} from "lucide-react";

const phoneDisplay = "(952) 232-5107";
const phoneLink = "tel:9522325107";
const email = "info@dakotavalleyjunkremoval.com";

const services = [
  { label: "Junk pickup", icon: Truck, price: "From $95", detail: "Curbside, garage, basement, and full-home cleanouts." },
  { label: "Furniture", icon: Sofa, price: "From $85", detail: "Sofas, beds, dressers, tables, office furniture, and more." },
  { label: "Appliances", icon: Recycle, price: "From $90", detail: "Certified recycling for fridges, washers, dryers, stoves, and dishwashers." },
  { label: "Dumpsters", icon: Warehouse, price: "10 to 20 yd", detail: "Simple short-term rentals for renovation debris and cleanouts." },
];

const cities = [
  "Apple Valley", "Burnsville", "Eagan", "Farmington", "Hastings", "Lakeville", "Rosemount", "Minneapolis",
  "St. Paul", "Bloomington", "Eden Prairie", "Edina", "Maple Grove", "Woodbury", "Rochester", "Duluth",
  "St. Cloud", "Mankato", "Moorhead", "Brainerd", "Winona", "Northfield", "Owatonna", "Faribault",
];

const trust = [
  { icon: Clock, title: "Same-day options", text: "Fast dispatch windows when routes are open." },
  { icon: ShieldCheck, title: "Upfront pricing", text: "Clear estimates before lifting starts." },
  { icon: Recycle, title: "Eco-first disposal", text: "Donation and recycling prioritized where possible." },
  { icon: BadgeCheck, title: "Local Minnesota crew", text: "Built for homes, rentals, offices, and cleanouts." },
];

function estimatePrice(loadSize, access) {
  const base = { small: 95, medium: 185, large: 325, truck: 495 }[loadSize];
  const accessAdd = { curb: 0, garage: 25, inside: 60, stairs: 95 }[access];
  return base + accessAdd;
}

export default function App() {
  const [loadSize, setLoadSize] = useState("medium");
  const [access, setAccess] = useState("garage");
  const [selectedService, setSelectedService] = useState(services[0]);
  const [form, setForm] = useState({ name: "", city: "", details: "" });

  const estimate = useMemo(() => estimatePrice(loadSize, access), [loadSize, access]);
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Dakota Valley quote request")}&body=${encodeURIComponent(
    `Name: ${form.name}\nCity: ${form.city}\nService: ${selectedService.label}\nEstimated range: $${estimate} to $${estimate + 125}\nDetails: ${form.details}`,
  )}`;

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Dakota Valley home">
            <span className="brand-mark"><Truck size={22} /></span>
            <span>Dakota Valley</span>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#areas">Areas</a>
            <a href="#quote">Quote</a>
          </div>
          <a className="nav-call" href={phoneLink}><Phone size={17} /> {phoneDisplay}</a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow"><Sparkles size={16} /> Minnesota junk removal, cleaned up</p>
          <h1>Dakota Valley Junk Removal</h1>
          <p className="hero-copy">
            Fast hauling, fair pricing, and clean handoffs for homes, rentals, garages, offices, and renovation messes across Minnesota.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#quote">Get a fast quote <ArrowRight size={18} /></a>
            <a className="button secondary" href={phoneLink}><Phone size={18} /> Call now</a>
          </div>
          <div className="hero-proof" aria-label="Business highlights">
            <span><CheckCircle2 size={16} /> Same-day available</span>
            <span><CheckCircle2 size={16} /> Photo estimates</span>
            <span><CheckCircle2 size={16} /> Donation first</span>
          </div>
        </div>
      </section>

      <section className="band metrics" aria-label="Key service stats">
        <div><strong>44+</strong><span>Minnesota cities</span></div>
        <div><strong>3 ways</strong><span>Call, photo, or form</span></div>
        <div><strong>Upfront</strong><span>No surprise pricing</span></div>
        <div><strong>Local</strong><span>Dakota Valley crew</span></div>
      </section>

      <section className="section split" id="services">
        <div>
          <p className="section-kicker">Services</p>
          <h2>Built for the jobs people actually put off.</h2>
          <p className="section-copy">
            Pick the service that matches your situation. We price by volume, access, labor, and disposal requirements so customers know the range before booking.
          </p>
          <div className="service-list" role="list">
            {services.map((service) => {
              const Icon = service.icon;
              const active = selectedService.label === service.label;
              return (
                <button key={service.label} className={`service-row ${active ? "active" : ""}`} onClick={() => setSelectedService(service)} type="button">
                  <Icon size={22} />
                  <span><strong>{service.label}</strong><small>{service.detail}</small></span>
                  <em>{service.price}</em>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="quote-card" id="quote">
          <p className="section-kicker">Fast quote helper</p>
          <h3>{selectedService.label}</h3>
          <p>{selectedService.detail}</p>

          <label>Load size</label>
          <div className="segmented">
            {[
              ["small", "Small"],
              ["medium", "Medium"],
              ["large", "Large"],
              ["truck", "Truck"],
            ].map(([value, label]) => (
              <button key={value} type="button" className={loadSize === value ? "selected" : ""} onClick={() => setLoadSize(value)}>{label}</button>
            ))}
          </div>

          <label>Access</label>
          <div className="segmented two">
            {[
              ["curb", "Curbside"],
              ["garage", "Garage"],
              ["inside", "Inside"],
              ["stairs", "Stairs"],
            ].map(([value, label]) => (
              <button key={value} type="button" className={access === value ? "selected" : ""} onClick={() => setAccess(value)}>{label}</button>
            ))}
          </div>

          <div className="estimate">
            <span>Estimated range</span>
            <strong>${estimate} - ${estimate + 125}</strong>
          </div>

          <input aria-label="Name" placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input aria-label="City" placeholder="City" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
          <textarea aria-label="Items" placeholder="What needs to go?" value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} />

          <div className="quote-actions">
            <a className="button primary full" href={mailto}><MessageSquareText size={18} /> Send quote request</a>
            <a className="button secondary full" href={phoneLink}><Phone size={18} /> Call {phoneDisplay}</a>
          </div>
        </aside>
      </section>

      <section className="band trust-grid">
        {trust.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon size={24} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="section areas" id="areas">
        <div className="areas-copy">
          <p className="section-kicker">Service areas</p>
          <h2>One statewide brand, local routes that make sense.</h2>
          <p className="section-copy">
            Dakota Valley serves the Twin Cities metro and greater Minnesota communities with route-aware scheduling and practical hauling options.
          </p>
          <a className="button secondary" href={phoneLink}><MapPin size={18} /> Check my city</a>
        </div>
        <div className="city-grid" aria-label="Popular service cities">
          {cities.map((city) => <span key={city}>{city}</span>)}
        </div>
      </section>

      <section className="section process">
        <p className="section-kicker">How it works</p>
        <h2>Three steps from clutter to clear.</h2>
        <div className="steps">
          <article><Camera size={26} /><h3>Send photos</h3><p>Show the pile, the access path, and anything heavy or unusual.</p></article>
          <article><CalendarCheck size={26} /><h3>Pick a window</h3><p>We match the job to the right crew, truck, and route.</p></article>
          <article><Home size={26} /><h3>We haul it away</h3><p>Items are loaded, swept up, and sent to donation, recycling, or disposal.</p></article>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>Dakota Valley Junk Removal</strong>
          <p>Minnesota junk removal, cleanouts, trailer rental, dumpster rental, and labor help.</p>
        </div>
        <div className="footer-actions">
          <a href={phoneLink}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </footer>
    </main>
  );
}
