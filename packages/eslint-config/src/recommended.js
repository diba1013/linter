import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import jsonc from "eslint-plugin-jsonc";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier";
import promise from "eslint-plugin-promise";
import unicorn from "eslint-plugin-unicorn";
import vue from "eslint-plugin-vue";
import yml from "eslint-plugin-yml";
import globals from "globals";
import jsoncParser from "jsonc-eslint-parser";
import vueParser from "vue-eslint-parser";
import yamlParser from "yaml-eslint-parser";

/**
 * Defines the custom configuration options for eslint config options.
 *
 * @typedef {Object} CustomLinterOptions
 * @property {string} [root] The root of the eslint configuration
 * @property {'node' | 'browser'} [environment] Configure the environment for the project
 * @property {boolean | string | string[]} [typescript] Configure if the root typescript config should be read
 * @property {string[]} [ignores] Configure the global ignore patterns
 */

/**
 * Generates a standard linter configuration with various file templates.
 *
 * @param {CustomLinterOptions} options The options to configure the linter settings.
 * @returns {import("eslint").Linter.FlatConfig[]} The configured linter configurations.
 */
export function defineConfig({
	root = process.cwd(),
	typescript: tsconfig = "tsconfig.json",
	ignores = ["**/dist/**", "**/build/**", "**/.vscode/**", "**/coverage/**"],
} = {}) {
	return [
		// JSON
		{
			files: ["**/*.json"],
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
			files: ["**/package.json"],
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
							"engines",
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
						pathPattern:
							"^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
						order: { type: "asc" },
					},
				],
			},
		},
		// YAML
		{
			files: ["**/*.{yaml,yml}"],
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
		// JavaScript
		{
			files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,vue}"],
			plugins: {
				unicorn,
				promise,
				perfectionist,
			},
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module",
					parserPath: "espree",
				},
				globals: {
					...globals.browser,
					...globals.node,
					...globals.serviceworker,
					...globals.worker,
				},
			},
			rules: {
				...js.configs.recommended.rules,
				...unicorn.configs.recommended.rules,
				...promise.configs.recommended.rules,

				/**
				 * Sort imports
				 * https://eslint-plugin-perfectionist.azat.io/rules/sort-imports
				 */
				"perfectionist/sort-imports": [
					"warn",
					{
						type: "natural",
						groups: [
							[
								"internal-type",
								"parent-type",
								"sibling-type",
								"index-type",
							],
							["node-type"],
							["type", "builtin-type"],
							["internal", "parent", "sibling", "index"],
							["node"],
							["external", "builtin"],
							["style"],
							["side-effect"],
							["object"],
							["unknown"],
						],
						"custom-groups": {
							value: {
								node: "node:*",
							},
							type: {
								"node-type": "node:*",
							},
						},
						"internal-pattern": ["@/**", "#/**", "~/**"],
						"newlines-between": "never",
					},
				],

				/**
				 * Sort named imports
				 * https://eslint-plugin-perfectionist.azat.io/rules/sort-named-imports
				 */
				"perfectionist/sort-named-imports": [
					"warn",
					{
						type: "natural",
						order: "asc",
					},
				],

				/**
				 * Sort named exports
				 * https://eslint-plugin-perfectionist.azat.io/rules/sort-named-exports
				 */
				"perfectionist/sort-named-exports": [
					"warn",
					{
						type: "natural",
						order: "asc",
					},
				],
			},
		},
		{
			files: ["**/*.{ts,tsx,cts,mts,vue}"],
			plugins: {
				"@typescript-eslint": typescript,
			},
			languageOptions: {
				parser: typescriptParser,
				parserOptions: {
					tsconfigRootDir: root,
					project: tsconfig,
				},
			},
			rules: {
				...typescript.configs["eslint-recommended"].overrides[0].rules,
				...typescript.configs.recommended.rules,
				...typescript.configs["recommended-requiring-type-checking"]
					.rules,
			},
		},
		{
			files: ["**/*.vue"],
			plugins: {
				vue,
			},
			languageOptions: {
				parser: vueParser,
				parserOptions: {
					parser: typescriptParser,
				},
			},
			rules: {
				...vue.configs["vue3-essential"].rules,
				...vue.configs["vue3-strongly-recommended"].rules,
				...vue.configs["vue3-recommended"].rules,

				/**
				 * Enforce different naming strategy for vue files
				 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
				 */
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
				sourceType: "module",
			},
			rules: {
				"prettier/prettier": "warn",
				"arrow-body-style": "off",
				"prefer-arrow-callback": "off",
				"no-mixed-spaces-and-tabs": "off",
			},
		},
		// Configure global ignores
		{
			ignores,
		},
	];
}

/**
 * @type Linter.FlatConfig[]
 */
export default defineConfig();
