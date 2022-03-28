module.exports = {
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
	],
};
