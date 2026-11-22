import { B, esc, headRow, heroText, icon, page, section } from './blocks.mjs';

// Products are shown with a line icon instead of a photo. Prices are demo data.
export const PRODUCTS = [
  { id: 'cap', cat: 'apparel', title: 'Corporate Cap', price: 30, icon: 'ph:baseball-cap-light', desc: 'Structured cotton twill with an embroidered T logo and an adjustable strap.', tag: 'Bestseller', sizes: ['One size'] },
  { id: 'hoodie', cat: 'apparel', title: 'Wordmark Hoodie', price: 75, icon: 'ph:hoodie-light', desc: 'Heavyweight organic cotton fleece, brushed inside, tonal wordmark on the chest.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'tee', cat: 'apparel', title: 'Plaid Mode Tee', price: 40, icon: 'ph:t-shirt-light', desc: 'Soft cotton jersey with a small print on the back. Relaxed fit.', tag: 'New', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'socks', cat: 'apparel', title: 'Crew Socks, two pairs', price: 18, icon: 'ph:sock-light', desc: 'Cushioned soles and a knitted T at the ankle. Black and grey.', sizes: ['S/M', 'L/XL'] },
  { id: 'tumbler', cat: 'lifestyle', title: 'Insulated Tumbler', price: 25, icon: 'ph:coffee-light', desc: 'Double-walled steel keeps coffee hot for six hours. Fits the cup holder.' },
  { id: 'backpack', cat: 'lifestyle', title: 'Commuter Backpack', price: 95, icon: 'ph:backpack-light', desc: 'Water-resistant shell, a padded 16-inch laptop sleeve and a hidden pocket for the key card.' },
  { id: 'umbrella', cat: 'lifestyle', title: 'Automatic Umbrella', price: 45, icon: 'ph:umbrella-light', desc: 'Opens and closes with one button and fits the door pocket.' },
  { id: 'tote', cat: 'lifestyle', title: 'Canvas Tote', price: 28, icon: 'ph:tote-simple-light', desc: 'Heavy canvas with leather handles, big enough for a week of shopping.' },
  { id: 'wall-connector', cat: 'charging', title: 'Wall Connector', price: 475, icon: 'ph:charging-station-light', desc: 'Up to 44 miles of range per hour at home, with Wi-Fi updates and power sharing.', tag: 'Most popular' },
  { id: 'mobile-connector', cat: 'charging', title: 'Mobile Connector', price: 250, icon: 'ph:plug-charging-light', desc: 'Charge from a regular or a 240 V outlet when you are away from home.' },
  { id: 'adapter', cat: 'charging', title: 'J1772 Charging Adapter', price: 50, icon: 'ph:lightning-light', desc: 'Use public chargers with the J1772 plug. Small enough for the glovebox.' },
  { id: 'key-card', cat: 'vehicle', title: 'Key Card, two pack', price: 35, icon: 'ph:key-light', desc: 'Back-up keys that slip into a wallet. Pair them in the car in a minute.' },
  { id: 'mats', cat: 'vehicle', title: 'All-Weather Floor Mats', price: 225, icon: 'ph:car-profile-light', desc: 'Laser-measured, raised edges keep snow and mud off the carpet.' },
  { id: 'winter-wheels', cat: 'vehicle', title: 'Winter Wheel and Tyre Set', price: 1950, icon: 'ph:tire-light', desc: 'Four 19-inch wheels with winter tyres, fitted at a service centre.' },
  { id: 'care-kit', cat: 'vehicle', title: 'Car Care Kit', price: 55, icon: 'ph:spray-bottle-light', desc: 'Waterless wash, glass cleaner and two microfibre cloths that are safe on the screen.' },
  { id: 'phone-dock', cat: 'vehicle', title: 'Phone Dock', price: 45, icon: 'ph:device-mobile-light', desc: 'Holds two phones upright on the wireless chargers so they stay in place.' },
];
const CATS = [['apparel', 'Apparel'], ['lifestyle', 'Lifestyle'], ['charging', 'Charging'], ['vehicle', 'Vehicle accessories']];

function productCard(p) {
  const data = esc(JSON.stringify({ id: p.id, title: p.title, price: p.price, icon: p.icon }));
  return `
    <li class="product" data-tags="${p.cat}">
      <div class="product-visual">
        ${icon(p.icon, 96)}
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
      </div>
      <div class="product-body">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.desc}</p>
        ${
          p.sizes && p.sizes.length > 1
            ? `<div class="field" style="gap:6px;margin-top:4px"><label for="size-${p.id}" class="label" style="font-size:13px">Size</label><select id="size-${p.id}" data-size style="min-height:44px">${p.sizes.map((s, i) => `<option${i === 1 ? ' selected' : ''}>${s}</option>`).join('')}</select></div>`
            : ''
        }
        <div class="product-foot">
          <span class="product-price">$${p.price.toLocaleString('en-US')}</span>
          <button type="button" class="btn btn-dark product-add" data-add="${data}">Add to cart</button>
        </div>
      </div>
    </li>`;
}

function shop() {
  const path = 'shop/';
  const crumbs = [{ label: 'Shop' }];
  return {
    path,
    html: page({
      path,
      title: 'Shop: apparel, lifestyle, charging and accessories',
      description: 'Caps, hoodies, tumblers, charging equipment and car accessories. Buy two items and save 10%, three or more and save 15%. Free shipping over $100.',
      crumbs,
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'TeslaX shop',
          itemListElement: PRODUCTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Product', name: p.title, description: p.desc, offers: { '@type': 'Offer', price: p.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock' } } })),
        },
      ],
      body: `${heroText({ crumbs, eyebrow: 'Shop', title: 'Gear for the car and the drive', lead: 'Apparel, everyday things and the equipment that makes charging easy. The more you take, the less each piece costs.' })}
${section(`
  <div class="offer-strip">
    <div class="offer"><span class="icon-tile">${icon('ph:seal-percent-light', 26)}</span><div><strong>Buy 2, save 10%</strong><span>On every item in the cart</span></div></div>
    <div class="offer"><span class="icon-tile">${icon('ph:gift-light', 26)}</span><div><strong>Buy 3 or more, save 15%</strong><span>Applied automatically</span></div></div>
    <div class="offer"><span class="icon-tile">${icon('ph:truck-light', 26)}</span><div><strong>Free shipping over $100</strong><span>30-day returns on everything</span></div></div>
  </div>
  <h2 class="sr-only">Products</h2>
  <div class="chips" role="group" aria-label="Filter products">
    <button class="chip" type="button" data-xfx-filter-btn="*" aria-pressed="true">All <small>${PRODUCTS.length}</small></button>
    ${CATS.map(([k, v]) => `<button class="chip" type="button" data-xfx-filter-btn="${k}" aria-pressed="false">${v} <small>${PRODUCTS.filter((p) => p.cat === k).length}</small></button>`).join('')}
  </div>
  <ul class="grid grid--4 xfx-filter" data-xfx-filter data-shop>
    ${PRODUCTS.map(productCard).join('')}
  </ul>
  <p class="sr-only" role="status" id="shop-status"></p>`)}
${section(`
  ${headRow({ eyebrow: 'Checkout', title: 'Delivery details', lead: 'A demo checkout: no payment is taken and nothing is sent. Every field is needed to place the order.' })}
  <div class="checkout" data-checkout>
    <form class="panel form" novalidate data-checkout-form>
      <div class="form-row form-row--2">
        <div class="field"><label for="co-first">First name</label><input id="co-first" name="first" required autocomplete="given-name"></div>
        <div class="field"><label for="co-last">Last name</label><input id="co-last" name="last" required autocomplete="family-name"></div>
      </div>
      <div class="field"><label for="co-email">Email</label><input id="co-email" name="email" type="email" required autocomplete="email"><span class="field-hint">The receipt and tracking link go here.</span></div>
      <div class="field"><label for="co-address">Street and number</label><input id="co-address" name="address" required autocomplete="street-address"></div>
      <div class="form-row form-row--3">
        <div class="field"><label for="co-city">City</label><input id="co-city" name="city" required autocomplete="address-level2"></div>
        <div class="field"><label for="co-zip">ZIP code</label><input id="co-zip" name="zip" required autocomplete="postal-code" inputmode="numeric"></div>
        <div class="field"><label for="co-state">State</label><select id="co-state" name="state" required autocomplete="address-level1"><option value="">Choose</option>${['California', 'Colorado', 'Florida', 'Illinois', 'New York', 'Texas', 'Washington', 'Other'].map((s) => `<option>${s}</option>`).join('')}</select></div>
      </div>
      <fieldset class="field"><legend class="label">Delivery</legend><div class="choice-group" style="margin-top:8px">
        <label class="choice"><input type="radio" name="ship" value="standard" checked><span>Standard, 3–5 days</span></label>
        <label class="choice"><input type="radio" name="ship" value="express"><span>Express, next day (+$15)</span></label>
      </div></fieldset>
      <button class="btn btn-dark" type="submit">Place order</button>
    </form>
    <aside class="panel summary" aria-labelledby="summary-title">
      <h3 id="summary-title" class="h3">Order summary</h3>
      <ul class="summary-lines" data-summary-lines></ul>
      <dl class="kv" data-summary-sums></dl>
      <p class="note" data-summary-offer></p>
    </aside>
  </div>`, { id: 'checkout', tone: 'soft' })}`,
    }),
  };
}

export const shopPages = () => [shop()];
export { B };
