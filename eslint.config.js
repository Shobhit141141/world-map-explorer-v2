import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  {
    plugins: { prettier: pluginPrettier },
    rules: { 'prettier/prettier': 'error' },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
];
