import type { Language, Plugin } from "./types.js";

/**
 * Registry for managing plugins
 */
export class PluginRegistry {
    private plugins: Map<string, Plugin> = new Map();

    /**
     * Register a plugin
     * @throws Error if plugin with same ID is already registered
     */
    register(plugin: Plugin): void {
        if (this.plugins.has(plugin.id)) {
            throw new Error(`Plugin '${plugin.id}' is already registered`);
        }
        this.plugins.set(plugin.id, plugin);
    }

    /**
     * Get a plugin by ID
     */
    get(id: string): Plugin | undefined {
        return this.plugins.get(id);
    }

    /**
     * Check if a plugin is registered
     */
    has(id: string): boolean {
        return this.plugins.has(id);
    }

    /**
     * Get all plugins for a specific language
     */
    getByLanguage(language: Language): Plugin[] {
        return Array.from(this.plugins.values()).filter(
            (plugin) => plugin.language === language,
        );
    }

    /**
     * Get all registered plugins
     */
    getAll(): Plugin[] {
        return Array.from(this.plugins.values());
    }
}
