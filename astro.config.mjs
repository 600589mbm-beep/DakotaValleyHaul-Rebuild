import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dakotavalleyjunkremovalservice.com',
  output: 'static',
  integrations: [react(), sitemap()],
  build: {
    format: 'directory',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
