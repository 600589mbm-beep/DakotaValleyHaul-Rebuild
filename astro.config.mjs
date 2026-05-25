import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://dakotavalleyjunkremovalservice.com',
  output: 'static',
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [react(), sitemap(), icon()],
  build: {
    format: 'directory',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
