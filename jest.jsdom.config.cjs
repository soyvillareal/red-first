/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  rootDir: './',
  moduleNameMapper: {
    '.(css)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  setupFiles: ['./tests/environment.js'],
  setupFilesAfterEnv: ['./tests/setup.js'],
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
  ],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'],
};
