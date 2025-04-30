import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { dependencies } from "../package.json";

const version = dependencies["@settlemint/sdk-cli"];

async function generateCliDocs() {
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
}

async function shouldSkipCliDocsDownload(targetDir: string) {
  const previousUpload = join(targetDir, `settlemint-${version}.tmp`);
  // Skip if the file already exists
  try {
    await access(previousUpload);
    console.log(
      `[Generate SDK Docs] CLI command reference already generated, skipping`
    );
    return { skip: true, previousUpload };
  } catch {
    // File doesn't exist, continue with download
    return { skip: false, previousUpload };
  }
}

async function downloadFile(
  baseUrl: string,
  currentFile: string,
  retryOptions = { maxRetries: 5 }
) {
  let content = "";
  let retries = 0;
  const { maxRetries } = retryOptions;

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

  return content;
}

function extractLinkedFiles(content: string, currentFile: string) {
  const linkedFiles = [];
  const aHrefRegex = /<a href="(.*?\.md)".*?>/g;
  let match;

  while ((match = aHrefRegex.exec(content)) !== null) {
    const linkedFile = match[1];

    // Handle relative paths
    const normalizedPath = linkedFile.replace(/^\.\//, "");
    const basePath = dirname(currentFile);
    const fullPath = join(basePath, normalizedPath);
    linkedFiles.push(fullPath);
  }

  return linkedFiles;
}

async function saveContentToFile(
  outputPath: string,
  currentFile: string,
  content: string
) {
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
}

async function generateMetaJsonFiles(
  processedFiles: Set<string>,
  cliReferenceTargetDir: string
) {
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
        .filter((name) => name !== dirBasename) // Filter out files with same name as directory
        .sort((a, b) => a.localeCompare(b)), // Sort the files alphabetically
    };

    await writeFile(metaPath, JSON.stringify(metaContent, null, 2));
    console.log(`[Generate SDK Docs] Created: ${metaPath}`);
  }
}

// https://github.com/settlemint/sdk/blob/v2.2.0/sdk/cli/docs/settlemint.md
// Download CLI command reference documentation
async function generateCliCommandDocs() {
  console.log("[Generate SDK Docs] Starting CLI command reference download...");

  const targetDir = join(__dirname, "..", "content", "snippets", "dev-tools");
  const { skip, previousUpload } = await shouldSkipCliDocsDownload(targetDir);

  if (skip) {
    return;
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

    try {
      const outputPath = join(
        cliReferenceTargetDir,
        currentFile === "settlemint.md" ? "command-reference.mdx" : currentFile
      );

      const content = await downloadFile(baseUrl, currentFile);
      await saveContentToFile(outputPath, currentFile, content);

      // Find links to other .md files
      const linkedFiles = extractLinkedFiles(content, currentFile);

      for (const fullPath of linkedFiles) {
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
  await generateMetaJsonFiles(processedFiles, cliReferenceTargetDir);

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
      // Remove preceding content from command paths like "Hardhat > Deploy > Remote" to keep only the last part
      .replace(/<h2.*?>(.*?)<\/h2>/g, (match) => {
        const parts = match.match(/<h2.*?>(.*?)<\/h2>/)?.[1].split(" > ");
        if (!parts) {
          return match;
        }
        return `## ${parts[parts.length - 1]}`;
      })
      .replace(/<h3.*?>(.*?)<\/h3>/g, (match) => {
        const parts = match.match(/<h3.*?>(.*?)<\/h3>/)?.[1].split(" > ");
        if (!parts) {
          return match;
        }
        return `### ${parts[parts.length - 1]}`;
      })
      .replace(/<h4.*?>(.*?)<\/h4>/g, (match) => {
        const parts = match.match(/<h4.*?>(.*?)<\/h4>/)?.[1].split(" > ");
        if (!parts) {
          return match;
        }
        return `#### ${parts[parts.length - 1]}`;
      })
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

// Execute the functions
await generateCliDocs();
await generateCliCommandDocs();
