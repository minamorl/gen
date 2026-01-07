import { beforeEach, describe, expect, it } from "vitest";
import { PresetRegistry } from "./preset-registry.js";
import type { Language, Preset } from "./types.js";

const createMockPreset = (id: string, language: Language): Preset => ({
	id,
	name: `Mock ${id}`,
	description: `Mock preset ${id}`,
	language,
	plugins: [`${language}-core`, `${language}-test`],
});

describe("PresetRegistry", () => {
	let registry: PresetRegistry;

	beforeEach(() => {
		registry = new PresetRegistry();
	});

	describe("register", () => {
		it("should register a preset", () => {
			const preset = createMockPreset("ts-default", "ts");
			registry.register(preset);

			expect(registry.get("ts-default")).toBe(preset);
		});

		it("should throw error when registering duplicate preset", () => {
			const preset = createMockPreset("ts-default", "ts");
			registry.register(preset);

			expect(() => registry.register(preset)).toThrow(
				"Preset 'ts-default' is already registered",
			);
		});
	});

	describe("get", () => {
		it("should return undefined for non-existent preset", () => {
			expect(registry.get("non-existent")).toBeUndefined();
		});
	});

	describe("getByLanguage", () => {
		it("should return presets filtered by language", () => {
			const tsPreset = createMockPreset("ts-default", "ts");
			const pyPreset = createMockPreset("py-default", "python");

			registry.register(tsPreset);
			registry.register(pyPreset);

			const tsPresets = registry.getByLanguage("ts");
			expect(tsPresets).toHaveLength(1);
			expect(tsPresets[0]).toBe(tsPreset);
		});
	});

	describe("getDefaultForLanguage", () => {
		it("should return the first preset for a language", () => {
			const tsPreset1 = createMockPreset("ts-default", "ts");
			const tsPreset2 = createMockPreset("ts-minimal", "ts");

			registry.register(tsPreset1);
			registry.register(tsPreset2);

			expect(registry.getDefaultForLanguage("ts")).toBe(tsPreset1);
		});

		it("should return undefined when no preset exists for language", () => {
			expect(registry.getDefaultForLanguage("rust")).toBeUndefined();
		});
	});
});
