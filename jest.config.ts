import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
	coverageProvider: "v8",
	preset: "ts-jest",
	testEnvironment: "node",
	verbose: true,
	testMatch: ["<rootDir>/tests/unit/**/*.test.ts"],
	moduleNameMapper: {
		"^@service/(.*)$": "<rootDir>/src/services/$1",
		"^@repository/(.*)$": "<rootDir>/src/services/repositories/$1",
		"^@util/(.*)$": "<rootDir>/src/utils/$1",
		"^@src/(.*)$": "<rootDir>/src/$1",
		"^@app/(.*)$": "<rootDir>/src/app/$1",
		"^@/(.*)$": "<rootDir>/$1",
	},
};

export default createJestConfig(config);
