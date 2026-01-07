#!/usr/bin/env node
import { confirm, input, select } from "@inquirer/prompts";
import { Command } from "commander";
import { Generator } from "./generator/index.js";
import { isLanguage, LANGUAGES, type Language } from "./plugins/types.js";

const program = new Command();

program
    .name("gen")
    .description("Template generator for TS / Python / Rust scaffolds")
    .version("0.1.0");

program
    .command("init")
    .description("Initialize a new project")
    .argument("[language]", "Target language (ts, python, rust)")
    .argument("[name]", "Project name")
    .option("-d, --dir <directory>", "Target directory", ".")
    .option("-y, --yes", "Skip prompts and use defaults")
    .action(async (languageArg, nameArg, options) => {
        try {
            let language: Language;
            let projectName: string;
            const targetDir: string = options.dir;

            if (options.yes) {
                // Non-interactive mode
                if (!languageArg || !isLanguage(languageArg)) {
                    console.error(
                        "Error: Language is required in non-interactive mode (ts, python, rust)",
                    );
                    process.exit(1);
                }
                if (!nameArg) {
                    console.error(
                        "Error: Project name is required in non-interactive mode",
                    );
                    process.exit(1);
                }
                language = languageArg;
                projectName = nameArg;
            } else {
                // Interactive mode
                language =
                    languageArg && isLanguage(languageArg)
                        ? languageArg
                        : await select({
                              message: "Select language:",
                              choices: LANGUAGES.map((lang) => ({
                                  name: lang,
                                  value: lang,
                              })),
                          });

                projectName =
                    nameArg ||
                    (await input({
                        message: "Project name:",
                        default: "my-project",
                    }));

                const confirmed = await confirm({
                    message: `Create ${language} project "${projectName}" in ${targetDir}?`,
                    default: true,
                });

                if (!confirmed) {
                    console.log("Aborted.");
                    process.exit(0);
                }
            }

            const generator = new Generator();
            await generator.generate({
                language,
                projectName,
                targetDir: targetDir === "." ? projectName : targetDir,
            });

            console.log(`\n✅ Project "${projectName}" created successfully!`);
            console.log(`\nNext steps:`);
            console.log(`  cd ${targetDir === "." ? projectName : targetDir}`);

            if (language === "ts") {
                console.log(`  pnpm install`);
                console.log(`  pnpm dev`);
            } else if (language === "python") {
                console.log(`  uv sync`);
                console.log(
                    `  uv run python -m ${projectName.replace(/-/g, "_")}`,
                );
            } else if (language === "rust") {
                console.log(`  cargo build`);
                console.log(`  cargo run`);
            }
        } catch (error) {
            console.error(
                "Error:",
                error instanceof Error ? error.message : error,
            );
            process.exit(1);
        }
    });

program.parse();
