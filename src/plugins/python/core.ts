import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const pythonCore: Plugin<"python"> = {
    id: "python-core",
    name: "Python Core",
    description: "Core Python project setup with uv",
    language: "python",
    category: "core",
    async getFiles(
        context: GeneratorContext<"python">,
    ): Promise<GeneratedFile[]> {
        const { projectName } = context;
        const safeName = projectName.replace(/-/g, "_");

        return [
            {
                path: "pyproject.toml",
                content: `[project]
name = "${projectName}"
version = "0.1.0"
description = ""
readme = "README.md"
requires-python = ">=3.12"
dependencies = []

[project.scripts]
${safeName} = "${safeName}:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.uv]
dev-dependencies = [
    "pytest>=8.0.0",
    "ruff>=0.8.0",
]
`,
            },
            {
                path: `${safeName}/__init__.py`,
                content: `"""${projectName} - A Python project."""

__version__ = "0.1.0"


def main() -> None:
    """Entry point for the application."""
    print(f"Hello from {__name__}!")


if __name__ == "__main__":
    main()
`,
            },
            {
                path: ".gitignore",
                content: `__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
.env
.venv
venv/
ENV/
.pytest_cache/
.coverage
htmlcov/
.ruff_cache/
`,
            },
            {
                path: "README.md",
                content: `# ${projectName}

## Setup

\`\`\`bash
uv sync
\`\`\`

## Run

\`\`\`bash
uv run ${safeName}
\`\`\`

## Test

\`\`\`bash
uv run pytest
\`\`\`

## Lint

\`\`\`bash
uv run ruff check .
uv run ruff format .
\`\`\`
`,
            },
        ];
    },
};
