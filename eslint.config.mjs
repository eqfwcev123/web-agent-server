// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {

        '@typescript-eslint/no-dynamic-delete': 'off', // Confirmed
      '@typescript-eslint/no-unnecessary-template-expression': 'error', // TODO: enable this rule later
      '@typescript-eslint/no-misused-spread': 'off', // Confirmed
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error', // TODO: enable this rule later
      '@typescript-eslint/no-non-null-assertion': 'off', // Confirmed
      '@typescript-eslint/no-extraneous-class': 'off', // Confirmed
      '@typescript-eslint/no-unsafe-assignment': 'off', // TODO: enable this rule later
      '@typescript-eslint/no-unsafe-member-access': 'off', // TODO: enable this rule later
      '@typescript-eslint/restrict-template-expressions': 'off', // TODO: enable this rule later
      '@typescript-eslint/no-unnecessary-condition': 'off', // TODO: enable this rule later
      '@typescript-eslint/no-unsafe-argument': 'off', // TODO: enable this rule later
      '@typescript-eslint/no-unsafe-enum-comparison': 'off', // TODO: enable this rule later
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // TODO: enable this rule later
      '@typescript-eslint/no-unsafe-return': 'warn', // TODO: enable this rule later
      '@typescript-eslint/no-unsafe-call': 'warn', // TODO: enable this rule later
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }], // TODO: enable this rule later
      '@typescript-eslint/require-await': 'off', // Confirmed
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-unused-vars': 'warn', // Confirmed
      '@typescript-eslint/no-dupe-class-members': 'error', // Confirmed
      '@typescript-eslint/no-empty-function': 'off', // Confirmed
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { arguments: false } }], // Confirmed
      '@typescript-eslint/prefer-for-of': 'off', // TODO: enable this rule later
      'no-eq-null': 'error', // Confirmed
      'no-await-in-loop': 'off', // Confirmed
      'no-param-reassign': ['error', { props: false }], // Confirmed
      'no-empty': ['error', { allowEmptyCatch: true }], // Confirmed
      'max-classes-per-file': 'off', // Confirmed
      'class-methods-use-this': 'off', // Confirmed
      'import/no-cycle': ['warn', { maxDepth: 3 }], // TODO: enable this rule later
      'unused-imports/no-unused-imports': 'error', // Confirmed
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',

      // Indentation rules - use tabs with width 4
      'indent': ['error', 'tab', { 
        'SwitchCase': 1,
        'MemberExpression': 1,
        'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
        'FunctionExpression': { 'parameters': 1, 'body': 1 },
        'CallExpression': { 'arguments': 1 },
        'ArrayExpression': 1,
        'ObjectExpression': 1
      }],
      '@typescript-eslint/indent': 'off', // Disable TypeScript indent rule to avoid conflicts
      
      // Formatting rules to replace Prettier
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-infix-ops': 'error',
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'max-len': ['error', { 'code': 80, 'tabWidth': 4 }]
    },
  },
);