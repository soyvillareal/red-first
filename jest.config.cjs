/** @type {import('ts-jest').JestConfigWithTsJest} */

const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(test).ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  rootDir: './',
  moduleFileExtensions: ['js', 'ts'],
  setupFiles: ['./tests/environment.js'],
  setupFilesAfterEnv: ['./tests/setup.ts'],
  collectCoverageFrom: ['server/**/*.{js,ts}'],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};
