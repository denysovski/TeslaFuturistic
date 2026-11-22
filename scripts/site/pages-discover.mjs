import { B, cards, ctaBand, faq, headRow, heroImage, heroText, icon, img, kv, miniCards, page, section, split } from './blocks.mjs';

const OFFICIAL = {
  findus: 'https://www.tesla.com/findus',
  careers: 'https://www.tesla.com/careers',
  linkedin: 'https://www.linkedin.com/company/tesla-motors/jobs/',
  ir: 'https://ir.tesla.com/',
  youtube: 'https://www.youtube.com/@tesla',
};
const trail = (label) => [{ label: 'Discover', href: 'discover/' }, { label }];

function hub() {
  const path = 'discover/';
  const crumbs = [{ label: 'Discover' }];
  const card = ({ href, title, text, tone = 'photo', image, alt, size = '', tag }) => `
    <li class="hub-card hub-card--${tone}${size ? ` hub-card--${size}` : ''} reveal reveal-up">
      <a href="${B}${href}">
        ${tone === 'photo' ? `<span class="hub-card-media">${img(image, { alt, sizes: size === 'wide' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw' })}</span>` : ''}
        ${tag ? `<span class="hub-tag">${tag}</span>` : ''}
        <span class="hub-card-body"><span class="hub-card-title">${title}</span><span class="hub-card-text">${text}</span></span>
        <span class="card-arrow" aria-hidden="true">${icon('solar:arrow-right-up-linear', 20)}</span>
      </a>
    </li>`;
  const groups = [
    ['Resources', 'Before and after you buy', [
      { href: 'discover/demo-drive/', title: 'Demo Drive', text: 'Thirty minutes behind the wheel, with someone to answer questions.', image: 'tesla-model-s', alt: 'Model S in red on a forest road', size: 'wide', tag: 'Most booked' },
      { href: 'discover/insurance/', title: 'Insurance', text: 'Cover priced on how the car is driven, with an estimate in a minute.', tone: 'red' },
      { href: 'discover/video-guides/', title: 'Video Guides', text: 'Short films on charging, the app and Autopilot.', image: 'tesla-in-car-gaming', alt: 'A game on the rear display' },
      { href: 'discover/customer-stories/', title: 'Customer Stories', text: 'What ownership costs and changes, in four driving profiles.', tone: 'dark' },
      { href: 'discover/events/', title: 'Events', text: 'Test drive days, owner meet-ups and delivery evenings.', image: 'tesla-long-term-value', alt: 'Two red Teslas on a mountain road', size: 'wide' },
      { href: 'savings/', title: 'Compare savings', text: 'Five years of fuel against electricity, for your driving.', tone: 'red' },
    ]],
    ['Location services', 'Find the right place', [
      { href: 'discover/find-us/', title: 'Find Us', text: 'Stores, service centres and Superchargers near you.', image: 'tesla-model-x', alt: 'Model X with falcon-wing doors open by a lake', size: 'wide' },
      { href: 'discover/trip-planner/', title: 'Trip Planner', text: 'Stops, charging time and cost for any road trip.', tone: 'dark' },
      { href: 'discover/collision-centers/', title: 'Find a Collision Center', text: 'Repairs to factory standard, with sensors checked.', tone: 'red' },
      { href: 'discover/certified-installers/', title: 'Find a Certified Installer', text: 'Wall Connector, solar and Powerwall, fitted properly.', image: 'tesla-home-energy-storage', alt: 'Solar panels on a roof', size: 'wide' },
      { href: 'charging/', title: 'Charging', text: 'Home charging and Supercharging, explained.', image: 'future-tesla-sentry-mode', alt: 'A hand plugging in a charge cable' },
      { href: 'energy/', title: 'Energy', text: 'Solar, Powerwall and Megapack in one system.', tone: 'dark' },
    ]],
    ['Company', 'The people and the story', [
      { href: 'discover/about/', title: 'About', text: 'From a two-seat Roadster to cars, batteries and AI.', image: 'tesla-roadster-studio', alt: 'A white Roadster in a dark studio', size: 'wide' },
      { href: 'discover/careers/', title: 'Careers', text: 'Twenty open roles across six teams.', tone: 'red' },
      { href: 'discover/investor-relations/', title: 'Investor Relations', text: 'Where the reports, letters and calls are published.', image: 'tesla-megapack', alt: 'A row of Megapack units' },
      { href: 'updates/', title: 'Latest updates', text: 'Software, milestones, energy and events.', tone: 'dark', size: 'wide' },
      { href: 'shop/', title: 'Shop', text: 'Caps, hoodies, charging gear and accessories. Buy two, save 10%.', image: 'tesla-software-update', alt: 'Two Teslas on a dark blue background', size: 'wide' },
    ]],
  ];
  return {
    path,
    html: page({
      path,
      title: 'Discover: resources, locations and company',
      description: 'Everything beyond the cars: demo drives, insurance, video guides, events, location finders, trip planning and company information.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Discover', title: 'Everything around the car', lead: 'Help before you buy, while you own it and when you want to know more about the company.', image: 'tesla-software-update', alt: 'Two Teslas on a dark blue background', pos: '50% 50%', actions: [{ label: 'Book a demo drive', href: 'discover/demo-drive/', style: 'btn-light' }] })}
${groups
  .map(
    ([eyebrow, title, items], i) => section(`${headRow({ eyebrow, title })}<ul class="hub-grid">${items.map(card).join('')}</ul>`, { tone: i === 1 ? 'soft' : '' }),
  )
  .join('')}`,
    }),
  };
}

function demoDrive() {
  const path = 'discover/demo-drive/';
  const crumbs = trail('Demo Drive');
  return {
    path,
    html: page({
      path,
      title: 'Book a demo drive',
      description: 'Book a thirty-minute demo drive in Model S, 3, X, Y or Cybertruck. Choose the car, the day and the nearest location.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Demo Drive', title: 'Thirty minutes that answer most questions', lead: 'Drive the route you know, try Autopilot on the motorway and ask about charging at home. No pressure to buy.', image: 'tesla-model-s', alt: 'Model S in red on a winding road through a forest', pos: '55% 60%', actions: [{ label: 'Choose a time', href: 'discover/demo-drive/#book', style: 'btn-light' }] })}
${section(`
  <div class="split" style="align-items:start">
    <div>
      ${headRow({ eyebrow: 'Book', title: 'Pick a car and a time', lead: 'Every field is needed so we can confirm the right car at the right place.' }).replace('class="head-row"', 'class="head-row" style="margin-bottom:24px"')}
      ${kv([['Length', 'About 30 minutes'], ['What to bring', 'A valid driving licence'], ['Cost', 'Free']])}
    </div>
    <form class="panel form" data-demo-form novalidate>
      <fieldset class="field"><legend class="label">Car</legend><div class="choice-group" style="margin-top:8px">
        ${['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'].map((m, i) => `<label class="choice"><input type="radio" name="model" value="${m}"${i === 1 ? ' checked' : ''}><span>${m}</span></label>`).join('')}
      </div></fieldset>
      <fieldset class="field"><legend class="label">Day</legend><div class="choice-group" style="margin-top:8px" data-days></div></fieldset>
      <div class="field"><label for="dd-time">Time</label><select id="dd-time" name="time" required><option value="">Choose a time</option>${['9:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00'].map((t) => `<option>${t}</option>`).join('')}</select></div>
      <div class="field"><label for="dd-loc">Location</label><select id="dd-loc" name="location" required><option value="">Choose a location</option>${['Austin, TX', 'Chicago, IL', 'Denver, CO', 'Fremont, CA', 'Los Angeles, CA', 'Miami, FL', 'New York, NY', 'Seattle, WA'].map((t) => `<option>${t}</option>`).join('')}</select></div>
      <div class="form-row form-row--2">
        <div class="field"><label for="dd-first">First name</label><input id="dd-first" name="first" required autocomplete="given-name"></div>
        <div class="field"><label for="dd-last">Last name</label><input id="dd-last" name="last" required autocomplete="family-name"></div>
      </div>
      <div class="form-row form-row--2">
        <div class="field"><label for="dd-email">Email</label><input id="dd-email" name="email" type="email" required autocomplete="email"></div>
        <div class="field"><label for="dd-phone">Phone</label><input id="dd-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel"></div>
      </div>
      <label class="check"><input type="checkbox" name="consent" required> I agree to be contacted about this demo drive.</label>
      <button class="btn btn-dark" type="submit">Book the drive</button>
      <p class="field-hint">A demo form for this concept: nothing you enter is sent or stored.</p>
    </form>
  </div>`, { id: 'book', tone: 'soft' })}`,
    }),
  };
}

function insurance() {
  const path = 'discover/insurance/';
  const crumbs = trail('Insurance');
  return {
    path,
    html: page({
      path,
      title: 'Insurance: cover built around the car',
      description: 'How insuring a Tesla works, what is covered and an instant estimate based on the car, your age and how far you drive.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Insurance', title: 'Cover priced on how the car is driven', lead: 'Safe driving lowers the premium month by month, and claims start in the app.', image: 'tesla-model-3', alt: 'Model 3 in white driving through dry hills', pos: '50% 60%', actions: [{ label: 'Get an estimate', href: 'discover/insurance/#estimate', style: 'btn-light' }] })}
${section(`${headRow({ eyebrow: 'What is covered', title: 'The cover most drivers choose' })}${cards([
        { title: 'Collision and comprehensive', text: 'Repairs after an accident, theft, fire, storms and glass, at approved body shops.' },
        { title: 'Liability', text: 'Damage and injury to others, at the limits your state requires or higher.' },
        { title: 'Wall Connector and cables', text: 'Charging equipment at home is included in the comprehensive cover.' },
        { title: 'Roadside assistance', text: 'Towing to the nearest service centre and help with flat tyres.' },
      ], { cols: 4 })}`)}
${section(`
  ${headRow({ eyebrow: 'Estimate', title: 'A monthly estimate in a minute', lead: 'Illustrative only. A real quote depends on your driving record and where you live.' })}
  <div class="calc" data-insurance>
    <form class="panel form" novalidate>
      <fieldset class="field"><legend class="label">Car</legend><div class="choice-group" style="margin-top:8px">${[['Model 3', 128], ['Model Y', 136], ['Model S', 172], ['Model X', 181], ['Cybertruck', 165]].map(([m, v], i) => `<label class="choice"><input type="radio" name="car" value="${v}"${i === 0 ? ' checked' : ''}><span>${m}</span></label>`).join('')}</div></fieldset>
      <div class="field"><label for="in-age">Driver age</label><select id="in-age" name="age"><option value="1.45">18–24</option><option value="1.1">25–34</option><option value="1" selected>35–54</option><option value="1.05">55 and over</option></select></div>
      <div class="field"><label for="in-miles">Miles per year</label><input id="in-miles" name="miles" type="range" min="3000" max="25000" step="1000" value="11000"><output class="range-out" data-out="miles">11,000 mi</output></div>
      <div class="field"><label for="in-score">Safety Score (0–100)</label><input id="in-score" name="score" type="range" min="60" max="100" step="1" value="90"><output class="range-out" data-out="score">90</output></div>
    </form>
    <div class="panel" aria-live="polite">
      <p class="eyebrow">Estimated monthly premium</p>
      <p class="result-big" data-out="premium">–</p>
      <p class="lead" style="margin-top:8px" data-out="year">–</p>
      <p class="note">Every point of Safety Score above 80 lowers the estimate a little. Your real Safety Score is measured by the car.</p>
    </div>
  </div>`, { id: 'estimate', tone: 'soft' })}`,
    }),
  };
}

function videoGuides() {
  const path = 'discover/video-guides/';
  const crumbs = trail('Video Guides');
  const vids = [
    ['Your first day with the car', 'Unlocking with the phone, setting up a driver profile and the controls you use most.', '4:12', 'tesla-phone-key', 'A phone on the centre console of a Tesla', 'Getting started'],
    ['Charging at home', 'Plugging in, scheduling off-peak charging and choosing a charge limit.', '3:05', 'future-tesla-sentry-mode', 'A hand plugging a charge cable into a Tesla', 'Charging'],
    ['Planning a road trip', 'How the navigation picks Supercharger stops and preconditions the battery.', '5:40', 'tesla-trip-planner', 'Route with charging stops on the centre screen', 'Charging'],
    ['Autopilot, step by step', 'Turning it on, keeping hands on the wheel and what it can and cannot do.', '6:18', 'tesla-model-s', 'Model S on a winding road', 'Driving'],
    ['Sentry Mode and Dog Mode', 'Watching the car while it is parked and keeping pets comfortable inside.', '3:47', 'future-tesla-phone-key', 'A dog in a Tesla with Dog Mode on the screen', 'Features'],
    ['Games and media in the car', 'Streaming, the rear screen and connecting a controller.', '2:58', 'tesla-in-car-gaming', 'A game on the rear display', 'Features'],
  ];
  return {
    path,
    html: page({
      path,
      title: 'Video guides: learn the car in minutes',
      description: 'Short video guides: your first day, charging at home, road trips, Autopilot, Sentry Mode and games.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Video Guides', title: 'Learn the car in a few minutes', lead: 'Short films on the things owners ask about most. They open on Tesla’s official channel.' })}
${section(`
  <ul class="grid grid--3">
    ${vids
      .map(
        ([t, d, time, image, alt, cat]) => `
    <li class="reveal reveal-up">
      <a href="${OFFICIAL.youtube}" rel="noopener" class="card card--line" style="padding:16px 16px 24px">
        <div class="vtile">${img(image, { alt, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' })}<span class="vtile-play">${icon('ph:play-circle-light', 34)}</span><span class="vtile-time">${time}</span></div>
        <span class="card-meta" style="margin-top:8px">${cat}</span>
        <h2 class="h3">${t}</h2>
        <p>${d}</p>
        <span class="card-link">${icon('logos:youtube-icon', 20)} Watch on YouTube ${icon('solar:arrow-right-linear', 16)}</span>
      </a>
    </li>`,
      )
      .join('')}
  </ul>`)}`,
    }),
  };
}

function stories() {
  const path = 'discover/customer-stories/';
  const crumbs = trail('Customer Stories');
  const profiles = [
    ['The daily commuter', 'Model 3', '48 miles a day, charging overnight in a driveway.', [['Energy per month', '$62'], ['Fuel it replaced', '$214'], ['Service visits a year', 'None needed']], 'tesla-model-3', 'Model 3 on a road through hills'],
    ['The family with two kids', 'Model Y', 'School runs, weekend sports and one long holiday drive a year.', [['Energy per month', '$71'], ['Supercharger stops per holiday', 'Three, about 20 minutes each'], ['Cargo used most', 'Front trunk for the buggy']], 'tesla-model-y', 'Model Y parked by an outdoor gathering'],
    ['The long-distance driver', 'Model S', 'Client visits across three states, about 30,000 miles a year.', [['Energy per month', '$188'], ['Typical stop', '15 minutes, 200 miles added'], ['Time saved at fuel stations', 'About 40 hours a year']], 'tesla-long-term-value', 'Two red Teslas on a mountain road'],
    ['The home with solar', 'Model X + Powerwall', 'Rooftop solar and a home battery cover most of the charging.', [['Grid electricity for the car', 'Under $15 a month'], ['Backup during outages', 'Whole home, automatic'], ['Seats used most', 'All seven, on Sundays']], 'home-solar-garage', 'A house with solar and a Tesla in the garage'],
  ];
  return {
    path,
    html: page({
      path,
      title: 'Customer stories: what ownership looks like',
      description: 'Four everyday driving profiles: what charging costs, how long trips go and what changes when the car is electric.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Customer Stories', title: 'What ownership looks like day to day', lead: 'Four illustrative driving profiles built from typical mileage and energy prices. They are examples, not real customers, and the figures are estimates.' })}
${section(`
  <div class="grid grid--2">
    ${profiles
      .map(
        ([t, model, d, facts, image, alt]) => `
    <article class="card card--line reveal reveal-up">
      <div class="card-photo">${img(image, { alt, sizes: '(min-width: 640px) 50vw, 100vw' })}</div>
      <span class="card-meta">${model}</span>
      <h2 class="h3">${t}</h2>
      <p>${d}</p>
      ${kv(facts)}
    </article>`,
      )
      .join('')}
  </div>`)}
${section(ctaBand({ title: 'Run the numbers for your own driving', text: 'Your mileage, your fuel price, your electricity rate.', actions: [{ label: 'Compare savings', href: 'savings/', style: 'btn-light' }] }))}`,
    }),
  };
}

function events() {
  const path = 'discover/events/';
  const crumbs = trail('Events');
  const list = [
    ['drive', 'Test drive weekend', '2026-12-05', 'Austin, TX', 'Drive every model back to back on a planned route.'],
    ['owners', 'Owners’ winter meet-up', '2026-12-12', 'Denver, CO', 'Cold-weather charging tips, a short talk and coffee.'],
    ['delivery', 'Year-end delivery evening', '2026-12-18', 'Fremont, CA', 'Collect your car with a walkthrough of every setting.'],
    ['drive', 'Cybertruck experience', '2027-01-16', 'Los Angeles, CA', 'Off-road course and towing demonstrations.'],
    ['owners', 'Solar and Powerwall evening', '2027-01-22', 'Seattle, WA', 'Owners share how their home systems perform in winter.'],
    ['drive', 'Model Y family day', '2027-02-06', 'Chicago, IL', 'Car seats, cargo and a quiet test route.'],
  ];
  const names = { drive: 'Test drives', owners: 'Owner events', delivery: 'Deliveries' };
  const date = (d) => new Date(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  return {
    path,
    html: page({
      path,
      title: 'Events: test drives, owner meet-ups and deliveries',
      description: 'Upcoming test drive days, owner meet-ups and delivery events, filtered by type.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Events', title: 'Come and see it in person', lead: 'Test drive days, owner meet-ups and delivery evenings. A sample schedule for this concept.' })}
${section(`
  <div class="chips" role="group" aria-label="Filter events">
    <button class="chip" type="button" data-xfx-filter-btn="*" aria-pressed="true">All</button>
    ${Object.entries(names).map(([k, v]) => `<button class="chip" type="button" data-xfx-filter-btn="${k}" aria-pressed="false">${v}</button>`).join('')}
  </div>
  <ul class="rows rows--cards xfx-filter" data-xfx-filter>
    ${list
      .map(
        ([type, t, d, place, text]) => `
    <li class="row" data-tags="${type}">
      <div><h2 class="h3" style="font-size:19px">${t}</h2><p>${text}</p></div>
      <div class="row-meta"><span><time datetime="${d}">${date(d)}</time></span><span>${place}</span><span>${names[type]}</span></div>
      <a href="${B}discover/demo-drive/" class="btn btn-ghost">Reserve a place</a>
    </li>`,
      )
      .join('')}
  </ul>`)}`,
    }),
  };
}

function finder({ id, label, title, lead, image, alt, types, steps, cta }) {
  const path = `discover/${id}/`;
  const crumbs = trail(label);
  return {
    path,
    html: page({
      path,
      title,
      description: lead,
      crumbs,
      body: `${image ? heroImage({ crumbs, eyebrow: label, title, lead, image, alt, actions: [{ label: cta, href: OFFICIAL.findus, ext: true, style: 'btn-light' }] }) : heroText({ crumbs, eyebrow: label, title, lead, actions: [{ label: cta, href: OFFICIAL.findus, ext: true }] })}
${section(`${headRow({ eyebrow: 'What you will find', title: 'Places, and what each one is for' })}${cards(types.map(([t, d]) => ({ title: t, text: d })), { cols: types.length === 4 ? 4 : 3 })}`, { tone: 'soft' })}
${section(`
  <div class="split" style="align-items:start">
    <div>${headRow({ eyebrow: 'How it works', title: steps.title }).replace('class="head-row"', 'class="head-row" style="margin-bottom:0"')}</div>
    ${miniCards(steps.items.map(([t, d], i) => [['First', 'Then', 'Finally', 'Last'][i] || 'Then', t, d]), { tone: 'dark' }).replace('style="--cols:3"', 'style="--cols:1"')}
  </div>`)}
${section(ctaBand({ title: 'Search the official map', text: 'Opening hours, directions and live Supercharger availability are kept on tesla.com.', actions: [{ label: cta, href: OFFICIAL.findus, ext: true, style: 'btn-light' }] }))}`,
    }),
  };
}

function tripPlanner() {
  const path = 'discover/trip-planner/';
  const crumbs = trail('Trip Planner');
  return {
    path,
    html: page({
      path,
      title: 'Trip planner: stops, charging time and cost',
      description: 'Estimate a road trip in a Tesla: how many Supercharger stops, how long they take and what the energy costs.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Trip Planner', title: 'How long is the trip, really?', lead: 'Set the distance and the car. The estimate counts the Supercharger stops, the minutes spent at them and the energy cost.', image: 'tesla-long-term-value', alt: 'Two red Teslas on a mountain road', pos: '50% 55%', actions: [{ label: 'Plan a trip', href: 'discover/trip-planner/#plan', style: 'btn-light' }] })}
${section(`
  <div class="calc" data-trip>
    <form class="panel form" novalidate>
      <div class="field"><label for="tp-dist">Trip distance</label><input id="tp-dist" name="dist" type="range" min="50" max="1500" step="1" value="520"><output class="range-out" data-out="dist">520 mi</output></div>
      <fieldset class="field"><legend class="label">Car</legend><div class="choice-group" style="margin-top:8px">${[['Model 3', 363], ['Model Y', 311], ['Model S', 402], ['Model X', 335], ['Cybertruck', 325]].map(([m, r], i) => `<label class="choice"><input type="radio" name="range" value="${r}"${i === 0 ? ' checked' : ''}><span>${m}</span></label>`).join('')}</div></fieldset>
      <div class="field"><label for="tp-start">Charge at departure</label><input id="tp-start" name="start" type="range" min="20" max="100" step="1" value="90"><output class="range-out" data-out="start">90%</output></div>
      <fieldset class="field"><legend class="label">Conditions</legend><div class="choice-group" style="margin-top:8px">${[['Mild', 1], ['Cold', 0.8], ['Motorway at 80 mph', 0.85]].map(([m, f], i) => `<label class="choice"><input type="radio" name="cond" value="${f}"${i === 0 ? ' checked' : ''}><span>${m}</span></label>`).join('')}</div></fieldset>
    </form>
    <div class="panel" aria-live="polite">
      <p class="eyebrow">Estimate</p>
      <p class="result-big" data-out="stops">–</p>
      <dl class="kv" style="margin-top:24px">
        <div><dt>Time charging</dt><dd data-out="time">–</dd></div>
        <div><dt>Energy cost at Superchargers</dt><dd data-out="cost">–</dd></div>
        <div><dt>Arrival charge</dt><dd>About 15%</dd></div>
      </dl>
      <p class="note">Assumes charging from 10% to 80% at each stop (about 25 minutes) and $0.45 per kWh. The car’s own planner uses live traffic, elevation and weather.</p>
    </div>
  </div>`, { id: 'plan', tone: 'soft' })}
${section(`
  <div class="split">
    <div>
      <span class="eyebrow">In the car</span>
      <h2 class="h2">The navigation does this for you</h2>
      <div class="prose" style="margin-top:20px">
        <p>Type a destination and the car adds the charging stops, shows how long each one takes and warms the battery on the way so it charges at full speed.</p>
        <p>It also watches how busy each Supercharger is and changes the plan if a better stop opens up.</p>
      </div>
    </div>
    <figure class="screen-frame">${img('tesla-trip-planner', { alt: 'The centre screen showing a route with charging stops', sizes: '(min-width: 900px) 560px, 100vw' })}</figure>
  </div>`)}`,
    }),
  };
}

function collision() {
  const path = 'discover/collision-centers/';
  const crumbs = trail('Find a Collision Center');
  return {
    path,
    html: page({
      path,
      title: 'Find a Collision Center: repairs to factory standard',
      description: 'How collision repairs work: approved body shops, genuine parts, sensor calibration and claims in the app, with answers to the questions people ask after an accident.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Find a Collision Center', title: 'Repairs done to factory standard', lead: 'Approved body shops use the right tools, parts and procedures, so the structure, the cameras and the sensors work exactly as they did before.', image: 'tesla-vision-camera-network', alt: 'A Tesla camera above the rear lettering', pos: '50% 45%', actions: [{ label: 'Find an approved body shop', href: OFFICIAL.findus, ext: true, style: 'btn-light' }] })}
${section(`${headRow({ eyebrow: 'Why it matters', title: 'What an approved shop does differently', lead: 'A Tesla is mostly aluminium and high-strength steel, wrapped around cameras that steer and brake. A repair has to respect all three.' })}
${miniCards([
  ['Certified', 'Approved body shops', 'Trained and audited for aluminium and high-strength steel repairs.'],
  ['Genuine', 'Original parts only', 'Parts that fit first time and keep the crash structure as designed.'],
  ['Calibrated', 'Cameras and sensors checked', 'Every camera is recalibrated before the car is handed back.'],
  ['In the app', 'Claims start on your phone', 'Photos, a short description and the claim is open in minutes.'],
  ['Tracked', 'Follow the repair', 'Status updates in the app, from parts ordered to ready for collection.'],
  ['Mobile', 'Small damage at home', 'Scratches and light dents can often be fixed by a mobile technician.'],
])}`, { tone: 'soft' })}
${section(`
  <div class="split" style="align-items:start">
    <div>
      ${headRow({ eyebrow: 'After an accident', title: 'Questions people ask first', lead: 'Open a question to see the answer.' }).replace('class="head-row"', 'class="head-row" style="margin-bottom:24px"')}
      <dl class="stat-mini">
        <div><dt>Report a claim</dt><dd>Minutes</dd></div>
        <div><dt>Typical repair</dt><dd>1–3 weeks</dd></div>
        <div><dt>Sensor check</dt><dd>Every repair</dd></div>
      </dl>
    </div>
    ${faq([
      ['What should I do first after an accident?', 'Make sure everyone is safe and call emergency services if anyone is hurt. Turn on the hazard lights, take photos of the damage and the scene, and swap details with the other driver.'],
      ['How do I report the damage?', 'Open the Tesla app, choose Roadside or Service, then Collision. Add photos and a short description; the claim and the repair request start together.'],
      ['Can I choose my own body shop?', 'Yes. Pick an approved shop near you from the official map, or let your insurer suggest one. An approved shop keeps the repair to factory standard.'],
      ['How long does a repair take?', 'Small repairs take a few days. Structural work usually takes one to three weeks, depending on parts and how busy the shop is.'],
      ['Will Autopilot and the cameras still work afterwards?', 'Yes. Approved shops recalibrate the cameras and check the sensors before the car leaves, and the car runs its own check on the first drive.'],
      ['Can I drive the car if it was only lightly damaged?', 'If no warning lights are on and the lights, mirrors and doors work, it is usually safe to drive to the shop. If in doubt, book roadside assistance in the app.'],
    ])}
  </div>`)}
${section(ctaBand({ title: 'Search the official map', text: 'Approved body shops, opening hours and directions are kept on tesla.com.', actions: [{ label: 'Find an approved body shop', href: OFFICIAL.findus, ext: true, style: 'btn-light' }] }))}`,
    }),
  };
}

function installers() {
  const path = 'discover/certified-installers/';
  const crumbs = trail('Find a Certified Installer');
  const products = [
    ['Wall Connector', 'Home charging on a dedicated circuit, with Wi-Fi updates and power sharing for two cars.', 'home-solar-garage', 'A Tesla charging in the garage of a house with solar', [['Typical time', 'Half a day'], ['Includes', 'Circuit, mounting, setup in the app']]],
    ['Solar Panels', 'Roof survey, panel layout, permits and connection to the grid, handled by one installer.', 'tesla-home-energy-storage', 'Black solar panels on a shingle roof', [['Typical time', '1–2 days on the roof'], ['Includes', 'Design, permits, inspection']]],
    ['Powerwall', 'Battery placement, backup wiring and the settings that decide when it charges and when it powers the home.', 'tesla-home-energy-ecosystem', 'Aerial view of a house with solar and a Tesla in the driveway', [['Typical time', 'One day'], ['Includes', 'Backup gateway, app setup']]],
  ];
  return {
    path,
    html: page({
      path,
      title: 'Find a Certified Installer for Wall Connector, solar and Powerwall',
      description: 'What certified installers fit, what each job involves, how long it takes, what to prepare and how to choose the right installer.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Find a Certified Installer', title: 'The right electrician for the job', lead: 'Certified installers fit Wall Connectors, solar and Powerwall to the standard Tesla uses, and deal with the paperwork for you.', image: 'tesla-home-energy-storage', alt: 'Black solar panels on a shingle roof', actions: [{ label: 'Find a certified installer', href: OFFICIAL.findus, ext: true, style: 'btn-light' }] })}
${section(`${headRow({ eyebrow: 'What they install', title: 'Three jobs, done properly' })}
  <ul class="grid grid--3">
    ${products
      .map(
        ([title, text, image, alt, facts]) => `
    <li class="install-card reveal reveal-up">
      <div class="card-photo">${img(image, { alt, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' })}</div>
      <h3 class="h3">${title}</h3>
      <p>${text}</p>
      ${kv(facts)}
    </li>`,
      )
      .join('')}
  </ul>`)}
${section(`${headRow({ eyebrow: 'What to expect', title: 'From first call to switched on', lead: 'A solar and Powerwall project, start to finish. A Wall Connector skips straight to install day.' })}
${miniCards([
  ['First week', 'Site survey', 'An installer checks the roof, the electrical panel and where the cables can run.'],
  ['Week two', 'Design and quote', 'A panel layout, the battery position and a fixed price, before anything is ordered.'],
  ['Weeks two to six', 'Permits', 'The installer applies to the city and the utility; you sign, they chase.'],
  ['Install day', 'Fitting', 'Panels, battery and gateway go in, usually in one or two days.'],
  ['After', 'Inspection and switch-on', 'A final inspection, permission to operate, and the system appears in the app.'],
], { tone: 'dark' })}`, { tone: 'soft' })}
${section(`
  <div class="split">
    <div>
      <span class="eyebrow">Before the visit</span>
      <h2 class="h2">Five things to have ready</h2>
      <ul class="checklist">
        <li>A photo of your electrical panel with the door open</li>
        <li>Your last twelve months of electricity bills</li>
        <li>Where the car usually parks, and how far that is from the panel</li>
        <li>The age of the roof, if you are adding solar</li>
        <li>Any rules from a homeowners’ association</li>
      </ul>
    </div>
    <div class="split-media">${img('home-solar-garage', { alt: 'A modern house with solar on the roof and a Tesla in the garage', sizes: '(min-width: 900px) 50vw, 100vw' })}</div>
  </div>`)}
${section(`
  <div class="split" style="align-items:start">
    <div>${headRow({ eyebrow: 'Choosing an installer', title: 'Questions worth asking' }).replace('class="head-row"', 'class="head-row" style="margin-bottom:0"')}</div>
    ${faq([
      ['How do I know an installer is certified?', 'Certified installers are listed on Tesla’s official map and are trained on the current products. Ask to see the certification if you found them elsewhere.'],
      ['Do I need a site visit before a quote?', 'For solar and Powerwall, yes. For a Wall Connector, photos of the panel and the parking spot are often enough for a first quote.'],
      ['What should a quote include?', 'Equipment, labour, permits, any panel upgrade, trenching or long cable runs, and the app setup. A good quote lists each one.'],
      ['How long does a Wall Connector installation take?', 'Usually half a day, longer if the electrical panel needs an upgrade or the cable has to run a long way.'],
      ['Will I need a new electrical panel?', 'Not always. The installer checks the panel’s capacity at the survey; power sharing can avoid an upgrade when two cars charge.'],
    ])}
  </div>`, { tone: 'soft' })}
${section(ctaBand({ title: 'Find an installer near you', text: 'Certified installers, with their areas and contact details, are listed on Tesla’s official map.', actions: [{ label: 'Find a certified installer', href: OFFICIAL.findus, ext: true, style: 'btn-light' }] }))}`,
    }),
  };
}

function about() {
  const path = 'discover/about/';
  const crumbs = trail('About');
  // Deliveries per year, from Tesla's quarterly production and delivery reports (rounded).
  const deliveries = [['2018', 245], ['2019', 368], ['2020', 500], ['2021', 936], ['2022', 1314], ['2023', 1809], ['2024', 1789], ['2025', 1636]];
  const max = Math.max(...deliveries.map((d) => d[1]));
  const chapters = [
    ['2003 – 2008', 'A bet that electric could be better', ['Tesla Motors was founded in 2003 by two engineers, Martin Eberhard and Marc Tarpenning, on an idea most of the industry dismissed: that a car running on lithium-ion batteries could be faster and more desirable than a petrol one, not merely cleaner.', 'The first proof was the Roadster, delivered from 2008. A two-seat sports car on a Lotus chassis, it went around 245 miles on a charge, further than any electric car before it, and it made the point the company still repeats: build the car people want first.'], 'tesla-roadster-studio', 'A white Roadster in a dark studio'],
    ['2010 – 2013', 'Going public, building a car company', ['In 2010 Tesla bought the former NUMMI plant in Fremont, California, and went public at $17 a share, the first American carmaker to list since Ford. The money paid for the Model S.', 'Model S arrived in 2012 with long range, a large touchscreen and software that improved over the air. It was named Motor Trend Car of the Year for 2013, and suddenly an electric car was the one to beat.'], 'model-s-interior-cockpit', 'Model S cockpit with the yoke and centre display'],
    ['2014 – 2018', 'Batteries at scale, and the hard part', ['To make cars cheaper, Tesla needed batteries at a scale nobody had attempted. The first Gigafactory, in Nevada, was announced in 2014. Powerwall followed in 2015, Model X the same year, and the SolarCity acquisition in 2016 brought solar into the company.', 'Model 3 was unveiled in 2016 to hundreds of thousands of reservations. Building it was far harder: the ramp in 2017 and 2018 pushed the company close to the edge before production finally stabilised.'], 'tesla-home-energy-storage', 'Solar panels on a shingle roof'],
    ['2019 – 2021', 'From start-up to giant', ['Gigafactory Shanghai began building cars in 2019, less than a year after construction started. A run of profitable quarters followed, and in December 2020 Tesla joined the S&P 500.', 'In October 2021 its market value passed one trillion dollars, more than most of the world’s carmakers combined, and the company moved its headquarters to Austin, Texas.'], 'tesla-model-3', 'Model 3 in white driving through dry hills'],
    ['2022 – 2023', 'The peak of the car business', ['New factories opened near Berlin and in Austin in 2022. In 2023 Model Y became the best-selling vehicle of any kind in the world, and Tesla delivered about 1.81 million cars, its highest year so far.', 'Cybertruck went into production at the end of 2023, and other carmakers began adopting Tesla’s charging connector in North America.'], 'tesla-model-y', 'Model Y in white parked by an outdoor gathering'],
    ['2024 – 2026', 'Competition, energy and AI', ['Cheaper electric cars from China and an ageing line-up meant deliveries fell in 2024 and again in 2025, to about 1.64 million. The energy business went the other way: 46.7 GWh of storage was deployed in 2025, a record, and energy revenue grew by more than a quarter to $12.8 billion.', 'The company now describes itself as moving from hardware towards AI: supervised self-driving, a robotaxi service and the Optimus robot, alongside a new Megapack factory near Houston.'], 'tesla-megapack', 'A row of Megapack units in a field'],
  ];
  return {
    path,
    html: page({
      path,
      title: 'About: how Tesla was built',
      description: 'The Tesla story from a two-seat Roadster in 2008 to cars, batteries and AI: the IPO, Model S, the Model 3 ramp, the trillion-dollar year and where the business stands now.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'About', title: 'Twenty years of proving the doubters wrong, mostly', lead: 'How a small company that set out to make one electric sports car became a carmaker, a battery maker and an AI company, and what the numbers say today.', image: 'tesla-roadster-studio', alt: 'A white Roadster in a dark studio', pos: '50% 55%' })}
${section(`
  <dl class="stat-band">
    <div><dt>Cars delivered in 2025</dt><dd>1.64M</dd></div>
    <div><dt>Energy storage deployed in 2025</dt><dd>46.7 GWh</dd></div>
    <div><dt>Revenue in 2025</dt><dd>$94.8B</dd></div>
    <div><dt>Share price at the 2010 IPO</dt><dd>$17</dd></div>
  </dl>`, { tone: 'dark' })}
${section(chapters.map(([years, title, body, image, alt], i) => `<div class="chapter${i ? '' : ' chapter--first'}">${split({ eyebrow: years, title, body, image, alt, flip: i % 2 === 1 })}</div>`).join(''))}
${section(`
  ${headRow({ eyebrow: 'The market', title: 'Deliveries, year by year', lead: 'Growth of roughly forty percent a year until 2023, then two years of decline as competition caught up. Thousands of cars, from Tesla’s own reports.' })}
  <figure class="bars-chart reveal reveal-up">
    <ol aria-hidden="true">
      ${deliveries.map(([y, v]) => `<li style="--h:${(v / max).toFixed(3)}"><span class="bc-val">${v >= 1000 ? (v / 1000).toFixed(2).replace(/0$/, '') + 'M' : v + 'k'}</span><span class="bc-bar"></span><span class="bc-year">${y}</span></li>`).join('')}
    </ol>
    <table class="sr-only"><caption>Tesla vehicle deliveries by year, in thousands</caption><tbody>${deliveries.map(([y, v]) => `<tr><th scope="row">${y}</th><td>${v}</td></tr>`).join('')}</tbody></table>
    <figcaption class="note">Rounded to the nearest thousand.</figcaption>
  </figure>`, { tone: 'soft' })}
${section(ctaBand({ title: 'Work on what comes next', text: 'Twenty open roles across engineering, manufacturing, energy, AI, service and sales.', actions: [{ label: 'See careers', href: 'discover/careers/', style: 'btn-light' }] }))}`,
    }),
  };
}

function careers() {
  const path = 'discover/careers/';
  const crumbs = trail('Careers');
  const teams = [
    ['engineering', 'Vehicle engineering', 'Chassis, battery, drive units and the body, from first sketch to production.', 'tesla-electric-chassis', 'Close-up of a Tesla rear light'],
    ['manufacturing', 'Manufacturing', 'The lines, robots and people at the Gigafactories.', 'tesla-model-y', 'Model Y in white'],
    ['energy', 'Energy', 'Solar, Powerwall and Megapack, from design to installation.', 'tesla-megapack', 'Megapack units in a field'],
    ['ai', 'AI and software', 'Autopilot, the in-car software and the systems behind them.', 'tesla-vision-camera-network', 'A Tesla camera'],
    ['service', 'Service', 'Technicians in service centres and mobile vans.', 'model-s-interior-front-seats', 'Tesla front seats'],
    ['sales', 'Sales and delivery', 'Advisers who help people choose, drive and collect their car.', 'model-3-studio', 'Model 3 in a studio'],
  ];
  const jobs = [
    ['Battery Cell Engineer', 'engineering', 'Palo Alto, CA'], ['Body Structures Engineer', 'engineering', 'Fremont, CA'], ['Thermal Systems Engineer', 'engineering', 'Austin, TX'], ['Vehicle Dynamics Engineer', 'engineering', 'Berlin, Germany'],
    ['Production Supervisor', 'manufacturing', 'Austin, TX'], ['Robotics Technician', 'manufacturing', 'Fremont, CA'], ['Quality Engineer, Paint', 'manufacturing', 'Berlin, Germany'], ['Supplier Industrialization Engineer', 'manufacturing', 'Shanghai, China'],
    ['Megapack Commissioning Engineer', 'energy', 'Lathrop, CA'], ['Solar Installer', 'energy', 'Phoenix, AZ'], ['Powerwall Field Technician', 'energy', 'Sydney, Australia'],
    ['Machine Learning Engineer, Vision', 'ai', 'Palo Alto, CA'], ['Software Engineer, Infotainment', 'ai', 'Palo Alto, CA'], ['Embedded Firmware Engineer', 'ai', 'Austin, TX'], ['Data Engineer, Fleet Learning', 'ai', 'Palo Alto, CA'],
    ['Service Technician', 'service', 'Chicago, IL'], ['Mobile Service Technician', 'service', 'Denver, CO'], ['Collision Repair Estimator', 'service', 'Toronto, Canada'],
    ['Sales Advisor', 'sales', 'New York, NY'], ['Delivery Experience Specialist', 'sales', 'London, UK'],
  ];
  const teamName = Object.fromEntries(teams.map(([id, name]) => [id, name]));
  return {
    path,
    html: page({
      path,
      title: 'Careers: teams and open roles',
      description: 'The six teams behind the cars and energy products, and twenty open roles from battery engineering to sales. Apply on tesla.com or LinkedIn.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Careers', title: 'Hard problems, small teams', lead: 'Engineers, technicians, designers and advisers who like to see their work on the road and on the grid.', image: 'tesla-electric-chassis', alt: 'Close-up of a Tesla rear light', pos: '50% 50%', actions: [{ label: 'See open roles', href: 'discover/careers/#roles', style: 'btn-light' }] })}
${section(`${headRow({ eyebrow: 'Teams', title: 'Six teams, one product', lead: 'Pick a team to see its open roles below.' })}
  <ul class="team-grid">
    ${teams
      .map(
        ([id, name, text, image, alt]) => `
    <li class="reveal reveal-up"><a class="team-card" href="#roles" data-team-link="${id}">
      <span class="team-card-media">${img(image, { alt, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' })}</span>
      <span class="team-card-body"><span class="team-card-title">${name}</span><span class="team-card-text">${text}</span><span class="team-card-count">${jobs.filter((j) => j[1] === id).length} open roles</span></span>
    </a></li>`,
      )
      .join('')}
  </ul>`, { tone: 'soft' })}
${section(`
  ${headRow({ eyebrow: 'Open roles', title: `${jobs.length} roles open now`, lead: 'Sample listings for this concept. Live openings, with full descriptions, are on tesla.com and LinkedIn.' })}
  <div class="chips" role="group" aria-label="Filter roles by team">
    <button class="chip" type="button" data-xfx-filter-btn="*" aria-pressed="true">All <small>${jobs.length}</small></button>
    ${teams.map(([id, name]) => `<button class="chip" type="button" data-xfx-filter-btn="${id}" aria-pressed="false">${name} <small>${jobs.filter((j) => j[1] === id).length}</small></button>`).join('')}
  </div>
  <ul class="jobs xfx-filter" data-xfx-filter>
    ${jobs
      .map(
        ([title, team, place]) => `
    <li class="job" data-tags="${team}">
      <div><h3 class="job-title">${title}</h3><p class="job-meta"><span>${teamName[team]}</span><span>${place}</span><span>Full time</span></p></div>
      <a class="btn btn-ghost job-apply" href="${OFFICIAL.linkedin}" rel="noopener">Apply <span class="sr-only">for ${title}</span> ${icon('solar:arrow-right-up-linear', 16)}</a>
    </li>`,
      )
      .join('')}
  </ul>
  <a class="linkedin-card reveal reveal-up" href="${OFFICIAL.linkedin}" rel="noopener">
    <span class="linkedin-card-icon">${icon('brandico:linkedin', 28)}</span>
    <span><span class="linkedin-card-title">Hundreds more roles on LinkedIn</span><span class="linkedin-card-text">Follow Tesla on LinkedIn for every new opening, team news and hiring events.</span></span>
    <span class="card-arrow" aria-hidden="true">${icon('solar:arrow-right-up-linear', 20)}</span>
  </a>`, { id: 'roles' })}`,
    }),
  };
}

function ir() {
  const path = 'discover/investor-relations/';
  const crumbs = trail('Investor Relations');
  return {
    path,
    html: page({
      path,
      title: 'Investor Relations: where the reports live',
      description: 'Where to find Tesla’s quarterly update letters, annual reports, earnings calls and shareholder meeting materials.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Investor Relations', title: 'The numbers, from the source', lead: 'This concept does not repeat financial figures. Every report below is published on Tesla’s investor site.', image: 'tesla-megapack', alt: 'A row of white Megapack units in a field', actions: [{ label: 'Open ir.tesla.com', href: OFFICIAL.ir, ext: true, style: 'btn-light' }] })}
${section(`${headRow({ eyebrow: 'Documents', title: 'What is published, and when' })}${cards([
        { title: 'Quarterly update letters', text: 'Deliveries, production, energy storage deployed and financial results, every quarter.', href: OFFICIAL.ir, ext: true, linkLabel: 'Read on ir.tesla.com' },
        { title: 'Earnings calls', text: 'A webcast and recording after each quarterly letter, with questions from analysts and shareholders.', href: OFFICIAL.ir, ext: true, linkLabel: 'Listen on ir.tesla.com' },
        { title: 'Annual report and filings', text: 'The 10-K, 10-Q and other filings with the SEC.', href: OFFICIAL.ir, ext: true, linkLabel: 'See filings' },
        { title: 'Shareholder meeting', text: 'The proxy statement, proposals and the meeting webcast.', href: OFFICIAL.ir, ext: true, linkLabel: 'Meeting materials' },
        { title: 'Impact report', text: 'Emissions avoided, supply chain and the materials in the batteries.', href: OFFICIAL.ir, ext: true, linkLabel: 'Read the report' },
        { title: 'Stock information', text: 'Share price, history and how to contact investor relations.', href: OFFICIAL.ir, ext: true, linkLabel: 'Stock information' },
      ], { tone: 'line' })}`, { tone: 'soft' })}`,
    }),
  };
}

export const discoverPages = () => [
  hub(),
  demoDrive(),
  insurance(),
  videoGuides(),
  stories(),
  events(),
  finder({
    id: 'find-us', label: 'Find Us', title: 'Stores, service and Superchargers near you', lead: 'Where to see the cars, get them serviced and charge them, with directions and opening hours on Tesla’s official map.',
    image: 'tesla-model-x', alt: 'Model X with its falcon-wing doors open beside a mountain lake', cta: 'Open the official map',
    types: [['Stores and galleries', 'See every model, sit inside and talk to an adviser.'], ['Service centres', 'Scheduled service, repairs and tyre changes, booked in the app.'], ['Superchargers', 'Fast charging along main routes, with live availability.'], ['Destination chargers', 'Slower charging at hotels, restaurants and car parks.']],
    steps: { title: 'Find the right place in three steps', items: [['Choose what you need', 'A store, service, a Supercharger or a destination charger.'], ['Search a city or postcode', 'The map shows what is nearby, with opening hours.'], ['Get directions', 'Send the route to the car from your phone.']] },
  }),
  tripPlanner(),
  collision(),
  installers(),
  about(),
  careers(),
  ir(),
];
