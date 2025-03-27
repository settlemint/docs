import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Abbreviations configuration - ADD NEW ABBREVIATIONS HERE
const ABBREVIATIONS = [
  "CLI",
  "EVM",
  "AI",
  "MCP",
  "IDE",
  "HSM",
  "API",
  "SDK",
  "URL",
  "JSON",
  "GraphQL",

  // Add more abbreviations here in UPPERCASE
  // Example:
  // 'API',
  // 'SDK',
  // 'URL',
];

// Create a regex pattern for abbreviations that matches:
// 1. When they're in parentheses: (CLI)
// 2. When they're standalone with spaces: " CLI "
// 3. When they're at start of line with space after: "CLI "
// 4. When they're at end of line with space before: " CLI"
const createAbbreviationPattern = (abbr: string) => {
  return new RegExp(
    `(?:\\(${abbr}\\))|(?:^${abbr}\\s)|(?:\\s${abbr}\\s)|(?:\\s${abbr}$)`,
    "gi"
  );
};

function preserveAbbreviations(text: string): {
  text: string;
  replacements: Map<string, string>;
} {
  const replacements = new Map<string, string>();
  let processedText = text;

  ABBREVIATIONS.forEach((abbr) => {
    const pattern = createAbbreviationPattern(abbr);
    processedText = processedText.replace(pattern, (match) => {
      const placeholder = `__ABBR_${Math.random().toString(36).substr(2, 9)}__`;
      replacements.set(placeholder, match.replace(abbr, abbr.toUpperCase()));
      return placeholder;
    });
  });

  return { text: processedText, replacements };
}

function restoreAbbreviations(
  text: string,
  replacements: Map<string, string>
): string {
  let restoredText = text;
  replacements.forEach((value, placeholder) => {
    restoredText = restoredText.replace(placeholder, value);
  });
  return restoredText;
}

// Function to convert text to sentence case
function toSentenceCase(text: string): string {
  // Remove any remaining asterisks
  let cleanText = text.replace(/\*\*/g, "").trim();

  // Preserve abbreviations
  const { text: processedText, replacements } =
    preserveAbbreviations(cleanText);

  // Convert to sentence case
  let sentenceCaseText =
    processedText.charAt(0).toUpperCase() +
    processedText.slice(1).toLowerCase();

  // Restore abbreviations
  return restoreAbbreviations(sentenceCaseText, replacements);
}

// Function to process a single line
function processLine(line: string): string {
  // First, check if it's a heading line
  if (!line.startsWith("#")) {
    return line;
  }

  // Updated regex to handle all cases including spaced asterisks
  const headingRegex =
    /^(#{1,6}\s*\*{0,2}\s*(?:\d+(?:\.\d+)?\.?\s*)?)([a-zA-Z])(.*?)$/;
  const match = line.match(headingRegex);

  if (match) {
    const [_, prefix, firstLetter, rest] = match;
    // Only capitalize the first letter, keep everything else exactly as is
    return `${prefix}${firstLetter.toUpperCase()}${rest}`;
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
