// Calendar booking configuration.
//
// HOW TO ACTIVATE:
// 1. Sign up at https://calendly.com (free tier, 1 event type — perfect for this)
// 2. Create an event type named "Junk Removal Quote Visit"
//    - 30-minute slots, weekdays 8 AM - 9 PM
//    - Collect: name, phone, address, brief description, optional photo
// 3. Get your scheduling URL (looks like https://calendly.com/<yourhandle>/<event>)
// 4. Replace CALENDLY_URL below with your actual URL
// 5. Done — every page that imports this auto-updates on next build
//
// To switch to a different scheduling tool (Cal.com, SavvyCal, Jobber, etc.)
// just replace CALENDLY_URL + tweak src/components/BookingWidget.astro.

export const CALENDLY_URL = 'https://calendly.com/YOUR-CALENDLY-HANDLE/junk-removal-quote';

export const PRICE_FLOOR = '$85 minimum';
export const PRICE_FLOOR_DETAIL = 'Curbside pickups start at $85. Final price based on volume.';
