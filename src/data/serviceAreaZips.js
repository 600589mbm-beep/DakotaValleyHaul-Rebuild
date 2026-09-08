// Common ZIP codes for finding an existing city page, reviewed 2026-09-08.
// These are search hints, not service boundaries or a complete USPS address index.
// ZIP codes can cross city limits. In particular, USPS "Saint Paul" and
// "Minneapolis" postal names include suburbs; keep those suburbs separately
// searchable instead of assigning every metro ZIP to the central city.
// City ZIP lists were checked against each city's geographical reference below.
// Apple Valley 55124 is additionally confirmed by the city's own address:
// https://www.ci.apple-valley.mn.us/Facilities/Facility/Details/Apple-Valley-Municipal-Center-25

const zipLists = {
  'apple-valley': ['55124'],
  'albert-lea': ['56007'],
  'alexandria-mn': ['56308'],
  'austin-mn': ['55912'],
  bemidji: ['56601'],
  bloomington: ['55420', '55425', '55431', '55435', '55437', '55438'],
  brainerd: ['56401'],
  burnsville: ['55306', '55337'],
  duluth: ['55801', '55802', '55803', '55804', '55805', '55806', '55807', '55808', '55810', '55811', '55812', '55814', '55815', '55816'],
  eagan: ['55121', '55122', '55123'],
  'eden-prairie': ['55344', '55346', '55347'],
  edina: ['55410', '55416', '55424', '55435', '55436', '55439', '55343'],
  faribault: ['55021'],
  farmington: ['55024'],
  'fergus-falls': ['56537'],
  hastings: ['55033'],
  hopkins: ['55305', '55343', '55345'],
  'hutchinson-mn': ['55350'],
  'inver-grove-heights': ['55076', '55077'],
  lakeville: ['55044'],
  mankato: ['56001', '56002', '56003'],
  'maple-grove': ['55311', '55369'],
  maplewood: ['55106', '55109', '55117', '55119'],
  'marshall-mn': ['56258'],
  minneapolis: ['55401', '55402', '55403', '55404', '55405', '55406', '55407', '55408', '55409', '55410', '55411', '55412', '55413', '55414', '55415', '55416', '55417', '55418', '55419', '55450', '55454', '55455'],
  minnetonka: ['55305', '55343', '55345', '55391'],
  moorhead: ['56560', '56561', '56562', '56563'],
  'new-ulm-mn': ['56073'],
  northfield: ['55057'],
  owatonna: ['55060'],
  plymouth: ['55441', '55442', '55446', '55447'],
  'red-wing': ['55066'],
  richfield: ['55423'],
  rochester: ['55901', '55902', '55903', '55904', '55905', '55906'],
  rosemount: ['55068'],
  roseville: ['55112', '55113'],
  shoreview: ['55126'],
  'st-cloud': ['56301', '56302', '56303', '56304', '56393', '56397', '56398'],
  'st-louis-park': ['55416', '55424', '55426'],
  'st-paul': ['55101', '55102', '55103', '55104', '55105', '55106', '55107', '55108', '55109', '55114', '55116', '55117', '55119', '55130', '55155'],
  'white-bear-lake': ['55110', '55127'],
  willmar: ['56201'],
  winona: ['55987'],
  woodbury: ['55125', '55129'],
  'brooklyn-park': ['55428', '55429', '55443', '55444', '55445'],
  blaine: ['55014', '55434', '55449'],
  'coon-rapids': ['55433', '55448'],
  shakopee: ['55379'],
  'cottage-grove': ['55016'],
  andover: ['55304'],
  savage: ['55378'],
  'prior-lake': ['55372'],
  chaska: ['55318'],
  oakdale: ['55042', '55128'],
  chanhassen: ['55317'],
  'elk-river': ['55330'],
  champlin: ['55316'],
  'lino-lakes': ['55014', '55038'],
  'forest-lake': ['55025'],
  stillwater: ['55082', '55083'],
  anoka: ['55303'],
};

// The source URL follows the city article title, including the three Saint/St.
// names and the central-city Minneapolis article's different URL.
export function zipSourceForCity(name) {
  const title = name === 'Minneapolis' ? name : `${name === 'St. Paul' ? 'Saint Paul' : name}, Minnesota`;
  return `https://en.wikipedia.org/wiki/${title.replaceAll(' ', '_')}`;
}

export const serviceAreaZips = Object.freeze(zipLists);
