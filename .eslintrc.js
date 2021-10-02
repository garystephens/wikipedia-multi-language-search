/* global module */

module.exports = {
    extends: ['eslint:recommended'],
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 9,
        ecmaFeatures: {},
    },
    globals: {
        gtag: 'readonly',
    },
    rules: {
        'no-undef': 'error',
    },
};
