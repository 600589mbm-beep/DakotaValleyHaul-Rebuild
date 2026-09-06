// One-time editorial cleanup. Source changes are committed after the build passes.
import fs from 'node:fs';
import ts from 'typescript';
import * as policy from '../src/data/servicePolicy.js';
import { services } from '../src/data/services.js';
const edit=(p,fn)=>{const a=fs.readFileSync(p,'utf8'),b=fn(a);if(a!==b)fs.writeFileSync(p,b);};
const key=p=>p.name&&(ts.isStringLiteral(p.name)||ts.isIdentifier(p.name))?p.name.text:'';
function patchObjects(file,patches){edit(file,s=>{const sf=ts.createSourceFile(file,s,ts.ScriptTarget.Latest,true);const edits=[];function visit(n){if(ts.isPropertyAssignment(n)&&patches[key(n)]&&ts.isObjectLiteralExpression(n.initializer)){const patch=patches[key(n)];for(const p of n.initializer.properties)if(ts.isPropertyAssignment(p)&&Object.hasOwn(patch,key(p)))edits.push({a:p.initializer.getStart(sf),b:p.initializer.end,v:JSON.stringify(patch[key(p)],null,2)});return;}ts.forEachChild(n,visit);}visit(sf);for(const e of edits.sort((a,b)=>b.a-a.a))s=s.slice(0,e.a)+e.v+s.slice(e.b);return s;});}
const standardProcess=['Text photos of all items, the staging area and your pickup address.','Approve the written total and confirm an available appointment with the crew.','Have all approved items safely staged at the curb, in the driveway or in an accessible garage.','The crew loads the agreed items; any change to the scope needs your approval first.'];
const outdoor=new Set(['hot-tub-removal','fence-removal','shed-removal','demolition','dumpster-rental']);
const servicePatches={};
for(const [slug,service] of Object.entries(services)){
 servicePatches[slug]={metaDescription:`${service.name} in Minnesota. Text photos for a written quote and confirmed pickup window. Curbside or garage staging; no inside-home pickup.`};
 if(!outdoor.has(slug))servicePatches[slug].process=standardProcess;
}
Object.assign(servicePatches['furniture-removal'],{intro:'Curbside, driveway and accessible-garage pickup for sofas, sectionals, dressers, beds, tables and office furniture. Eligible pickups have an $85 minimum; send photos for the complete written quote before booking. No inside-home carry-out.',services:['Sofa and sectional pickup','Pre-staged mattresses and box springs','Disassembled bed frames and headboards','Dressers and wardrobes','Dining tables and chairs','Office desks and filing cabinets']});
Object.assign(servicePatches['single-item-pickup'],{intro:'Need one bulky item gone? Send photos of the sofa, dresser, appliance or other item for a written quote. Eligible curbside, driveway and accessible-garage pickups have an $85 minimum, not a fixed price for every item. Your pickup window is confirmed with the crew.'});
Object.assign(servicePatches['junk-pickup'],{intro:'Curbside, driveway and accessible-garage junk pickup with an $85 minimum for eligible jobs. Text photos for the full price in writing, approve it and confirm an available pickup window with the crew. No inside-home pickup.'});
Object.assign(servicePatches['hoarder-cleanout'],{headline:'Judgment-free pickup of pre-staged cleanout items',intro:'Discreet pickup of approved nonhazardous furniture, boxes and household items after safe curbside, driveway or garage staging. We do not enter living areas, sort rooms or handle hazardous cleanup. Send photos for a written quote and appointment confirmation.',services:['Pre-staged household furniture','Approved boxes and storage items','Separately staged donation candidates','Nonhazardous bulky household items','Multiple pickups by agreement','Family or property-manager coordination']});
Object.assign(servicePatches['estate-cleanout'],{services:['Pre-selected furniture staged for pickup','Approved boxes and household items','Separately staged donation candidates','Photo details of the complete load','Family or property-manager coordination','Pickup windows confirmed in advance']});
Object.assign(servicePatches['mattress-removal'],{intro:'Pickup of pre-staged mattresses, box springs and disassembled bed-frame pieces. Send photos showing size, quantity and condition. Eligible pickups have an $85 minimum; the written total includes the disposal requirements for your job. No bedroom or stair carry-out.'});
for(const slug of outdoor){servicePatches[slug].metaDescription=`${services[slug].name} requests in Minnesota. Send project and access photos. Scope, price and scheduling require written confirmation; no interior work.`;servicePatches[slug].process=['Send photos of the full outdoor project and access, or describe the requested rental.','The crew reviews whether the project can be accepted and confirms the exact written scope and price.','Approve the quote and confirm an available appointment or rental window.','Only the work included in the agreed written scope is performed; no interior work.'];}
patchObjects('src/data/services.js',servicePatches);
// Outdoor requests remain individually assessed, not implied by the standard pickup minimum.
const specialty='Outdoor specialty projects and rental requests are assessed separately from photos. Acceptance, scope, price and access must be confirmed in writing; the standard pickup minimum is not a project quote.';
edit('src/data/servicePolicy.js',s=>s.includes('SPECIALTY_POLICY')?s:s+'export const SPECIALTY_POLICY = '+JSON.stringify(specialty)+';\n');
for(const p of ['src/pages/services/[slug].astro','src/pages/cities/[citySlug]/[serviceSlug].astro'])edit(p,s=>{
 const slug=p.includes('[citySlug]')?'serviceSlug':'slug';
 if(s.includes('data-specialty-scope'))return s;
 const marker='<p class="hero-copy" data-service-scope>Curbside, driveway and accessible-garage pickup only. No inside-home pickup.</p>';
 const prefix=Array(p.split('/').length-2).fill('..').join('/');
 const rel=p.includes('[citySlug]')?'../../../data/servicePolicy.js':'../../data/servicePolicy.js';
 s=s.replace('---\n',`---\nimport { SPECIALTY_POLICY } from '${rel}';\n`);
 return s.replace(marker,`<p class="hero-copy" data-service-scope>Standard junk pickup: curbside, driveway and accessible-garage pickup only. No inside-home pickup.</p>\n        {['hot-tub-removal', 'fence-removal', 'shed-removal', 'demolition', 'dumpster-rental'].includes(${slug}) && <p class="hero-copy" data-specialty-scope>{SPECIALTY_POLICY}</p>}`);
});
// Preserve useful guide-specific explanations while removing old rate-card promises.
const priceGuide={
 metaTitle:'Junk Removal Cost in Minnesota | $85 Minimum & Photo Quotes | Dakota Valley',
 metaDescription:'Understand Dakota Valley junk-removal pricing: an $85 minimum for eligible pickups, written photo quotes, staging requirements and the factors that affect your total.',
 intro:'The useful number is the complete price for your actual load, not a truck-size example that may not match it. Dakota Valley uses photos and item details to confirm your total in writing before you book. Eligible curbside, driveway and accessible-garage pickups have an $85 minimum; that is not a flat price for every item.',
 sections:[
 {h2:'What the $85 minimum means',body:[policy.PRICE_FLOOR_DETAIL,'Photograph every item to include. A large sectional, dense debris or items with special disposal requirements can cost more than the minimum. The written quote states what is included; a list of old example prices is not a booking quote.']},
 {h2:'What affects your written quote',body:['The crew reviews the amount to load, weight, material type, disposal requirements and access between the staged items and truck parking. Appliances must be safely disconnected before staging. Standard pickup does not include indoor carrying or stairs.',policy.QUOTE_POLICY]},
 {h2:'Plan an efficient pickup',body:['Send one complete photo set for the whole job, identify items that stay and keep the loading path clear. Ask for a combined quote rather than assuming extra items are free. Donation or recycling depends on condition and acceptance; it does not create an automatic discount.','Compare providers using the complete written scope, not just an advertised starting price. Consider whether you need an approved drop-off, a rental or collection of pre-staged items. Your price and appointment must both be confirmed before pickup.']}
 ],
 faqs:[{q:'What is the minimum Dakota Valley pickup price?',a:policy.PRICE_FLOOR_DETAIL},{q:'Why can an appliance quote differ from a furniture quote?',a:'Weight, size, access and disposal requirements differ. Include the appliance type and condition in your photos so those requirements are included in the written total.'},{q:'Will the quoted total change on arrival?',a:policy.QUOTE_POLICY}]
};
patchObjects('src/data/guides.js',{
 'junk-removal-cost-minnesota':priceGuide,
 'get-rid-of-mattress-minnesota':{metaDescription:'Compare Minnesota mattress disposal options, including retailer take-back, donation, drop-off and pickup of pre-staged items with a written photo quote.'},
 'get-rid-of-old-appliances-minnesota':{metaDescription:'Compare old-appliance disposal options in Minnesota. Learn how to prepare an appliance and request a written quote for curbside or garage pickup.'},
 'garage-cleanout-checklist':{metaTitle:'Garage Cleanout Checklist | Staging & Written Photo Quotes | Dakota Valley',metaDescription:'Plan a garage cleanout, separate items, prepare a safe loading area and request a written photo quote. Pickup requires an appointment confirmed by the crew.'}
});
const replacements=[
 ['Option 5: pickup with certified recycling','Option 5: pickup of a pre-staged mattress'],
 ['Retailer haul-away and full-service pickup','Retailer haul-away and pre-staged pickup'],
 ['Before you start: book the endpoint','Before you start: plan pickup and safe staging'],
 ['Schedule the junk pickup first, for the end of your cleanout weekend. A booked pickup window converts "someday" into a deadline, and it means the discard pile leaves before you can second-guess it. Photo-quoted services make this easy: text a photo of the garage as-is, get a firm price for the likely volume, and adjust the morning of if the pile came out bigger or smaller.','Plan the items to remove and send clear photos of the complete load. Approve the written total and confirm an available pickup window with the crew before treating it as booked. When the load changes, send updated photos and approve any revised quote before work begins.'],
 ['quote and a calendar window.','quote and an available pickup window confirmed with the crew.'],
 ['which day works best','which available day works best'],
 ['within hours','after reviewing your request'],
 ['calendar window','pickup window'],
 ['Full-property hoarder cleanout','Pickup of pre-staged cleanout items'],
 ['Quoted on-site for each job.','Written scope and price confirmed from photos before booking.']
];
for(const p of ['src/data/guides.js','src/data/comboContent.js','src/components/QuoteHelper.jsx'])edit(p,s=>{for(const [a,b]of replacements)s=s.replaceAll(a,b);return s;});
// Correct question/answer meaning and use concise, topic-specific supporting text.
for(const p of ['src/data/guides.js','src/data/seoGuidesCompletion.js','src/data/comboContent.js'])edit(p,s=>{
 const sf=ts.createSourceFile(p,s,ts.ScriptTarget.Latest,true);const changes=[];
 function visit(n){if(ts.isObjectLiteralExpression(n)){
 const q=n.properties.find(p=>ts.isPropertyAssignment(p)&&key(p)==='q'),a=n.properties.find(p=>ts.isPropertyAssignment(p)&&key(p)==='a');
 if(q&&a){const text=q.initializer.getText(sf);let value;
 if(/Can Dakota Valley remove furniture in Lakeville/.test(text))value='Yes, for approved items safely staged at the curb, in the driveway or in an accessible garage. Send photos for a written quote; no inside-home pickup or stair carry-out.';
 if(/Do I need to empty or unplug the appliance/.test(text))value='Empty the appliance and arrange safe disconnection from power, water and gas by a qualified person before staging. Never cut refrigerant lines. Show the appliance and its curbside, driveway or garage pickup location in your photos.';
 if(/How do you handle a hoarder|How does.*hoard|Will you.*sort|help.*sort/i.test(text))value='Arrange safe staging of approved nonhazardous items before pickup. We do not enter living areas or provide indoor sorting or hazardous cleanup. Send photos to confirm the accepted scope and written price.';
 if(value)changes.push({a:a.initializer.getStart(sf),b:a.initializer.end,v:JSON.stringify(value)});
 }}ts.forEachChild(n,visit);}visit(sf);for(const e of changes.sort((a,b)=>b.a-a.a))s=s.slice(0,e.a)+e.v+s.slice(e.b);return s;
});
// Repeated long rate-card replacement paragraphs become one concise shared minimum statement.
const old=JSON.stringify(policy.PRICE_FLOOR_DETAIL+' '+policy.QUOTE_POLICY);
for(const p of ['src/data/comboContent.js','src/data/guides.js'])edit(p,s=>{
 if(!s.includes(old))return s;
 s=s.replaceAll(old,'PRICE_FLOOR_DETAIL');
 if(!/import\s*\{[^}]*\bPRICE_FLOOR_DETAIL\b[^}]*\}\s*from/.test(s))s="import { PRICE_FLOOR_DETAIL } from './servicePolicy.js';\n"+s;
 return s;
});
// Prevent generic duplicated answers and inside-home promises from returning.
edit('scripts/validate-service-promises.mjs',s=>s.replace('const badCopy=[','const badCopy=[\n  /Quoted on-site for each job/i,\n  /Full-property hoarder cleanout|Selective room cleanout|Property show-prep cleaning/i,').replace('    inspectText(a,label);','    if (/Can Dakota Valley remove furniture in Lakeville/.test(q) && /^No\\b/.test(a)) failures.push(`${label}: furniture availability answer incorrectly rejects staged pickup`);\n    inspectText(a,label);'));
console.log('Editorial review complete: specific metadata, staged cleanout descriptions, outdoor scope, and quote guidance.');
