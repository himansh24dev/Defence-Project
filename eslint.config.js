import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

const noUnusedVarsRule = ['error', {
  varsIgnorePattern: '^[A-Z_]',
  argsIgnorePattern: '^[_A-Z]',       // also ignore UpperCase component params
  caughtErrorsIgnorePattern: '^_',
}]

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  // ── Node / server files ──────────────────────────────────────────────────
  {
    files: ['api/**/*.js', 'vite.config.js', 'dev-server.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.node },
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    rules: {
      'no-unused-vars': noUnusedVarsRule,
      'no-useless-escape': 'warn',
    },
  },

  // ── Test files ───────────────────────────────────────────────────────────
  {
    files: ['src/test/**/*.{js,jsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        test: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': noUnusedVarsRule,
    },
  },

  // ── React source files ───────────────────────────────────────────────────
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': noUnusedVarsRule,
      'react-hooks/set-state-in-effect': 'off', // intentional pattern in timer/modal resets
    },
  },
])
