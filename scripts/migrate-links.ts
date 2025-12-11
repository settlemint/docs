import { glob } from "glob";
import { readFile, writeFile } from "node:fs/promises";

const BASE_PATH = "/documentation";
const DRY_RUN = process.argv.includes("--dry-run");

/**
 * Migrate internal links in MDX files to use the basePath prefix.
 *
 * This script finds all root-relative links that don't already have
 * the /documentation/ prefix and adds it.
 *
 * IMPORTANT: This script is designed for one-time migration of legacy content.
 * The remark-transform-links plugin handles link transformation at build time,
 * so this script should NOT be run on content that will be processed by that plugin.
 * Running both would result in double-prefixed links.
 *
 * Usage:
 *   bun scripts/migrate-links.ts          # Apply changes
 *   bun scripts/migrate-links.ts --dry-run # Preview changes without writing
 */

// Type for replacement functions that match String.replace callback signature
type ReplaceFn = (substring: string, ...args: string[]) => string;

// Patterns to transform (root-relative without basePath)
// These patterns match links that start with / but NOT /documentation/, /images/, /api/, etc.
const LINK_PATTERNS: Array<{ regex: RegExp; replace: ReplaceFn }> = [
  // Markdown links: [text](/path) - but not [text](/documentation/...) or [text](/images/...) etc.
  {
    regex:
      /(\[[^\]]+\]\()\/(?!documentation\/|images\/|api\/|ingest\/|_next\/)([^)]+\))/g,
    replace: (_match: string, prefix: string, path: string) =>
      `${prefix}${BASE_PATH}/${path}`,
  },
  // JSX href in Card/other components: href="/path" - but not href="/documentation/..." etc.
  {
    regex:
      /href="\/(?!documentation\/|images\/|api\/|ingest\/|_next\/)([^"]+)"/g,
    replace: (_match: string, path: string) => `href="${BASE_PATH}/${path}"`,
  },
];

async function migrateLinks() {
  console.log("[Migrate Links] Starting link migration...");
  if (DRY_RUN) {
    console.log("[Migrate Links] DRY RUN MODE - no files will be modified\n");
  }

  const files = await glob("content/docs/**/*.mdx", { cwd: process.cwd() });
  console.log(`[Migrate Links] Found ${files.length} MDX files to scan\n`);

  let totalChanges = 0;
  let filesChanged = 0;

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    let newContent = content;
    let fileChanges = 0;

    for (const pattern of LINK_PATTERNS) {
      const matches = [...newContent.matchAll(pattern.regex)];
      fileChanges += matches.length;

      newContent = newContent.replace(pattern.regex, pattern.replace);
    }

    if (fileChanges > 0) {
      filesChanged++;
      totalChanges += fileChanges;

      if (DRY_RUN) {
        console.log(`[DRY RUN] ${file}: ${fileChanges} links would be updated`);

        // Show the actual changes for this file
        const originalLines = content.split("\n");
        const newLines = newContent.split("\n");

        for (let i = 0; i < originalLines.length; i++) {
          if (originalLines[i] !== newLines[i]) {
            console.log(`  Line ${i + 1}:`);
            console.log(`    - ${originalLines[i].trim()}`);
            console.log(`    + ${newLines[i].trim()}`);
          }
        }
        console.log("");
      } else {
        await writeFile(file, newContent);
        console.log(`[Migrate Links] ${file}: ${fileChanges} links updated`);
      }
    }
  }

  console.log(
    `\n[Migrate Links] Summary: ${totalChanges} links ${DRY_RUN ? "would be" : ""} updated across ${filesChanged} files`
  );

  if (DRY_RUN && totalChanges > 0) {
    console.log(
      "\n[Migrate Links] Run without --dry-run to apply these changes"
    );
  }
}

migrateLinks().catch((error) => {
  console.error("[Migrate Links] Error:", error);
  process.exit(1);
});
