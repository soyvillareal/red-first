const path = require('path');

module.exports = {
  localePath: path.resolve('./public/locales'),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
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
