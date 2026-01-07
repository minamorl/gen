import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const tsGithubActions: Plugin<"ts"> = {
	id: "ts-github-actions",
	name: "GitHub Actions",
	description: "GitHub Actions CI/CD for TypeScript",
	language: "ts",
	category: "ci",
	async getFiles(_context: GeneratorContext<"ts">): Promise<GeneratedFile[]> {
		return [
			{
				path: ".github/workflows/ci.yml",
				content: `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test:run

      - name: Build
        run: pnpm build
`,
			},
		];
	},
};
