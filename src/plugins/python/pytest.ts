import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const pythonPytest: Plugin<"python"> = {
	id: "python-pytest",
	name: "Pytest",
	description: "Pytest test framework for Python",
	language: "python",
	category: "test",
	async getFiles(
		context: GeneratorContext<"python">,
	): Promise<GeneratedFile[]> {
		const { projectName } = context;
		const safeName = projectName.replace(/-/g, "_");

		return [
			{
				path: "pytest.ini",
				content: `[pytest]
testpaths = tests
python_files = test_*.py
python_functions = test_*
addopts = -v --tb=short
`,
			},
			{
				path: "tests/__init__.py",
				content: `"""Tests for ${projectName}."""
`,
			},
			{
				path: `tests/test_${safeName}.py`,
				content: `"""Tests for the main module."""

from ${safeName} import main


def test_main() -> None:
    """Test that main runs without error."""
    main()
`,
			},
		];
	},
};
