import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const rustCore: Plugin<"rust"> = {
    id: "rust-core",
    name: "Rust Core",
    description: "Core Rust project setup with cargo",
    language: "rust",
    category: "core",
    async getFiles(
        context: GeneratorContext<"rust">,
    ): Promise<GeneratedFile[]> {
        const { projectName } = context;
        const _safeName = projectName.replace(/-/g, "_");

        return [
            {
                path: "Cargo.toml",
                content: `[package]
name = "${projectName}"
version = "0.1.0"
edition = "2021"

[dependencies]
`,
            },
            {
                path: "src/main.rs",
                content: `fn main() {
    println!("Hello from ${projectName}!");
}
`,
            },
            {
                path: "src/lib.rs",
                content: `pub fn hello() -> &'static str {
    "Hello from ${projectName}!"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hello() {
        assert_eq!(hello(), "Hello from ${projectName}!");
    }
}
`,
            },
            {
                path: ".gitignore",
                content: `/target
Cargo.lock
**/*.rs.bk
*.pdb
`,
            },
            {
                path: "README.md",
                content: `# ${projectName}

## Build

\`\`\`bash
cargo build
\`\`\`

## Run

\`\`\`bash
cargo run
\`\`\`

## Test

\`\`\`bash
cargo test
\`\`\`

## Lint

\`\`\`bash
cargo clippy
cargo fmt --check
\`\`\`
`,
            },
        ];
    },
};
