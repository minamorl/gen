import { beforeEach, describe, expect, it } from "vitest";
import { TemplateEngine } from "./engine.js";

describe("TemplateEngine", () => {
	let engine: TemplateEngine;

	beforeEach(() => {
		engine = new TemplateEngine();
	});

	describe("renderString", () => {
		it("should render a simple template string", () => {
			const result = engine.renderString("Hello, {{ name }}!", {
				name: "World",
			});
			expect(result).toBe("Hello, World!");
		});

		it("should handle nested variables", () => {
			const result = engine.renderString(
				"Project: {{ project.name }} by {{ project.author }}",
				{
					project: { name: "gen", author: "minamorl" },
				},
			);
			expect(result).toBe("Project: gen by minamorl");
		});

		it("should handle conditionals", () => {
			const template = `{% if useTypeScript %}typescript{% else %}javascript{% endif %}`;
			expect(engine.renderString(template, { useTypeScript: true })).toBe(
				"typescript",
			);
			expect(engine.renderString(template, { useTypeScript: false })).toBe(
				"javascript",
			);
		});

		it("should handle loops", () => {
			const template = `{% for item in items %}{{ item }}{% if not loop.last %}, {% endif %}{% endfor %}`;
			const result = engine.renderString(template, { items: ["a", "b", "c"] });
			expect(result).toBe("a, b, c");
		});
	});

	describe("renderFile", () => {
		it("should render a template file", async () => {
			const result = await engine.renderFile("test/simple.njk", {
				name: "Test",
			});
			expect(result).toBe("Hello, Test!\n");
		});
	});

	describe("addFilter", () => {
		it("should add custom filter", () => {
			engine.addFilter("shout", (str: string) => str.toUpperCase());
			const result = engine.renderString("{{ name | shout }}", {
				name: "hello",
			});
			expect(result).toBe("HELLO");
		});
	});
});
