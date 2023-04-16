// require("prettier").Config
module.exports = {
	editorconfig: true,
	pluginSearchDirs: false,

	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	trailingComma: "all",
	singleAttributePerLine: true,

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
			plugins: ["prettier-plugin-tailwindcss"],
		},
	],
};
