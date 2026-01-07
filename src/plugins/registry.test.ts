import { beforeEach, describe, expect, it } from "vitest";
import { PluginRegistry } from "./registry.js";
import type { Language, Plugin } from "./types.js";

const createMockPlugin = (id: string, language: Language): Plugin => ({
    id,
    name: `Mock ${id}`,
    description: `Mock plugin ${id}`,
    language,
    category: "core",
    getFiles: async () => [{ path: `${id}.txt`, content: `${id} content` }],
});

describe("PluginRegistry", () => {
    let registry: PluginRegistry;

    beforeEach(() => {
        registry = new PluginRegistry();
    });

    describe("register", () => {
        it("should register a plugin", () => {
            const plugin = createMockPlugin("test-plugin", "ts");
            registry.register(plugin);

            expect(registry.get("test-plugin")).toBe(plugin);
        });

        it("should throw error when registering duplicate plugin", () => {
            const plugin = createMockPlugin("test-plugin", "ts");
            registry.register(plugin);

            expect(() => registry.register(plugin)).toThrow(
                "Plugin 'test-plugin' is already registered",
            );
        });
    });

    describe("get", () => {
        it("should return undefined for non-existent plugin", () => {
            expect(registry.get("non-existent")).toBeUndefined();
        });

        it("should return registered plugin", () => {
            const plugin = createMockPlugin("my-plugin", "python");
            registry.register(plugin);

            expect(registry.get("my-plugin")).toBe(plugin);
        });
    });

    describe("getByLanguage", () => {
        it("should return plugins filtered by language", () => {
            const tsPlugin1 = createMockPlugin("ts-1", "ts");
            const tsPlugin2 = createMockPlugin("ts-2", "ts");
            const pyPlugin = createMockPlugin("py-1", "python");

            registry.register(tsPlugin1);
            registry.register(tsPlugin2);
            registry.register(pyPlugin);

            const tsPlugins = registry.getByLanguage("ts");
            expect(tsPlugins).toHaveLength(2);
            expect(tsPlugins).toContain(tsPlugin1);
            expect(tsPlugins).toContain(tsPlugin2);
        });

        it("should return empty array when no plugins match", () => {
            const tsPlugin = createMockPlugin("ts-1", "ts");
            registry.register(tsPlugin);

            expect(registry.getByLanguage("rust")).toEqual([]);
        });
    });

    describe("getAll", () => {
        it("should return all registered plugins", () => {
            const plugin1 = createMockPlugin("plugin-1", "ts");
            const plugin2 = createMockPlugin("plugin-2", "python");

            registry.register(plugin1);
            registry.register(plugin2);

            const all = registry.getAll();
            expect(all).toHaveLength(2);
            expect(all).toContain(plugin1);
            expect(all).toContain(plugin2);
        });

        it("should return empty array when no plugins registered", () => {
            expect(registry.getAll()).toEqual([]);
        });
    });

    describe("has", () => {
        it("should return true for registered plugin", () => {
            registry.register(createMockPlugin("exists", "ts"));
            expect(registry.has("exists")).toBe(true);
        });

        it("should return false for non-existent plugin", () => {
            expect(registry.has("not-exists")).toBe(false);
        });
    });
});
