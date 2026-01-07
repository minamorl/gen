import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const tsVitest: Plugin<"ts"> = {
	id: "ts-vitest",
	name: "Vitest",
	description: "Vitest test framework for TypeScript",
	language: "ts",
	category: "test",
	async getFiles(_context: GeneratorContext<"ts">): Promise<GeneratedFile[]> {
		return [
			{
				path: "vitest.config.ts",
				content: `import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["src/**/*.test.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
        },
    },
});
`,
			},
			{
				path: "src/index.test.ts",
				content: `import { describe, expect, it } from "vitest";
import { main } from "./index.js";

describe("main", () => {
    it("should run without error", () => {
        expect(() => main()).not.toThrow();
    });
});
`,
			},
		];
	},
};
