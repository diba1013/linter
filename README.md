# config

The missing linter/formatter config for personal use.

## Installation

Add github as npm registry within `.npmrc`:

```bash
@diba1013:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${YOUR_GITHUB_TOKEN}
```

Then, add the dependency with the following command (use your preferred package manager). The eslint dependencies are installed automatically.

```
npm add -D @diba1013/linter eslint prettier
```

## Usage

This package provides multiple configurations. Do note that this is ESM only, so you will need to make sure that the file extension matches your `type` configuration.

```
# prettier.config.js
import { defineConfig } from "@diba1013/linter/prettier";

export default defineConfig();
```

```
# eslint.config.js
import { defineConfig } from "@diba1013/linter/eslint";

export default defineConfig({
	typescript: "./tsconfig.json",
});
```
