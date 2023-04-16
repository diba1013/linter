/**
 * @types import('stylelint').Config
 */
module.exports = {
	extends: ["stylelint-config-standard"],
	overrides: [
		{
			files: "*.vue",
			customSyntax: "postcss-html",
			rules: {
				"function-no-unknown": [true, { ignoreFunctions: ["v-bind"] }],
			},
		},
	],
};
