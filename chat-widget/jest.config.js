module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: [
    "**/__tests__/**/*.tsx",
    "**/?(*.)+(spec|test).tsx"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}; 