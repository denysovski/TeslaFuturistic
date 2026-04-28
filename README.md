# Tesla Futuristic

Tesla Futuristic is a single-page, Tesla-inspired showcase built to feel cinematic, premium, and interactive. The experience combines a React shell with a handcrafted HTML page that powers the visual sections, motion, and micro-interactions.

The landing hero uses a static homepage image by default, while the hidden frame-sequence assets under `app/public/assets/landing-animation/` are available for scroll-based animation experiments.

## What It Includes

- A fixed navigation bar that stays visible while scrolling
- A polished hero and feature layout with scroll-triggered reveals
- Interactive vehicle showcase cards with smooth image transitions
- Ownership and performance stat panels styled for a futuristic dashboard feel
- Bubble-style info callouts, tooltips, and hover states
- A lightweight cart drawer and other small UI interactions
- A hero landing section that can switch between a static image and frame-based animation assets
- Tesla branding assets and full-size logo artwork used throughout the hero area

## Technologies

- React 19
- Vite 8
- Tailwind CSS 4
- Custom HTML, CSS, and inline JavaScript for the landing page experience
- GitHub Pages for deployment

## Visual Style

The design leans into a clean Tesla-like palette with high contrast and restrained accents:

- White and off-white surfaces for the main reading areas
- Deep black and charcoal for structure and contrast
- Soft gray borders and muted UI chrome
- Red accent details inspired by Tesla branding
- Subtle transparency, blur, and smooth fades for motion

## Project Structure

- `app/src/App.jsx` renders the generated page in an iframe
- `app/public/generated-page.html` is the main page source
- `app/public/assets/` stores the runtime images and logo assets
- `app/public/assets/landing-animation/` stores the frame sequence used for scroll animation tests
- `app/.github/workflows/deploy.yml` publishes the site to GitHub Pages

## Development

- `npm run dev` starts the local Vite server
- `npm run build` creates the production bundle
- `npm run preview` serves the built output locally

## Live Site

[https://denysovski.github.io/TeslaFuturistic/](https://denysovski.github.io/TeslaFuturistic/)

## License

MIT
