# Dakota Valley Haul Rebuild

This repository is the free GitHub-based rebuild for Dakota Valley Junk Removal.

The original full-stack source remains in `600589mbm-beep/DakotaValleyHaul`. This rebuild keeps the strongest business content and turns it into a fast, conversion-focused front end that is easier to deploy, test, and iterate.

## What changed

- Fast React/Vite front end
- Free GitHub Pages deployment workflow
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

## Free GitHub Pages hosting

This repo includes `.github/workflows/deploy-pages.yml` for free GitHub Pages hosting.

In GitHub, open the repo settings and set Pages to deploy from GitHub Actions. The custom domain file is `public/CNAME` and is currently set to:

```text
dakotavalleyjunkremovalservice.com
```

## Telegram booking form

GitHub Pages is static hosting, so it cannot safely store or use a Telegram bot token by itself. Do not put the bot token in the React app or in any public GitHub file.

Use `telegram-worker.js` as a tiny free Telegram bridge. Deploy it as a free Cloudflare Worker, then set these Worker secrets:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_THREAD_ID` optional, only for Telegram forum topics

The current form posts to `/api/telegram-quote`. If the site is served through Cloudflare, route `/api/telegram-quote` to the Worker and let all other traffic serve GitHub Pages.

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
