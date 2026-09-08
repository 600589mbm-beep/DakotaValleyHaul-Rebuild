# Dakota Valley Haul Rebuild

This repository is the free GitHub-based rebuild for Dakota Valley Junk Removal.

The original full-stack source remains in `600589mbm-beep/DakotaValleyHaul`. This rebuild keeps the strongest business content and turns it into a fast, conversion-focused front end that is easier to deploy, test, and iterate.

## What changed

- Fast Astro static site (React islands where interactivity is needed)
- Free GitHub Pages deployment workflow
- Clearer hero offer and calls to action
- Cleaner service-area presentation
- Quote helper flow with lead-friendly summary
- Photo quote form with field validation, removable previews, upload limits, and recovery guidance
- SEO basics: sitemap, robots.txt, metadata, and structured data

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Free GitHub Pages hosting

This repo includes `.github/workflows/deploy-pages.yml` for free GitHub Pages hosting.

In GitHub, open the repo settings and set Pages to deploy from GitHub Actions. The custom domain file is `public/CNAME` and is currently set to:

```text
dakotavalleyjunkremovalservice.com
```

## Photo quote form

GitHub Pages is static hosting, so it cannot safely store or use a Telegram bot token by itself. Do not put the bot token in the React app or in any public GitHub file.

Use `telegram-worker.js` as a tiny free Telegram bridge. Deploy it as a free Cloudflare Worker, then set these Worker secrets:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_THREAD_ID` optional, only for Telegram forum topics

The form posts to the existing Worker URL configured in `src/data/booking.js`. The homepage and `/quote/` share the same form; `/quote/?city=Eagan` prefills the city. A request does not reserve a pickup: the customer approves the written total before confirming an available window.

Customer uploads are limited to 6 photos, 10 MB each and 25 MB total. JPG, PNG, WebP and HEIC/HEIF are supported, including an original-file fallback when the browser cannot show a preview. Files and details stay in the page after a failed request.

## Customer navigation and verification

The shared mobile menu links to `/services/`, `/pricing/`, `/service-areas/`, `/reviews/`, `/faq/` and `/quote/`. Service-area search uses local city/ZIP hints in `src/data/serviceAreaZips.js`; these locate city pages, not guaranteed pickup boundaries.

Run `npm run build && npm test` to verify generated destinations, metadata/sitemap coverage, ZIP search and reset behavior, menu keyboard behavior, and form validation/upload/recovery with mocked responses. Tests never send a lead to the crew.

## New Telegram bot setup

1. Open Telegram and message `@BotFather`.
2. Send `/newbot`.
3. Give it a name, such as `Dakota Valley Leads`.
4. Give it a username ending in `bot`, such as `DakotaValleyLeadsBot`.
5. Copy the token and save it as the Worker secret `TELEGRAM_BOT_TOKEN`.
6. Open the new bot and send `/start`.
7. Visit `https://api.telegram.org/botYOUR_TOKEN_HERE/getUpdates`.
8. Copy the `chat.id` value and save it as `TELEGRAM_CHAT_ID`.

Keep the bot token private. Do not commit it to this repository.

## Profile attribution and completed jobs

Use this website URL in the Google Business Profile website field:

```text
https://dakotavalleyjunkremovalservice.com/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile
```

The site keeps recognized campaign information in session storage across navigation, with a 30-minute inactivity limit. Each quote receives a stable random reference, including during retries. A quote conversion is recorded only after the Telegram API acknowledges receipt; partial photo delivery is reported separately. The quick quote helper does not count as a submitted request.

The Worker deployment workflow prepares a Cloudflare KV namespace named `dakota-valley-lead-reporting`, binds it as `LEAD_STORE`, and configures a private Telegram webhook. It uses the existing deployment secrets. The Cloudflare token must have Workers KV Storage edit permission in addition to its existing Worker deployment permissions. Setup stops before deployment if the bot already has a different webhook, preserving that integration.

After successful setup, received quote messages have **Quoted**, **Pickup confirmed**, **Completed**, and **Closed** buttons. The crew must select the actual job status. In the configured Telegram chat, `/leadreport` shows the current month's request cohort; `/leadreport YYYY-MM` selects another month. Reports compare recorded website sessions, acknowledged requests and their current crew-entered statuses, including the Google Business Profile subset. They are not Google's profile-view or click totals and do not include phone/text-only leads. Blocked scripts, unavailable storage and cross-device visits can limit attribution; recent KV updates may take about a minute to appear.

Reporting records retain random references, recognized campaign fields, canonical landing paths, delivery state and status timestamps for up to 400 days. They do not store names, phone numbers, addresses, free-text request details or photos. Customer quote details are delivered separately to the existing Telegram chat. Reporting outages do not prevent quote delivery.

## Business Profile and hosting follow-through

The website now consistently describes paid staged pickup, written photo quotes, customer price approval and subsequent pickup confirmation. The primary service category to verify in the Business Profile is **Junk removal service**; retain additional categories only for services the business actually performs. Review furniture, mattress, appliance and yard-debris pickup descriptions against `src/data/servicePolicy.js`. Specialty projects require separate quotes. Category and service settings still require an authenticated account review; search terms alone do not establish the current settings.

The homepage, city galleries and service heroes use authentic job photographs supplied by the business. The homepage's six-photo gallery replaces the illustrated before/after sliders; these uploads do not establish matched before/after pairs. Photo descriptions state what is visible without assigning unverified city locations or job dates. `src/data/photos.js` controls photo selection, intrinsic dimensions and captions, and the image sitemap lists the actual homepage, city and service images. See `public/PHOTO-SHOT-LIST.md` when adding future photos.

In [GitHub Pages settings](https://github.com/600589mbm-beep/DakotaValleyHaul-Rebuild/settings/pages), enable **Enforce HTTPS** to redirect HTTP traffic. Canonical URLs already use HTTPS; the hosting switch requires repository administration access and cannot be implemented as a static-site response header.
