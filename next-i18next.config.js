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
    useSuspense: false, // Puede ser necesario para evitar problemas de renderizado
  },
  serializeConfig: false, // Puede ser necesario para evitar problemas de serialización en la versión de producción
  reloadOnPrerender: process.env.NODE_ENV == 'development', // Puede ser necesario para evitar problemas de prerenderizado
};
