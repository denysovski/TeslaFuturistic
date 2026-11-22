/** @type {import('tailwindcss').Config} Classes are read from the pages, the page templates and the scripts. */
export default {
  content: ['./index.html', './scripts/site/**/*.mjs', './src/**/*.js'],
  theme: { extend: {} },
  plugins: [],
};
