import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const pythonGithubActions: Plugin<"python"> = {
    id: "python-github-actions",
    name: "GitHub Actions",
    description: "GitHub Actions CI/CD for Python",
    language: "python",
    category: "ci",
    async getFiles(
        _context: GeneratorContext<"python">,
    ): Promise<GeneratedFile[]> {
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

      - name: Install uv
        uses: astral-sh/setup-uv@v5

      - name: Set up Python
        run: uv python install 3.12

      - name: Install dependencies
        run: uv sync

      - name: Lint
        run: |
          uv run ruff check .
          uv run ruff format --check .

      - name: Test
        run: uv run pytest
`,
            },
        ];
    },
};
