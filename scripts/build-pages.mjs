// Writes every sub-page as <path>/index.html from the templates in scripts/site/, and the sitemap.
// The pages are build output (git-ignored); edit the templates, not the generated HTML.
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { vehiclePages } from './site/pages-vehicles.mjs';
import { energyPages } from './site/pages-energy.mjs';
import { discoverPages } from './site/pages-discover.mjs';
import { shopPages } from './site/pages-shop.mjs';
import { SITE } from './site/layout.mjs';

export const TOP_DIRS = ['vehicles', 'energy', 'charging', 'discover', 'shop', 'savings', 'updates'];
for (const d of TOP_DIRS) if (existsSync(d)) rmSync(d, { recursive: true });

const pages = [...vehiclePages(), ...energyPages(), ...discoverPages(), ...shopPages()];
for (const { path, html } of pages) {
  mkdirSync(path, { recursive: true });
  writeFileSync(join(path, 'index.html'), html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = ['', ...pages.map((p) => p.path)];
writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><priority>${u === '' ? '1.0' : u.split('/').length > 2 ? '0.6' : '0.8'}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);
console.log(`${pages.length} pages written`);
