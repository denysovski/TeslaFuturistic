// Custom drop-downs that match the site. Each native <select> stays in the page, hidden, so form
// values, `required`, validation and the calculators keep working; a button and a listbox sit on top.
// Keyboard: Enter, Space or arrows open it; arrows, Home, End and typing move; Enter picks; Escape
// and Tab close. The active option is announced through aria-activedescendant.

let uid = 0;

function enhance(select) {
  if (select.dataset.enhanced) return;
  select.dataset.enhanced = '1';
  const id = select.id || `sel-${++uid}`;
  select.id = id;
  const label = document.querySelector(`label[for="${id}"]`);
  const labelId = label ? (label.id ||= `${id}-label`) : null;

  const wrap = document.createElement('div');
  wrap.className = 'xsel';
  select.parentNode.insertBefore(wrap, select);
  wrap.appendChild(select);
  select.classList.add('xsel-native');
  select.tabIndex = -1;
  select.setAttribute('aria-hidden', 'true');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'xsel-btn';
  btn.id = `${id}-btn`;
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', `${id}-list`);
  if (labelId) btn.setAttribute('aria-labelledby', `${labelId} ${id}-btn`);
  btn.innerHTML = '<span class="xsel-value"></span><span class="xsel-chevron" aria-hidden="true"></span>';
  wrap.appendChild(btn);
  // clicking the label opens the custom control instead of the hidden select
  label?.addEventListener('click', (e) => {
    e.preventDefault();
    btn.focus();
  });

  const list = document.createElement('ul');
  list.className = 'xsel-list';
  list.id = `${id}-list`;
  list.setAttribute('role', 'listbox');
  list.tabIndex = -1;
  if (labelId) list.setAttribute('aria-labelledby', labelId);
  wrap.appendChild(list);

  const options = () => [...select.options];
  // a required field's "Choose …" placeholder is shown on the button, not offered as a choice
  const shown = () => options().map((o, i) => i).filter((i) => !(select.required && select.options[i].value === ''));
  let active = Math.max(0, select.selectedIndex);
  let typed = '';
  let typedAt = 0;

  const render = () => {
    const visible = shown();
    list.innerHTML = options()
      .map((o, i) => [o, i])
      .filter(([, i]) => visible.includes(i))
      .map(
        ([o, i]) =>
          `<li role="option" id="${id}-opt-${i}" data-i="${i}" class="xsel-opt${o.value === '' ? ' is-placeholder' : ''}" aria-selected="${i === select.selectedIndex && o.value !== ''}"${o.disabled ? ' aria-disabled="true"' : ''}><span>${o.textContent}</span><span class="xsel-check" aria-hidden="true"></span></li>`,
      )
      .join('');
  };
  const sync = () => {
    const o = select.options[select.selectedIndex];
    const empty = !o || o.value === '';
    btn.querySelector('.xsel-value').textContent = o ? o.textContent : '';
    btn.classList.toggle('is-empty', empty);
    const invalid = select.getAttribute('aria-invalid') === 'true';
    btn.toggleAttribute('aria-invalid', invalid);
    if (invalid && select.getAttribute('aria-describedby')) btn.setAttribute('aria-describedby', select.getAttribute('aria-describedby'));
    else btn.removeAttribute('aria-describedby');
  };
  const setActive = (i) => {
    const v = shown();
    active = v.includes(i) ? i : i < v[0] ? v[0] : v[v.length - 1];
    list.querySelectorAll('.xsel-opt').forEach((li) => li.classList.toggle('is-active', +li.dataset.i === active));
    list.setAttribute('aria-activedescendant', `${id}-opt-${active}`);
    list.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  };
  const open = () => {
    if (wrap.classList.contains('is-open')) return;
    document.querySelectorAll('.xsel.is-open').forEach((w) => w !== wrap && w.dispatchEvent(new Event('xsel:close')));
    render();
    // open upwards when there is no room below
    const r = btn.getBoundingClientRect();
    wrap.classList.toggle('is-up', innerHeight - r.bottom < 300 && r.top > innerHeight - r.bottom);
    wrap.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    setActive(shown().includes(select.selectedIndex) ? select.selectedIndex : shown()[0]);
    list.focus({ preventScroll: true });
  };
  const close = (refocus = true) => {
    if (!wrap.classList.contains('is-open')) return;
    wrap.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    list.removeAttribute('aria-activedescendant');
    if (refocus) btn.focus({ preventScroll: true });
  };
  const choose = (i) => {
    const o = select.options[i];
    if (!o || o.disabled || o.value === '' && select.required) return;
    if (select.selectedIndex !== i) {
      select.selectedIndex = i;
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    // a chosen value clears an earlier "this field is needed" error
    if (select.getAttribute('aria-invalid') === 'true' && o.value) {
      select.removeAttribute('aria-invalid');
      wrap.closest('.field')?.querySelector('.field-error')?.remove();
    }
    sync();
    close();
  };

  btn.addEventListener('click', () => (wrap.classList.contains('is-open') ? close() : open()));
  btn.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      open();
    }
  });
  list.addEventListener('keydown', (e) => {
    const v = shown();
    const pos = v.indexOf(active);
    if (e.key === 'ArrowDown') setActive(v[Math.min(v.length - 1, pos + 1)]);
    else if (e.key === 'ArrowUp') setActive(v[Math.max(0, pos - 1)]);
    else if (e.key === 'Home') setActive(v[0]);
    else if (e.key === 'End') setActive(v[v.length - 1]);
    else if (e.key === 'Enter' || e.key === ' ') choose(active);
    else if (e.key === 'Escape') close();
    else if (e.key === 'Tab') return close(false);
    else if (e.key.length === 1) {
      const now = Date.now();
      typed = now - typedAt > 700 ? e.key.toLowerCase() : typed + e.key.toLowerCase();
      typedAt = now;
      const hit = shown().find((i) => select.options[i].textContent.trim().toLowerCase().startsWith(typed));
      if (hit !== undefined) setActive(hit);
    } else return;
    e.preventDefault();
  });
  list.addEventListener('click', (e) => {
    const li = e.target.closest('.xsel-opt');
    if (li) choose(+li.dataset.i);
  });
  list.addEventListener('mousemove', (e) => {
    const li = e.target.closest('.xsel-opt');
    if (li && +li.dataset.i !== active) setActive(+li.dataset.i);
  });
  wrap.addEventListener('xsel:close', () => close(false));
  document.addEventListener('pointerdown', (e) => {
    if (!wrap.contains(e.target)) close(false);
  });
  // validation (widgets.js) focuses the hidden select: hand focus to the button instead
  select.addEventListener('focus', () => btn.focus());
  select.addEventListener('change', sync);
  new MutationObserver(sync).observe(select, { attributes: true, attributeFilter: ['aria-invalid', 'aria-describedby'] });
  select.form?.addEventListener('reset', () => setTimeout(sync));
  sync();
}

export function enhanceSelects(root = document) {
  root.querySelectorAll('select:not([multiple])').forEach(enhance);
}
enhanceSelects();
