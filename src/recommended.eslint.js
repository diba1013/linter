import js from "@eslint/js";
import jsonc from "eslint-plugin-jsonc";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier/recommended";
import unicorn from "eslint-plugin-unicorn";
import vue from "eslint-plugin-vue";
import yml from "eslint-plugin-yml";
import globals from "globals";
import typescript from "typescript-eslint";
import vueParser from "vue-eslint-parser";

/**
 * Defines the custom configuration options for eslint config options.
 *
 * @typedef {Object} CustomLinterOptions
 * @property {string} [root] The root of the eslint configuration
 * @property {'node' | 'browser' | 'shared-node-browser'} [environment] Configure the environment for the project
 * @property {boolean | string | string[]} [typescript] Configure if the root typescript config should be read
 * @property {string[]} [ignores] Configure the global ignore patterns
 * @property {import("eslint").Linter.Config[]} [configs] Additional configuration allowing to overwrite almost anything
 */

/**
 * @typedef {Object} ExposedFlatConfig
 * @property {import("eslint").Linter.Config} customize
 * @property {import("eslint").Linter.Config[]} configurations
 * @property {import("eslint").Linter.Config} [overwrite]
 */

/**
 *
 * @param {ExposedFlatConfig}
 * @returns {import("eslint").Linter.FlatConfig[]} The configured linter configurations.
 */
export function defineCustomizedConfigurations({ customize: overwrite, configurations: configs, overwrite: addition }) {
	const configurations = addition === undefined ? configs : [...configs, addition];
	return configurations.map((configuration) => {
		return {
			...configuration,
			...overwrite,
		};
	});
}

/**
 * Generates a standard linter configuration with various file templates.
 *
 * @param {CustomLinterOptions} options The options to configure the linter settings.
 * @returns {import("eslint").Linter.FlatConfig[]} The configured linter configurations.
 */
export function defineConfig({
	environment = "shared-node-browser",
	root = process.cwd(),
	ignores = ["**/dist/**", "**/build/**", "**/.vscode/**", "**/coverage/**"],
	configs = [],
} = {}) {
	return [
		// JSON
		...defineCustomizedConfigurations({
			customize: {
				files: ["**/*.json"],
				ignores: ["package-lock.json"],
			},
			configurations: [
				// Use base json configuration
				...jsonc.configs["flat/base"],
				// Use recommended json configuration
				jsonc.configs["flat/recommended-with-json"].at(-1),
				// Disable conflicting rules with prettier
				jsonc.configs["flat/prettier"].at(-1),
			],
		}),
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
							"packageManager",
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
						pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
						order: { type: "asc" },
					},
				],
			},
		},
		// YAML
		...defineCustomizedConfigurations({
			customize: {
				files: ["**/*.yaml", "**/*.yml"],
				ignores: ["pnpm-lock.yaml"],
			},
			configurations: [
				// Use base yaml configuration
				...yml.configs["flat/base"],
				// Use standard yaml configuration
				yml.configs["flat/standard"].at(-1),
				// Disable conflicting rules with prettier
				yml.configs["flat/prettier"].at(-1),
			],
		}),
		// JavaScript
		...defineCustomizedConfigurations({
			customize: {
				files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.ts", "**/*.vue"],
			},
			configurations: [
				// Enable recommended eslint configuration
				js.configs.recommended,
				// Enable custom perfectionist configuration
				{
					plugins: {
						perfectionist,
					},
				},
				// Enable recommended unicorn configuration
				unicorn.configs["recommended"],
			],
			overwrite: {
				languageOptions: {
					ecmaVersion: "latest",
					sourceType: "module",
					/**
					 * Define globals based on environment.
					 * https://github.com/eslint/eslintrc/blob/main/conf/environments.js
					 */
					globals: globals[environment],
				},

				rules: {
					/**
					 * Sort imports.
					 * https://eslint-plugin-perfectionist.azat.io/rules/sort-imports
					 */
					"perfectionist/sort-imports": [
						"warn",
						{
							type: "natural",
							groups: [
								["internal-type", "parent-type", "sibling-type", "index-type"],
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
							customGroups: {
								value: {
									node: "node:*",
								},
								type: {
									"node-type": "node:*",
								},
							},
							internalPattern: ["^[@#~]/.*"],
							newlinesBetween: "never",
						},
					],

					/**
					 * Sort named imports.
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
					 * Sort named exports.
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
		}),
		// TypeScript
		...defineCustomizedConfigurations({
			customize: {
				files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
			},
			configurations: [
				// Enable strict typescript configuration, prevent duplication
				...typescript.configs.strictTypeChecked,
				// Enable stylistic typescript configuration, prevent duplication
				...typescript.configs.stylisticTypeChecked,
			],
			overwrite: {
				languageOptions: {
					parserOptions: {
						projectService: true,
						tsconfigRootDir: root,
						extraFileExtensions: [".vue"],
					},
				},

				rules: {
					/**
					 * Use personal preference of types for plain objects and interfaces for classes.
					 * https://typescript-eslint.io/rules/consistent-type-definitions/
					 */
					"@typescript-eslint/consistent-type-definitions": "off",

					/**
					 * Generally, overloading a function is used rarely, and if so, they should be properly documented and distinguished via parameters.
					 * https://typescript-eslint.io/rules/unified-signatures/
					 */
					"@typescript-eslint/unified-signatures": [
						"warn",
						{
							ignoreDifferentlyNamedParameters: true,
						},
					],
				},
			},
		}),
		// Typescript Tests
		{
			files: ["**/*.spec.ts"],
			rules: {
				/**
				 * Disable rule conflicting with chai assertions.
				 * https://typescript-eslint.io/rules/no-unused-expressions/
				 */
				"@typescript-eslint/no-unused-expressions": "off",
			},
		},
		// Vue
		...defineCustomizedConfigurations({
			customize: {
				files: ["**/*.vue"],
			},
			configurations: [
				// Enable community crafted configuration
				...vue.configs["flat/recommended"],
			],
			overwrite: {
				parser: vueParser,
				languageOptions: {
					sourceType: "module",
					parserOptions: {
						parser: typescript.parser,
					},
					globals: {
						...globals.browser,
					},
				},

				rules: {
					/**
					 * Synchronize indent with prettier configuration.
					 * https://eslint.vuejs.org/rules/html-indent.html
					 */
					"vue/html-indent": ["warn", "tab"],
				},
			},
		}),
		// Allow overwrites
		...configs,
		// Prettier
		...defineCustomizedConfigurations({
			configurations: [
				// Enable recommended prettier plugin
				prettier,
			],
			overwrite: {
				rules: {
					/**
					 * Configure prettier as warn since it will be automatically fixed.
					 * https://github.com/prettier/eslint-plugin-prettier#options
					 */
					"prettier/prettier": "warn",
				},
			},
		}),
		// Configure global ignores
		// https://eslint.org/docs/latest/use/configure/ignore#ignoring-files
		{
			ignores,
		},
	];
}
