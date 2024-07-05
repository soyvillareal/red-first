const path = require('path');
const { languages, defaultLanguage } = require('./lib/i18nConfig');

module.exports = {
  localePath: path.resolve('./public/locales'),
  i18n: {
    defaultLocale: defaultLanguage,
    locales: languages,
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false, // May be necessary to avoid rendering issues
  },
  serializeConfig: false, // May be necessary to avoid serialization issues in production version
  reloadOnPrerender: process.env.NODE_ENV == 'development', // May be necessary to avoid pre-rendering issues
};
