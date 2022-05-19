export default {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*-protocols.ts",
    "!**/protocols/**",
  ],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
