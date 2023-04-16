import { Linter } from "eslint";
import jsonc from "eslint-plugin-jsonc";
import imports from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import promise from "eslint-plugin-promise";
import unicorn from "eslint-plugin-unicorn";
import vue from "eslint-plugin-vue";
import yml from "eslint-plugin-yml";
import jsoncParser from "jsonc-eslint-parser";
import yamlParser from "yaml-eslint-parser";
import typescriptParser from "@typescript-eslint/parser";
import typescript from "@typescript-eslint/eslint-plugin";
import vueParser from "vue-eslint-parser";
import globals from "globals";
import js from "@eslint/js";

/**
 * @type Linter.FlatConfig[]
 */
export default [
	// Configure JSON
	{
		files: ["*.json"],
		ignores: ["package-lock.json"],
		plugins: {
			jsonc,
		},
		languageOptions: {
			parser: jsoncParser,
		},
		rules: {
			...jsonc.configs.base.overrides[0].rules,
			...jsonc.configs["recommended-with-json"].rules,
			...jsonc.configs["prettier"].rules,
		},
	},
	{
		files: ["package.json"],
		rules: {
			"jsonc/sort-keys": [
				"error",
				{
					pathPattern: "^$",
					order: [
						"name",
						"version",
						"description",
						"keywords",
						"license",
						"repository",
						"funding",
						"author",
						"type",
						"files",
						"exports",
						"main",
						"module",
						"unpkg",
						"bin",
						"scripts",
						"husky",
						"lint-staged",
						"peerDependencies",
						"peerDependenciesMeta",
						"dependencies",
						"devDependencies",
					],
				},
				{
					pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
					order: { type: "asc" },
				},
			],
		},
	},
	// Configure YAML
	{
		files: ["*.{yaml,yml}"],
		ignores: ["pnpm-lock.yaml"],
		plugins: {
			yml,
		},
		languageOptions: {
			parser: yamlParser,
		},
		rules: {
			...yml.configs.base.overrides[0].rules,
			...yml.configs.recommended.rules,
		},
	},
	// Configure JavaScript
	{
		files: ["*.{js,cjs,mjs,ts,.vue}"],
		plugins: {
			unicorn,
			promise,
			import: imports,
		},
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
		rules: {
			...js.configs.recommended.rules,
			...unicorn.configs.recommended.rules,
			...promise.configs.recommended.rules,
			...imports.configs.recommended.rules,

			// Overwrite
			"import/no-unresolved": [
				"warn",
				{
					ignore: ["\\.(png|svg|json)$"],
				},
			],
			"import/order": ["warn"],
		},
	},
	{
		files: ["*.{ts,vue}"],
		plugins: {
			typescript,
		},
		languageOptions: {
			parser: typescriptParser,
		},
		settings: {
			"import/extensions": [".ts", ".tsx", ".js", ".jsx"],
			"import/external-module-folders": ["node_modules", "node_modules/@types"],
			"import/parsers": {
				espree: [".js", ".cjs", ".mjs", ".jsx", ".ts", ",tsx"],
				"@typescript-eslint/parser": [".ts", ".tsx"],
			},
			"import/resolver": {
				node: {
					extensions: [".ts", ".tsx", ".js", ".jsx"],
				},
				typescript: {
					project: ["**/tsconfig.json"],
					alwaysTryTypes: true,
				},
			},
		},
		rules: {
			...typescript.configs["eslint-recommended"].rules,
			...typescript.configs.recommended.rules,
		},
	},
	{
		files: ["*.vue"],
		plugins: {
			vue,
		},
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: typescriptParser,
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.browser,
			},
		},
		rules: {
			...vue.configs["vue3-essential"].rules,
			...vue.configs["vue3-strongly-recommended"].rules,
			...vue.configs["vue3-recommended"].rules,

			// Overwrites
			"unicorn/filename-case": [
				"error",
				{
					case: "pascalCase",
				},
			],
		},
	},
	// Configure prettier (last)
	{
		plugins: {
			prettier,
		},
		languageOptions: {
			ecmaVersion: "latest",
		},
		rules: {
			"prettier/prettier": "warn",
			"arrow-body-style": "off",
			"prefer-arrow-callback": "off",
		},
	},
];
