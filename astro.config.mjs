import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://dakotavalleyjunkremovalservice.com',
  output: 'static',
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    react(),
    // lastmod/changefreq tell crawlers the programmatic pages are fresh on
    // every deploy — content actually changes per deploy (seeded copy, FAQs).
    sitemap({ lastmod: new Date(), changefreq: 'weekly' }),
    icon(),
  ],
  build: {
    format: 'directory',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
