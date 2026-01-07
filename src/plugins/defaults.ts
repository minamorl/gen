import { pythonCore } from "./python/core.js";
import { pythonDevcontainer } from "./python/devcontainer.js";
import { pythonGithubActions } from "./python/github-actions.js";
import { pythonPytest } from "./python/pytest.js";
import { pythonRuff } from "./python/ruff.js";
import type { PluginRegistry } from "./registry.js";
import { rustClippy } from "./rust/clippy.js";
import { rustCore } from "./rust/core.js";
import { rustDevcontainer } from "./rust/devcontainer.js";
import { rustGithubActions } from "./rust/github-actions.js";
import { tsBiome } from "./ts/biome.js";
import { tsCore } from "./ts/core.js";
import { tsDevcontainer } from "./ts/devcontainer.js";
import { tsGithubActions } from "./ts/github-actions.js";
import { tsVitest } from "./ts/vitest.js";

export function registerDefaultPlugins(registry: PluginRegistry): void {
    // TypeScript plugins
    registry.register(tsCore);
    registry.register(tsBiome);
    registry.register(tsVitest);
    registry.register(tsGithubActions);
    registry.register(tsDevcontainer);

    // Python plugins
    registry.register(pythonCore);
    registry.register(pythonRuff);
    registry.register(pythonPytest);
    registry.register(pythonGithubActions);
    registry.register(pythonDevcontainer);

    // Rust plugins
    registry.register(rustCore);
    registry.register(rustClippy);
    registry.register(rustGithubActions);
    registry.register(rustDevcontainer);
}
