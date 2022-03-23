const { VUE_PLUGIN } = require("../plugins.constants.cjs");

module.exports = {
	extends: ["./ts.cjs", VUE_PLUGIN],
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		sourceType: "module",
	},
	rules: {
		"unicorn/filename-case": [
			"error",
			{
				case: "pascalCase",
			},
		],
	},
};
