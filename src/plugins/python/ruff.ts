import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const pythonRuff: Plugin<"python"> = {
	id: "python-ruff",
	name: "Ruff",
	description: "Ruff linter and formatter for Python",
	language: "python",
	category: "linter",
	async getFiles(
		_context: GeneratorContext<"python">,
	): Promise<GeneratedFile[]> {
		return [
			{
				path: "ruff.toml",
				content: `line-length = 100
target-version = "py312"

[lint]
select = [
    "E",   # pycodestyle errors
    "W",   # pycodestyle warnings
    "F",   # Pyflakes
    "I",   # isort
    "B",   # flake8-bugbear
    "C4",  # flake8-comprehensions
    "UP",  # pyupgrade
    "ARG", # flake8-unused-arguments
    "SIM", # flake8-simplify
]
ignore = [
    "E501",  # line too long (handled by formatter)
]

[format]
quote-style = "double"
indent-style = "space"
`,
			},
		];
	},
};
