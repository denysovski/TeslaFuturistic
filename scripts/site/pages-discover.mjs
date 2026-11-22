import { NAV } from './nav.mjs';
import { B, cards, ctaBand, headRow, heroImage, heroText, icon, img, kv, page, section, split } from './blocks.mjs';

const OFFICIAL = {
  findus: 'https://www.tesla.com/findus',
  careers: 'https://www.tesla.com/careers',
  ir: 'https://ir.tesla.com/',
  youtube: 'https://www.youtube.com/@tesla',
};
const discover = NAV.find((n) => n.id === 'discover');
const trail = (label) => [{ label: 'Discover', href: 'discover/' }, { label }];

function hub() {
  const path = 'discover/';
  const crumbs = [{ label: 'Discover' }];
  const blurbs = {
    'Demo Drive': 'Thirty minutes behind the wheel, with someone to answer questions.',
    Insurance: 'Cover priced on how the car is driven, with an estimate in a minute.',
    'Video Guides': 'Short films on charging, the app, Autopilot and the features people miss.',
    'Customer Stories': 'What ownership costs and changes, in four everyday driving profiles.',
    Events: 'Test drive days, owner meet-ups and delivery events.',
    'Find Us': 'Stores, service centres and Superchargers near you.',
    'Trip Planner': 'How many stops a trip needs, how long they take and what they cost.',
    'Find a Collision Center': 'How repairs work and how to find an approved body shop.',
    'Find a Certified Installer': 'Who installs Wall Connectors, solar and Powerwall, and how to choose.',
    About: 'The mission, the products and the years that shaped them.',
    Careers: 'The teams, how hiring works and where the open roles are.',
    'Investor Relations': 'Where the reports, letters and shareholder meetings live.',
    'Latest updates': 'Software releases, milestones and events.',
  };
  return {
    path,
    html: page({
      path,
      title: 'Discover: resources, locations and company',
      description: 'Everything beyond the cars: demo drives, insurance, video guides, events, location finders, trip planning and company information.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Discover', title: 'Everything around the car', lead: 'Help before you buy, while you own it and when you want to know more about the company.' })}
${discover.groups
  .map(
    (g, i) => section(`${headRow({ eyebrow: g.title, title: ['Before and after you buy', 'Find the right place', 'The company'][i] })}${cards(
      g.links.map((l) => ({ title: l.label, text: blurbs[l.label], href: l.href, linkLabel: `Open ${l.label}` })),
      { cols: g.links.length === 4 ? 4 : 3, tone: 'line' },
    )}`, { tone: i === 1 ? 'soft' : '' }),
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
        <span class="card-link">Watch on YouTube ${icon('solar:arrow-right-linear', 16)}</span>
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
  <ul class="rows xfx-filter" data-xfx-filter>
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
    <ol class="rows">${steps.items.map(([t, d]) => `<li class="row" style="grid-template-columns:1fr"><h3 class="h3" style="font-size:18px">${t}</h3><p>${d}</p></li>`).join('')}</ol>
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
      body: `${heroImage({ crumbs, eyebrow: 'Trip Planner', title: 'How long is the trip, really?', lead: 'Set the distance and the car. The estimate counts the Supercharger stops, the minutes spent at them and the energy cost.', image: 'tesla-trip-planner', alt: 'The centre screen showing a route with charging stops', pos: '50% 50%', actions: [{ label: 'Plan a trip', href: 'discover/trip-planner/#plan', style: 'btn-light' }] })}
${section(`
  <div class="calc" data-trip>
    <form class="panel form" novalidate>
      <div class="field"><label for="tp-dist">Trip distance</label><input id="tp-dist" name="dist" type="range" min="50" max="1500" step="10" value="520"><output class="range-out" data-out="dist">520 mi</output></div>
      <fieldset class="field"><legend class="label">Car</legend><div class="choice-group" style="margin-top:8px">${[['Model 3', 363], ['Model Y', 311], ['Model S', 402], ['Model X', 335], ['Cybertruck', 325]].map(([m, r], i) => `<label class="choice"><input type="radio" name="range" value="${r}"${i === 0 ? ' checked' : ''}><span>${m}</span></label>`).join('')}</div></fieldset>
      <div class="field"><label for="tp-start">Charge at departure</label><input id="tp-start" name="start" type="range" min="50" max="100" step="5" value="90"><output class="range-out" data-out="start">90%</output></div>
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
  </div>`, { id: 'plan', tone: 'soft' })}`,
    }),
  };
}

function about() {
  const path = 'discover/about/';
  const crumbs = trail('About');
  const years = [
    ['2003', 'The company is founded', 'A small team sets out to prove electric cars can be better than petrol ones.'],
    ['2008', 'Roadster', 'The first car: a two-seat electric sports car with a lithium-ion battery.'],
    ['2012', 'Model S', 'A full-size sedan with long range, over-the-air updates and a large touchscreen.'],
    ['2015', 'Model X and Powerwall', 'An SUV with falcon-wing doors, and the first home battery.'],
    ['2017', 'Model 3', 'A smaller, more affordable sedan built in much larger numbers.'],
    ['2019', 'Megapack', 'Battery storage for utilities, delivered ready to connect.'],
    ['2020', 'Model Y', 'A compact SUV on the Model 3 platform, soon the best-selling car in several countries.'],
    ['2023', 'Cybertruck', 'Deliveries of the stainless steel pickup begin.'],
  ];
  return {
    path,
    html: page({
      path,
      title: 'About: the mission and the years that shaped it',
      description: 'Tesla’s mission to accelerate the world’s transition to sustainable energy, and the products that marked each step from 2003 to today.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'About', title: 'Accelerating the move to sustainable energy', lead: 'Cars, batteries and solar that work as one system, built to be better than what they replace, not only cleaner.', image: 'tesla-roadster-studio', alt: 'A white Roadster in a dark studio', pos: '50% 55%' })}
${section(`${split({ eyebrow: 'Mission', title: 'Make it, store it, use it', body: ['The idea has stayed the same since the first Roadster: make the electric option the one people would choose anyway.', 'Today that means cars, home and grid batteries, solar, and the software and charging network that tie them together.'], image: 'grid-storage-wind-solar', alt: 'Battery storage units beside solar panels and wind turbines' })}`)}
${section(`${headRow({ eyebrow: 'History', title: 'The years that changed the line-up' })}
  <ol class="timeline">${years.map(([y, t, d]) => `<li class="reveal reveal-up"><span class="tl-year">${y}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>`, { tone: 'soft' })}
${section(ctaBand({ title: 'Work on what comes next', text: 'Engineering, manufacturing, energy, service and AI.', actions: [{ label: 'Careers', href: 'discover/careers/', style: 'btn-light' }] }))}`,
    }),
  };
}

function careers() {
  const path = 'discover/careers/';
  const crumbs = trail('Careers');
  return {
    path,
    html: page({
      path,
      title: 'Careers: the teams and how hiring works',
      description: 'The teams behind the cars and energy products, what each one does, and how the hiring process works. Open roles are listed on tesla.com.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Careers', title: 'Hard problems, small teams', lead: 'Engineers, technicians, designers and advisers who like to see their work on the road and on the grid.', image: 'tesla-electric-chassis', alt: 'Close-up of a Tesla rear light', pos: '50% 50%', actions: [{ label: 'See open roles on tesla.com', href: OFFICIAL.careers, ext: true, style: 'btn-light' }] })}
${section(`${headRow({ eyebrow: 'Teams', title: 'Where people work', lead: 'Roles open across every team. The current list, with locations, is kept on tesla.com.' })}${cards([
        { title: 'Vehicle engineering', text: 'Chassis, battery, drive units and the body, from first sketch to production.' },
        { title: 'Manufacturing', text: 'The lines, robots and people at the Gigafactories.' },
        { title: 'Energy', text: 'Solar, Powerwall and Megapack, from design to installation.' },
        { title: 'AI and software', text: 'Autopilot, the in-car software and the systems behind them.' },
        { title: 'Service', text: 'Technicians in service centres and mobile vans.' },
        { title: 'Sales and delivery', text: 'Advisers who help people choose, drive and collect their car.' },
      ])}`, { tone: 'soft' })}
${section(`
  <div class="split" style="align-items:start">
    <div>${headRow({ eyebrow: 'Hiring', title: 'How the process works' }).replace('class="head-row"', 'class="head-row" style="margin-bottom:0"')}</div>
    <ol class="rows">${[
      ['Apply online', 'A CV and a short note on the hardest problem you have solved.'],
      ['A first conversation', 'Thirty minutes with someone from the team, not a script.'],
      ['Show the work', 'A practical exercise or a walkthrough of something you built.'],
      ['Meet the team', 'A few conversations with the people you would work with.'],
    ].map(([t, d]) => `<li class="row" style="grid-template-columns:1fr"><h3 class="h3" style="font-size:18px">${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>`)}`,
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
  finder({
    id: 'collision-centers', label: 'Find a Collision Center', title: 'Repairs done to factory standard', lead: 'Tesla-approved body shops use the right tools, parts and procedures, so the structure and the sensors work as they did before.',
    image: null, cta: 'Find an approved body shop',
    types: [['Approved body shops', 'Trained and equipped for aluminium and high-strength steel repairs.'], ['Genuine parts', 'Parts that fit and keep cameras and sensors calibrated.'], ['Claims in the app', 'Report the damage with photos and follow the repair.']],
    steps: { title: 'After an accident', items: [['Make sure everyone is safe', 'Call emergency services if anyone is hurt.'], ['Report it in the app', 'Photos and a short description start the claim.'], ['Choose a body shop', 'Pick an approved shop near you, or let your insurer suggest one.'], ['Collect the car', 'Sensors and cameras are checked before you drive away.']] },
  }),
  finder({
    id: 'certified-installers', label: 'Find a Certified Installer', title: 'The right electrician for the job', lead: 'Certified installers fit Wall Connectors, solar and Powerwall to the same standard Tesla uses, with the paperwork done for you.',
    image: 'tesla-home-energy-storage', alt: 'Black solar panels on a shingle roof', cta: 'Find a certified installer',
    types: [['Wall Connector', 'Home charging installed on a dedicated circuit, usually in one visit.'], ['Solar Panels', 'Roof survey, design, permits and connection to the grid.'], ['Powerwall', 'Battery placement, backup wiring and app setup.']],
    steps: { title: 'Choosing an installer', items: [['Check the certification', 'Certified installers are trained on the current products.'], ['Ask for a site visit', 'A short visit catches panel capacity and cable runs early.'], ['Compare quotes', 'Look at what is included: permits, trenching, the app setup.'], ['Book the installation', 'Most Wall Connectors take half a day.']] },
  }),
  about(),
  careers(),
  ir(),
];
