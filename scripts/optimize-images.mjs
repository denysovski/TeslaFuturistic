// Builds the web images from the originals in assets-src/ (not committed; the originals are in git history).
//   node scripts/optimize-images.mjs
// Output: public/img/<descriptive-name>-<width>.webp at several widths (never wider than the source),
// public/img/hero-sequence/<width>/frame-NNN.webp for the scroll sequence, and the favicons.
import sharp from 'sharp';
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/img';
mkdirSync(join(OUT, 'hero-sequence', '1600'), { recursive: true });
mkdirSync(join(OUT, 'hero-sequence', '960'), { recursive: true });

// original file → descriptive name, widths to produce.
// Phones are 3× screens: a full-width photo on a 430 px phone needs ~1300 px,
// and a 16:9 photo cropped into a taller box needs more. So the ladder runs to
// 3200 px (never past the source), and src/shared.js asks for the width the
// crop actually needs instead of trusting `sizes`.
const CONTENT = [640, 960, 1280, 1920, 2560, 3200];
export const IMAGES = {
  'ModelYPerformance_70.png': ['model-y-performance-hero', [828, 1280, 1920, 2560]],
  'ModelS_82.jpg': ['model-s-interior-cockpit', CONTENT],
  'ModelS_92.jpg': ['model-s-interior-front-seats', CONTENT],
  'ModelS_94.jpg': ['model-s-interior-rear-cabin', CONTENT],
  'ModelS_89.jpg': ['tesla-in-car-gaming', CONTENT],
  'ModelY_76.jpg': ['model-y-safety-chassis', CONTENT],
  'Model3_72.jpg': ['tesla-electric-chassis', CONTENT],
  'Model3_71.jpg': ['tesla-vision-camera-network', CONTENT],
  'Model3_98.jpg': ['tesla-model-3', CONTENT],
  'ModelY_89.jpg': ['tesla-model-y', CONTENT],
  'ModelS_75.jpg': ['tesla-model-s', CONTENT],
  'ModelX_97.jpg': ['tesla-model-x', CONTENT],
  'Model3_93.jpg': ['tesla-phone-key', CONTENT],
  'trip-planner.jpg': ['tesla-trip-planner', [640, 970]],
  'sentry-mode.webp': ['tesla-sentry-mode', [640, 1280, 1920]],
  'SolarPanels_81.jpg': ['tesla-home-energy-ecosystem', CONTENT],
  'SolarPanels_82.jpg': ['tesla-home-energy-storage', CONTENT],
  'Group_45.jpg': ['tesla-software-update', CONTENT],
  'tesla2.webp': ['tesla-megapack', CONTENT],
  'Group_60.jpg': ['tesla-long-term-value', CONTENT],
  'Model3_84.jpg': ['future-tesla-phone-key', [640, 960, 1280, 1920]],
  'Model3_90.jpg': ['future-tesla-trip-planner', [640, 960, 1280, 1920]],
  'Model3_89.jpg': ['future-tesla-sentry-mode', [640, 960, 1280, 1920]],
  'Model3_83.jpg': ['future-tesla-home-energy', [640, 960, 1280, 1920]],
  'homepage.jpg': ['model-3-studio', CONTENT],
  'model4.jpg': ['model-x-road', CONTENT],
  'interrior1.jpg': ['model-3-interior', CONTENT],
  'tesla3.jpg': ['tesla-roadster-studio', CONTENT],
  'tesla7.webp': ['grid-storage-wind-solar', CONTENT],
  'home-energy.jpg': ['home-solar-garage', [640, 960, 1200]],
  'Tesla.png': ['tesla-wordmark', [300, 600]],
  'tesla-logo-full.png': ['tesla-logo', [270, 540, 810]],
};

// Art-directed crops: a region of a source, for a different aspect ratio on phones.
export const CROPS = [
  // portrait Model S Plaid for the hero on phones, cut from the same photo as tesla-model-s
  ['ModelS_75.jpg', 'model-s-plaid-hero-mobile', [640, 828, 1080, 1364], { left: 1768, top: 500, width: 1364, height: 1750 }],
];

const sizes = {};
for (const [file, name, widths, region] of CROPS) {
  for (const w of widths) {
    await sharp(join(SRC, file)).extract(region).resize({ width: w }).webp({ quality: w <= 960 ? 80 : 76, effort: 6, smartSubsample: true }).toFile(join(OUT, `${name}-${w}.webp`));
  }
  sizes[name] = { widths, w: region.width, h: region.height };
}
for (const [file, [name, widths]] of Object.entries(IMAGES)) {
  const img = sharp(join(SRC, file));
  const meta = await img.metadata();
  const ws = [...new Set(widths.map((w) => Math.min(w, meta.width)))];
  for (const w of ws) {
    await sharp(join(SRC, file))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: name.startsWith('tesla-wordmark') || name === 'tesla-logo' ? 90 : w <= 960 ? 78 : 74, effort: 6, alphaQuality: 90, smartSubsample: true })
      .toFile(join(OUT, `${name}-${w}.webp`));
  }
  sizes[name] = { widths: ws, w: meta.width, h: meta.height };
}
writeFileSync(join(OUT, 'sizes.json'), JSON.stringify(sizes, null, 2) + '\n');

// scroll sequence: 61 frames, a desktop and a phone set (slow; only with --sequence)
const withSequence = process.argv.includes('--sequence');
const frames = !withSequence ? [] : readdirSync(join(SRC, 'landing-animation')).filter((f) => f.endsWith('.png')).sort();
let i = 0;
for (const f of frames) {
  i++;
  const n = String(i).padStart(3, '0');
  for (const w of [1600, 960]) {
    await sharp(join(SRC, 'landing-animation', f)).resize({ width: w }).webp({ quality: 68, effort: 5 })
      .toFile(join(OUT, 'hero-sequence', String(w), `frame-${n}.webp`));
  }
}

// favicons from the square logo
const icon = join(SRC, 'tesla-logo.png');
await sharp(icon).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('public/favicon-32.png');
await sharp(icon).resize(180, 180, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile('public/apple-touch-icon.png');
await sharp(icon).resize(512, 512, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile('public/icon-512.png');
console.log(`${Object.keys(IMAGES).length} images, ${frames.length} frames done`);
