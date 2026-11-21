import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'assets-src']),
  {
    files: ['**/*.{js,mjs}'],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.browser, ...globals.node } },
  },
]);
