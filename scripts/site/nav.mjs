// Navigation data: one source for the desktop mega menus, the phone menu and the footer.
// Every href is relative to the site base; layout.mjs prefixes it with %BASE%.

const CDN = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto:best/';

export const NAV = [
  {
    id: 'vehicles',
    label: 'Vehicles',
    overview: { label: 'All vehicles', href: 'vehicles/' },
    models: [
      { name: 'Model S', href: 'vehicles/model-s/', img: CDN + 'Mega-Menu-Vehicles-Model-S.png', note: 'Up to 402 mi range' },
      { name: 'Model 3', href: 'vehicles/model-3/', img: CDN + 'Mega-Menu-Vehicles-Model-3.png', note: 'Up to 363 mi range' },
      { name: 'Model X', href: 'vehicles/model-x/', img: CDN + 'Mega-Menu-Vehicles-Model-X.png', note: 'Seats up to seven' },
      { name: 'Model Y', href: 'vehicles/model-y/', img: CDN + 'Mega-Menu-Vehicles-Model-Y.png', note: '76 cu ft of cargo' },
      { name: 'Cybertruck', href: 'vehicles/cybertruck/', img: CDN + 'Mega-Menu-Vehicles-Cybertruck-1x.png', note: 'Stainless steel pickup' },
    ],
    links: [
      { label: 'Inventory', href: 'vehicles/inventory/' },
      { label: 'Used Cars', href: 'vehicles/inventory/#used' },
      { label: 'Demo Drive', href: 'discover/demo-drive/' },
      { label: 'Trade-in', href: 'vehicles/trade-in/' },
      { label: 'Compare', href: 'vehicles/compare/' },
      { label: 'Fleet', href: 'vehicles/fleet/' },
    ],
  },
  {
    id: 'energy',
    label: 'Energy',
    overview: { label: 'Energy overview', href: 'energy/' },
    items: [
      { name: 'Solar Panels', href: 'energy/#solar-panels', img: CDN + 'Mega-Menu-Energy-Solar-Panels.png', note: 'Low-profile panels for existing roofs' },
      { name: 'Solar Roof', href: 'energy/#solar-roof', img: CDN + 'Mega-Menu-Energy-Solar-Roof.png', note: 'A roof that is also the power plant' },
      { name: 'Powerwall', href: 'energy/#powerwall', img: CDN + 'Mega-Menu-Energy-Powerwall-US.png', note: 'Home battery and backup power' },
      { name: 'Megapack', href: 'energy/#megapack', img: CDN + 'Mega-Menu-Energy-Megapack.png', note: 'Storage at utility scale' },
    ],
  },
  {
    id: 'charging',
    label: 'Charging',
    overview: { label: 'Charging overview', href: 'charging/' },
    items: [
      { name: 'Charging', href: 'charging/#charging', img: CDN + 'Mega-Menu-Charging-Charging.png', note: 'How charging works, at home and away' },
      { name: 'Home Charging', href: 'charging/#home-charging', img: CDN + 'Mega-Menu-Charging-Home-Charging.png', note: 'Overnight, in a garage or driveway' },
      { name: 'Supercharging', href: 'charging/#supercharging', img: CDN + 'Mega-Menu-Charging-Supercharging-NA.png', note: 'Fast stops on longer trips' },
    ],
  },
  {
    id: 'discover',
    label: 'Discover',
    overview: { label: 'Discover hub', href: 'discover/' },
    groups: [
      {
        title: 'Resources',
        links: [
          { label: 'Demo Drive', href: 'discover/demo-drive/' },
          { label: 'Insurance', href: 'discover/insurance/' },
          { label: 'Video Guides', href: 'discover/video-guides/' },
          { label: 'Customer Stories', href: 'discover/customer-stories/' },
          { label: 'Events', href: 'discover/events/' },
        ],
      },
      {
        title: 'Location Services',
        links: [
          { label: 'Find Us', href: 'discover/find-us/' },
          { label: 'Trip Planner', href: 'discover/trip-planner/' },
          { label: 'Find a Collision Center', href: 'discover/collision-centers/' },
          { label: 'Find a Certified Installer', href: 'discover/certified-installers/' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: 'discover/about/' },
          { label: 'Careers', href: 'discover/careers/' },
          { label: 'Investor Relations', href: 'discover/investor-relations/' },
          { label: 'Latest updates', href: 'updates/' },
        ],
      },
    ],
  },
];

export const SHOP = { label: 'Shop', href: 'shop/' };
export const DEMO = { label: 'Demo Drive', href: 'discover/demo-drive/' };
