import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: ['testing-library', 'jest-dom'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      'plugin:testing-library/react',
      'plugin:jest-dom/recommended',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Disable strict rules that cause yellow warnings
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
    },
    overrides: [
      {
        files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
        rules: {
          // Example tweaks, optional:
          'testing-library/no-node-access': 'off',
          'testing-library/no-container': 'off',
        },
      },
    ],
  },
])
