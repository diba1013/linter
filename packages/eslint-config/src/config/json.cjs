const { JSON_PLUGIN, JSON_PLUGIN_PRETTIER } = require("../plugins.constants.cjs");

module.exports = {
	extends: [JSON_PLUGIN, JSON_PLUGIN_PRETTIER],
	parser: "jsonc-eslint-parser",
	overrides: [
		{
			files: ["package.json"],
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
	],
};
