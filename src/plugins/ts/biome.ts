import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const tsBiome: Plugin<"ts"> = {
	id: "ts-biome",
	name: "Biome",
	description: "Biome linter and formatter for TypeScript",
	language: "ts",
	category: "linter",
	async getFiles(_context: GeneratorContext<"ts">): Promise<GeneratedFile[]> {
		return [
			{
				path: "biome.json",
				content: JSON.stringify(
					{
						$schema: "https://biomejs.dev/schemas/2.3.11/schema.json",
						vcs: {
							enabled: true,
							clientKind: "git",
							useIgnoreFile: true,
						},
						files: {
							ignoreUnknown: false,
							includes: ["src/**", "*.json", "*.ts"],
						},
						formatter: {
							enabled: true,
							indentStyle: "tab",
						},
						linter: {
							enabled: true,
							rules: {
								recommended: true,
							},
						},
						javascript: {
							formatter: {
								quoteStyle: "double",
							},
						},
						assist: {
							enabled: true,
							actions: {
								source: {
									organizeImports: "on",
								},
							},
						},
					},
					null,
					4,
				),
			},
		];
	},
};
