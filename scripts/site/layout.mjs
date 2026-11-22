// Shared markup for every page: navigation, phone menu, cart drawer, footer, <head> and images.
// Links are written with %BASE% and resolved by the Vite plugin, so the same output works under
// `vite` (base "/") and on GitHub Pages (base "/TeslaFuturistic/").
import { readFileSync } from 'node:fs';
import { NAV, SHOP, DEMO } from './nav.mjs';

export const SITE = 'https://denysovski.github.io/TeslaFuturistic/';
const B = '%BASE%';
const sizes = JSON.parse(readFileSync(new URL('../../public/img/sizes.json', import.meta.url), 'utf8'));

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const icon = (name, w = 20, extra = '') => `<iconify-icon noobserver icon="${name}" width="${w}" height="${w}" aria-hidden="true"${extra}></iconify-icon>`;
export { icon };

/** A responsive <img> from the optimised ladder. `fit` adds data-fit so shared.js can request the width the crop needs. */
export function img(name, { alt, cls = '', sizes: sz = '100vw', eager = false, pos = '' } = {}) {
  const meta = sizes[name];
  if (!meta) throw new Error(`Unknown image ${name}`);
  const ws = meta.widths;
  const mid = ws.find((w) => w >= 1280) ?? ws[ws.length - 1];
  const srcset = ws.map((w) => `${B}img/${name}-${w}.webp ${w}w`).join(', ');
  return `<img src="${B}img/${name}-${mid}.webp" srcset="${srcset}" sizes="${sz}" width="${meta.w}" height="${meta.h}" alt="${esc(alt)}" class="${cls}"${pos ? ` style="object-position:${pos}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-fit>`;
}

const isCurrent = (cur, href) => cur && (cur === href || (href.endsWith('/') && href !== '' && cur.startsWith(href) && !href.includes('#')));

/* ------------------------------------------------------------------ nav */

function desktopPanel(group) {
  if (group.models) {
    return `
      <div class="mega-grid mega-grid--5">
        ${group.models
          .map(
            (m) => `
        <a href="${B}${m.href}" class="mega-tile">
          <img loading="lazy" decoding="async" width="400" height="240" src="${m.img}" alt="" class="mega-tile-img">
          <span class="mega-tile-name">${m.name}</span>
          <span class="mega-tile-note">${m.note}</span>
        </a>`,
          )
          .join('')}
      </div>
      <div class="mega-links">
        ${group.links.map((l) => `<a href="${B}${l.href}">${l.label}</a>`).join('')}
        <a href="${B}${group.overview.href}" class="mega-links-all">${group.overview.label} ${icon('solar:arrow-right-linear', 14)}</a>
      </div>`;
  }
  if (group.items) {
    return `
      <div class="mega-grid mega-grid--${group.items.length}">
        ${group.items
          .map(
            (m) => `
        <a href="${B}${m.href}" class="mega-tile">
          <img loading="lazy" decoding="async" width="400" height="240" src="${m.img}" alt="" class="mega-tile-img">
          <span class="mega-tile-name">${m.name}</span>
          <span class="mega-tile-note">${m.note}</span>
        </a>`,
          )
          .join('')}
      </div>
      <div class="mega-links"><a href="${B}${group.overview.href}" class="mega-links-all">${group.overview.label} ${icon('solar:arrow-right-linear', 14)}</a></div>`;
  }
  return `
      <div class="mega-columns">
        ${group.groups
          .map(
            (g) => `
        <div>
          <p class="mega-col-title">${g.title}</p>
          <ul>${g.links.map((l) => `<li><a href="${B}${l.href}">${l.label}</a></li>`).join('')}</ul>
        </div>`,
          )
          .join('')}
      </div>
      <div class="mega-links"><a href="${B}${group.overview.href}" class="mega-links-all">${group.overview.label} ${icon('solar:arrow-right-linear', 14)}</a></div>`;
}

function mobileGroup(group) {
  let body;
  if (group.models) {
    body = `
        <ul class="mnav-list">
          ${group.models.map((m) => `<li><a href="${B}${m.href}"><span>${m.name}</span><small>${m.note}</small></a></li>`).join('')}
        </ul>
        <div class="mnav-chips">${group.links.map((l) => `<a href="${B}${l.href}">${l.label}</a>`).join('')}</div>`;
  } else if (group.items) {
    body = `
        <ul class="mnav-list">
          ${group.items.map((m) => `<li><a href="${B}${m.href}"><span>${m.name}</span><small>${m.note}</small></a></li>`).join('')}
        </ul>`;
  } else {
    body = group.groups
      .map(
        (g) => `
        <p class="mnav-sub">${g.title}</p>
        <ul class="mnav-list mnav-list--plain">${g.links.map((l) => `<li><a href="${B}${l.href}"><span>${l.label}</span></a></li>`).join('')}</ul>`,
      )
      .join('');
  }
  return `
      <li class="mnav-group">
        <button type="button" class="mnav-toggle" aria-expanded="false" aria-controls="mnav-${group.id}">
          <span>${group.label}</span>${icon('solar:alt-arrow-down-linear', 18, ' class="mnav-caret"')}
        </button>
        <div class="mnav-panel" id="mnav-${group.id}">
          <div class="mnav-panel-inner">
            ${body}
            <a class="mnav-overview" href="${B}${group.overview.href}">${group.overview.label} ${icon('solar:arrow-right-linear', 16)}</a>
          </div>
        </div>
      </li>`;
}

export function nav(current = '') {
  return `
  <a href="#main" class="skip-link">Skip to content</a>
  <header class="site-header" id="navbar">
    <div class="site-header-bar">
      <a href="${B}" class="site-logo" aria-label="TeslaX home">
        <img decoding="async" src="${B}img/tesla-wordmark-300.webp" srcset="${B}img/tesla-wordmark-300.webp 300w, ${B}img/tesla-wordmark-600.webp 600w" sizes="142px" width="300" height="42" alt="Tesla">
      </a>

      <nav class="desk-nav" aria-label="Main">
        <ul>
          ${NAV.map(
            (g) => `
          <li class="desk-item" data-menu="${g.id}">
            <button type="button" class="desk-link" aria-expanded="false" aria-controls="mega-${g.id}"${current.startsWith(g.overview.href) ? ' data-current' : ''}>
              ${g.label}${icon('solar:alt-arrow-down-linear', 14, ' class="desk-caret"')}
            </button>
            <div class="mega" id="mega-${g.id}">
              <div class="mega-inner">${desktopPanel(g)}</div>
            </div>
          </li>`,
          ).join('')}
          <li><a href="${B}${SHOP.href}" class="desk-link"${isCurrent(current, SHOP.href) ? ' aria-current="page"' : ''}>${SHOP.label}</a></li>
        </ul>
      </nav>

      <div class="site-header-actions">
        <a href="${B}${DEMO.href}" class="header-demo"${isCurrent(current, DEMO.href) ? ' aria-current="page"' : ''}>${DEMO.label}</a>
        <button type="button" id="cart-toggle" class="icon-btn" aria-label="Open cart" aria-controls="cart-sidebar" aria-expanded="false">
          ${icon('solar:bag-3-linear', 22)}
          <span class="cart-badge" id="cart-badge" hidden>0</span>
        </button>
        <button type="button" id="mobile-menu-toggle" class="icon-btn menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <span class="menu-icon" aria-hidden="true"><i></i><i></i></span>
        </button>
      </div>
    </div>
    <div class="mega-backdrop" aria-hidden="true"></div>
  </header>

  <div id="mobile-menu" class="mnav" aria-label="Menu" role="dialog" aria-modal="true" hidden>
    <div class="mnav-scroll">
      <ul class="mnav-groups">
        ${NAV.map(mobileGroup).join('')}
        <li><a class="mnav-direct" href="${B}${SHOP.href}">Shop ${icon('solar:arrow-right-linear', 18)}</a></li>
        <li><a class="mnav-direct" href="${B}savings/">Compare savings ${icon('solar:arrow-right-linear', 18)}</a></li>
      </ul>
      <div class="mnav-foot">
        <a href="${B}${DEMO.href}" class="btn btn-dark btn-block">Book a demo drive</a>
      </div>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ cart */

export function cart() {
  return `
  <div id="cart-overlay" class="cart-overlay" aria-hidden="true"></div>
  <aside id="cart-sidebar" class="cart-sidebar" role="dialog" aria-modal="true" aria-labelledby="cart-title" hidden>
    <div class="cart-header">
      <div>
        <h2 id="cart-title" class="cart-title">Your cart</h2>
        <p class="cart-count" id="cart-count">0 items</p>
      </div>
      <button type="button" id="cart-close" class="icon-btn" aria-label="Close cart">${icon('solar:close-circle-linear', 24)}</button>
    </div>
    <div class="cart-offer" id="cart-offer">
      <p class="cart-offer-text" id="cart-offer-text">Buy 2 items, save 10%. Buy 3 or more, save 15%.</p>
      <div class="cart-offer-track" aria-hidden="true"><span id="cart-offer-bar"></span></div>
    </div>
    <div class="cart-items-shell">
      <ul id="cart-items" class="cart-items"></ul>
    </div>
    <div class="cart-footer">
      <dl class="cart-sums">
        <div><dt>Subtotal</dt><dd id="cart-subtotal">$0.00</dd></div>
        <div class="cart-sum-discount" id="cart-discount-row" hidden><dt id="cart-discount-label">Multi-buy saving</dt><dd id="cart-discount">−$0.00</dd></div>
        <div><dt>Shipping</dt><dd id="cart-shipping">Free</dd></div>
        <div class="cart-sum-total"><dt>Total</dt><dd id="cart-total-amount">$0.00</dd></div>
      </dl>
      <a href="${B}shop/#checkout" id="checkout-btn" class="btn btn-dark btn-block">Go to checkout</a>
      <a href="${B}shop/" class="btn btn-ghost btn-block">Keep shopping</a>
      <p class="cart-note">Free shipping over $100. 30-day returns.</p>
      <p class="sr-only" role="status" id="cart-status"></p>
    </div>
  </aside>`;
}

/* ------------------------------------------------------------------ footer */

export function footer() {
  const col = (title, links) => `
        <div class="foot-col">
          <h2 class="foot-title">${title}</h2>
          <ul>${links.map((l) => `<li><a href="${l.ext ? l.href : B + l.href}"${l.ext ? ' rel="noopener"' : ''}>${l.label}</a></li>`).join('')}</ul>
        </div>`;
  const [veh, energy, charging, discover] = NAV;
  return `
  <footer class="site-footer">
    <div class="foot-wrap">
      <div class="foot-top">
        <div class="foot-brand">
          <a href="${B}" class="foot-logo">TESLAX</a>
          <p>An unofficial concept that imagines a calmer, more cinematic Tesla site: the line-up, energy, charging, ownership and a small store.</p>
          <form class="foot-news" id="newsletter-form" novalidate>
            <label for="newsletter-email" class="foot-news-label">Product news, once a month</label>
            <div class="foot-news-row">
              <input id="newsletter-email" type="email" autocomplete="email" required placeholder="you@email.com">
              <button type="submit" class="btn btn-dark">Subscribe</button>
            </div>
            <p id="newsletter-status" class="foot-news-status" role="status"></p>
          </form>
        </div>
        <div class="foot-cols">
          ${col('Vehicles', [...veh.models.map((m) => ({ label: m.name, href: m.href })), { label: 'Inventory', href: 'vehicles/inventory/' }, { label: 'Compare', href: 'vehicles/compare/' }])}
          ${col('Energy', [...energy.items.map((m) => ({ label: m.name, href: m.href })), ...charging.items.map((m) => ({ label: m.name, href: m.href })), { label: 'Compare savings', href: 'savings/' }])}
          ${col('Discover', discover.groups[0].links.concat(discover.groups[1].links.slice(0, 2)))}
          ${col('Company', [...discover.groups[2].links, { label: 'Shop', href: 'shop/' }, { label: 'Project on GitHub', href: 'https://github.com/denysovski/TeslaFuturistic', ext: true }])}
        </div>
      </div>
      <div class="foot-bottom">
        <p>Unofficial fan concept by <a href="https://github.com/denysovski" rel="noopener">denysovski</a>, made for a portfolio. Not affiliated with, endorsed or sponsored by Tesla, Inc. Tesla, Model S, Model 3, Model X, Model Y, Cybertruck, Powerwall and Megapack are trademarks of Tesla, Inc. Product photos © Tesla, Inc. Prices, dates, stock and the store are demo data.</p>
        <div class="foot-social">
          <a href="https://x.com/tesla" aria-label="Tesla on X" rel="noopener">${icon('brandico:twitter-bird', 18)}</a>
          <a href="https://www.instagram.com/teslamotors/" aria-label="Tesla on Instagram" rel="noopener">${icon('brandico:instagram', 18)}</a>
          <a href="https://www.linkedin.com/company/tesla-motors/" aria-label="Tesla on LinkedIn" rel="noopener">${icon('brandico:linkedin', 18)}</a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ------------------------------------------------------------------ page shell */

export function head({ title, description, path, image = 'og-image.jpg', imageAlt = 'TeslaX concept page', schema = [] }) {
  const url = SITE + path;
  const full = `${title} · TeslaX`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#ffffff">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TeslaX">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}${image}">
<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="32x32" href="${B}favicon-32.png">
<link rel="apple-touch-icon" href="${B}apple-touch-icon.png">
<link rel="manifest" href="${B}site.webmanifest">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script type="module" src="/src/pages.js"></script>
</head>`;
}

export function breadcrumbs(trail) {
  // trail: [{label, href}] ending with the current page (no href)
  return `
    <nav class="crumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="${B}">Home</a></li>
        ${trail.map((t) => (t.href ? `<li><a href="${B}${t.href}">${t.label}</a></li>` : `<li><span aria-current="page">${t.label}</span></li>`)).join('')}
      </ol>
    </nav>`;
}

export function breadcrumbSchema(trail) {
  const items = [{ label: 'Home', href: '' }, ...trail.map((t) => ({ ...t, href: t.href ?? null }))];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.label, ...(t.href !== null ? { item: SITE + t.href } : {}) })),
  };
}
