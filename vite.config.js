import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// GitHub Pages serves the site from /TeslaFuturistic/.
// Every page is an index.html in its own folder (clean URLs). The sub-pages are written by
// scripts/build-pages.mjs; this config picks up whatever exists and resolves the shared markup.
const ROOT = process.cwd();
const SKIP = new Set(['node_modules', 'dist', 'public', 'assets-src', 'src', 'scripts', 'docs', '.git', '.github']);

function findPages(dir = ROOT, out = {}) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) findPages(p, out);
    else if (name === 'index.html') out[relative(ROOT, dir) || 'main'] = resolve(p);
  }
  return out;
}

/** <!--@nav-->, <!--@cart-->, <!--@footer--> and %BASE% in every page. */
function sharedMarkup() {
  let base = '/';
  return {
    name: 'teslax-shared-markup',
    configResolved(c) {
      base = c.base;
    },
    async transformIndexHtml(html, ctx) {
      const layout = await import(`${pathToFileURL(join(ROOT, 'scripts/site/layout.mjs')).href}?t=${Date.now()}`);
      const page = ctx.path.replace(/^\//, '').replace(/index\.html$/, '');
      return html
        .replace('<!--@nav-->', layout.nav(page))
        .replace('<!--@cart-->', layout.cart())
        .replace('<!--@footer-->', layout.footer())
        .replaceAll('%BASE%', base);
    },
  };
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/TeslaFuturistic/' : '/',
  plugins: [sharedMarkup()],
  build: { assetsInlineLimit: 0, rollupOptions: { input: findPages() } },
}));
