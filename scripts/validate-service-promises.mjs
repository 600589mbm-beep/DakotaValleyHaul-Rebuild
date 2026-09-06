import { readdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { PICKUP_MINIMUM, PRICE_RANGE } from '../src/data/servicePolicy.js';
import { cities } from '../src/data/cities.js';
import { services } from '../src/data/services.js';
import { cityFaqs, comboFaqs, countyFaqs } from '../src/data/comboContent.js';
import { counties } from '../src/data/counties.js';

const failures=[];
const badCopy=[
  /\$25\s+off\s+with\s+review/i,
  /no load minimum/i,
  /(?:crew|crews) (?:handles? stairs|brings everything down)/i,
  /inside removal can be quoted/i,
  /the crew brings boxes, furniture, and debris down/i,
  /stairs are part of the job/i,
  /(?:interior bathroom and kitchen demo|Bathroom interior demo)/i,
  /(?:you book|booking is) a calendar link/i,
];
function inspectText(text,label) {
  for(const re of badCopy) {
    const m=re.exec(text);
    if(m) failures.push(`${label}: ${text.slice(Math.max(0,m.index-70),m.index+150)}`);
  }
}
function inspectFaqs(list,label) {
  for(const {q,a} of list) {
    if(/^Do I need to be home/i.test(q) && /^Yes\b/i.test(a)) failures.push(`${label}: contradictory home-presence FAQ: ${q} / ${a}`);
    if(/^Can you do the pickup while/i.test(q) && /^No\b/i.test(a)) failures.push(`${label}: contradictory unattended-pickup FAQ: ${q} / ${a}`);
    inspectText(a,label);
  }
}
for(const [slug,city] of Object.entries(cities)) {
  inspectFaqs(cityFaqs(city,slug),`city ${slug}`);
  for(const [serviceSlug,service] of Object.entries(services)) inspectFaqs(comboFaqs(city,service,slug,serviceSlug),`${slug}/${serviceSlug}`);
}
for(const [slug,county] of Object.entries(counties)) inspectFaqs(countyFaqs(county,slug),`county ${slug}`);
async function walk(dir) {
  const result=[];
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    const p=`${dir}/${entry.name}`;
    if(entry.isDirectory()) result.push(...await walk(p)); else result.push(p);
  }
  return result;
}
const htmlFiles=(await walk('dist')).filter(p=>p.endsWith('.html'));
let schemas=0;
function checkSchema(node,label) {
  if(!node || typeof node!=='object') return;
  if(node['@type']==='LocalBusiness' && node.priceRange && node.priceRange!==PRICE_RANGE) failures.push(`${label}: inconsistent LocalBusiness priceRange ${node.priceRange}`);
  for(const value of Object.values(node)) if(typeof value==='object') checkSchema(value,label);
}
for(const file of htmlFiles) {
  const html=await readFile(file,'utf8');
  const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|amp);/g,' ').replace(/\s+/g,' ');
  inspectText(text,file);
  const title=html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'';
  if(/Same-Day Pickup/i.test(title)) failures.push(`${file}: unqualified same-day title`);
  if(/dist\/(?:cities|services|quote)\//.test(file) && !text.includes('No inside-home pickup')) failures.push(`${file}: missing visible service scope`);
  for(const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { checkSchema(JSON.parse(match[1]),file); schemas++; } catch(e) { failures.push(`${file}: invalid JSON-LD: ${e.message}`); }
  }
}
assert.equal(PICKUP_MINIMUM,85,'The existing public pickup minimum must remain $85.');
const form=await readFile('src/components/TelegramForm.astro','utf8');
assert.ok(form.includes('Request my written quote'),'Quote request button must not imply a confirmed booking.');
assert.ok(!form.includes('Booking sent.'),'Success message must distinguish inquiry from booking.');
if(failures.length) {
  console.error(`Service-promise validation failed: ${failures.length} findings.`);
  for(const item of [...new Set(failures)].slice(0,35)) console.error(item);
  process.exitCode=1;
} else console.log(`Service promises passed: ${htmlFiles.length} HTML pages, ${schemas} JSON-LD blocks, ${Object.keys(cities).length} cities and ${Object.keys(services).length} services. No review incentive or forbidden indoor-pickup promises found.`);
