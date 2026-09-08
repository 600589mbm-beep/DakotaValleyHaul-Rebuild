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
    // Omit lastmod until it can reflect each page's significant content changes.
    sitemap(),
    icon(),
  ],
  build: {
    format: 'directory',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
