module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testPathIgnorePatterns: ["<rootDir>/src/libs/secrets"],
  testMatch: ["<rootDir>/test/**/*.spec.(ts|js)"],
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage"
};
