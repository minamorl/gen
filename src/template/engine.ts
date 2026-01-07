import path from "node:path";
import { fileURLToPath } from "node:url";
import nunjucks from "nunjucks";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.resolve(__dirname, "../../templates");

/**
 * Template engine wrapper around nunjucks
 */
export class TemplateEngine {
	private env: nunjucks.Environment;

	constructor(templatePath?: string) {
		this.env = new nunjucks.Environment(
			new nunjucks.FileSystemLoader(templatePath ?? templatesDir),
			{
				autoescape: false,
				trimBlocks: true,
				lstripBlocks: true,
			},
		);
	}

	/**
	 * Render a template string with context
	 */
	renderString(template: string, context: Record<string, unknown>): string {
		return this.env.renderString(template, context);
	}

	/**
	 * Render a template file with context
	 */
	async renderFile(
		templatePath: string,
		context: Record<string, unknown>,
	): Promise<string> {
		return new Promise((resolve, reject) => {
			this.env.render(templatePath, context, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result ?? "");
				}
			});
		});
	}

	/**
	 * Add a custom filter
	 */
	addFilter(name: string, fn: (...args: unknown[]) => unknown): void {
		this.env.addFilter(name, fn);
	}

	/**
	 * Add a custom global variable
	 */
	addGlobal(name: string, value: unknown): void {
		this.env.addGlobal(name, value);
	}
}
