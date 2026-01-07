import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const tsDevcontainer: Plugin<"ts"> = {
    id: "ts-devcontainer",
    name: "DevContainer",
    description: "VS Code DevContainer for TypeScript",
    language: "ts",
    category: "devcontainer",
    async getFiles(context: GeneratorContext<"ts">): Promise<GeneratedFile[]> {
        return [
            {
                path: ".devcontainer/devcontainer.json",
                content: JSON.stringify(
                    {
                        name: context.projectName,
                        image: "mcr.microsoft.com/devcontainers/typescript-node:22",
                        features: {
                            "ghcr.io/devcontainers/features/node:1": {
                                version: "22",
                            },
                        },
                        customizations: {
                            vscode: {
                                extensions: [
                                    "biomejs.biome",
                                    "esbenp.prettier-vscode",
                                ],
                                settings: {
                                    "editor.defaultFormatter": "biomejs.biome",
                                    "editor.formatOnSave": true,
                                },
                            },
                        },
                        postCreateCommand: "pnpm install",
                    },
                    null,
                    4,
                ),
            },
        ];
    },
};
