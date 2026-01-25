module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-native',
    'unused-imports',
    'sort-exports',
    'simple-import-sort',
    'import',
    'promise',
    'unicorn',
    'eslint-comments',
    'prettier',
  ],

  extends: [
    '@react-native-community',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],

  env: {
    es2022: true,
  },

  globals: {
    NodeJS: true,
  },

  parserOptions: {
    ecmaFeatures: {jsx: true},
    // ВАЖНО: не включаю "project" по умолчанию — это утяжеляет линт в RN.
  },

  settings: {
    react: {version: 'detect'},
    // чтобы import/* правила нормально понимали TS пути
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json'],
      },
    },
  },

  rules: {
    /* -------------------- Prettier -------------------- */
    'prettier/prettier': ['error', {endOfLine: 'auto'}],

    /* -------------------- React -------------------- */
    'react/react-in-jsx-scope': 'off',

    /* -------------------- Hooks -------------------- */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(usePollingEffect)',
      },
    ],

    /* -------------------- React Native строгие правила -------------------- */
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-color-literals': 'error',
    'react-native/no-raw-text': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'react-native/sort-styles': [
      'error',
      'asc',
      {ignoreClassNames: false, ignoreStyleProperties: false},
    ],

    /* -------------------- TypeScript -------------------- */
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {prefer: 'type-imports', fixStyle: 'separate-type-imports'},
    ],
    '@typescript-eslint/no-unused-vars': 'off', // заменяем на unused-imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    /* -------------------- Imports/Exports -------------------- */
    // Сортировка экспортов
    'sort-exports/sort-exports': ['error', {sortDir: 'asc'}],

    // Стабильная сортировка импортов + автофикс
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^react$', '^react-native$'],
          ['^@?\\w'],
          ['^@(api|assets|components|hooks|navigation|redux|schema|screens|types|utils)(/.*|$)'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    // Дополнительно полезно (но не конфликтует с simple-import-sort)
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              'api/*',
              'assets/*',
              'components/*',
              'hooks/*',
              'navigation/*',
              'redux/*',
              'schema/*',
              'screens/*',
              'types/*',
              'utils/*',
            ],
            message: 'Запрещён импорт из baseUrl. Используй @alias (например @utils/...).',
          },
        ],
      },
    ],

    /* -------------------- Общее качество -------------------- */
    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', prev: 'block-like', next: '*'},
    ],

    'no-console': ['warn', {allow: ['warn', 'error']}],

    // Unicorn
    'unicorn/filename-case': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-array-reduce': 'off',
  },

  overrides: [
    // Конфиги/скрипты — Node окружение и можно require
    {
      files: [
        '*.config.js',
        '*.config.cjs',
        '.eslintrc.js',
        'babel.config.js',
        'metro.config.js',
        'src/assets/images/**/*',
        'src/assets/bootsplash/**/*',
      ],
      env: {node: true},
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'unicorn/prefer-module': 'off',
      },
    },

    // Тесты
    {
      files: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**'],
      env: {jest: true},
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'unicorn/no-useless-undefined': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },

    // JS-файлы
    {
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
