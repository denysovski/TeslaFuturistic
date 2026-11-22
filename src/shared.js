// Runs on every page: fonts and styles, icons, the header (mega menus and the phone menu), the cart,
// scroll reveals, the newsletter form and sharp images on every screen.
import '@fontsource-variable/inter/wght.css';
import './main.css';
import './site.css';
import './ui.css';
import 'iconify-icon';
import './icons.generated.js';

const BASE = import.meta.env.BASE_URL;
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

requestAnimationFrame(() => document.body.classList.add('page-ready'));

/* ------------------------------------------------------------------ sharp images
   `sizes` says how wide an image is drawn, but a 16:9 photo cropped into a tall box with
   object-fit: cover is drawn much wider than its box. Tell the browser the real width. */
function fitImages() {
  $$('img[srcset]').forEach((im) => {
    const box = im.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const fit = getComputedStyle(im).objectFit;
    const ratio = (im.naturalWidth || +im.getAttribute('width')) / (im.naturalHeight || +im.getAttribute('height')) || 1;
    const drawn = fit === 'cover' ? Math.max(box.width, box.height * ratio) : box.width;
    const need = Math.ceil(drawn);
    const prev = +(im.dataset.sized || 0);
    if (need > prev) {
      im.sizes = `${need}px`;
      im.dataset.sized = need;
    }
  });
}
let fitT;
const queueFit = () => {
  clearTimeout(fitT);
  fitT = setTimeout(fitImages, 120);
};
addEventListener('load', fitImages);
addEventListener('resize', queueFit);
document.addEventListener('DOMContentLoaded', fitImages);

/* ------------------------------------------------------------------ reveals */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
);
$$('.reveal, .mask-text').forEach((el) => io.observe(el));

/* ------------------------------------------------------------------ header */
const header = $('#navbar');
// The bar slides away while reading down and returns on the first scroll up.
// It stays put while a menu or the cart is open, and near the top of the page.
let lastY = scrollY;
let ticking = false;
const onScroll = () => {
  ticking = false;
  if (!header) return;
  const y = scrollY;
  header.classList.toggle('is-scrolled', y > 8);
  const busy = header.classList.contains('mega-open') || document.documentElement.matches('.menu-open, .cart-open');
  if (busy || y < 120) header.classList.remove('is-hidden');
  else if (y > lastY + 6) header.classList.add('is-hidden');
  else if (y < lastY - 6) header.classList.remove('is-hidden');
  if (Math.abs(y - lastY) > 6 || y < 120) lastY = y;
};
addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
header?.addEventListener('focusin', () => header.classList.remove('is-hidden'));
onScroll();

// Desktop mega menus: open on click, keyboard and (with intent) hover; close on Escape, outside click or leaving.
const items = $$('.desk-item');
let openItem = null;
let hoverTimer;
function setMega(item) {
  if (openItem === item) return;
  if (openItem) {
    const p = $('.mega', openItem);
    $('.desk-link', openItem).setAttribute('aria-expanded', 'false');
    openItem.classList.remove('is-open');
    const closing = p;
    setTimeout(() => {
      if (!closing.parentElement.classList.contains('is-open')) closing.hidden = true;
    }, 200);
  }
  openItem = item;
  header?.classList.toggle('mega-open', !!item);
  if (item) {
    const p = $('.mega', item);
    p.hidden = false;
    $('.desk-link', item).setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => item.classList.add('is-open'));
  }
}
items.forEach((item) => {
  const btn = $('.desk-link', item);
  btn.addEventListener('click', () => setMega(openItem === item ? null : item));
  item.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => setMega(item), openItem ? 0 : 90);
  });
  item.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => setMega(null), 160);
  });
});
document.addEventListener('click', (e) => {
  if (openItem && (!e.target.closest('.desk-item') || e.target.closest('.mega a'))) setMega(null);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && openItem) {
    const btn = $('.desk-link', openItem);
    setMega(null);
    btn.focus();
  }
});

// Phone and tablet menu: a sheet under the bar with accordions for every section.
const menu = $('#mobile-menu');
const menuBtn = $('#mobile-menu-toggle');
let menuOpen = false;
function setMenu(open) {
  if (!menu || open === menuOpen) return;
  menuOpen = open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.documentElement.classList.toggle('menu-open', open);
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
  } else {
    menu.classList.remove('is-open');
    setTimeout(() => {
      if (!menuOpen) menu.hidden = true;
    }, reduce() ? 0 : 400);
  }
}
menuBtn?.addEventListener('click', () => setMenu(!menuOpen));
menu?.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (!menuOpen) return;
  if (e.key === 'Escape') {
    setMenu(false);
    menuBtn.focus();
  }
  if (e.key === 'Tab') {
    // keep focus inside the bar's button and the sheet
    const f = [menuBtn, ...$$(FOCUSABLE, menu).filter((el) => el.offsetParent !== null)];
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) {
      e.preventDefault();
      f[f.length - 1].focus();
    } else if (!e.shiftKey && i === f.length - 1) {
      e.preventDefault();
      f[0].focus();
    }
  }
});
addEventListener('resize', () => {
  if (menuOpen && innerWidth >= 1024) setMenu(false);
});
$$('.mnav-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    $$('.mnav-toggle').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    btn.setAttribute('aria-expanded', String(open));
  });
});

/* ------------------------------------------------------------------ cart
   Stored in localStorage. Multi-buy: 2 items save 10 %, 3 or more save 15 %. Free shipping from $100. */
const CART_KEY = 'teslax_cart_v2';
export const money = (v) => `$${v.toFixed(2)}`;
// Cart lines come from localStorage, so anything shown from them is escaped before it reaches innerHTML.
export const escHtml = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const safeIcon = (v) => (/^[a-z0-9-]+:[a-z0-9-]+$/.test(v) ? v : 'ph:package-light');
export const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};
const writeCart = (c) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(c));
  } catch {
    /* private mode: the cart lives for this page view */
  }
  document.dispatchEvent(new CustomEvent('cart:change', { detail: c }));
};
export function cartTotals(items = readCart()) {
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
  const rate = count >= 3 ? 0.15 : count === 2 ? 0.1 : 0;
  const discount = +(subtotal * rate).toFixed(2);
  const after = subtotal - discount;
  const shipping = count === 0 || after >= 100 ? 0 : 9.9;
  return { count, subtotal, rate, discount, shipping, total: after + shipping };
}
export function offerText(count) {
  if (count === 0) return 'Buy 2 items, save 10%. Buy 3 or more, save 15%.';
  if (count === 1) return 'Add one more item to save 10% on everything.';
  if (count === 2) return 'You save 10%. Add one more item to save 15%.';
  return 'Best price unlocked: 15% off every item.';
}
export function addToCart(p, qty = 1) {
  const c = readCart();
  const hit = c.find((i) => i.id === p.id);
  if (hit) hit.qty = Math.min(9, hit.qty + qty);
  else c.push({ id: p.id, title: p.title, variant: p.variant || '', price: p.price, icon: p.icon, qty });
  writeCart(c);
  announce(`${p.title} added to your cart.`);
}

const cartEl = $('#cart-sidebar');
const overlay = $('#cart-overlay');
const cartBtn = $('#cart-toggle');
let lastRemoved = null;
let cartReturn = null;

function announce(msg) {
  const s = $('#cart-status');
  if (s) s.textContent = msg;
}

function renderCart() {
  const list = $('#cart-items');
  if (!list) return;
  const items = readCart().map((i) => ({ ...i, title: escHtml(i.title), variant: escHtml(i.variant), id: escHtml(i.id), icon: safeIcon(i.icon) }));
  const t = cartTotals(items);
  const badge = $('#cart-badge');
  badge.hidden = t.count === 0;
  badge.textContent = t.count;
  cartBtn?.setAttribute('aria-label', t.count ? `Open cart, ${t.count} item${t.count > 1 ? 's' : ''}` : 'Open cart');
  $('#cart-count').textContent = `${t.count} item${t.count === 1 ? '' : 's'}`;
  $('#cart-offer-text').textContent = offerText(t.count);
  $('#cart-offer-bar').style.transform = `scaleX(${Math.min(1, t.count / 3)})`;
  $('#cart-subtotal').textContent = money(t.subtotal);
  $('#cart-discount-row').hidden = !t.discount;
  $('#cart-discount-label').textContent = `Multi-buy saving (${Math.round(t.rate * 100)}%)`;
  $('#cart-discount').textContent = `−${money(t.discount)}`;
  $('#cart-shipping').textContent = t.shipping ? money(t.shipping) : 'Free';
  $('#cart-total-amount').textContent = money(t.total);
  $('#checkout-btn').classList.toggle('is-disabled', !t.count);
  $('#checkout-btn').setAttribute('aria-disabled', String(!t.count));

  if (!items.length) {
    list.innerHTML = `<li class="cart-empty">
        <iconify-icon noobserver icon="ph:shopping-bag-open-light" width="40" height="40" aria-hidden="true"></iconify-icon>
        <p>Your cart is empty.</p>
        ${lastRemoved ? `<button type="button" class="link-btn" data-undo>Undo: put ${escHtml(lastRemoved.title)} back</button>` : `<a href="${BASE}shop/" class="link-btn">Browse the shop</a>`}
      </li>`;
  } else {
    list.innerHTML =
      items
        .map(
          (i) => `
      <li class="cart-line">
        <span class="cart-line-icon"><iconify-icon noobserver icon="${i.icon}" width="30" height="30" aria-hidden="true"></iconify-icon></span>
        <div class="cart-line-body">
          <div class="cart-line-top">
            <p class="cart-line-title">${i.title}</p>
            <p class="cart-line-price">${money(i.price * i.qty)}</p>
          </div>
          <p class="cart-line-meta">${i.variant ? `${i.variant} · ` : ''}${money(i.price)} each</p>
          <div class="cart-line-actions">
            <div class="qty" role="group" aria-label="Quantity of ${i.title}">
              <button type="button" data-dec="${i.id}" aria-label="One fewer ${i.title}">−</button>
              <output aria-live="polite">${i.qty}</output>
              <button type="button" data-inc="${i.id}" aria-label="One more ${i.title}"${i.qty >= 9 ? ' disabled' : ''}>+</button>
            </div>
            <button type="button" class="link-btn" data-remove="${i.id}">Remove</button>
          </div>
        </div>
      </li>`,
        )
        .join('') +
      (lastRemoved ? `<li class="cart-undo"><button type="button" class="link-btn" data-undo>Undo: put ${escHtml(lastRemoved.title)} back</button></li>` : '');
  }
}

$('#cart-items')?.addEventListener('click', (e) => {
  const c = readCart();
  const inc = e.target.closest('[data-inc]');
  const dec = e.target.closest('[data-dec]');
  const rem = e.target.closest('[data-remove]');
  if (inc) {
    const it = c.find((i) => i.id === inc.dataset.inc);
    it.qty = Math.min(9, it.qty + 1);
    writeCart(c);
  } else if (dec || rem) {
    const id = (dec || rem).dataset.dec || (dec || rem).dataset.remove;
    const it = c.find((i) => i.id === id);
    if (dec && it.qty > 1) {
      it.qty -= 1;
      writeCart(c);
    } else {
      lastRemoved = it;
      writeCart(c.filter((i) => i.id !== id));
      announce(`${it.title} removed. Undo is available.`);
      $('[data-undo]')?.focus();
    }
  } else if (e.target.closest('[data-undo]') && lastRemoved) {
    const back = lastRemoved;
    lastRemoved = null;
    writeCart([...readCart(), back]);
    announce(`${back.title} is back in your cart.`);
  }
});
$('#checkout-btn')?.addEventListener('click', (e) => {
  if (!readCart().length) e.preventDefault();
  else closeCart();
});

export function openCart() {
  if (!cartEl) return;
  cartReturn = document.activeElement;
  setMenu(false);
  renderCart();
  cartEl.hidden = false;
  document.documentElement.classList.add('cart-open');
  cartBtn?.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      cartEl.classList.add('is-open');
      overlay.classList.add('is-visible');
      $('#cart-close').focus();
    }),
  );
}
function closeCart() {
  if (!cartEl || cartEl.hidden) return;
  cartEl.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  document.documentElement.classList.remove('cart-open');
  cartBtn?.setAttribute('aria-expanded', 'false');
  lastRemoved = null;
  setTimeout(() => (cartEl.hidden = true), reduce() ? 0 : 320);
  cartReturn?.focus?.();
}
cartBtn?.addEventListener('click', openCart);
$('#cart-close')?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
  if (!cartEl || cartEl.hidden) return;
  if (e.key === 'Escape') closeCart();
  if (e.key === 'Tab') {
    const f = $$(FOCUSABLE, cartEl).filter((el) => el.offsetParent !== null);
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) {
      e.preventDefault();
      f[f.length - 1].focus();
    } else if (!e.shiftKey && i === f.length - 1) {
      e.preventDefault();
      f[0].focus();
    }
  }
});
document.addEventListener('cart:change', renderCart);
addEventListener('storage', (e) => e.key === CART_KEY && renderCart());
renderCart();

/* ------------------------------------------------------------------ newsletter */
const nf = $('#newsletter-form');
nf?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $('#newsletter-email');
  const status = $('#newsletter-status');
  const v = input.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
    status.textContent = 'Please enter a complete email address.';
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  input.removeAttribute('aria-invalid');
  status.textContent = `Thanks. ${v} will get the next issue.`;
  nf.reset();
});

export { $, $$, reduce, BASE };
