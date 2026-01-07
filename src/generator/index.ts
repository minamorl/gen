import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { registerDefaultPlugins } from "../plugins/defaults.js";
import { PluginRegistry, PresetRegistry } from "../plugins/index.js";
import type {
    GeneratedFile,
    GeneratorContext,
    Language,
    Plugin,
} from "../plugins/types.js";
import { registerDefaultPresets } from "../presets/defaults.js";
import { TemplateEngine } from "../template/index.js";

export interface GeneratorOptions {
    language: Language;
    projectName: string;
    targetDir: string;
    options?: Record<string, unknown>;
}

export class Generator {
    private pluginRegistry: PluginRegistry;
    private presetRegistry: PresetRegistry;
    private templateEngine: TemplateEngine;

    constructor() {
        this.pluginRegistry = new PluginRegistry();
        this.presetRegistry = new PresetRegistry();
        this.templateEngine = new TemplateEngine();

        registerDefaultPlugins(this.pluginRegistry);
        registerDefaultPresets(this.presetRegistry);
    }

    async generate(options: GeneratorOptions): Promise<void> {
        const { language, projectName, targetDir } = options;

        const preset = this.presetRegistry.getDefaultForLanguage(language);
        if (!preset) {
            throw new Error(`No preset found for language: ${language}`);
        }

        const plugins = preset.plugins
            .map((id) => this.pluginRegistry.get(id))
            .filter((p): p is Plugin => p !== undefined);

        const context: GeneratorContext = {
            projectName,
            targetDir: path.resolve(targetDir),
            language,
            options: options.options ?? {},
        };

        // Collect all files from plugins
        const allFiles: GeneratedFile[] = [];
        for (const plugin of plugins) {
            const files = await plugin.getFiles(context);
            allFiles.push(...files);
        }

        // Create target directory
        await fs.mkdir(context.targetDir, { recursive: true });

        // Write all files
        for (const file of allFiles) {
            const filePath = path.join(context.targetDir, file.path);
            await fs.mkdir(path.dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, file.content);
        }

        // Initialize git and create initial commit
        await this.initGit(context.targetDir, projectName);
    }

    private async initGit(
        targetDir: string,
        projectName: string,
    ): Promise<void> {
        try {
            execSync("git init", { cwd: targetDir, stdio: "pipe" });
            execSync("git add -A", { cwd: targetDir, stdio: "pipe" });
            execSync(
                `git commit -m "chore: initial commit for ${projectName}"`,
                {
                    cwd: targetDir,
                    stdio: "pipe",
                },
            );
        } catch {
            // Git might not be available, continue anyway
            console.warn("Warning: Could not initialize git repository");
        }
    }
}
