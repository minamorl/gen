/**
 * Supported languages as a discriminated union
 */
export type Language = "ts" | "python" | "rust";

export const LANGUAGES: readonly Language[] = ["ts", "python", "rust"] as const;

export function isLanguage(value: unknown): value is Language {
    return typeof value === "string" && LANGUAGES.includes(value as Language);
}

/**
 * Plugin interface for scaffold generators
 */
export interface Plugin<L extends Language = Language> {
    /** Unique identifier for the plugin */
    id: string;
    /** Human-readable name */
    name: string;
    /** Plugin description */
    description: string;
    /** Target language */
    language: L;
    /** Plugin category */
    category: PluginCategory;
    /** Files to generate */
    getFiles(context: GeneratorContext<L>): Promise<GeneratedFile[]>;
    /** Dependencies to add (if applicable) */
    getDependencies?(context: GeneratorContext<L>): Promise<Dependencies>;
}

export type PluginCategory =
    | "package-manager"
    | "linter"
    | "formatter"
    | "test"
    | "ci"
    | "devcontainer"
    | "core";

export interface GeneratorContext<L extends Language = Language> {
    /** Project name */
    projectName: string;
    /** Target directory */
    targetDir: string;
    /** Selected language */
    language: L;
    /** Additional options */
    options: Record<string, unknown>;
}

export interface GeneratedFile {
    /** Relative path from project root */
    path: string;
    /** File content */
    content: string;
}

export interface Dependencies {
    /** Production dependencies */
    dependencies?: Record<string, string>;
    /** Development dependencies */
    devDependencies?: Record<string, string>;
}

/**
 * Preset is a collection of plugins
 */
export interface Preset<L extends Language = Language> {
    id: string;
    name: string;
    description: string;
    language: L;
    plugins: string[]; // Plugin IDs
}
