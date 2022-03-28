const { PRETTIER_PLUGIN } = require("./plugins.constants.cjs");

const BASE_PLUGIN = "./config/base.cjs";

const rules = {
	"prettier/prettier": "warn",
};

module.exports = {
	extends: [BASE_PLUGIN, PRETTIER_PLUGIN],
	rules,
	overrides: [
		{
			files: ["*.json", "*.json5", "*.jsonc"],
			extends: [BASE_PLUGIN, "./config/json.cjs", PRETTIER_PLUGIN],
			rules,
		},
		{
			files: ["*.yaml", "*.yml"],
			extends: [BASE_PLUGIN, "./config/yaml.cjs", PRETTIER_PLUGIN],
			rules,
		},
		{
			files: ["*.ts"],
			extends: [BASE_PLUGIN, "./config/ts.cjs", PRETTIER_PLUGIN],
			rules,
		},
		{
			files: ["*.vue"],
			extends: [BASE_PLUGIN, "./config/vue.cjs", PRETTIER_PLUGIN],
			rules,
		},
	],
};
