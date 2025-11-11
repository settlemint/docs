import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { dependencies } from "../package.json";

const version = dependencies["@settlemint/sdk-cli"];

async function generateSnippet(sdkDocsPath: string, outputFilename: string) {
  console.log("[Generate SDK Docs] Starting SDK documentation generation...");

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

  const targetDir = join(__dirname, "..", "content", "docs", "sdk");
  console.log(`[Generate SDK Docs] Creating target directory: ${targetDir}`);
  await mkdir(targetDir, { recursive: true });

  const outputPath = join(targetDir, outputFilename);
  console.log(`[Generate SDK Docs] Writing content to: ${outputPath}`);
  // replace 'https://github.com/settlemint/sdk/tree/v2.2.0/sdk/cli/docs/settlemint.md' with '/sdk/cli/command-reference'
  const updatedContent = content.replace(
    /https:\/\/github\.com\/settlemint\/sdk\/tree\/.*?\/sdk\/cli\/docs\/settlemint\.md/,
    "/sdk/cli/command-reference"
  );
  
  // Add frontmatter to the content
  const frontmatter = generateSnippetFrontmatter(outputFilename);
  const contentWithFrontmatter = `${frontmatter}\n\n${escapeContent(updatedContent)}`;
  
  await writeFile(outputPath, contentWithFrontmatter);

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

    // Format the label and title
    const formattedName = escapeTitle(dirBasename);

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

  const targetDir = join(__dirname, "..", "content", "docs", "sdk");
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
    "content/docs/sdk/cli"
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
  return (
    content
      // Remove heading 1 (# and <h1>) from the content
      .replace(/^# (.*)/, "")
      .replace(/<h1.*?>(.*?)<\/h1>/, "")
      // Cleanup heading 2, 3, 4 tags to keep only the last part
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
      // Remove all ".md" extensions in a href tags
      .replace(/<a href="([^"]+)\.md"/g, '<a href="$1"')
      // Remove all anchor links (toc of the docs handles this automatically)
      .replace(/<a href="#.*?">(.*?)<\/a>/g, "$1")
      // Escape all <p> and <pre> tags ({<p>...</p> and {<pre>...</pre>})
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
description: "CLI command reference for SettleMint platform"
---

${content}`;
  }
  const formattedTitle = escapeTitle(title);
  return `---
title: "${formattedTitle}"
description: "CLI command documentation for ${formattedTitle}"
---

${content}`;
}

function escapeTitle(title: string): string {
  return title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ");
}

function generateSnippetFrontmatter(filename: string): string {
  // Remove .mdx extension and generate title
  const nameWithoutExt = filename.replace(/\.mdx$/, "");
  
  // Map filenames to titles
  const titleMap: Record<string, string> = {
    index: "SDK CLI",
    viem: "Viem SDK",
    minio: "MinIO SDK",
    portal: "Portal SDK",
    hasura: "Hasura SDK",
    blockscout: "Blockscout SDK",
    ipfs: "IPFS SDK",
    "the-graph": "The Graph SDK",
    eas: "EAS SDK",
  };

  const title = titleMap[nameWithoutExt] || escapeTitle(nameWithoutExt);
  
  // Generate description based on the SDK
  const descriptionMap: Record<string, string> = {
    index: "Command-line interface for interacting with the SettleMint platform",
    viem: "Lightweight wrapper for Viem client configuration with SettleMint",
    minio: "SDK for MinIO object storage integration with SettleMint",
    portal: "SDK for SettleMint API Portal integration",
    hasura: "SDK for Hasura GraphQL engine integration with SettleMint",
    blockscout: "SDK for Blockscout blockchain explorer integration",
    ipfs: "SDK for IPFS (InterPlanetary File System) integration",
    "the-graph": "SDK for The Graph protocol integration with SettleMint",
    eas: "SDK for Ethereum Attestation Service (EAS) integration",
  };

  const description = descriptionMap[nameWithoutExt] || `SDK documentation for ${title}`;

  return `---
title: "${title}"
description: "${description}"
---`;
}

async function generateSdkMetaJson() {
  console.log("[Generate SDK Docs] Generating SDK meta.json file");

  const sdkDir = join(__dirname, "..", "content", "docs", "sdk");
  const metaPath = join(sdkDir, "meta.json");

  const metaContent = {
    title: "SDK",
    root: true,
    pages: [
      "index",
      "viem",
      "minio",
      "portal",
      "hasura",
      "blockscout",
      "ipfs",
      "the-graph",
      "eas",
    ],
  };

  await writeFile(metaPath, JSON.stringify(metaContent, null, 2));
  console.log(`[Generate SDK Docs] Created: ${metaPath}`);
}

// Execute the functions
await generateSnippet(
  "./node_modules/@settlemint/sdk-cli/README.md",
  "index.mdx"
);
await generateSnippet(
  "./node_modules/@settlemint/sdk-viem/README.md",
  "viem.mdx"
);
await generateSnippet(
  "./node_modules/@settlemint/sdk-minio/README.md",
  "minio.mdx"
);
await generateSnippet(
  "./node_modules/@settlemint/sdk-portal/README.md",
  "portal.mdx"
);
await generateSnippet(
  "./node_modules/@settlemint/sdk-hasura/README.md",
  "hasura.mdx"
);
await generateSnippet(
  "./node_modules/@settlemint/sdk-blockscout/README.md",
  "blockscout.mdx"
);
await generateSnippet(
  "./node_modules/@settlemint/sdk-ipfs/README.md",
  "ipfs.mdx"
);
await generateSnippet(
  "./node_modules/@settlemint/sdk-thegraph/README.md",
  "the-graph.mdx"
);
await generateSnippet(
  "./node_modules/@settlemint/sdk-eas/README.md",
  "eas.mdx"
);
await generateCliCommandDocs();
await generateSdkMetaJson();
