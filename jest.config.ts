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
  preset: "@shelf/jest-mongodb",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
