// Small HTML building blocks for the sub-pages. Everything stays plain, semantic HTML.
import { breadcrumbs, breadcrumbSchema, esc, head, icon, img } from './layout.mjs';

const B = '%BASE%';
export { B, esc, icon, img };

/** A complete page. `path` is relative to the site root and ends with "/". */
export function page({ path, title, description, crumbs, schema = [], body, image, imageAlt }) {
  const sch = [...schema, breadcrumbSchema(crumbs)];
  return `${head({ title, description, path, schema: sch, image, imageAlt })}
<body class="antialiased">
<!--@nav-->
<!--@cart-->
<main id="main" class="page">
${body}
</main>
<!--@footer-->
</body>
</html>
`;
}

const actionsHtml = (actions = []) =>
  actions.length
    ? `<div class="actions">${actions
        .map((a) => `<a href="${a.ext ? a.href : B + a.href}" class="btn ${a.style || 'btn-dark'}"${a.ext ? ' rel="noopener"' : ''}>${a.label}</a>`)
        .join('')}</div>`
    : '';

const specsHtml = (specs = []) =>
  specs.length ? `<dl class="specs">${specs.map(([v, u, l]) => `<div><dd>${v}${u ? `<small>${u}</small>` : ''}</dd><dt>${l}</dt></div>`).join('')}</dl>` : '';

/** Hero: text over a photo. */
export function heroImage({ crumbs, eyebrow, title, lead, image, alt, pos, actions, specs }) {
  return `
<section class="phero phero--image">
  <div class="phero-media">${img(image, { alt, eager: true, pos })}</div>
  <div class="wrap phero-crumbs">${breadcrumbs(crumbs)}</div>
  <div class="wrap">
    ${eyebrow ? `<span class="eyebrow" style="color:rgba(255,255,255,.75)">${eyebrow}</span>` : ''}
    <h1 class="h1">${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${specsHtml(specs)}
    ${actionsHtml(actions)}
  </div>
</section>`;
}

/** Hero: oversized type on black, for pages without a photo. */
export function heroType({ crumbs, eyebrow, word, title, lead, actions, specs }) {
  return `
<section class="phero phero--type">
  <div class="wrap">
    ${breadcrumbs(crumbs)}
    <p class="mega-word" aria-hidden="true">${word}</p>
    ${eyebrow ? `<span class="eyebrow" style="margin-top:24px">${eyebrow}</span>` : ''}
    <h1 class="h2" style="margin-top:${eyebrow ? 0 : 24}px">${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${specsHtml(specs)}
    ${actionsHtml(actions)}
  </div>
</section>`;
}

/** Hero: text only, on white. */
export function heroText({ crumbs, eyebrow, title, lead, actions }) {
  return `
<section class="phero">
  <div class="wrap">
    ${breadcrumbs(crumbs)}
    <div style="margin-top:40px">
      ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
      <h1 class="h1">${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
      ${actionsHtml(actions)}
    </div>
  </div>
</section>`;
}

export function section(inner, { tone = '', id = '', cls = '' } = {}) {
  return `
<section class="section${tone ? ` section--${tone}` : ''}${cls ? ` ${cls}` : ''}"${id ? ` id="${id}"` : ''}>
  <div class="wrap">${inner}</div>
</section>`;
}

export function headRow({ eyebrow, title, lead, level = 2 }) {
  return `
  <div class="head-row">
    <div>${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}<h${level} class="h2">${title}</h${level}></div>
    ${lead ? `<p class="lead">${lead}</p>` : '<div></div>'}
  </div>`;
}

export function split({ id, eyebrow, title, body = [], image, alt, pos, flip, actions, extra = '' }) {
  return `
  <div class="split${flip ? ' split--flip' : ''} feature reveal reveal-up"${id ? ` id="${id}"` : ''}>
    <div>
      ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
      <h2 class="h2">${title}</h2>
      <div class="prose" style="margin-top:20px">${body.map((p) => `<p>${p}</p>`).join('')}</div>
      ${extra}
      ${actionsHtml(actions)}
    </div>
    <div class="split-media">${img(image, { alt, sizes: '(min-width: 900px) 50vw, 100vw', pos })}</div>
  </div>`;
}

/** Cards. Each: {title, text, icon?, meta?, href?, linkLabel?, image?, alt?} */
export function cards(list, { cols = 3, tone = '' } = {}) {
  return `
  <div class="grid grid--${cols}">
    ${list
      .map((c) => {
        const tag = c.href ? 'a' : 'article';
        const href = c.href ? ` href="${c.ext ? c.href : B + c.href}"${c.ext ? ' rel="noopener"' : ''}` : '';
        return `
    <${tag} class="card${tone ? ` card--${tone}` : ''} reveal reveal-up"${href}>
      ${c.image ? `<div class="card-photo">${img(c.image, { alt: c.alt || '', sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' })}</div>` : ''}
      ${c.icon ? `<span class="icon-tile">${icon(c.icon, 26)}</span>` : ''}
      ${c.meta ? `<span class="card-meta">${c.meta}</span>` : ''}
      <h3 class="h3">${c.title}</h3>
      ${c.text ? `<p>${c.text}</p>` : ''}
      ${c.href ? `<span class="card-link">${c.linkLabel || 'Learn more'} ${icon('solar:arrow-right-linear', 16)}</span>` : ''}
    </${tag}>`;
      })
      .join('')}
  </div>`;
}

export function kv(pairs) {
  return `<dl class="kv">${pairs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
}

export function ctaBand({ title, text, actions }) {
  return `
  <div class="cta-band reveal reveal-up">
    <div><h2 class="h2" style="font-size:clamp(28px,3.4vw,44px)">${title}</h2>${text ? `<p style="margin-top:12px">${text}</p>` : ''}</div>
    ${actionsHtml(actions).replace('class="actions"', 'class="actions" style="margin-top:0"')}
  </div>`;
}

export { actionsHtml, specsHtml };
