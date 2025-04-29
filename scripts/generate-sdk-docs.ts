import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

console.log("[Generate SDK Docs] Starting SDK documentation generation...");

const sdkDocsPath = "./node_modules/@settlemint/sdk-cli/README.md";
console.log(
  `[Generate SDK Docs] Reading SDK documentation from: ${sdkDocsPath}`
);
const sdkDocs = await readFile(sdkDocsPath, "utf-8");

const lines = sdkDocs.split("\n");
const aboutIndex = lines.indexOf("## About");
console.log(
  `[Generate SDK Docs] Found "## About" section at line: ${aboutIndex}`
);
const content = lines.slice(aboutIndex).join("\n");

const targetDir = join(__dirname, "..", "content", "snippets", "dev-tools");
console.log(`[Generate SDK Docs] Creating target directory: ${targetDir}`);
await mkdir(targetDir, { recursive: true });

const outputPath = join(targetDir, "cli.mdx");
console.log(`[Generate SDK Docs] Writing content to: ${outputPath}`);
await writeFile(outputPath, content);

console.log(
  "[Generate SDK Docs] SDK documentation generation completed successfully!"
);
