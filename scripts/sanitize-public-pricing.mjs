import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const OUTPUT_DIR = new URL('../dist/', import.meta.url);
const TEXT_EXTENSIONS = new Set(['.html', '.json', '.txt', '.xml']);

function sanitizePricing(content) {
  return content
    // Preserve the public $85 minimum, but remove the upper end of ranges that
    // would otherwise reveal the full rate card.
    .replace(/\$85\s*(?:–|—|-|to)\s*\$(?!85\b)\d+(?:\.\d+)?/gi, '$85 minimum; exact quote from photos')
    // Remove all other published dollar ranges.
    .replace(/\$(?!85\b)\d+(?:\.\d+)?\s*(?:–|—|-|to)\s*\$\d+(?:\.\d+)?/gi, 'photo quote')
    // Replace non-minimum starting, approximate, and maximum prices with the
    // photo-quote message customers should act on.
    .replace(/\b(?:from|starting(?:\s+at)?|starts?(?:\s+at)?|around|roughly|up\s+to)\s+\$(?!85\b)\d+(?:\.\d+)?/gi, 'quoted from photos')
    // Catch remaining individual prices while leaving the $85 minimum and the
    // exact "$25 off with review" promotion untouched.
    .replace(/\$(?!85\b|25\s+off\s+with\s+review\b)\d+(?:\.\d+)?(?:\s*(?:each|per\s+(?:item|piece|truck|load)))?/gi, 'photo quote')
    // Smooth out a few combinations produced when legacy copy contains both a
    // range and a qualifier.
    .replace(/(?:photo quote|quoted from photos)\s*(?:–|—|-)\s*(?:photo quote|quoted from photos)/gi, 'photo quote')
    .replace(/\bfrom\s+(?:photo quote|quoted from photos)/gi, 'quoted from photos');
}

async function walk(directoryUrl) {
  const entries = await readdir(directoryUrl, { withFileTypes: true });
  let changedFiles = 0;

  for (const entry of entries) {
    const entryUrl = new URL(entry.name, directoryUrl);

    if (entry.isDirectory()) {
      changedFiles += await walk(new URL(`${entry.name}/`, directoryUrl));
      continue;
    }

    if (!TEXT_EXTENSIONS.has(extname(entry.name).toLowerCase())) continue;

    const original = await readFile(entryUrl, 'utf8');
    const sanitized = sanitizePricing(original);

    if (sanitized !== original) {
      await writeFile(entryUrl, sanitized, 'utf8');
      changedFiles += 1;
    }
  }

  return changedFiles;
}

try {
  const changedFiles = await walk(OUTPUT_DIR);
  console.log(`Pricing sanitizer updated ${changedFiles} generated file(s).`);
} catch (error) {
  console.error('Pricing sanitizer failed:', error);
  process.exitCode = 1;
}
