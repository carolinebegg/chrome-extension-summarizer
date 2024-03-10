module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js', "./src/setupTests.ts"],
  // other Jest configuration options...
  coverageReporters: ['text', 'html'],
  transform: {
      ".+\\.ts$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js"],
}