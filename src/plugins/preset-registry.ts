import type { Language, Preset } from "./types.js";

/**
 * Registry for managing presets
 */
export class PresetRegistry {
	private presets: Map<string, Preset> = new Map();

	/**
	 * Register a preset
	 * @throws Error if preset with same ID is already registered
	 */
	register(preset: Preset): void {
		if (this.presets.has(preset.id)) {
			throw new Error(`Preset '${preset.id}' is already registered`);
		}
		this.presets.set(preset.id, preset);
	}

	/**
	 * Get a preset by ID
	 */
	get(id: string): Preset | undefined {
		return this.presets.get(id);
	}

	/**
	 * Get all presets for a specific language
	 */
	getByLanguage(language: Language): Preset[] {
		return Array.from(this.presets.values()).filter(
			(preset) => preset.language === language,
		);
	}

	/**
	 * Get the default preset for a language (first registered)
	 */
	getDefaultForLanguage(language: Language): Preset | undefined {
		return this.getByLanguage(language)[0];
	}

	/**
	 * Get all registered presets
	 */
	getAll(): Preset[] {
		return Array.from(this.presets.values());
	}
}
