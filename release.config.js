/**
 * @type import("semantic-release").GlobalConfig
 */
export default {
	branches: ["main"],
	plugins: ["@semantic-release/commit-analyzer", "@semantic-release/npm"],
};
