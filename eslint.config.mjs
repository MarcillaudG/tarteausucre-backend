import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import fs from 'fs';
const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

export default tseslint.config(
  {
    ignores: ['typings.ts', '*.d.ts', 'dist/**', 'node_modules/**', 'coverage/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // Prettier - handles formatting including quotes
      'prettier/prettier': ['error', prettierOptions],

      // TypeScript
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // General
      'no-unreachable': 'error',
      'no-process-env': 'error',
      'consistent-return': 'error',

      // Unused imports
      'unused-imports/no-unused-imports': 'error',

      // Import rules
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'never',
          groups: [
            'builtin', // Node.js built-in modules (fs, path, etc.)
            'external', // npm packages (@nestjs/*, typeorm, etc.)
            'internal', // Internal modules (../../config, etc.)
            'parent', // Relative imports (../sessions, etc.)
            'sibling', // Relative imports (./phases, etc.)
            'index', // Index imports
            'object', // Object imports
            'type', // Type imports
          ],
          pathGroups: [
            {
              pattern: '@nestjs/**',
              group: 'external',
            },
            {
              pattern: 'typeorm',
              group: 'external',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      // Allow default exports in test files
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['src/main.ts'],
    rules: {
      // Allow process.env in main entry file
      'no-process-env': 'off',
    },
  },
);
