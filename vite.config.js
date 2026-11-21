import { defineConfig } from 'vite';

// GitHub Pages serves the site from /TeslaFuturistic/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/TeslaFuturistic/' : '/',
  build: { assetsInlineLimit: 0 },
}));
