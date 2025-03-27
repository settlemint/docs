import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Function to convert text to sentence case
function toSentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Function to process a single line
function processLine(line: string): string {
  // Match any number of hashes followed by optional number and dot
  // This will match patterns like:
  // "# heading"
  // "### 1. heading"
  // "## 42. heading"
  const headingMatch = line.match(/^(#{1,6})\s*(?:(\d+)\.\s*)?(.+)$/);

  if (headingMatch) {
    const [_, hashes, number, content] = headingMatch;
    // If it's a numbered heading, format accordingly
    if (number) {
      return `${hashes} ${number}. ${toSentenceCase(content.trim())}`;
    }
    // Regular heading
    return `${hashes} ${toSentenceCase(content.trim())}`;
  }

  return line;
}

// Function to process a single file
async function processFile(filePath: string): Promise<void> {
  try {
    const content = await readFile(filePath, "utf-8");
    const lines = content.split("\n");
    const processedLines = lines.map(processLine);
    await writeFile(filePath, processedLines.join("\n"));
    console.log(`✅ Processed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
}

// Function to recursively process all markdown files in a directory
async function processDirectory(dirPath: string, level = 0): Promise<void> {
  try {
    console.log(`📂 Scanning directory: ${dirPath}`);
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);

      if (entry.isDirectory()) {
        console.log(`📁 Entering subdirectory: ${entry.name}`);
        await processDirectory(fullPath, level + 1);
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) &&
        !entry.name.endsWith("Meta.json")
      ) {
        console.log(`📄 Found markdown file: ${entry.name}`);
        await processFile(fullPath);
      } else {
        console.log(`⏭️  Skipping non-markdown file: ${entry.name}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error);
  }
}

// Main execution
const docsPath = join(process.cwd(), "content", "docs");

console.log("🚀 Starting to process markdown files...");
console.log(`📍 Starting from: ${docsPath}\n`);

processDirectory(docsPath)
  .then(() => console.log("\n✨ Finished processing all files"))
  .catch((error) => console.error("❌ Error:", error));
