const importSortingRules = {
  'sort-imports': [
    'warn',
    {
      // sort-imports can't sort import lines so we'll use eslint-plugin-import instead
      ignoreDeclarationSort: true,
    },
  ],
  'import/order': [
    'warn',
    {
      groups: [
        'builtin', // built-in imports go first
        'external', // then external imports
        'internal', // then absolute imports
        ['sibling', 'parent'], // then relative imports (siblings and parents can go together)
        'index', // then index imports
        'unknown', // then everything else
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
};

const defaultRules = {
  '@typescript-eslint/no-unused-vars': [
    'warn',
    { argsIgnorePattern: '^_', ignoreRestSiblings: true },
  ],
  ...importSortingRules,
};

module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.test.*', '**/*.e2e.*'],
      rules: {
        ...defaultRules,
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  root: true,
  rules: defaultRules,
};
