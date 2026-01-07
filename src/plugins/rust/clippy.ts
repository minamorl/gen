import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const rustClippy: Plugin<"rust"> = {
    id: "rust-clippy",
    name: "Clippy",
    description: "Clippy linter and rustfmt for Rust",
    language: "rust",
    category: "linter",
    async getFiles(
        _context: GeneratorContext<"rust">,
    ): Promise<GeneratedFile[]> {
        return [
            {
                path: "rustfmt.toml",
                content: `edition = "2021"
tab_spaces = 4
max_width = 100
use_small_heuristics = "Default"
`,
            },
            {
                path: "clippy.toml",
                content: `# Clippy configuration
# https://rust-lang.github.io/rust-clippy/master/index.html
`,
            },
        ];
    },
};
