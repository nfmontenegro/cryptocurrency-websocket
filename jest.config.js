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
  collectCoverageFrom: [
    "src/*.ts",
    "src/**/*.ts",
    "!src/database/*/*.ts",
    "!src/middlewares/*.ts",
    "!src/libs/*.ts",
    "!src/dao/*.ts"
  ],
  testMatch: ["<rootDir>/test/**/*.spec.(ts|js)"],
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage"
};
