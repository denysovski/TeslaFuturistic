import { B, cards, ctaBand, esc, headRow, heroImage, heroText, heroType, icon, img, kv, page, section, split } from './blocks.mjs';

// Specifications follow the homepage. Prices are demo data for this concept.
export const MODELS = [
  {
    id: 'model-s', name: 'Model S', kind: 'Sedan', hero: 'tesla-model-s', heroAlt: 'Model S in red on a winding road through a forest', pos: '55% 60%',
    tagline: 'Long-distance comfort with the quickest acceleration in the line-up.',
    specs: [['402', 'mi', 'Range (EPA est.)'], ['1.99', 's', '0–60 mph, Plaid'], ['149', 'mph', 'Top speed'], ['1,020', 'hp', 'Peak power, Plaid']],
    range: 402, accel: 3.1, top: 149, seats: 5, cargo: 28, charge: 250, drive: 'Dual Motor AWD',
    trims: [['All-Wheel Drive', 74990, '402 mi · 3.1 s 0–60'], ['Plaid', 89990, '396 mi · 1.99 s 0–60']],
    second: { image: 'model-s-interior-cockpit', alt: 'Model S cockpit with the yoke and the wide centre display', title: 'A cockpit built around the drive', body: ['A 17-inch landscape display, a yoke or round wheel, and controls that sit where the thumb already is.', 'Twenty-two speakers, active road-noise reduction and a glass roof make long days on the motorway feel short.'] },
    third: { image: 'model-s-interior-rear-cabin', alt: 'Model S rear cabin in white with the rear display', title: 'Room for three in the back', body: ['Heated rear seats, an 8-inch rear touchscreen for media and climate, and a flat floor that leaves real legroom.'] },
    highlights: [['1,020 hp', 'Tri-motor Plaid', 'Carbon-sleeved rotors keep full power available all the way to top speed.'], ['22', 'A cabin that stays quiet', 'Twenty-two speakers, acoustic glass and active noise reduction cut wind and road noise.'], ['10 TFLOPS', 'Gaming and media', 'Enough processing for games, streaming and the navigation at the same time.'], ['Overnight', 'Over-the-air updates', 'New features and refinements arrive while the car is parked, years after delivery.']],
  },
  {
    id: 'model-3', name: 'Model 3', kind: 'Sedan', hero: 'model-3-studio', heroAlt: 'Model 3 in white in a bright studio', pos: '50% 60%',
    tagline: 'The everyday electric car: efficient, quick and simple to live with.',
    specs: [['363', 'mi', 'Range (EPA est.)'], ['4.2', 's', '0–60 mph'], ['125', 'mph', 'Top speed'], ['24', 'cu ft', 'Cargo']],
    range: 363, accel: 4.2, top: 125, seats: 5, cargo: 24, charge: 250, drive: 'All-Wheel Drive',
    trims: [['Rear-Wheel Drive', 42490, '272 mi · 5.8 s 0–60'], ['Long Range AWD', 47990, '363 mi · 4.2 s 0–60'], ['Performance', 54990, '303 mi · 2.9 s 0–60']],
    second: { image: 'model-3-interior', alt: 'Model 3 interior in white with the centre touchscreen', title: 'A calm cabin with one screen', body: ['Everything runs through a 15.4-inch display, so the dashboard stays clean and the view stays open.', 'Ventilated front seats, ambient lighting and an 8-inch rear screen come with the current Model 3.'] },
    third: { image: 'tesla-model-3', alt: 'Model 3 in white driving through dry hills', title: 'Efficient by design', body: ['A low drag coefficient and a heat pump keep consumption low in summer and winter, which is where the range comes from.'] },
    highlights: [['$0.04', 'Low running costs', 'Roughly four cents of electricity per mile at home, and no oil changes.'], ['Phone', 'Your phone is the key', 'The car unlocks as you walk up and locks itself when you leave.'], ['5 stars', 'Built to protect', 'A rigid structure and a low centre of gravity keep rollover risk low.'], ['250 kW', 'Supercharger ready', 'Peak charging on the road, with the stops planned for you.']],
  },
  {
    id: 'model-x', name: 'Model X', kind: 'SUV', hero: 'model-x-road', heroAlt: 'Model X in white on an open road', pos: '55% 60%',
    tagline: 'Up to seven seats, falcon-wing doors and serious towing.',
    specs: [['335', 'mi', 'Range (EPA est.)'], ['3.8', 's', '0–60 mph'], ['7', '', 'Seats, maximum'], ['92', 'cu ft', 'Cargo']],
    range: 335, accel: 3.8, top: 149, seats: 7, cargo: 92, charge: 250, drive: 'Dual Motor AWD',
    trims: [['All-Wheel Drive', 79990, '335 mi · 3.8 s 0–60'], ['Plaid', 94990, '314 mi · 2.5 s 0–60']],
    second: { image: 'tesla-model-x', alt: 'Model X with its falcon-wing doors open beside a mountain lake', title: 'Family space without the compromise', body: ['Falcon-wing doors open in tight parking spaces, and the third row folds flat when it is not needed.', 'Up to 5,000 lbs of towing with the hitch, and a panoramic windscreen that runs over the front seats.'] },
    third: { image: 'model-s-interior-front-seats', alt: 'White front seats and the centre console in a Tesla cabin', title: 'A cabin for long trips', body: ['Tri-zone climate, a rear display and HEPA filtration that keeps the air clean on busy roads.'] },
    highlights: [['7', 'Seats when you need them', 'Choose five, six or seven seats to fit the family.'], ['12 in', 'Falcon-wing doors', 'They open in tight spaces, needing less side clearance than a regular door.'], ['5,000 lbs', 'Real towing', 'Trailer mode adjusts the range estimate to the load behind you.'], ['HEPA', 'Bioweapon Defense Mode', 'A medical-grade filter that keeps the cabin air clean.']],
  },
  {
    id: 'model-y', name: 'Model Y', kind: 'SUV', hero: 'model-y-performance-hero', heroAlt: 'Model Y Performance in red on a mountain road', pos: '55% 60%',
    tagline: 'The compact SUV with room for bikes, buggies and holidays.',
    specs: [['311', 'mi', 'Range (EPA est.)'], ['4.6', 's', '0–60 mph'], ['135', 'mph', 'Top speed'], ['76', 'cu ft', 'Cargo']],
    range: 311, accel: 4.6, top: 135, seats: 5, cargo: 76, charge: 250, drive: 'Dual Motor AWD',
    trims: [['Rear-Wheel Drive', 44990, '357 mi · 6.8 s 0–60'], ['Long Range AWD', 48990, '311 mi · 4.6 s 0–60'], ['Performance', 57490, '306 mi · 3.3 s 0–60']],
    second: { image: 'tesla-model-y', alt: 'Model Y in white parked by an outdoor gathering', title: 'Space that fits real weekends', body: ['Rear seats fold flat at the touch of a button, and the boot and front trunk take more than most mid-size SUVs.', 'A high seating position, a low floor and wide doors make child seats easy.'] },
    third: { image: 'tesla-in-car-gaming', alt: 'Rear passenger display showing a game in a Tesla', title: 'Calm for the whole family', body: ['Ventilated front seats, heated rear seats and a rear display that keeps everyone entertained on the way.'] },
    highlights: [['76 cu ft', 'Room for everything', 'Seats down, it carries more than most cars in its class.'], ['Dual', 'All-weather traction', 'Two motors react to slip in milliseconds, in rain and snow.'], ['$0', 'Oil changes, ever', 'Regenerative braking also saves the pads for years.'], ['24/7', 'Sentry Mode', 'Cameras watch the car while it is parked and save clips to your phone.']],
  },
  {
    id: 'cybertruck', name: 'Cybertruck', kind: 'Pickup', hero: 'cybertruck-cliff-dusk', heroAlt: 'Cybertruck on a rocky ledge at dusk', pos: '45% 60%',
    tagline: 'A stainless steel pickup built for work, weather and long trips.',
    specs: [['325', 'mi', 'Range (EPA est.)'], ['4.1', 's', '0–60 mph'], ['11,000', 'lbs', 'Towing'], ['6.5', 'ft', 'Vault bed']],
    range: 325, accel: 4.1, top: 112, seats: 5, cargo: 121, charge: 250, drive: 'Dual Motor AWD',
    trims: [['All-Wheel Drive', 79990, '325 mi · 4.1 s 0–60'], ['Cyberbeast', 99990, '301 mi · 2.6 s 0–60']],
    second: { image: 'cybertruck-bike-rack', alt: 'Cybertruck in a field with a mountain bike on the rear rack', title: 'Built for the weekend, too', body: ['The vault bed takes 2,500 lbs of payload, and a hitch-mounted rack carries bikes without touching the tailgate.', 'Adaptive air suspension raises the truck for trails and lowers it again for the drive home.'] },
    third: { image: 'cybertruck-app', alt: 'A phone showing the Cybertruck app with camera, climate and location controls', title: 'The truck in your pocket', body: ['Check the cameras, set the climate, open the vault and share access with a friend, all from the app.'] },
    highlights: [['30X', 'Stainless steel body', 'Ultra-hard steel that needs no paint and shrugs off dents and scratches.'], ['6.5 ft', 'Vault bed', 'A lockable, powered tonneau keeps tools dry and out of sight.'], ['11.5 kW', 'Power on board', 'Outlets in the bed and cabin run tools, lights and a campsite.'], ['17 in', 'Adaptive air suspension', 'Ground clearance for trails, lowered for the motorway and loading.']],
  },
];

const fmt = (n) => `$${n.toLocaleString('en-US')}`;

function modelPage(m) {
  const path = `vehicles/${m.id}/`;
  const crumbs = [{ label: 'Vehicles', href: 'vehicles/' }, { label: m.name }];
  const actions = [{ label: `Order ${m.name}`, href: `${path}#order`, style: 'btn-light' }, { label: 'Book a demo drive', href: 'discover/demo-drive/', style: 'btn-outline-light' }];
  const hero = m.hero
    ? heroImage({ crumbs, eyebrow: m.kind, title: m.name, lead: m.tagline, image: m.hero, alt: m.heroAlt, pos: m.pos, actions, specs: m.specs })
    : heroType({ crumbs, word: 'Cybertruck', eyebrow: m.kind, title: 'Built for any planet, used on this one', lead: m.tagline, actions, specs: m.specs });

  const order = section(
    `
  ${headRow({ eyebrow: 'Order', title: `Configure your ${m.name}`, lead: 'Pick a version to see the price, an estimated monthly payment and when it could be yours. Demo pricing for this concept.' })}
  <div class="calc" data-order='${esc(JSON.stringify({ model: m.name, trims: m.trims }))}'>
    <form class="panel form" data-order-form>
      <fieldset class="field">
        <legend class="label">Version</legend>
        <div class="choice-group" style="margin-top:8px">
          ${m.trims.map(([t], i) => `<label class="choice"><input type="radio" name="trim" value="${i}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`).join('')}
        </div>
      </fieldset>
      <fieldset class="field">
        <legend class="label">Paint</legend>
        <div class="choice-group" style="margin-top:8px">
          ${['Pearl White', 'Stealth Grey', 'Ultra Red', 'Deep Blue'].map((c, i) => `<label class="choice"><input type="radio" name="paint" value="${c}"${i === 0 ? ' checked' : ''}><span>${c}</span></label>`).join('')}
        </div>
      </fieldset>
      <div class="field">
        <label for="down-${m.id}">Down payment</label>
        <input id="down-${m.id}" type="range" min="0" max="30000" step="1000" value="8000" name="down">
        <output class="range-out" for="down-${m.id}" data-out="down">$8,000</output>
      </div>
    </form>
    <div class="panel" aria-live="polite">
      <p class="eyebrow">Your ${m.name}</p>
      <p class="result-big" data-out="price">${fmt(m.trims[0][1])}</p>
      <p class="lead" style="margin-top:8px" data-out="trim">${m.trims[0][0]} · ${m.trims[0][2]}</p>
      <dl class="kv" style="margin-top:24px">
        <div><dt>Estimated monthly payment</dt><dd data-out="monthly">–</dd></div>
        <div><dt>Term</dt><dd>60 months at 5.9% APR</dd></div>
        <div><dt>Estimated delivery</dt><dd>4–6 weeks</dd></div>
      </dl>
      <div class="actions"><a href="${B}discover/demo-drive/" class="btn btn-dark">Drive it first</a><a href="${B}vehicles/inventory/" class="btn btn-ghost">See cars in stock</a></div>
      <p class="note">An estimate for illustration. Real prices, rates and taxes depend on where you live.</p>
    </div>
  </div>`,
    { id: 'order', tone: 'soft' },
  );

  const story = m.second
    ? section(
        `${split({ eyebrow: 'Inside', title: m.second.title, body: m.second.body, image: m.second.image, alt: m.second.alt })}
         <div style="margin-top:var(--section)">${split({ eyebrow: 'Details', title: m.third.title, body: m.third.body, image: m.third.image, alt: m.third.alt, flip: true })}</div>`,
      )
    : section(
        `${headRow({ eyebrow: 'Built for work', title: 'A truck that is also a power station', lead: 'Cybertruck is shown here without a photo: this concept only uses images it has the files for. The details below cover what matters day to day.' })}`,
      );

  return {
    path,
    html: page({
      path,
      title: `${m.name}: range, performance and price`,
      description: `${m.name} ${m.kind.toLowerCase()}: ${m.tagline} Up to ${m.range} mi of range, 0–60 mph in ${m.specs[1][0]} s. Configure it and book a demo drive.`,
      crumbs,
      image: 'og-image.jpg',
      schema: [{ '@context': 'https://schema.org', '@type': 'Product', name: `Tesla ${m.name}`, brand: { '@type': 'Brand', name: 'Tesla' }, description: m.tagline, offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: m.trims[0][1], highPrice: m.trims[m.trims.length - 1][1] } }],
      body: `${hero}
${story}
${section(`${headRow({ eyebrow: 'Highlights', title: `Why people choose ${m.name}` })}
  <ul class="grid grid--4">
    ${m.highlights.map(([stat, title, text]) => `<li class="stat-card reveal reveal-up"><span class="stat-card-num">${stat}</span><h3 class="h3">${title}</h3><p>${text}</p></li>`).join('')}
  </ul>`, { tone: 'soft' })}
${order}
${section(`
  <div class="split" style="align-items:start">
    <div>${headRow({ eyebrow: 'Specifications', title: 'The numbers' }).replace('class="head-row"', 'class="head-row" style="margin-bottom:0"')}</div>
    ${kv([['Range (EPA est.)', `${m.range} mi`], ['0–60 mph', `${m.accel} s`], ['Top speed', `${m.top} mph`], ['Drive', m.drive], ['Seats', `Up to ${m.seats}`], ['Cargo', `${m.cargo} cu ft`], ['Supercharging', `Up to ${m.charge} kW`], ['Warranty', '8 years battery and drive unit']])}
  </div>`)}
${section(ctaBand({ title: `Compare ${m.name} with the rest of the line-up`, text: 'Range, acceleration, space and price side by side.', actions: [{ label: 'Compare models', href: 'vehicles/compare/', style: 'btn-light' }] }))}`,
    }),
  };
}

function lineup() {
  const path = 'vehicles/';
  const crumbs = [{ label: 'Vehicles' }];
  const photos = { 'model-s': 'tesla-model-s', 'model-3': 'tesla-model-3', 'model-x': 'tesla-model-x', 'model-y': 'tesla-model-y' };
  return {
    path,
    html: page({
      path,
      title: 'Vehicles: Model S, 3, X, Y and Cybertruck',
      description: 'The full Tesla line-up in one place: two sedans, two SUVs and a pickup, with range, acceleration and price for each.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Vehicles', title: 'Five ways to drive electric', lead: 'Two sedans, two SUVs and a pickup. Every one charges at home overnight and at Superchargers on the road.', actions: [{ label: 'Compare models', href: 'vehicles/compare/' }, { label: 'Cars in stock', href: 'vehicles/inventory/', style: 'btn-ghost' }] })}
${section(`
  <div class="grid grid--2">
    ${MODELS.map(
      (m) => `
    <a href="${B}vehicles/${m.id}/" class="card card--line reveal reveal-up">
      ${photos[m.id] ? `<div class="card-photo">${img(photos[m.id], { alt: `${m.name} on the road`, sizes: '(min-width: 640px) 50vw, 100vw' })}</div>` : `<div class="card-photo" style="display:grid;place-items:center;background:#0b0b0c;color:#fff"><span style="font-size:clamp(32px,5vw,56px);font-weight:700;letter-spacing:-.03em;text-transform:uppercase">${m.name}</span></div>`}
      <span class="card-meta">${m.kind} · from ${fmt(m.trims[0][1])}</span>
      <h2 class="h3">${m.name}</h2>
      <p>${m.tagline}</p>
      <dl class="kv" style="margin-top:8px">
        <div><dt>Range</dt><dd>${m.range} mi</dd></div>
        <div><dt>0–60 mph</dt><dd>${m.accel} s</dd></div>
      </dl>
      <span class="card-link">Explore ${m.name} ${icon('solar:arrow-right-linear', 16)}</span>
    </a>`,
    ).join('')}
  </div>`)}
${section(`${headRow({ eyebrow: 'More ways to buy', title: 'Inventory, trade-in and fleet' })}${cards(
        [
          { title: 'Inventory', text: 'New cars ready for delivery within weeks.', href: 'vehicles/inventory/', linkLabel: 'See inventory' },
          { title: 'Used cars', text: 'Inspected, with the remaining warranty and a full history.', href: 'vehicles/inventory/#used', linkLabel: 'See used cars' },
          { title: 'Trade-in', text: 'An estimate for your current car in two minutes.', href: 'vehicles/trade-in/', linkLabel: 'Value my car' },
          { title: 'Fleet', text: 'Lower running costs for company cars and services.', href: 'vehicles/fleet/', linkLabel: 'Fleet options' },
        ],
        { cols: 4 },
      )}`, { tone: 'soft' })}`,
    }),
  };
}

function compare() {
  const path = 'vehicles/compare/';
  const crumbs = [{ label: 'Vehicles', href: 'vehicles/' }, { label: 'Compare' }];
  const rows = [
    ['Body', (m) => m.kind],
    ['Price from', (m) => fmt(m.trims[0][1])],
    ['Range (EPA est.)', (m) => `${m.range} mi`],
    ['0–60 mph', (m) => `${m.accel} s`],
    ['Top speed', (m) => `${m.top} mph`],
    ['Seats', (m) => `${m.seats}`],
    ['Cargo', (m) => `${m.cargo} cu ft`],
    ['Supercharging', (m) => `${m.charge} kW`],
  ];
  return {
    path,
    html: page({
      path,
      title: 'Compare models side by side',
      description: 'Compare Model S, Model 3, Model X, Model Y and Cybertruck: price, range, acceleration, seats and cargo in one table.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Compare', title: 'Every model, side by side', lead: 'The numbers that usually decide it. On a phone each model becomes its own card.' })}
${section(`
  <div class="table-wrap table-wrap--cards reveal reveal-up">
    <table class="table">
      <caption class="sr-only">Tesla models compared</caption>
      <thead><tr><th scope="col">Model</th>${rows.map(([r]) => `<th scope="col">${r}</th>`).join('')}</tr></thead>
      <tbody>
        ${MODELS.map((m) => `<tr><th scope="row"><a href="${B}vehicles/${m.id}/" style="text-decoration:underline;text-underline-offset:3px">${m.name}</a></th>${rows.map(([r, f]) => `<td data-label="${r}">${f(m)}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  </div>
  <p class="note">Range is the EPA estimate for the version listed first; prices are demo data.</p>`)}
${section(ctaBand({ title: 'Still deciding?', text: 'Thirty minutes behind the wheel says more than any table.', actions: [{ label: 'Book a demo drive', href: 'discover/demo-drive/', style: 'btn-light' }] }))}`,
    }),
  };
}

function inventory() {
  const path = 'vehicles/inventory/';
  const crumbs = [{ label: 'Vehicles', href: 'vehicles/' }, { label: 'Inventory' }];
  const photo = { 'model-s': 'tesla-model-s', 'model-3': 'model-3-studio', 'model-x': 'model-x-road', 'model-y': 'tesla-model-y' };
  const stock = [
    ['model-3', 'new', 'Long Range AWD', 'Pearl White', 47990, 0, 'Austin, TX'],
    ['model-y', 'new', 'Performance', 'Ultra Red', 57490, 0, 'Fremont, CA'],
    ['model-s', 'new', 'Plaid', 'Stealth Grey', 89990, 0, 'Fremont, CA'],
    ['model-x', 'new', 'All-Wheel Drive', 'Pearl White', 79990, 0, 'Austin, TX'],
    ['model-3', 'used', 'Rear-Wheel Drive', 'Deep Blue', 29900, 18400, 'Chicago, IL'],
    ['model-y', 'used', 'Long Range AWD', 'Pearl White', 34500, 26100, 'Denver, CO'],
    ['model-s', 'used', 'All-Wheel Drive', 'Solid Black', 52900, 31800, 'Seattle, WA'],
    ['model-x', 'used', 'All-Wheel Drive', 'Stealth Grey', 58900, 24300, 'Miami, FL'],
  ];
  const name = (id) => MODELS.find((m) => m.id === id).name;
  return {
    path,
    html: page({
      path,
      title: 'Inventory: new and used cars in stock',
      description: 'New and used Model S, 3, X and Y ready for delivery. Filter by condition and model.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Inventory', title: 'Cars ready for delivery', lead: 'New cars ship within weeks; used cars are inspected and keep the remaining warranty. Stock shown is demo data.' })}
${section(`
  <div class="chips" role="group" aria-label="Filter cars">
    <button class="chip" type="button" data-xfx-filter-btn="*" aria-pressed="true">All</button>
    <button class="chip" type="button" data-xfx-filter-btn="new" aria-pressed="false">New</button>
    <button class="chip" type="button" data-xfx-filter-btn="used" aria-pressed="false">Used</button>
    ${['model-s', 'model-3', 'model-x', 'model-y'].map((id) => `<button class="chip" type="button" data-xfx-filter-btn="${id}" aria-pressed="false">${name(id)}</button>`).join('')}
  </div>
  <span id="used" style="position:relative;top:calc(-1 * var(--bar))"></span>
  <ul class="grid grid--3 xfx-filter" data-xfx-filter>
    ${stock
      .map(
        ([id, cond, trim, paint, price, miles, place]) => `
    <li class="card card--line" data-tags="${cond} ${id}">
      <div class="card-photo">${img(photo[id], { alt: `${name(id)} ${trim}`, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' })}</div>
      <span class="card-meta">${cond === 'new' ? 'New' : 'Used'} · ${place}</span>
      <h2 class="h3">${name(id)} ${trim}</h2>
      <dl class="kv">
        <div><dt>Paint</dt><dd>${paint}</dd></div>
        <div><dt>Mileage</dt><dd>${miles ? `${miles.toLocaleString('en-US')} mi` : 'Delivery miles'}</dd></div>
        <div><dt>Price</dt><dd>${fmt(price)}</dd></div>
      </dl>
      <a href="${B}discover/demo-drive/" class="btn btn-ghost" style="margin-top:8px">Ask about this car</a>
    </li>`,
      )
      .join('')}
  </ul>`)}`,
    }),
  };
}

function tradeIn() {
  const path = 'vehicles/trade-in/';
  const crumbs = [{ label: 'Vehicles', href: 'vehicles/' }, { label: 'Trade-in' }];
  return {
    path,
    html: page({
      path,
      title: 'Trade-in: an estimate for your current car',
      description: 'Get an estimate for your current car and put it towards a new Tesla. Make, year, mileage and condition are all it takes.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Trade-in', title: 'Put your current car towards the next one', lead: 'Four answers give you an estimate. A final offer follows an inspection on the day you collect your Tesla.', image: 'tesla-long-term-value', alt: 'Two red Teslas on a mountain road', actions: [{ label: 'Start the estimate', href: 'vehicles/trade-in/#estimate', style: 'btn-light' }] })}
${section(`
  ${headRow({ eyebrow: 'Estimate', title: 'What is your car worth?', lead: 'A quick estimate based on age, mileage and condition. For illustration only.' })}
  <div class="calc" data-tradein>
    <form class="panel form" novalidate>
      <div class="form-row form-row--2">
        <div class="field"><label for="ti-type">Body type</label><select id="ti-type" name="type"><option value="34000">Compact car</option><option value="42000" selected>Sedan</option><option value="48000">SUV</option><option value="52000">Pickup</option><option value="70000">Premium sedan</option></select></div>
        <div class="field"><label for="ti-year">Year</label><select id="ti-year" name="year">${Array.from({ length: 12 }, (_, i) => 2025 - i).map((y) => `<option${y === 2020 ? ' selected' : ''}>${y}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label for="ti-miles">Mileage</label><input id="ti-miles" type="range" min="0" max="150000" step="5000" value="45000" name="miles"><output class="range-out" data-out="miles">45,000 mi</output></div>
      <fieldset class="field"><legend class="label">Condition</legend><div class="choice-group" style="margin-top:8px">${['Excellent', 'Good', 'Fair'].map((c, i) => `<label class="choice"><input type="radio" name="cond" value="${[1, 0.9, 0.78][i]}"${i === 1 ? ' checked' : ''}><span>${c}</span></label>`).join('')}</div></fieldset>
    </form>
    <div class="panel" aria-live="polite">
      <p class="eyebrow">Estimated trade-in value</p>
      <p class="result-big" data-out="value">–</p>
      <p class="note">A range from typical market prices. The final offer depends on an inspection and local demand.</p>
      <div class="actions"><a href="${B}vehicles/inventory/" class="btn btn-dark">Choose your next car</a></div>
    </div>
  </div>`, { id: 'estimate', tone: 'soft' })}
${section(`${headRow({ eyebrow: 'How it works', title: 'Three steps, one visit' })}${cards([
        { title: 'Get an estimate', text: 'Answer four questions above. It takes two minutes.' },
        { title: 'Bring the car', text: 'We inspect it when you collect your Tesla, usually in under thirty minutes.' },
        { title: 'Drive away', text: 'The value comes off the price on the spot, and we deal with the paperwork.' },
      ])}`)}`,
    }),
  };
}

function fleet() {
  const path = 'vehicles/fleet/';
  const crumbs = [{ label: 'Vehicles', href: 'vehicles/' }, { label: 'Fleet' }];
  return {
    path,
    html: page({
      path,
      title: 'Fleet: electric cars for companies',
      description: 'Tesla for company fleets: lower running costs, remote fleet management and charging at the depot and on the road.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Fleet', title: 'Company cars that cost less to run', lead: 'Fewer service visits, cheaper energy per mile and software that tells you where every car is and how it is charged.', image: 'tesla-software-update', alt: 'Two Teslas on a dark blue background', actions: [{ label: 'Talk to the fleet team', href: 'vehicles/fleet/#contact', style: 'btn-light' }] })}
${section(`${headRow({ eyebrow: 'For fleets', title: 'What changes when the fleet goes electric', lead: 'The cars are the same ones private buyers choose; the difference is how they are managed.' })}${cards([
        { title: 'Lower cost per mile', text: 'Electricity costs less than fuel per mile, and there are no oil changes or timing belts.' },
        { title: 'Fleet API and dashboard', text: 'Location, charge level and service needs for every car in one place.' },
        { title: 'Depot charging', text: 'Wall Connectors sized to the number of cars and the hours they are parked.' },
        { title: 'Driver profiles', text: 'Seats, mirrors and routes follow each driver from car to car.' },
      ], { cols: 4 })}`, { tone: 'soft' })}
${section(`
  <div class="split" style="align-items:start">
    <div>${headRow({ eyebrow: 'Contact', title: 'Tell us about your fleet', lead: 'A short note is enough. We reply within two working days.' }).replace('class="head-row"', 'class="head-row" style="margin-bottom:0"')}</div>
    <form class="panel form" data-demo-form novalidate>
      <div class="form-row form-row--2">
        <div class="field"><label for="fl-company">Company</label><input id="fl-company" name="company" required autocomplete="organization"></div>
        <div class="field"><label for="fl-size">Fleet size</label><select id="fl-size" name="size" required><option value="">Choose one</option><option>Under 10 cars</option><option>10–50 cars</option><option>50–250 cars</option><option>More than 250</option></select></div>
      </div>
      <div class="form-row form-row--2">
        <div class="field"><label for="fl-name">Your name</label><input id="fl-name" name="name" required autocomplete="name"></div>
        <div class="field"><label for="fl-email">Work email</label><input id="fl-email" name="email" type="email" required autocomplete="email"></div>
      </div>
      <button class="btn btn-dark" type="submit">Send</button>
      <p class="field-hint">A demo form: nothing you enter is sent or stored.</p>
    </form>
  </div>`, { id: 'contact' })}`,
    }),
  };
}

export const vehiclePages = () => [lineup(), ...MODELS.map(modelPage), compare(), inventory(), tradeIn(), fleet()];
