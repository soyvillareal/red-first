/** @type {import('ts-jest').JestConfigWithTsJest} */

const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  rootDir: './',
  moduleFileExtensions: ['js', 'ts'],
  setupFiles: ['./tests/environment.js'],
  setupFilesAfterEnv: ['./tests/setupNODE.ts'],
  collectCoverageFrom: [
    // 'components/**/*.{js,ts}',
    // 'pages/**/*.{js,ts}',
    'server/**/*.{js,ts}',
  ],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  globals: {
    'ts-jest': {
      babelConfig: true, // Asegúrate de que ts-jest utilice la configuración de Babel
    },
  },
};
