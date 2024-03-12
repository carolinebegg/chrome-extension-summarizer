module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    "^.+\\.css$": "<rootDir>/__mocks__/styleMock.js"
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  coverageReporters: ['text', 'html'],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}