// Interactive pieces on the sub-pages. Each block only runs when its markup is on the page.
import { $, $$, addToCart, cartTotals, escHtml, money, offerText, readCart, reduce } from './shared.js';

const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const val = (form, name) => {
  const el = form.elements[name];
  if (!el) return null;
  if (el instanceof RadioNodeList) return el.value;
  if (el.type === 'checkbox') return el.checked;
  return el.value;
};
const out = (root, key, text) => $$(`[data-out="${key}"]`, root).forEach((o) => (o.textContent = text));
const bindLive = (form, fn) => {
  form.addEventListener('input', fn);
  form.addEventListener('change', fn);
  fn();
};

/* ------------------------------------------------------------------ filter swap (MO-29)
   The shown items fade out and drop 14 px, the set swaps after 260 ms, then the new items
   fade in rising 14 px, 45 ms apart. Filter state is kept in the URL hash so it can be shared. */
$$('[data-xfx-filter]').forEach((list) => {
  const scope = list.parentElement;
  const buttons = $$('[data-xfx-filter-btn]', scope);
  const items = [...list.children];
  let current = null;
  let timer = 0;
  const match = (el, f) => f === '*' || ` ${el.dataset.tags || ''} `.includes(` ${f} `);
  const apply = (f, animate = true) => {
    if (f === current) return;
    current = f;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.xfxFilterBtn === f)));
    clearTimeout(timer);
    if (!animate || reduce()) {
      items.forEach((el) => {
        el.hidden = !match(el, f);
        el.classList.remove('is-out');
      });
      return;
    }
    items.forEach((el) => !el.hidden && el.classList.add('is-out'));
    timer = setTimeout(() => {
      const show = items.filter((el) => match(el, f));
      items.forEach((el) => (el.hidden = !match(el, f)));
      show.forEach((el, i) => {
        el.classList.add('is-out');
        requestAnimationFrame(() => setTimeout(() => el.classList.remove('is-out'), i * 45));
      });
    }, 260);
  };
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      apply(b.dataset.xfxFilterBtn);
      history.replaceState(null, '', b.dataset.xfxFilterBtn === '*' ? location.pathname : `#${b.dataset.xfxFilterBtn}`);
    }),
  );
  const fromHash = location.hash.slice(1);
  apply(buttons.some((b) => b.dataset.xfxFilterBtn === fromHash) ? fromHash : '*', false);
});

/* ------------------------------------------------------------------ order configurator */
$$('[data-order]').forEach((root) => {
  const { trims } = JSON.parse(root.dataset.order);
  const form = $('[data-order-form]', root);
  bindLive(form, () => {
    const [name, price, note] = trims[+val(form, 'trim')];
    const down = +val(form, 'down');
    const r = 0.059 / 12;
    const n = 60;
    const principal = Math.max(0, price - down);
    const monthly = (principal * r) / (1 - (1 + r) ** -n);
    out(root, 'price', usd(price));
    out(root, 'trim', `${name} · ${val(form, 'paint')} · ${note}`);
    out(root, 'down', usd(down));
    out(root, 'monthly', `${usd(monthly)} / month`);
  });
});

/* ------------------------------------------------------------------ trade-in */
$$('[data-tradein]').forEach((root) => {
  const form = $('form', root);
  bindLive(form, () => {
    const base = +val(form, 'type');
    const age = Math.max(0, 2026 - +val(form, 'year'));
    const miles = +val(form, 'miles');
    const v = base * 0.86 ** age * Math.max(0.35, 1 - miles / 260000) * +val(form, 'cond');
    out(root, 'miles', `${miles.toLocaleString('en-US')} mi`);
    out(root, 'value', `${usd(v * 0.93)} – ${usd(v * 1.05)}`);
  });
});

/* ------------------------------------------------------------------ savings */
$$('[data-savings]').forEach((root) => {
  const form = $('form', root);
  bindLive(form, () => {
    const miles = +val(form, 'miles');
    const gas = +val(form, 'gas');
    const mpg = +val(form, 'mpg');
    const kwh = +val(form, 'kwh') * (val(form, 'solar') ? 1 / 3 : 1);
    const per = +val(form, 'ev');
    const gasYear = (miles / mpg) * gas;
    const evYear = miles * per * kwh;
    const maint = 600;
    const saveYear = gasYear - evYear + maint;
    out(root, 'miles', `${miles.toLocaleString('en-US')} mi`);
    out(root, 'gas', `$${gas.toFixed(2)}`);
    out(root, 'mpg', `${mpg} mpg`);
    out(root, 'kwh', `$${(+val(form, 'kwh')).toFixed(2)}`);
    out(root, 'gasYear', usd(gasYear));
    out(root, 'evYear', usd(evYear));
    out(root, 'save5', usd(saveYear * 5));
    out(root, 'saveYear', `About ${usd(saveYear)} a year, or ${usd(saveYear / 12)} a month.`);
    const max = Math.max(gasYear, evYear, maint);
    $('[data-bar="gas"]', root).style.transform = `scaleX(${gasYear / max})`;
    $('[data-bar="ev"]', root).style.transform = `scaleX(${evYear / max})`;
    $('[data-bar="maint"]', root).style.transform = `scaleX(${maint / max})`;
  });
});

/* ------------------------------------------------------------------ insurance */
$$('[data-insurance]').forEach((root) => {
  const form = $('form', root);
  bindLive(form, () => {
    const miles = +val(form, 'miles');
    const score = +val(form, 'score');
    const m = +val(form, 'car') * +val(form, 'age') * (0.8 + miles / 55000) * (1 - Math.max(0, score - 80) * 0.012);
    out(root, 'miles', `${miles.toLocaleString('en-US')} mi`);
    out(root, 'score', String(score));
    out(root, 'premium', `${usd(m)} / month`);
    out(root, 'year', `About ${usd(m * 12)} a year.`);
  });
});

/* ------------------------------------------------------------------ trip planner */
$$('[data-trip]').forEach((root) => {
  const form = $('form', root);
  bindLive(form, () => {
    const dist = +val(form, 'dist');
    const range = +val(form, 'range') * +val(form, 'cond');
    const start = +val(form, 'start') / 100;
    const firstLeg = range * (start - 0.1);
    const perStop = range * 0.7;
    const stops = dist <= firstLeg ? 0 : Math.ceil((dist - firstLeg) / perStop);
    const kwhPerMile = 0.28;
    const energyAtStops = Math.max(0, dist - firstLeg) * kwhPerMile;
    out(root, 'dist', `${dist.toLocaleString('en-US')} mi`);
    out(root, 'start', `${val(form, 'start')}%`);
    out(root, 'stops', stops === 0 ? 'No stops needed' : `${stops} Supercharger stop${stops > 1 ? 's' : ''}`);
    out(root, 'time', stops === 0 ? 'None' : `About ${stops * 25} minutes`);
    out(root, 'cost', usd(energyAtStops * 0.45));
  });
});

/* ------------------------------------------------------------------ forms: every field required, errors in place */
function validate(form) {
  let first = null;
  $$('.field-error', form).forEach((e) => e.remove());
  $$('[aria-invalid]', form).forEach((e) => e.removeAttribute('aria-invalid'));
  $$('input[required], select[required], textarea[required]', form).forEach((el) => {
    let msg = '';
    if (el.type === 'checkbox' && !el.checked) msg = 'Please tick this box to continue.';
    else if (el.type !== 'checkbox' && !el.value.trim()) msg = 'This field is needed.';
    else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim())) msg = 'Please enter a complete email address.';
    else if (el.type === 'tel' && el.value.replace(/\D/g, '').length < 7) msg = 'Please enter a phone number we can call.';
    if (!msg) return;
    el.setAttribute('aria-invalid', 'true');
    const err = document.createElement('span');
    err.className = 'field-error';
    err.id = `${el.id || el.name}-error`;
    err.textContent = msg;
    el.setAttribute('aria-describedby', err.id);
    (el.closest('.field') || el.closest('.check') || el.parentElement).appendChild(err);
    first ??= el;
  });
  if (first) first.focus();
  return !first;
}
function done(form, title, text) {
  const box = document.createElement('div');
  box.className = 'form-done';
  box.setAttribute('role', 'status');
  box.tabIndex = -1;
  box.innerHTML = `<h3>${escHtml(title)}</h3><p>${escHtml(text)}</p>`;
  form.replaceWith(box);
  box.focus();
}

// Demo drive: the next three days as choices
$$('[data-days]').forEach((group) => {
  const d = new Date();
  group.innerHTML = [1, 2, 3, 4]
    .map((i) => {
      const day = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      const label = day.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
      return `<label class="choice"><input type="radio" name="day" value="${day.toISOString().slice(0, 10)}"${i === 1 ? ' checked' : ''}><span>${label}</span></label>`;
    })
    .join('');
});
$$('[data-demo-form]').forEach((form) =>
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(form)) return;
    const name = val(form, 'first') || val(form, 'name') || '';
    const model = val(form, 'model');
    const when = [val(form, 'time') && `at ${val(form, 'time')}`, val(form, 'location') && `in ${val(form, 'location')}`].filter(Boolean).join(' ');
    done(form, `Thank you${name ? `, ${name}` : ''}.`, model ? `Your ${model} demo drive is requested${when ? ` ${when}` : ''}. This is a demo, so no email will follow.` : 'We would reply within two working days. This is a demo, so nothing was sent.');
  }),
);

/* ------------------------------------------------------------------ shop */
$$('[data-add]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const p = JSON.parse(btn.dataset.add);
    const size = btn.closest('.product')?.querySelector('[data-size]');
    if (size) {
      p.variant = `Size ${size.value}`;
      p.id = `${p.id}-${size.value}`;
    }
    addToCart(p);
    btn.textContent = 'Added';
    btn.classList.add('is-added');
    setTimeout(() => {
      btn.textContent = 'Add to cart';
      btn.classList.remove('is-added');
    }, 1400);
    const s = $('#shop-status');
    const t = cartTotals();
    if (s) s.textContent = `${p.title} added. ${offerText(t.count)}`;
  });
});

const checkout = $('[data-checkout]');
if (checkout) {
  const form = $('[data-checkout-form]', checkout);
  const render = () => {
    const items = readCart();
    const t = cartTotals(items);
    const express = val(form, 'ship') === 'express' ? 15 : 0;
    $('[data-summary-lines]', checkout).innerHTML = items.length
      ? items
          .map((i) => ({ ...i, title: escHtml(i.title), variant: escHtml(i.variant), icon: /^[a-z0-9-]+:[a-z0-9-]+$/.test(i.icon) ? i.icon : 'ph:package-light' }))
          .map(
            (i) => `<li class="summary-line"><span class="ic"><iconify-icon noobserver icon="${i.icon}" width="22" height="22" aria-hidden="true"></iconify-icon></span><span>${i.title}${i.variant ? `<br><small style="color:var(--muted)">${i.variant}</small>` : ''} × ${i.qty}</span><strong>${money(i.price * i.qty)}</strong></li>`,
          )
          .join('')
      : '<li class="note" style="margin:0">Your cart is empty. Add something from the shop above.</li>';
    $('[data-summary-sums]', checkout).innerHTML = `
      <div><dt>Subtotal</dt><dd>${money(t.subtotal)}</dd></div>
      ${t.discount ? `<div><dt>Multi-buy saving (${Math.round(t.rate * 100)}%)</dt><dd style="color:#15803d">−${money(t.discount)}</dd></div>` : ''}
      <div><dt>Shipping</dt><dd>${t.shipping + express ? money(t.shipping + express) : 'Free'}</dd></div>
      <div><dt><strong>Total</strong></dt><dd><strong>${money(t.total + express)}</strong></dd></div>`;
    $('[data-summary-offer]', checkout).textContent = offerText(t.count);
  };
  form.addEventListener('change', render);
  document.addEventListener('cart:change', render);
  render();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!readCart().length) {
      $('[data-summary-offer]', checkout).textContent = 'Add at least one item before placing the order.';
      return;
    }
    if (!validate(form)) return;
    const order = `TX-${Date.now().toString().slice(-6)}`;
    const total = $('[data-summary-sums] div:last-child dd', checkout).textContent;
    try {
      localStorage.removeItem('teslax_cart_v2');
    } catch {
      /* ignore */
    }
    document.dispatchEvent(new CustomEvent('cart:change', { detail: [] }));
    done(form, `Order ${order} placed.`, `Thank you, ${val(form, 'first')}. ${total} is the total for this demo order: nothing was charged and no parcel will arrive.`);
  });
}
