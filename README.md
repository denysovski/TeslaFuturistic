# Tesla Futuristic (TeslaX)

Tesla Futuristic is a single-page, Tesla-inspired concept showcase built to feel cinematic, premium, and interactive. The whole page is plain, pre-rendered HTML (no app shell), styled with Tailwind compiled at build time, with GSAP for motion.

> **Unofficial concept.** This is a portfolio project. It is not affiliated with, endorsed or sponsored by Tesla, Inc. Tesla and its product names are trademarks of Tesla, Inc.; product photos © Tesla, Inc. Prices, dates and the cart are demo data.

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

- Vite 8 (static build, `index.html` is the page)
- Tailwind CSS 3, compiled at build time from the classes in `index.html`
- GSAP 3 + ScrollTrigger, Iconify icons
- Inter (variable), self-hosted through Fontsource
- sharp for the image pipeline
- GitHub Pages for deployment

## Performance and SEO

- Images are WebP at three or four widths with `srcset` and `sizes`, explicit `width` and `height`, lazy loading below the fold and a high-priority, preloaded hero. The scroll sequence uses 61 small WebP frames, with a lighter set on phones. The site went from about 200 MB of assets to under 7 MB.
- One `h1`, section anchors, every link points somewhere real, descriptive file names and alt text.
- Canonical URL, Open Graph and Twitter cards with a 1200×630 share image, JSON-LD (`WebSite`, `WebPage`, `FAQPage`), `robots.txt`, `sitemap.xml`, `llms.txt`, a web manifest, favicons and a real `404.html`.
- No horizontal scrolling on phones, compact hero stats, a working mobile menu.

## Visual Style

The design leans into a clean Tesla-like palette with high contrast and restrained accents:

- White and off-white surfaces for the main reading areas.
- Deep black and charcoal for structure and contrast.
- Soft gray borders and muted UI chrome.
- Red accent details inspired by Tesla branding.
- Subtle transparency, blur, and smooth fades for motion.

## Project Structure

- `index.html` is the page itself: markup, page styles and the page script.
- `src/main.js` and `src/main.css` pull in Tailwind and the Inter font for the build.
- `public/img/` holds the optimised images (`<name>-<width>.webp`) and `hero-sequence/` the scroll frames.
- `scripts/optimize-images.mjs` rebuilds `public/img/` from originals placed in `assets-src/` (not committed; the originals are in git history).
- `public/robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`, `og-image.jpg` and `404.html` are served as they are.
- `.github/workflows/deploy.yml` publishes the site to GitHub Pages.

## Development

- `npm run dev` starts the local Vite server.
- `npm run build` creates the production bundle.
- `npm run preview` serves the built output locally.
- `npm run images` rebuilds the optimised images from `assets-src/`.

## Live Site

[https://denysovski.github.io/TeslaFuturistic/](https://denysovski.github.io/TeslaFuturistic/)


<img alt="copy1" src="https://github.com/user-attachments/assets/055aec25-707c-4f54-8456-b02c1491758a" />
<img alt="copy2" src="https://github.com/user-attachments/assets/0a780c7e-654d-48b6-a76b-7436a003f47f" />
