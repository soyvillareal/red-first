module.exports = function (api) {
  api.cache(true);

  const presets = ['next/babel', '@babel/preset-typescript'];

  const plugins = [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-parameter-decorator',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ];

  return {
    presets,
    plugins,
  };
};
