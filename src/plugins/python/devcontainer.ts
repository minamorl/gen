import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const pythonDevcontainer: Plugin<"python"> = {
    id: "python-devcontainer",
    name: "DevContainer",
    description: "VS Code DevContainer for Python",
    language: "python",
    category: "devcontainer",
    async getFiles(
        context: GeneratorContext<"python">,
    ): Promise<GeneratedFile[]> {
        return [
            {
                path: ".devcontainer/devcontainer.json",
                content: JSON.stringify(
                    {
                        name: context.projectName,
                        image: "mcr.microsoft.com/devcontainers/python:3.12",
                        features: {
                            "ghcr.io/astral-sh/uv:1": {},
                        },
                        customizations: {
                            vscode: {
                                extensions: [
                                    "ms-python.python",
                                    "charliermarsh.ruff",
                                ],
                                settings: {
                                    "python.defaultInterpreterPath":
                                        ".venv/bin/python",
                                    "editor.defaultFormatter":
                                        "charliermarsh.ruff",
                                    "editor.formatOnSave": true,
                                },
                            },
                        },
                        postCreateCommand: "uv sync",
                    },
                    null,
                    4,
                ),
            },
        ];
    },
};
