/**
 * Defines the custom configuration options for eslint config options.
 *
 * @typedef {Object} CustomLinterOptions
 */

/**
 *
 * @param {CustomLinterOptions} options
 * @returns {import('stylelint').Config}
 */
function defineConfig() {
	return {
		extends: ["stylelint-config-standard"],
		overrides: [
			{
				files: "**/*.vue",
				customSyntax: "postcss-html",
				rules: {
					"function-no-unknown": [true, { ignoreFunctions: ["v-bind"] }],
				},
			},
		],
	};
}

module.exports = {
	default: defineConfig(),
	defineConfig,
};
