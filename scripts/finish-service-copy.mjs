// One-time final source cleanup; removed before merging.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import * as policy from '../src/data/servicePolicy.js';
function edit(p,fn){const a=fs.readFileSync(p,'utf8'); const b=fn(a); if(a!==b) fs.writeFileSync(p,b);}
edit('src/data/comboContent.js',s=>s.replaceAll("Can you do the pickup while I'm at work in ${city.name}?",'Do I need to be home for ${svc} in ${city.name}?').replaceAll(JSON.stringify('Yes, when access has been agreed in advance. '+policy.UNATTENDED_POLICY), JSON.stringify(policy.UNATTENDED_POLICY)));
function key(n){return n.name && (ts.isStringLiteral(n.name)||ts.isIdentifier(n.name))?n.name.text:'';}
const replacements = {
  'estate-cleanout': {
    headline: 'Estate cleanout pickup — pre-staged items only',
    intro: 'Estate cleanout pickup for approved furniture, boxes and household items that have already been safely staged at the curb, in the driveway or in an accessible garage. We do not sort or carry items from rooms inside the home. Text photos of everything to be collected for a written quote and a confirmed pickup window.',
    process: ['Identify what stays and arrange safe staging of the items for pickup.','Text photos of the complete staged load and your pickup address.','Approve the written quote and confirm the appointment with the crew.','The crew loads the approved staged items and routes reusable materials where practical.'],
  },
  'demolition': {
    headline: 'Outdoor project requests and pre-staged renovation debris',
    intro: 'Outdoor light-demolition requests and pre-staged renovation debris are reviewed from photos. Accepted project scope, access, hauling and disposal are confirmed in writing before booking. No interior demolition or inside-home carry-out is offered.',
    metaDescription: 'Request a photo review of an outdoor project or pre-staged renovation debris. Written scope and price before booking. No interior demolition or inside-home carry-out.',
    services: ['Outdoor shed requests, subject to written scope approval','Outdoor fence requests, subject to written scope approval','Outdoor deck requests, subject to written scope approval','Pre-staged bathroom renovation debris','Pre-staged kitchen cabinets and counters','Outdoor hot-tub requests, subject to written scope approval'],
  },
};
edit('src/data/services.js',s=>{
 const sf=ts.createSourceFile('services.js',s,ts.ScriptTarget.Latest,true);const edits=[];
 function visit(n){if(ts.isPropertyAssignment(n)&&replacements[key(n)]&&ts.isObjectLiteralExpression(n.initializer)){
   for(const p of n.initializer.properties)if(ts.isPropertyAssignment(p)&&key(p) in replacements[key(n)])edits.push({start:p.initializer.getStart(sf),end:p.initializer.end,text:JSON.stringify(replacements[key(n)][key(p)])});return;
 }ts.forEachChild(n,visit);}
 visit(sf);for(const e of edits.sort((a,b)=>b.start-a.start))s=s.slice(0,e.start)+e.text+s.slice(e.end);return s;
});
// These older guide paragraphs imply indoor collection; preserve surrounding local resources.
const exactPairs = [
 ['Pickup is practical for heavy couches, reclining furniture, sectionals, sleeper sofas, dressers, desks and furniture located upstairs or in basements. It is also useful when several items need to leave together during a move, estate cleanout or remodel.', 'Dakota Valley collects approved furniture and cleanout items after they are safely staged at the curb, in the driveway or in an accessible garage. Arrange suitable help to move items out of living areas before pickup; room-by-room removal and stair carry-out are not included.'],
 ['A junk-removal crew is useful for sectionals, sleeper sofas, basement appliances, multiple mattresses, office furniture and complete room or garage cleanouts. Send photos of the items and the route out so stairs, disassembly and carrying distance are included in the written quote.', 'Dakota Valley can review photos of sectionals, sofas, disconnected appliances, mattresses and office furniture for pickup. All approved items must be safely staged at the curb, in the driveway or in an accessible garage. The written quote does not include indoor carry-out or stair work.'],
 ['Full-service pickup is usually the simplest choice when the mattress is upstairs, paired with a box spring or frame, or part of a move-out or bedroom cleanout.', 'For Dakota Valley pickup, the mattress and any approved box spring or frame must first be safely staged curbside, in the driveway or in an accessible garage; no upstairs carry-out is provided.'],
 ['a sectional in a basement may be best handled by a pickup crew', 'a sectional in a basement needs suitable help with safe staging before a curbside pickup'],
 ['Choose pickup when the item is heavy, bulky, upstairs, difficult to transport or part of a larger cleanout.', 'Choose Dakota Valley pickup for approved bulky items that can be safely staged at the curb, in the driveway or in an accessible garage.'],
 ['Crew confirms appliance can be safely disconnected and removed.', 'Arrange safe disconnection by a qualified person before staging the appliance for pickup.'],
 ['Appliance staged in the garage, on the porch, or curbside.', 'Appliance safely staged in an accessible garage, in the driveway or at the curb.'],
 ['you are clearing out a garage', 'you are staging a garage cleanout'],
 ['The crew walks the property with you, helps flag valuables versus haul items, photo-documents before loading, and routes donatable goods to Bridging, Arc, or Savers with tax receipts.', 'Arrange safe staging of approved estate items before pickup. The crew loads the agreed curbside, driveway or accessible-garage pile; no room-by-room sorting or indoor carry-out.'],
 ['from a garage, basement, apartment or office cleanout', 'from a cleanout after safe curbside, driveway or garage staging'],
 ['Stairs, elevator, gate, or garage access','Curbside, driveway or accessible-garage staging'],
];
for(const e of fs.readdirSync('src/data'))if(e.endsWith('.js')&&!['servicePolicy.js','booking.js','reviews.js'].includes(e))edit('src/data/'+e,s=>{
 for(const [a,b] of exactPairs)s=s.replaceAll(a,b);
 return s;
});
edit('src/data/pricing.js',s=>s.replace(/export const PRICING_INTRO =\s*[^;]+;/, 'export const PRICING_INTRO = '+JSON.stringify(policy.PRICE_FLOOR_DETAIL)+';').replace(/export const ITEMS_TITLE =[^;]+;/, "export const ITEMS_TITLE = 'Common items — quoted from photos';").replace(/export const LOADS_TITLE =[^;]+;/,"export const LOADS_TITLE = 'Eligible junk pickups — $85 minimum';"));
// Any indoor-work promise attached to an FAQ must be explicitly corrected, not hidden by a disclaimer.
for(const file of ['src/data/comboContent.js','src/data/seoGuides.js','src/data/seoGuidesCompletion.js','src/data/seoGuidesRoundTwo.js','src/data/seoGuidesFinal.js'])edit(file,s=>{
 const sf=ts.createSourceFile(file,s,ts.ScriptTarget.Latest,true);const edits=[];
 function visit(n){if(ts.isObjectLiteralExpression(n)){
   const qp=n.properties.find(p=>ts.isPropertyAssignment(p)&&key(p)==='q');const ap=n.properties.find(p=>ts.isPropertyAssignment(p)&&key(p)==='a');
   if(qp&&ap){const q=qp.initializer.getText(sf);let replacement;
    if(/Do I need to be home/i.test(q))replacement=policy.UNATTENDED_POLICY;
    if(/Does the crew carry|Do you carry items up|Does Dakota Valley.*inside|Can Dakota Valley.*(?:basement|upstairs)|Can you remove.*basement|cannot move items to the curb/i.test(q))replacement=policy.NO_INSIDE_PICKUP;
    if(/old insulation debris/i.test(q))replacement='Send photos of nonhazardous insulation debris that is already safely bagged and staged curbside, in the driveway or in an accessible garage for review. No attic entry, asbestos or hazardous-material removal is offered.';
    if(/water-damaged items/i.test(q))replacement='Send photos and describe any contamination before booking. Approved nonhazardous items must already be safely staged at the curb, in the driveway or in an accessible garage. No basement carry-out or hazardous-material pickup is offered.';
    if(replacement)edits.push({start:ap.initializer.getStart(sf),end:ap.initializer.end,text:JSON.stringify(replacement)});
   }
 }ts.forEachChild(n,visit);}
 visit(sf);for(const e of edits.sort((a,b)=>b.start-a.start))s=s.slice(0,e.start)+e.text+s.slice(e.end);return s;
});
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
pkg.scripts['test:service-promises']='node scripts/validate-service-promises.mjs';
if(!pkg.scripts.build.includes('validate-service-promises'))pkg.scripts.build+=' && node scripts/validate-service-promises.mjs';
fs.writeFileSync('package.json',JSON.stringify(pkg,null,2)+'\n');
console.log('Final service-scope cleanup applied; regression validation is now part of every build.');
