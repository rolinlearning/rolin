module.exports = {
    extends: [
      'plugin:astro/recommended',
    ],
    overrides: [
      {
        files: ['*.astro'],
        parser: 'astro-eslint-parser',
        parserOptions: {
          parser: '@typescript-eslint/parser',
          extraFileExtensions: ['.astro'],
        },
        rules: {
          // Add specific rules for .astro files
        },
      },
    ],
  };