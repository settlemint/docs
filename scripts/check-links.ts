import { scanURLs, validateFiles, printErrors } from "next-validate-link";
import { source } from "../src/lib/source";
import { glob } from "glob";

const BASE_PATH = "/documentation";

async function getFiles(): Promise<string[]> {
  return glob("content/docs/**/*.mdx", { cwd: process.cwd() });
}

async function checkLinks() {
  console.log("[Check Links] Starting link validation...");

  const pages = source.getPages();
  console.log(`[Check Links] Found ${pages.length} pages in source`);

  // Build the URL map for validation
  // For catch-all routes [[...slug]], value should be string[] directly
  const populate: Record<
    string,
    Array<{ value: string[]; hashes: string[] }>
  > = {
    "[[...slug]]": pages.map((page) => ({
      value: page.slugs,
      hashes: [], // Skip heading validation for now
    })),
  };

  const scanned = await scanURLs({
    preset: "next",
    populate,
  });

  const files = await getFiles();
  console.log(`[Check Links] Validating ${files.length} MDX files`);

  const errors = await validateFiles(files, {
    scanned,
    pathToUrl: (path: string) => {
      // Transform file path to URL
      const slug = path
        .replace("content/docs/", "")
        .replace(/\.mdx?$/, "")
        .replace(/\/index$/, "");
      return `${BASE_PATH}/${slug}`;
    },
    markdown: {
      components: {
        Card: { attributes: ["href"] },
        Cards: { attributes: ["href"] },
      },
    },
    checkExternal: false, // External links checked separately
    checkRelativePaths: "as-url",
  });

  if (errors.length > 0) {
    console.log(`\n[Check Links] Found ${errors.length} link errors:\n`);
    printErrors(errors, true);
    process.exit(1);
  }

  console.log("[Check Links] All links validated successfully!");
}

checkLinks().catch((error) => {
  console.error("[Check Links] Error:", error);
  process.exit(1);
});
