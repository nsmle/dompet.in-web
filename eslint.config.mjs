// @ts-ignore
import pluginNext from "@next/eslint-plugin-next";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import { flatConfigs as importPluginFlatConfigs } from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";
import pluginTailwind from "eslint-plugin-tailwindcss";

const eslintConfigNextjs = {
	name: "ESLint Config - NextJS",
	languageOptions: {
		parser,
		parserOptions: {
			ecmaVersion: 2017,
			sourceType: "module",
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
	plugins: {
		"@next/next": pluginNext,
		"@typescript-eslint": pluginTypeScript,
	},
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: "./tsconfig.json",
			},
			node: true,
		},
	},
	files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
	rules: {
		...pluginNext.configs.recommended.rules,
		...pluginNext.configs["core-web-vitals"].rules,
		"import/no-unresolved": ["warn", { commonjs: true, amd: true }],
		"import/named": "warn",
		"import/namespace": "warn",
		"import/default": "warn",
		"import/export": "warn",
		"import/order": [
			"warn",
			{
				groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
			},
		],
	},
};

const prettierConfig = (name, files, prettierRules, otherRules, others, ruleRes = "error") => ({
	name: `ESLint Prettier Config - ${name}`,
	files: files,
	plugins: {
		prettier: prettierPlugin,
	},
	rules: {
		"prettier/prettier": [
			ruleRes,
			{
				arrowParens: "always",
				singleQuote: false,
				jsxSingleQuote: false,
				semi: true,
				trailingComma: "all",
				tabWidth: 2,
				endOfLine: "auto",
				printWidth: 160,
				useTabs: true,
				tsdoc: true,
				...prettierRules,
			},
		],
		...otherRules,
	},
	...others,
});

const eslintPrettierConfig = [
	prettierConfig("JSX & TSX", ["**/*.{jsx,tsx}"], {
		jsxSingleQuote: false,
		tabWidth: 2,
	}),
	prettierConfig("JS & TS", ["**/*.{js,mjs,cjs,ts}"], {
		tabWidth: 4,
	}),
	prettierConfig("TS, CTS & TSX", ["**/*.{ts,cts,tsx}"], { tabWidth: 4 }, { "@typescript-eslint/explicit-function-return-type": "warn" }),
];

export default [
	eslintConfigNextjs,
	prettierConfigRecommended,
	importPluginFlatConfigs.recommended,
	...pluginTailwind.configs["flat/recommended"],
	...eslintPrettierConfig,
];
