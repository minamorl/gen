import type { GeneratedFile, GeneratorContext, Plugin } from "../types.js";

export const tsCore: Plugin<"ts"> = {
    id: "ts-core",
    name: "TypeScript Core",
    description: "Core TypeScript project setup with pnpm",
    language: "ts",
    category: "core",
    async getFiles(context: GeneratorContext<"ts">): Promise<GeneratedFile[]> {
        const { projectName } = context;
        const _safeName = projectName.replace(/-/g, "_");

        return [
            {
                path: "package.json",
                content: JSON.stringify(
                    {
                        name: projectName,
                        version: "0.1.0",
                        type: "module",
                        main: "./dist/index.js",
                        types: "./dist/index.d.ts",
                        scripts: {
                            build: "tsc",
                            dev: "tsx src/index.ts",
                            test: "vitest",
                            "test:run": "vitest run",
                            lint: "biome check .",
                            "lint:fix": "biome check --write .",
                        },
                        devDependencies: {
                            "@biomejs/biome": "^2.3.11",
                            "@types/node": "^22.0.0",
                            tsx: "^4.21.0",
                            typescript: "^5.9.3",
                            vitest: "^4.0.16",
                        },
                    },
                    null,
                    4,
                ),
            },
            {
                path: "tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {
                            target: "ES2022",
                            module: "NodeNext",
                            moduleResolution: "NodeNext",
                            lib: ["ES2022"],
                            outDir: "./dist",
                            rootDir: "./src",
                            strict: true,
                            esModuleInterop: true,
                            skipLibCheck: true,
                            forceConsistentCasingInFileNames: true,
                            declaration: true,
                            declarationMap: true,
                            sourceMap: true,
                        },
                        include: ["src/**/*"],
                        exclude: ["node_modules", "dist"],
                    },
                    null,
                    4,
                ),
            },
            {
                path: "src/index.ts",
                content: `export function main(): void {
    console.log("Hello from ${projectName}!");
}

main();
`,
            },
            {
                path: ".gitignore",
                content: `node_modules/
dist/
*.log
.DS_Store
coverage/
.env
.env.local
`,
            },
            {
                path: "README.md",
                content: `# ${projectName}

## Setup

\`\`\`bash
pnpm install
\`\`\`

## Development

\`\`\`bash
pnpm dev
\`\`\`

## Build

\`\`\`bash
pnpm build
\`\`\`

## Test

\`\`\`bash
pnpm test
\`\`\`
`,
            },
        ];
    },
};
