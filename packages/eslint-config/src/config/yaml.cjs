const { YAML_PLUGIN, YAML_PLUGIN_PRETTIER } = require("../plugins.constants.cjs");

module.exports = {
	extends: [YAML_PLUGIN, YAML_PLUGIN_PRETTIER],
	parser: "yaml-eslint-parser",
};
