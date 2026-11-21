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

// original file → descriptive name, widths to produce
const CONTENT = [640, 1280, 1920];
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
  'Model3_93.jpg': ['tesla-phone-key', [640, 1280]],
  'trip-planner.jpg': ['tesla-trip-planner', [640, 970]],
  'sentry-mode.webp': ['tesla-sentry-mode', [640, 1280]],
  'SolarPanels_81.jpg': ['tesla-home-energy-ecosystem', CONTENT],
  'SolarPanels_82.jpg': ['tesla-home-energy-storage', CONTENT],
  'Group_45.jpg': ['tesla-software-update', CONTENT],
  'tesla2.webp': ['tesla-megapack', [640, 1280, 1920]],
  'Group_60.jpg': ['tesla-long-term-value', CONTENT],
  'Model3_84.jpg': ['future-tesla-phone-key', [640, 1280]],
  'Model3_90.jpg': ['future-tesla-trip-planner', [640, 1280]],
  'Model3_89.jpg': ['future-tesla-sentry-mode', [640, 1280]],
  'Model3_83.jpg': ['future-tesla-home-energy', [640, 1280]],
  'tesla9.jpg': ['cart-charging-cable', [160]],
  'tesla11.jpg': ['cart-tesla-mug', [160]],
  'interrior3.jpg': ['cart-screen-protector', [160]],
  'Tesla.png': ['tesla-wordmark', [300]],
  'tesla-logo-full.png': ['tesla-logo', [270]],
};

const sizes = {};
for (const [file, [name, widths]] of Object.entries(IMAGES)) {
  const img = sharp(join(SRC, file));
  const meta = await img.metadata();
  const ws = [...new Set(widths.map((w) => Math.min(w, meta.width)))];
  for (const w of ws) {
    await sharp(join(SRC, file))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: name.startsWith('tesla-wordmark') || name === 'tesla-logo' ? 90 : 72, effort: 5, alphaQuality: 90 })
      .toFile(join(OUT, `${name}-${w}.webp`));
  }
  sizes[name] = { widths: ws, w: meta.width, h: meta.height };
}
writeFileSync(join(OUT, 'sizes.json'), JSON.stringify(sizes, null, 2) + '\n');

// scroll sequence: 61 frames, a desktop and a phone set
const frames = readdirSync(join(SRC, 'landing-animation')).filter((f) => f.endsWith('.png')).sort();
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
