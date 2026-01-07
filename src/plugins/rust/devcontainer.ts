import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const rustDevcontainer: Plugin<"rust"> = {
	id: "rust-devcontainer",
	name: "DevContainer",
	description: "VS Code DevContainer for Rust",
	language: "rust",
	category: "devcontainer",
	async getFiles(context: GeneratorContext<"rust">): Promise<GeneratedFile[]> {
		return [
			{
				path: ".devcontainer/devcontainer.json",
				content: JSON.stringify(
					{
						name: context.projectName,
						image: "mcr.microsoft.com/devcontainers/rust:latest",
						customizations: {
							vscode: {
								extensions: [
									"rust-lang.rust-analyzer",
									"tamasfe.even-better-toml",
								],
								settings: {
									"editor.formatOnSave": true,
									"rust-analyzer.checkOnSave.command": "clippy",
								},
							},
						},
						postCreateCommand: "cargo build",
					},
					null,
					4,
				),
			},
		];
	},
};
