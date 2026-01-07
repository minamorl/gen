import type { PresetRegistry } from "../plugins/preset-registry.js";
import type { Preset } from "../plugins/types.js";

const tsDefault: Preset<"ts"> = {
    id: "ts-default",
    name: "TypeScript Default",
    description:
        "TypeScript with pnpm, biome, vitest, GitHub Actions, devcontainer",
    language: "ts",
    plugins: [
        "ts-core",
        "ts-biome",
        "ts-vitest",
        "ts-github-actions",
        "ts-devcontainer",
    ],
};

const pythonDefault: Preset<"python"> = {
    id: "python-default",
    name: "Python Default",
    description: "Python with uv, ruff, pytest, GitHub Actions, devcontainer",
    language: "python",
    plugins: [
        "python-core",
        "python-ruff",
        "python-pytest",
        "python-github-actions",
        "python-devcontainer",
    ],
};

const rustDefault: Preset<"rust"> = {
    id: "rust-default",
    name: "Rust Default",
    description: "Rust with cargo, clippy, GitHub Actions, devcontainer",
    language: "rust",
    plugins: [
        "rust-core",
        "rust-clippy",
        "rust-github-actions",
        "rust-devcontainer",
    ],
};

export function registerDefaultPresets(registry: PresetRegistry): void {
    registry.register(tsDefault);
    registry.register(pythonDefault);
    registry.register(rustDefault);
}
