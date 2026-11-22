import { B, cards, ctaBand, headRow, heroImage, heroText, icon, img, kv, page, section, split } from './blocks.mjs';

const jump = (items) => `
  <nav class="chips" aria-label="On this page" style="margin-bottom:0">
    ${items.map(([id, label]) => `<a class="chip" href="#${id}">${label}</a>`).join('')}
  </nav>`;

/** A feature without a photo: the facts in a dark panel next to the text. */
function factSplit({ id, eyebrow, title, body, facts, actions = [] }) {
  return `
  <div class="split feature reveal reveal-up" id="${id}">
    <div>
      <span class="eyebrow">${eyebrow}</span>
      <h2 class="h2">${title}</h2>
      <div class="prose" style="margin-top:20px">${body.map((p) => `<p>${p}</p>`).join('')}</div>
      ${actions.length ? `<div class="actions">${actions.map((a) => `<a href="${B}${a.href}" class="btn ${a.style || 'btn-dark'}">${a.label}</a>`).join('')}</div>` : ''}
    </div>
    <div class="panel panel--dark">
      ${kv(facts)}
    </div>
  </div>`;
}

function energy() {
  const path = 'energy/';
  const crumbs = [{ label: 'Energy' }];
  return {
    path,
    html: page({
      path,
      title: 'Energy: Solar Panels, Solar Roof, Powerwall and Megapack',
      description: 'Make, store and use your own energy: Tesla Solar Panels, Solar Roof, Powerwall home batteries and Megapack for utilities, in one place.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Energy', title: 'Make it, store it, drive on it', lead: 'Solar on the roof, a battery on the wall and an app that decides when to charge the car. One system, from one company.', image: 'home-solar-garage', alt: 'A modern house with solar on the roof and a Tesla charging in the garage', pos: '60% 60%', actions: [{ label: 'Estimate your savings', href: 'savings/', style: 'btn-light' }] })}
${section(jump([['solar-panels', 'Solar Panels'], ['solar-roof', 'Solar Roof'], ['powerwall', 'Powerwall'], ['megapack', 'Megapack']]), { cls: 'jump-section' })}
${section(`
  ${split({ id: 'solar-panels', eyebrow: 'Solar Panels', title: 'Low-profile panels for the roof you have', body: ['Black panels with hidden mounting sit close to the roof, so they look like part of the house rather than an addition.', 'A typical home system of 8 to 12 kW covers most of a household’s daytime use and charges the car on sunny afternoons.'], image: 'tesla-home-energy-storage', alt: 'Black solar panels on a shingle roof in the evening sun', actions: [{ label: 'Size a system', href: 'savings/' }] })}
  ${split({ id: 'solar-roof', eyebrow: 'Solar Roof', title: 'A roof that is also the power plant', body: ['Glass solar tiles replace the roof itself, with matching non-solar tiles where the sun does not reach.', 'It suits new builds and roofs that are due for replacement anyway: one installation instead of two.'], image: 'tesla-home-energy-ecosystem', alt: 'Aerial view of a house roof with solar and a Tesla in the driveway', flip: true, actions: [{ label: 'Find a certified installer', href: 'discover/certified-installers/' }] })}
  ${factSplit({ id: 'powerwall', eyebrow: 'Powerwall', title: 'Backup power that switches on by itself', body: ['Powerwall stores solar energy for the evening and keeps the lights, fridge and internet on during an outage, without you noticing the switch.', 'With time-of-use rates it charges when electricity is cheap and powers the home when it is expensive.'], facts: [['Energy capacity', '13.5 kWh'], ['Continuous power', '11.5 kW'], ['Backup switch-over', 'Automatic, under a second'], ['Mounting', 'Wall or floor, indoors or out'], ['Warranty', '10 years']], actions: [{ label: 'Compare savings', href: 'savings/' }] })}
  ${split({ id: 'megapack', eyebrow: 'Megapack', title: 'Storage at the scale of a city', body: ['Megapack arrives pre-assembled and ready to connect, so a utility can install hundreds of megawatt-hours in months rather than years.', 'It stores wind and solar for the evening peak and steadies the grid when demand changes in seconds.'], image: 'tesla-megapack', alt: 'A row of white Megapack battery units in a field', actions: [{ label: 'Investor information', href: 'discover/investor-relations/', style: 'btn-ghost' }] })}
`)}
${section(ctaBand({ title: 'What would it save you?', text: 'Your bill, your roof and your car decide it. The savings calculator does the arithmetic.', actions: [{ label: 'Compare savings', href: 'savings/', style: 'btn-light' }] }))}`,
    }),
  };
}

function charging() {
  const path = 'charging/';
  const crumbs = [{ label: 'Charging' }];
  return {
    path,
    html: page({
      path,
      title: 'Charging at home, on the road and at Superchargers',
      description: 'How charging a Tesla works: overnight at home with a Wall Connector, and fast Supercharger stops planned into every long trip.',
      crumbs,
      body: `${heroImage({ crumbs, eyebrow: 'Charging', title: 'Charge where you park, stop where you want', lead: 'Most charging happens at home overnight. On long trips the car plans Supercharger stops for you and warms the battery on the way.', image: 'future-tesla-sentry-mode', alt: 'A hand plugging a charge cable into a white Tesla', pos: '60% 50%', actions: [{ label: 'Plan a trip', href: 'discover/trip-planner/', style: 'btn-light' }] })}
${section(jump([['charging', 'How charging works'], ['home-charging', 'Home Charging'], ['supercharging', 'Supercharging']]), { cls: 'jump-section' })}
${section(`
  ${split({ id: 'charging', eyebrow: 'Charging', title: 'Like a phone: plug in when you park', body: ['Plug in at home and wake up to the range you set. Most drivers never need anything else on a normal day.', 'Away from home there are three options: Superchargers for speed, destination chargers at hotels and restaurants, and public chargers with an adapter.'], image: 'tesla-trip-planner', alt: 'The centre screen showing a route with charging stops' })}
  ${split({ id: 'home-charging', eyebrow: 'Home Charging', title: 'Overnight, in a garage or driveway', body: ['A Wall Connector adds up to 44 miles of range per hour, enough to refill a typical day of driving in two hours.', 'Schedule charging for off-peak hours and the car only draws power when electricity is cheapest.'], image: 'home-solar-garage', alt: 'A Tesla charging in the garage of a house with solar', flip: true, extra: kv([['Wall Connector', 'Up to 44 mi of range per hour'], ['Mobile Connector', 'Up to 3 mi per hour on a regular outlet'], ['Installation', 'By a certified electrician, usually one visit']]), actions: [{ label: 'Find a certified installer', href: 'discover/certified-installers/' }] })}
  ${split({ id: 'supercharging', eyebrow: 'Supercharging', title: 'Ultra-fast stops on long trips', body: ['V3 and V4 Superchargers deliver up to 250 kW: about 200 miles in 15 minutes, roughly the time of a coffee.', 'The navigation picks stops along the route, shows how busy each one is and preconditions the battery so it charges at full speed.'], image: 'tesla-long-term-value', alt: 'Two red Teslas on a mountain road', actions: [{ label: 'Open the trip planner', href: 'discover/trip-planner/' }] })}
`)}
${section(`${headRow({ eyebrow: 'Common questions', title: 'Charging, briefly' })}${cards([
        { title: 'How long does a full charge take?', text: 'At home, overnight. At a Supercharger, around 25 minutes from 10 to 80 percent, which is how most drivers use it.' },
        { title: 'Does fast charging hurt the battery?', text: 'Occasional Supercharging is part of normal use. The car manages temperature and speed to protect the cells.' },
        { title: 'Can I use other chargers?', text: 'Yes. With the right adapter a Tesla charges at most public stations.' },
      ])}`, { tone: 'soft' })}`,
    }),
  };
}

function savings() {
  const path = 'savings/';
  const crumbs = [{ label: 'Compare savings' }];
  return {
    path,
    html: page({
      path,
      title: 'Compare savings: electric versus petrol',
      description: 'Estimate what you would save by driving electric: your mileage, fuel price, electricity rate and solar, compared over five years.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Compare savings', title: 'What would driving electric save you?', lead: 'Move the sliders to match how you drive. The comparison updates as you go and stays on this device.' })}
${section(`
  <div class="calc" data-savings>
    <form class="panel form" novalidate>
      <div class="field"><label for="sv-miles">Miles driven per year</label><input id="sv-miles" name="miles" type="range" min="4000" max="30000" step="500" value="12000"><output class="range-out" data-out="miles">12,000 mi</output></div>
      <div class="field"><label for="sv-gas">Fuel price per gallon</label><input id="sv-gas" name="gas" type="range" min="2.5" max="7" step="0.05" value="3.6"><output class="range-out" data-out="gas">$3.60</output></div>
      <div class="field"><label for="sv-mpg">Your current car’s fuel economy</label><input id="sv-mpg" name="mpg" type="range" min="15" max="50" step="1" value="27"><output class="range-out" data-out="mpg">27 mpg</output></div>
      <div class="field"><label for="sv-kwh">Electricity price per kWh</label><input id="sv-kwh" name="kwh" type="range" min="0.08" max="0.45" step="0.01" value="0.17"><output class="range-out" data-out="kwh">$0.17</output></div>
      <fieldset class="field"><legend class="label">Electric car</legend><div class="choice-group" style="margin-top:8px">
        ${[['Model 3', 0.25], ['Model Y', 0.28], ['Model S', 0.29], ['Model X', 0.34]].map(([n, e], i) => `<label class="choice"><input type="radio" name="ev" value="${e}"${i === 0 ? ' checked' : ''}><span>${n}</span></label>`).join('')}
      </div></fieldset>
      <label class="check"><input type="checkbox" name="solar"> I charge mostly from my own solar panels</label>
    </form>
    <div class="panel" aria-live="polite">
      <p class="eyebrow">Estimated saving over five years</p>
      <p class="result-big" data-out="save5">–</p>
      <p class="lead" style="margin-top:8px" data-out="saveYear">–</p>
      <div class="bars">
        <div class="bar-row"><div class="bar-row-top"><span>Petrol car, fuel per year</span><strong data-out="gasYear">–</strong></div><div class="bar-track bar-track--muted"><span data-bar="gas"></span></div></div>
        <div class="bar-row"><div class="bar-row-top"><span>Tesla, electricity per year</span><strong data-out="evYear">–</strong></div><div class="bar-track"><span data-bar="ev"></span></div></div>
        <div class="bar-row"><div class="bar-row-top"><span>Maintenance saved per year</span><strong>$600</strong></div><div class="bar-track"><span data-bar="maint"></span></div></div>
      </div>
      <p class="note">Assumes $600 a year less maintenance (no oil changes, less brake wear) and home charging. Solar charging is counted at a third of the grid rate. An estimate, not a quote.</p>
      <div class="actions"><a href="${B}vehicles/compare/" class="btn btn-dark">Compare models</a><a href="${B}energy/" class="btn btn-ghost">Add solar</a></div>
    </div>
  </div>`, { tone: 'soft' })}`,
    }),
  };
}

export const UPDATES = [
  {
    id: 'fsd-v12', tag: 'Software', date: '2026-10-14', title: 'Full Self-Driving (Supervised) V12 rolls out', image: 'tesla-software-update', alt: 'Two Teslas on a dark blue background',
    text: 'End-to-end neural networks replace hand-written planning code, for smoother and more natural driving decisions.',
    body: [
      'Version 12 is the biggest change to Full Self-Driving (Supervised) since it launched. Instead of hundreds of thousands of lines of rules that decide when to brake, turn or wait, a neural network trained on video of good driving makes those decisions directly.',
      'Owners notice it first at junctions and roundabouts: the car creeps forward, reads the gap and goes, rather than stopping and starting. Lane changes are earlier and calmer on the motorway, and the car leaves more room around cyclists.',
      'It remains a supervised system. The driver keeps their hands ready and eyes on the road, and the cabin camera checks that they do. The update arrives over the air in waves, starting with cars that already have the latest computer.',
    ],
  },
  {
    id: 'production-record', tag: 'Milestone', date: '2026-09-02', title: 'A production record at Gigafactory Shanghai', image: 'tesla-model-y', alt: 'Model Y in white parked by an outdoor gathering',
    text: 'The busiest week yet for Model Y and Model 3, with a car leaving the line roughly every forty seconds.',
    body: [
      'Gigafactory Shanghai had its busiest week so far, building Model Y and Model 3 at a pace of roughly one car every forty seconds across both lines.',
      'Most of the gain came from the casting and paint shops, where changeovers between colours and versions now take minutes instead of an hour. The same changes are being copied to Berlin and Austin.',
      'For buyers it shows up as shorter waits: most configurations of Model Y in Asia and Europe can now be delivered within three to five weeks of ordering.',
    ],
  },
  {
    id: 'megapack-expansion', tag: 'Energy', date: '2026-08-21', title: 'Megapack production expands', image: 'tesla-megapack', alt: 'A row of white Megapack units in a field',
    text: 'A second line raises output for utilities storing wind and solar for the evening peak.',
    body: [
      'A second Megapack line has started production, roughly doubling the number of units the factory can ship each year.',
      'Utilities use Megapack to store solar power from the middle of the day and release it in the evening, when demand peaks and the sun has set. It also steadies the grid within milliseconds when a power station trips.',
      'Each unit arrives pre-assembled, tested and ready to connect, which is why large projects now take months rather than years from contract to first power.',
    ],
  },
  {
    id: 'summer-update', tag: 'Software', date: '2026-07-10', title: 'Summer update: new games and a quieter cabin', image: 'tesla-in-car-gaming', alt: 'A game running on the rear display',
    text: 'Three new titles for the rear screen and refined active noise reduction on Model S and X.',
    body: [
      'The summer software update adds three new games for the rear display, playable with a wireless controller, and lets passengers in the back pick their own music while the front keeps navigation audio.',
      'Model S and Model X get a refined version of active road-noise reduction, which listens through cabin microphones and cancels the low drone of coarse tarmac.',
      'Smaller changes include a larger map on the 15-inch display, a quicker way to share a destination from a phone, and Dog Mode messages that are easier to read from outside the car.',
    ],
  },
  {
    id: 'supercharger-v4', tag: 'Charging', date: '2026-06-03', title: 'More V4 Supercharger sites open', image: 'future-tesla-sentry-mode', alt: 'A hand plugging a charge cable into a Tesla',
    text: 'Longer cables and faster cabinets arrive at busy motorway sites first.',
    body: [
      'V4 Superchargers are going in at the busiest motorway sites first. The new posts have longer cables, so cars that park awkwardly or have their port on the other side can still reach.',
      'The cabinets behind them support higher power for the cars that can take it, while sharing power more evenly when a site is full.',
      'Sites with V4 posts are marked in the car’s navigation, and the trip planner will prefer them when the timing works.',
    ],
  },
  {
    id: 'ai-day', tag: 'Event', date: '2026-05-18', title: 'AI Day: Optimus and the next platform', image: 'tesla-vision-camera-network', alt: 'A rear camera above the Tesla lettering',
    text: 'The next generation of the Optimus robot and progress on in-house AI hardware.',
    body: [
      'AI Day focused on two things: the next version of the Optimus humanoid robot and the computers used to train the driving software.',
      'The new Optimus is lighter, has hands with more degrees of freedom, and was shown sorting battery cells on a factory line. It learns tasks from video of people doing them, the same way the driving software learns from video of driving.',
      'On the hardware side, the team showed how training capacity has grown, and why more of the work now runs on chips designed in-house.',
    ],
  },
];

function updatesArchive() {
  const path = 'updates/';
  const crumbs = [{ label: 'Latest updates' }];
  const tags = [...new Set(UPDATES.map((u) => u.tag))];
  const date = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return {
    path,
    html: page({
      path,
      title: 'Latest updates: software, milestones and events',
      description: 'The archive of TeslaX updates: software releases, production milestones, energy news and events.',
      crumbs,
      body: `${heroText({ crumbs, eyebrow: 'Updates', title: 'The archive', lead: 'Software releases, milestones, energy and events, newest first. Dates and stories are demo content for this concept.' })}
${section(`
  <div class="chips" role="group" aria-label="Filter updates">
    <button class="chip" type="button" data-xfx-filter-btn="*" aria-pressed="true">All <small>${UPDATES.length}</small></button>
    ${tags.map((t) => `<button class="chip" type="button" data-xfx-filter-btn="${t.toLowerCase()}" aria-pressed="false">${t} <small>${UPDATES.filter((u) => u.tag === t).length}</small></button>`).join('')}
  </div>
  <ul class="grid grid--3 xfx-filter" data-xfx-filter>
    ${UPDATES.map(
      (u) => `
    <li data-tags="${u.tag.toLowerCase()}" id="${u.id}">
      <a href="${B}updates/${u.id}/" class="card card--line card--arrow">
        <div class="card-photo">${img(u.image, { alt: u.alt, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' })}</div>
        <span class="card-meta">${u.tag} · <time datetime="${u.date}">${date(u.date)}</time></span>
        <h2 class="h3">${u.title}</h2>
        <p>${u.text}</p>
        <span class="card-arrow" aria-hidden="true">${icon('solar:arrow-right-up-linear', 20)}</span>
      </a>
    </li>`,
    ).join('')}
  </ul>`)}`,
    }),
  };
}

function updateArticle(u, i) {
  const path = `updates/${u.id}/`;
  const crumbs = [{ label: 'Latest updates', href: 'updates/' }, { label: u.title }];
  const date = new Date(u.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const next = [UPDATES[(i + 1) % UPDATES.length], UPDATES[(i + 2) % UPDATES.length], UPDATES[(i + 3) % UPDATES.length]];
  return {
    path,
    html: page({
      path,
      title: u.title,
      description: u.text,
      crumbs,
      schema: [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: u.title, datePublished: u.date, articleSection: u.tag, description: u.text, author: { '@type': 'Person', name: 'denysovski' } }],
      body: `${heroImage({ crumbs, eyebrow: `${u.tag} · ${date}`, title: u.title, lead: u.text, image: u.image, alt: u.alt })}
${section(`
  <article class="article">
    ${u.body.map((p) => `<p>${p}</p>`).join('')}
    <p class="note">Demo content for this concept site.</p>
  </article>`)}
${section(`${headRow({ eyebrow: 'Keep reading', title: 'More updates' })}
  <ul class="grid grid--3">
    ${next
      .map(
        (n) => `
    <li><a href="${B}updates/${n.id}/" class="card card--line card--arrow">
      <div class="card-photo">${img(n.image, { alt: n.alt, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' })}</div>
      <span class="card-meta">${n.tag}</span>
      <h3 class="h3">${n.title}</h3>
      <span class="card-arrow" aria-hidden="true">${icon('solar:arrow-right-up-linear', 20)}</span>
    </a></li>`,
      )
      .join('')}
  </ul>`, { tone: 'soft' })}`,
    }),
  };
}

export const energyPages = () => [energy(), charging(), savings(), updatesArchive(), ...UPDATES.map(updateArticle)];
export { icon };
