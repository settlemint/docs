import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { dependencies } from "../package.json";

const version = dependencies["@settlemint/sdk-cli"];

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
// replace 'https://github.com/settlemint/sdk/tree/v2.2.0/sdk/cli/docs/settlemint.md)' with '/building-with-settlemint/cli/command-reference'
const updatedContent = content.replace(
  /https:\/\/github\.com\/settlemint\/sdk\/tree\/.*?\/sdk\/cli\/docs\/settlemint\.md/,
  "/building-with-settlemint/cli/command-reference"
);
await writeFile(outputPath, escapeContent(updatedContent));

console.log(
  "[Generate SDK Docs] SDK documentation generation completed successfully!"
);

// https://github.com/settlemint/sdk/blob/v2.2.0/sdk/cli/docs/settlemint.md
// Download CLI command reference documentation
async function downloadCliDocs() {
  console.log("[Generate SDK Docs] Starting CLI command reference download...");

  const previousUpload = join(targetDir, `settlemint-${version}.tmp`);
  // Skip if the file already exists
  try {
    await access(previousUpload);
    console.log(
      `[Generate SDK Docs] CLI command reference already generated, skipping`
    );
    return;
  } catch {
    // File doesn't exist, continue with download
  }

  // Base URL for the CLI documentation
  const baseUrl = `https://raw.githubusercontent.com/settlemint/sdk/v${version}/sdk/cli/docs`;

  // Initial file to download
  const initialFile = "settlemint.md";
  const processedFiles = new Set<string>();
  const filesToProcess = [initialFile];
  const cliReferenceTargetDir = join(
    __dirname,
    "..",
    "content/docs/building-with-settlemint/cli"
  );

  while (filesToProcess.length > 0) {
    const currentFile = filesToProcess.shift();
    if (!currentFile || processedFiles.has(currentFile)) {
      continue;
    }

    console.log(`[Generate SDK Docs] Downloading: ${currentFile}`);

    let content: string = "";
    try {
      const outputPath = join(
        cliReferenceTargetDir,
        currentFile === "settlemint.md" ? "command-reference.mdx" : currentFile
      );
      let retries = 0;
      const maxRetries = 5;

      while (retries < maxRetries) {
        const response = await fetch(`${baseUrl}/${currentFile}`);

        if (response.status === 429) {
          retries++;
          console.log(
            `[Generate SDK Docs] Rate limited (429), retrying ${retries}/${maxRetries}...`
          );
          // Exponential backoff with jitter
          const delay = Math.floor(
            1000 * Math.pow(2, retries) + Math.random() * 1000
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          if (!response.ok) {
            console.error(
              `[Generate SDK Docs] Failed to download ${currentFile}: ${response.status} ${response.statusText}`
            );
            process.exit(1);
          }
          content = await response.text();
          break;
        }
      }

      // Ensure the directory exists
      const outputDir = dirname(outputPath);
      await mkdir(outputDir, { recursive: true });
      // Change the extension to .mdx for the output file
      const mdxOutputPath = outputPath.replace(/\.md$/, ".mdx");
      await writeFile(
        mdxOutputPath,
        addFrontmatter(currentFile, escapeContent(content))
      );
      console.log(`[Generate SDK Docs] Saved: ${mdxOutputPath}`);

      // Find links to other .md files
      const aHrefRegex = /<a href="(.*?\.md)".*?>/g;
      let match;

      while ((match = aHrefRegex.exec(content)) !== null) {
        const linkedFile = match[1];

        // Handle relative paths
        const normalizedPath = linkedFile.replace(/^\.\//, "");
        const basePath = dirname(currentFile);
        const fullPath = join(basePath, normalizedPath);
        if (
          !processedFiles.has(fullPath) &&
          !filesToProcess.includes(fullPath)
        ) {
          filesToProcess.push(fullPath);
        }
      }

      processedFiles.add(currentFile);
    } catch (error) {
      console.error(
        `[Generate SDK Docs] Error processing ${currentFile}:`,
        error
      );
    }
  }

  await writeFile(previousUpload, version);

  // Generate meta.json files for CLI command directories
  console.log("[Generate SDK Docs] Generating meta.json files");

  // Get all directories from processed files
  const allDirs = new Set(
    Array.from(processedFiles)
      .filter((file) => file.includes("settlemint/"))
      .map((file) => dirname(file))
  );

  // Create meta.json for each directory
  for (const dir of allDirs) {
    const metaPath = join(cliReferenceTargetDir, dir, "meta.json");
    const dirBasename = basename(dir);

    // Format the label and title with first letter capitalized
    const formattedName =
      dirBasename.charAt(0).toUpperCase() + dirBasename.slice(1);

    const metaContent = {
      label: dir === "settlemint" ? "Commands" : formattedName,
      title: dir === "settlemint" ? "Commands" : formattedName,
      icon: "Square-code",
      pages: Array.from(processedFiles)
        .filter((file) => dirname(file) === dir)
        .map((file) => basename(file).replace(/\.md$/, ""))
        .filter((name) => name !== dirBasename), // Filter out files with same name as directory
    };

    await writeFile(metaPath, JSON.stringify(metaContent, null, 2));
    console.log(`[Generate SDK Docs] Created: ${metaPath}`);
  }

  console.log(
    `[Generate SDK Docs] Downloaded ${processedFiles.size} documentation files`
  );
}

function escapeContent(content: string): string {
  // Remove all ".md" extensions in a href tags
  // Remove heading 1 (# and <h1>) from the content
  // Escape all <p> and <pre> tags ({<p>...</p> and {<pre>...</pre>})
  return (
    content
      .replace(/^# (.*)/, "")
      .replace(/<h1.*?>(.*?)<\/h1>/, "")
      .replace(/<h2.*?>(.*?)<\/h2>/g, "## $1")
      .replace(/href="#home"/g, 'href="#"')
      .replace(/<a href="([^"]+)\.md"/g, '<a href="$1"')
      .replace(/<p>/g, "{<p>")
      .replace(/<\/p>/g, "</p>}")
      .replace(/<pre>/g, "<div className='cli-command'>{<pre>")
      .replace(/<\/pre>/g, "</pre>}</div>")
      // Replace spaces with {' '} inside <pre> tags to preserve formatting in JSX
      .replace(/(<pre>[\s\S]*?<\/pre>)/g, (match) => {
        return match.replace(/\n/g, "<br />");
      })
      .trim()
      // Remove all newlines at the beginning
      .replace(/^[\n\r]+/, "")
      // Remove all newlines at the end
      .replace(/[\n\r]+$/, "")
  );
}

function addFrontmatter(path: string, content: string): string {
  const title = basename(path).replace(/\.md$/, "");
  if (title === "settlemint") {
    return `---
title: "Command reference"
description: CLI command reference for SettleMint platform
---

${content}`;
  }
  return `---
title: ${title.charAt(0).toUpperCase() + title.slice(1)}
---

${content}`;
}

// Execute the download function
await downloadCliDocs();
