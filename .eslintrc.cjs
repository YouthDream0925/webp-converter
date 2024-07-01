module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    'sourceType': 'module',
    'ecmaVersion': 2020,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    'object-curly-spacing': 'off',
    'no-useless-escape': 'off',
    'linebreak-style': 'off',
    'require-jsdoc': 0,
    'comma-dangle': 'off',
    'guard-for-in': 'off',
    'indent': 'off',
    'max-len': 'off',
    'new-cap': 'off',
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
