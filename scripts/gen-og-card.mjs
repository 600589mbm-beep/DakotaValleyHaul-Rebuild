#!/usr/bin/env node
// Renders public/og-card.png (1200×630 social card) from scripts/og-card.svg.
// Runs at prebuild so the card stays in sync with the SVG source.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

try {
  const info = await sharp(join(__dirname, 'og-card.svg')).png().toFile(join(root, 'public', 'og-card.png'));
  console.log(`[og-card] wrote og-card.png ${info.width}x${info.height}`);
} catch (err) {
  console.error('[og-card] failed (keeping existing):', err.message);
  process.exit(0);
}
