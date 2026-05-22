# Dakota Valley Haul Rebuild

This repository is the new Vercel-ready rebuild for Dakota Valley Junk Removal.

The original full-stack source remains in `600589mbm-beep/DakotaValleyHaul`. This rebuild keeps the strongest business content and turns it into a fast, conversion-focused front end that is easier to deploy, test, and iterate.

## What changed

- Fast React/Vite front end for Vercel
- Clearer hero offer and calls to action
- Cleaner service-area presentation
- Quote helper flow with lead-friendly summary
- Telegram-ready booking form with address, phone, calendar date, details, and multiple photo uploads
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

## Telegram booking form

The booking form posts to `/api/telegram-quote` and sends the customer request plus uploaded photos to Telegram. Add these environment variables in Vercel before production submissions will deliver:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_THREAD_ID` optional, only for Telegram forum topics

Keep the bot token private. Do not commit it to this repository.

## Deploy

Connect this repo to Vercel and use the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
