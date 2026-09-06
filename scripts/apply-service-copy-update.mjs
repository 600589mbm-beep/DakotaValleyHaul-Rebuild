// One-time, source-only migration. Removed from the final change after validation.
// Never modifies customer reviews, styles, URLs, or generated HTML.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const policy = {
  PICKUP_MINIMUM: 85,
  PRICE_FLOOR: 'Pickup minimum $85',
  PRICE_RANGE: '$85+',
  PRICE_FLOOR_DETAIL: 'Eligible curbside, driveway or accessible-garage pickups have an $85 minimum. This is not a flat price for every item. Send photos for the exact total in writing before booking.',
  PICKUP_SCOPE: 'Curbside, driveway and accessible-garage pickup only. No inside-home pickup.',
  PICKUP_REQUIREMENTS: 'Stage all approved items safely at the curb, in the driveway or in an accessible garage before the confirmed pickup window. The crew does not enter living areas or carry items out of basements, upstairs rooms or attics. Photograph the staged items and the clear path to legal truck parking.',
  NO_INSIDE_PICKUP: 'No. Dakota Valley does not provide inside-home pickup or carry items through living areas, basements or attics. Items must be safely staged at the curb, in the driveway or in an accessible garage before pickup. Arrange suitable help with staging rather than moving heavy items unsafely.',
  QUOTE_POLICY: 'The written quote covers the items, volume, weight, access and disposal needs shown in your photos and details. When those match, the approved total stays the same. Any change to the agreed scope requires a revised quote that you approve before work begins.',
  SCHEDULING_POLICY: 'Pickup is by appointment after you approve the written quote and the crew confirms an available window. Timing depends on your address, job size and route capacity. Same-day pickup may be available, but is not guaranteed.',
  COVERAGE_POLICY: 'Send your pickup address to confirm service and route availability before booking. A listed city or county is not a guarantee of an available pickup time.',
  UNATTENDED_POLICY: 'You do not have to be home when the crew has confirmed safe access to all approved items at the curb, in the driveway or in an accessible garage. Arrange access in advance; the crew does not enter living areas.',
  QUOTE_SUCCESS: 'Your quote request was received. The crew will text you with pricing and available pickup times. Your pickup is not booked until the price and window are confirmed with you.',
};
fs.writeFileSync('src/data/servicePolicy.js', '// Shared public service promises. Keep page copy, forms and structured data aligned.\n' + Object.entries(policy).map(([k,v]) => `export const ${k} = ${JSON.stringify(v)};`).join('\n') + '\n');
const policyNames = new Map(Object.entries(policy).filter(([,v]) => typeof v === 'string').map(([k,v]) => [v,k]));
const priceText = policy.PRICE_FLOOR_DETAIL + ' ' + policy.QUOTE_POLICY;
const changed = new Set();
function edit(file, fn) {
  const before = fs.readFileSync(file, 'utf8');
  const after = fn(before);
  if (before !== after) { fs.writeFileSync(file, after); changed.add(file); }
}
function exact(file, before, after) {
  edit(file, s => {
    if (!s.includes(before)) { if (s.includes(after)) return s; throw new Error(`Expected source fragment missing in ${file}: ${before.slice(0,75)}`); }
    return s.replaceAll(before, after);
  });
}
// Remove the incentive rather than changing it into a new, unapproved discount.
exact('src/pages/index.astro', ' <span aria-hidden="true">•</span> <strong>$25 off with review</strong>', '');
edit('scripts/sanitize-public-pricing.mjs', s => s.replace('85\\b|25\\s+off\\s+with\\s+review\\b', '85\\b').replace('// Catch remaining individual prices while leaving the $85 minimum and the\n    // exact "$25 off with review" promotion untouched.', '// Catch remaining individual prices while preserving only the public $85 minimum.'));
exact('src/pages/index.astro', 'No estimate visit. No call center. No low-ball headline that changes when the truck arrives.', 'Curbside, driveway and accessible-garage pickup only. No inside-home pickup.');
exact('src/pages/index.astro', '● Texting now · replies in hours', 'Example quote conversation');
exact('src/pages/index.astro', 'Tomorrow morning. Do I need to be home?', 'Would tomorrow morning work? Do I need to be home?');
exact('src/pages/index.astro', 'Not if it is curbside or in the garage. We will text before arrival and send a completion photo ✅', 'We’ll confirm an available window. You can be away if we agree on safe curbside or garage access first ✅');
exact('src/pages/index.astro', 'Basements<span></span>', 'Staged cleanout items<span></span>');
exact('src/components/TelegramForm.astro', 'Send booking to crew', 'Request my written quote');
exact('src/components/TelegramForm.astro', '✓ Booking sent. The crew will text back within a few hours.', policy.QUOTE_SUCCESS);
exact('src/components/TelegramForm.astro', '<p class="tg-form-lede">Four things get you a firm quote: your <strong>name</strong>, <strong>address</strong>, <strong>phone</strong>, and a few <strong>photos</strong>.</p>', '<p class="tg-form-lede">Send your <strong>name</strong>, <strong>address</strong>, <strong>phone</strong>, <strong>item details</strong>, and <strong>photos</strong> for a written quote. Curbside, driveway and accessible-garage pickup only; no inside-home pickup. This request does not reserve an appointment.</p>');
exact('src/components/SiteFooter.astro', 'Minnesota curbside and garage junk removal. Text or use the form for written photo quotes,\n          pickup scheduling and service across cities and counties.', 'Curbside, driveway and accessible-garage pickup only. No inside-home pickup.\n          Eligible pickups have an $85 minimum; the exact total and pickup window are confirmed with you before booking. Send your address to check route availability.');

function propName(p) { return p?.name && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) ? p.name.text : ''; }
function ancestorNames(node) { const names=[]; for(let p=node.parent;p;p=p.parent) if(ts.isPropertyAssignment(p)) names.push(propName(p)); return names; }
function question(node) {
  const obj=node.parent?.parent;
  if(!obj || !ts.isObjectLiteralExpression(obj)) return '';
  return obj.properties.find(p => ts.isPropertyAssignment(p) && propName(p)==='q')?.initializer.getText() || '';
}
function normalize(text, file, key, q, ancestors) {
  if (!text || /^(?:https?:|sms:|tel:|mailto:|lucide:|\.?\.?\/)/.test(text)) return text;
  const data = file.startsWith('src/data/');
  const corePrices = /\/(?:comboContent|pricing|guides|services|cities|counties)\.js$/.test(file) || file.startsWith('src/pages/');
  if (key === 'priceRange') return policy.PRICE_RANGE;
  if (key === 'accessTitle' && file.endsWith('priorityLocalContent.js')) return 'Curbside, driveway and garage access';
  if (key === 'accessText' && file.endsWith('priorityLocalContent.js')) return policy.PICKUP_REQUIREMENTS;
  if (key === 'routeText' && file.endsWith('priorityLocalContent.js')) return policy.SCHEDULING_POLICY;
  if (ancestors.includes('quoteChecklist') && /stairs|stair|basement|indoor|inside|elevator|floor,/i.test(text)) return 'Safe curbside, driveway or accessible-garage staging';
  if (key === 'a') {
    if (/Does the crew carry|Do you carry items up|Does Dakota Valley.*inside|Can Dakota Valley.*(?:basement|upstairs)|Can you remove.*basement|cannot move items to the curb/i.test(q)) return policy.NO_INSIDE_PICKUP;
    if (/Do bulky items need to be at the curb/i.test(q)) return policy.PICKUP_REQUIREMENTS;
    if (/Can you do the pickup while/i.test(q)) return 'Yes, when access has been agreed in advance. ' + policy.UNATTENDED_POLICY;
    if (/Do I need to be home/i.test(q)) return policy.UNATTENDED_POLICY;
    if (/soonest|same.day|How fast.*(?:pickup|removal|get to)|How soon|When can.*pick/i.test(q)) return policy.SCHEDULING_POLICY;
    if (/Will the price change|quote.*change|price.*change/i.test(q)) return policy.QUOTE_POLICY;
    if (corePrices && /\$\d|no load minimum|\$85 flat/i.test(text)) return priceText;
    if (/What is the minimum pickup price/i.test(q)) return policy.PRICE_FLOOR_DETAIL;
    if (/Do you serve my city or county/i.test(q)) return policy.COVERAGE_POLICY;
  }
  if (key === 'q') return text;
  // Correct affirmative indoor-work instructions; keep neutral safety and municipal advice intact.
  if (/^Yes [—–-] (?:the crew brings|stairs are part)|^Often, yes.*(?:stairs|doorways)|^Inside removal can be quoted|^Yes, subject to access|^Yes, depending on access|^Yes\. Send photos and identify stairs/i.test(text)) return policy.NO_INSIDE_PICKUP;
  if (/^Yes\. Send photos, dimensions.*stairs/i.test(text)) return 'Yes, for items safely staged at the curb, in the driveway or in an accessible garage. Send photos and dimensions for a written quote; no inside-home carry-out.';
  if (/inside removal can be quoted|Dakota Valley provides the labor to carry material from inside|Dakota Valley is most useful when customers need indoor carry.out|from a garage, curb, basement or interior location/i.test(text)) return policy.PICKUP_REQUIREMENTS + ' ' + policy.QUOTE_POLICY;
  if (/^(?:Text a photo|Send photos|One wide shot|The photos,|The unit should|Appliances should|Dakota Valley can quote).*(?:stairs|up stairs|hallways|basement|interior location)/i.test(text)) return policy.PICKUP_REQUIREMENTS + ' Appliances must be safely disconnected by a qualified person before staging; do not cut refrigerant lines.';
  if (corePrices && key !== 'desc' && /\$(?!85\b)\d|no load minimum/.test(text)) {
    if (text.length < 75) return 'Quoted from photos';
    return priceText;
  }
  if (/Single items? from \$85|single.items? start at \$85|\$85 single.item load rate|\$85 flat/i.test(text)) return priceText;
  if (/^Most .*pickups.*(?:business days|scheduled)|^Because .*usually scheduled within|^Crews stage.*same.day or next.day|^Our trucks pass through.*most working days/i.test(text)) return policy.SCHEDULING_POLICY;
  if (/^Need .*routes six days a week/.test(text)) text = text.replace(/runs (.*?) routes six days a week, with regular pickups in/, 'plans pickups by confirmed route availability across $1, including');
  text = text.replace(/full-service junk hauling and property cleanouts/g, 'curbside and garage-staged junk hauling and cleanout pickup');
  text = text.replace(/need same-day furniture removal/g, 'need furniture pickup');
  text = text.replace(/Same-day pickup available\.|Same-day available\./g, 'Pickup windows confirmed by the crew.');
  text = text.replace(/same-day available\./g, 'pickup windows confirmed by the crew.');
  text = text.replace(/\| Same-Day Pickup/g, '| Written Photo Quotes').replace(/From \$85, Same-Day/g, '$85 Minimum, Photo Quotes');
  text = text.replace(/Same-day eligible curbside/g, 'Appointment-based curbside').replace(/same-day eligible pickup/g, 'a pickup window confirmed by the crew').replace(/Same-day eligible on (.*?) routes\./g, 'Pickup timing depends on $1 route availability.');
  text = text.replace(/same-day windows open when a truck is already nearby/g, 'pickup windows depend on confirmed route capacity');
  text = text.replace(/booking is a calendar link, not phone tag/g, 'booking is confirmed with the crew after quote approval');
  text = text.replace(/calendar booking/g, 'booking confirmed by text').replace(/calendar window/g, 'confirmed pickup window');
  text = text.replace(/quote and pickup window come back the same day/g, 'crew confirms the quote and available pickup windows by text');
  text = text.replace(/typically the same day you text/g, 'after the crew reviews your request').replace(/usually within hours/g, 'after review').replace(/in Hours/g, 'by Text').replace(/in hours/g, 'after review');
  text = text.replace(/Curbside and garage-staged items are usually faster than stairs, long carries, or tight access\./g, policy.PICKUP_SCOPE + ' Show the clear path from the staged items to truck parking.');
  text = text.replace(/Stairs & carry distance/g, 'Staging and truck access').replace(/Long carries, tight access, and multiple flights add labor time\./g, 'Items must be safely staged at the curb, in the driveway or in an accessible garage. Show the path to truck parking.');
  text = text.replace(/Crew brings everything down, sorts donations, and hauls the rest\./g, 'Items must be safely brought down and staged at the curb, in the driveway or in an accessible garage before pickup. No attic entry or carry-down service.');
  text = text.replace(/Crew handles stairs\./g, 'Items must be safely staged at the curb, in the driveway or in an accessible garage before pickup. No basement entry or stair carry-out.');
  text = text.replace(/Full attic cleanout/g, 'Pickup of pre-staged attic items').replace(/Full basement cleanout/g, 'Pickup of pre-staged basement items');
  text = text.replace(/interior bathroom and kitchen demo, light wall removal, /g, '').replace(/interior bathroom demo, and kitchen tear-outs \(cabinets and counters\)/g, 'pre-staged renovation debris; no interior demolition');
  text = text.replace(/Bathroom interior demo/g, 'Pre-staged bathroom renovation debris').replace(/Kitchen cabinet and counter removal/g, 'Pre-staged kitchen cabinets and counters');
  text = text.replace(/bathroom interiors/g, 'pre-staged bathroom renovation debris').replace(/a bathroom gut before remodel/g, 'a pre-staged bathroom renovation pile').replace(/a kitchen demo ahead of the contractor/g, 'a pre-staged kitchen renovation pile');
  text = text.replace(/Full-service junk removal can quote inside, garage, basement or upstairs removal when access is safe\./g, policy.PICKUP_SCOPE);
  text = text.replace(/Appliances can come from the basement or garage, not just the curb/g, 'Appliances must be safely disconnected and staged at the curb, in the driveway or in an accessible garage');
  text = text.replace(/indoor carry-out, /g, 'pre-staged curbside or garage loads, ');
  text = text.replace(/carry-out service, /g, 'pickup of pre-staged items, ');
  text = text.replace(/Pickup is useful when items are heavy, upstairs, difficult to transport or spread across several rooms\./g, 'Pickup is for approved items already staged at the curb, in the driveway or in an accessible garage; no room-by-room carry-out.');
  text = text.replace(/Mention stairs, narrow hallways or whether everything will be staged in the garage or at the curb\./g, policy.PICKUP_REQUIREMENTS);
  text = text.replace(/loads from \$85/g, 'an $85 pickup minimum').replace(/an an \$85/g, 'an $85');
  return text;
}
function transformCode(code,file) {
  const sf=ts.createSourceFile(file,code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const edits=[]; const imports=new Set();
  function visit(node) {
    const names=ancestorNames(node);
    if(names.some(n => ['testimonial','reviews','review','officialResource','sources'].includes(n))) return;
    if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)||ts.isTemplateExpression(node)) {
      if(ts.isImportDeclaration(node.parent)||ts.isExportDeclaration(node.parent)) return;
      if(ts.isPropertyAssignment(node.parent) && node.parent.name===node) return;
      const template=ts.isTemplateExpression(node);
      const value=template?node.getText(sf).slice(1,-1):node.text;
      const key=ts.isPropertyAssignment(node.parent)?propName(node.parent):'';
      const result=normalize(value,file,key,question(node),names);
      if(result!==value) {
        let replacement;
        const shared=policyNames.get(result);
        if(shared) { imports.add(shared); replacement=shared; }
        else replacement=template && result.includes('${') ? '`'+result+'`' : JSON.stringify(result);
        edits.push({start:node.getStart(sf),end:node.end,replacement});
      }
      return;
    }
    ts.forEachChild(node,visit);
  }
  visit(sf);
  for(const e of edits.sort((a,b)=>b.start-a.start)) code=code.slice(0,e.start)+e.replacement+code.slice(e.end);
  if(imports.size) {
    let rel=path.relative(path.dirname(file),'src/data/servicePolicy.js').replaceAll('\\','/');
    if(!rel.startsWith('.')) rel='./'+rel;
    code=`import { ${[...imports].sort().join(', ')} } from '${rel}';\n`+code;
  }
  return code;
}
function files(root) { return fs.readdirSync(root,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(root,e.name)):[path.join(root,e.name)]); }
for(const file of files('src')) {
  if(file==='src/data/servicePolicy.js' || /reviews|styles|header-logo/i.test(file)) continue;
  if(file.endsWith('.js')) edit(file,s=>transformCode(s,file));
  if(file.endsWith('.astro')) edit(file,s=>s.replace(/^---\n([\s\S]*?)\n---/,(_,front)=>'---\n'+transformCode(front,file)+'\n---'));
}
// Repair the small number of direct Astro text nodes (not JavaScript strings).
edit('src/pages/cities/[slug].astro', s=>s
  .replace(/Pricing in \{city\.name\} is two-part:[\s\S]*?<a href="\/pricing\/">See the full pricing breakdown<\/a>\./, policy.PRICE_FLOOR_DETAIL+' '+policy.QUOTE_POLICY+' <a href="/pricing/">How photo quotes work</a>.')
  .replace(/Most \{city\.name\} appointments are scheduled within 2–3 business days\.[^\n]+/, policy.SCHEDULING_POLICY)
  .replace(/Routes cover every \{city\.name\} neighborhood[^\n]+/, 'Send your {city.name} address and photos to confirm service availability. '+policy.SCHEDULING_POLICY));
for(const file of files('src/pages').filter(p=>p.endsWith('.astro'))) edit(file,s=>s.replaceAll('preferred calendar window','preferred pickup window').replaceAll('Choose a real pickup window','Confirm an available pickup window with the crew').replaceAll('Send booking','Request a quote'));
// Make current public pricing the only source exported to UI and JSON-LD.
edit('src/data/booking.js', s=>s.replace(/export const PRICE_FLOOR =[^\n]+\nexport const PRICE_FLOOR_DETAIL =[^\n]+/, "export { PRICE_FLOOR, PRICE_FLOOR_DETAIL } from './servicePolicy.js';"));
edit('src/data/pricing.js', s=>s.replace(/^\/\/ Shared pricing data[\s\S]*?(?=export)/, '// Public pricing is photo-quote based. Historical numeric tier estimates below are not advertised rates.\n// The current minimum and customer promises come from servicePolicy.js.\n\n').replace(/\/\/ Group B[^\n]+/, '// Recyclable items are quoted from photos, including disposal requirements.').replace(/\/\/ Group A[^\n]+/, '// Load descriptions; the public minimum is maintained in servicePolicy.js.'));
// Explicit staging for attic/basement services, preserving their URLs and item categories.
edit('src/data/services.js', s=>{
  const sf=ts.createSourceFile('services.js',s,ts.ScriptTarget.Latest,true);
  const edits=[];
  function visit(n) {
    if(ts.isPropertyAssignment(n) && ['attic-cleanout','basement-cleanout'].includes(propName(n)) && ts.isObjectLiteralExpression(n.initializer)) {
      const room=propName(n).split('-')[0];
      for(const p of n.initializer.properties) if(ts.isPropertyAssignment(p)) {
        const k=propName(p); let v;
        if(k==='headline') v=`${room[0].toUpperCase()+room.slice(1)} cleanout pickup — pre-staged items only`;
        if(k==='intro') v=`Pickup of approved items from your ${room} cleanout after they are safely staged at the curb, in the driveway or in an accessible garage. We do not enter the ${room} or carry items on stairs. Text photos for a written quote and a pickup window confirmed by the crew.`;
        if(k==='metaDescription') v=`${room[0].toUpperCase()+room.slice(1)} cleanout item pickup in Minnesota. Pre-stage items curbside or in an accessible garage. No indoor carry-out. $85 minimum; written photo quotes.`;
        if(k==='process') v=['Arrange safe staging outside living areas before pickup.','Text photos of all items and the staging area with your address.','Approve the written quote and confirm a pickup window with the crew.','The crew loads the approved staged items; no indoor carry-out.'];
        if(v!==undefined) edits.push({start:p.initializer.getStart(sf),end:p.initializer.end,replacement:JSON.stringify(v)});
      }
      return;
    }
    ts.forEachChild(n,visit);
  }
  visit(sf); for(const e of edits.sort((a,b)=>b.start-a.start)) s=s.slice(0,e.start)+e.replacement+s.slice(e.end); return s;
});
// Shared scope is visible close to service/city/quote-page hero actions without changing styles.
for(const file of ['src/pages/cities/[slug].astro','src/pages/cities/[citySlug]/[serviceSlug].astro','src/pages/services/[slug].astro','src/pages/quote/[slug].astro']) {
  edit(file,s=>{
    if(s.includes('data-service-scope')) return s;
    const marker='<div class="hero-actions">';
    if(!s.includes(marker)) return s;
    return s.replace(marker,`<p class="hero-copy" data-service-scope>${policy.PICKUP_SCOPE}</p>\n        ${marker}`);
  });
}
// Public machine-readable guides must use the same promises; no URL changes.
for(const file of ['public/llms.txt','public/llm-sitemap.json','docs/LLM-Sitemap.md']) {
  if(!fs.existsSync(file)) continue;
  edit(file,s=>s.replace(/\$25 off with review/gi,'').replace(/\$30\s*[–-]\s*\$750/g,'$85 minimum; exact written photo quote').replace(/no load minimum/gi,'exact total confirmed from photos').replace(/Same-day pickup available\.|Same-day available\./g,'Pickup timing is confirmed by the crew.').replace(/calendar booking/gi,'booking confirmed by text'));
}
console.log('SOURCE FILES UPDATED:', changed.size);
for(const f of [...changed].sort()) console.log(f);
