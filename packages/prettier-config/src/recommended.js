/**
 * Defines the custom configuration options for eslint config options.
 *
 * @typedef {Object} CustomLinterOptions
 */

/**
 *
 * @param {CustomLinterOptions} options
 * @returns {import('prettier').Config}
 */
export function defineConfig() {
	return {
		printWidth: 120,
		tabWidth: 4,
		useTabs: true,
		trailingComma: "all",
		singleAttributePerLine: true,
		plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],

		overrides: [
			{
				files: ["*.yaml", "*.yml"],
				options: {
					useTabs: false,
					tabWidth: 2,
				},
			},
			{
				files: ["*.html", "*.vue", "*.css", "*.scss"],
			},
			{
				files: ["*.svelte"],
				options: {
					parser: "svelte",
				},
			},
		],
	};
}

/**
 * @type {import('prettier').Config}
 */
export default defineConfig();
