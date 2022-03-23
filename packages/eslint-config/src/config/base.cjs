const {
	SONAR_PLUGIN,
	UNICORN_PLUGIN,
	PRETTIER_PLUGIN,
	IMPORT_PLUGIN,
	IMPORT_PLUGIN_TYPESCRIPT,
	PROMISE_PLUGIN,
} = require("../plugins.constants.cjs");

module.exports = {
	extends: [SONAR_PLUGIN, UNICORN_PLUGIN, PROMISE_PLUGIN, IMPORT_PLUGIN, IMPORT_PLUGIN_TYPESCRIPT, PRETTIER_PLUGIN],
	rules: {
		"prettier/prettier": "warn",
		"unicorn/prefer-node-protocol": "off",
		"unicorn/filename-case": [
			"error",
			{
				case: "kebabCase",
			},
		],
		"import/no-unresolved": [
			"warn",
			{
				ignore: ["\\.(svg|json)$"],
			},
		],
		"import/order": ["warn"],
		"spaced-comment": ["warn", "always"],
	},
};
