const {
	SONAR_PLUGIN,
	UNICORN_PLUGIN,
	IMPORT_PLUGIN,
	IMPORT_PLUGIN_TYPESCRIPT,
	PROMISE_PLUGIN,
	TYPESCRIPT_PLUGIN,
} = require("../plugins.constants.cjs");

module.exports = {
	extends: [IMPORT_PLUGIN_TYPESCRIPT, TYPESCRIPT_PLUGIN],
	parser: "@typescript-eslint/parser",
	settings: {
		"import/resolver": {
			typescript: {
				project: ["**/tsconfig.json"],
				alwaysTryTypes: true,
			},
		},
	},
};
