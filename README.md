# Tesla Futuristic

Tesla Futuristic is a single-page, Tesla-inspired showcase built to feel cinematic, premium, and interactive. The experience combines a React shell with a handcrafted HTML page that powers the visual sections, motion, and micro-interactions.

The landing hero uses a static homepage image by default, while the hidden frame-sequence assets under `app/public/assets/landing-animation/` are available for scroll-based animation experiments.

## What It Includes

- A fixed navigation bar that stays visible while scrolling and keeps the page anchored while you move through the experience.
- A polished hero section with strong typography, vehicle stats, and reveal effects that establish the visual tone immediately.
- Interactive vehicle showcase cards that swap content and imagery to spotlight different models and configurations.
- Ownership and performance panels that compare range, acceleration, charging, and utility in a dashboard-style layout.
- Bubble-style callouts, tooltips, and hover states that add small interactive details without overwhelming the page.
- A lightweight cart drawer and other small UI interactions that make the interface feel more like a product surface than a static marketing page.
- A hero landing section that can switch between a static image and frame-based animation assets for more cinematic motion experiments.
- Tesla branding assets and full-size logo artwork used throughout the hero area and supporting content blocks.

## Key Sections

- The hero section introduces the Model S Plaid with a dramatic full-width visual, core specs, and a strong call to action.
- The interior section highlights the cabin experience, showing how the design balances comfort, technology, and minimalism.
- The performance section focuses on the stats, comparison data, and image transitions that support the car-focused storytelling.
- The test drive section provides selectable date cards and a short form so the page feels closer to a real booking flow.
- The FAQ section answers common ownership and charging questions while keeping the tone concise and practical.
- The future section explores possible Tesla-inspired directions with larger visual cards and short editorial descriptions.

## Technologies

- React 19
- Vite 8
- Tailwind CSS 4
- Custom HTML, CSS, and inline JavaScript for the landing page experience
- GitHub Pages for deployment

## Visual Style

The design leans into a clean Tesla-like palette with high contrast and restrained accents:

- White and off-white surfaces for the main reading areas.
- Deep black and charcoal for structure and contrast.
- Soft gray borders and muted UI chrome.
- Red accent details inspired by Tesla branding.
- Subtle transparency, blur, and smooth fades for motion.

## Project Structure

- `app/src/App.jsx` renders the generated page in an iframe.
- `app/public/generated-page.html` is the main page source.
- `app/public/assets/` stores the runtime images and logo assets.
- `app/public/assets/landing-animation/` stores the frame sequence used for scroll animation tests.
- `app/.github/workflows/deploy.yml` publishes the site to GitHub Pages.

## Development

- `npm run dev` starts the local Vite server.
- `npm run build` creates the production bundle.
- `npm run preview` serves the built output locally.

## Live Site

[https://denysovski.github.io/TeslaFuturistic/](https://denysovski.github.io/TeslaFuturistic/)
