import * as fs from "fs";
import * as path from "path";

// Configuration
const DEV_BASE_URL = "http://localhost:3000/documentation";
const PROD_BASE_URL = "https://console.settlemint.com/documentation";
// Use PROD_BASE_URL by default, but allow override via environment variable
const BASE_URL =
  process.env.USE_DEV_URL === "true" ? DEV_BASE_URL : PROD_BASE_URL;
const CONTENT_DIR = path.join(__dirname, "..", "content");
const VALID_EXTENSIONS = [".md", ".mdx"];
const SITEMAP_PATH = "/sitemap.xml";

// Output file paths
const ROOT_DIR = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

// Define paths to disallow in robots.txt
const DISALLOW_PATHS = ["/api/", "/_next/", "/static/"];

/**
 * Converts a file path to a URL path
 */
function getUrlPathFromFile(filePath: string): string {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  let urlPath = relativePath.replace(/\\/g, "/"); // Normalize Windows paths

  for (const ext of VALID_EXTENSIONS) {
    if (urlPath.endsWith(ext)) {
      urlPath = urlPath.slice(0, -ext.length);
      break;
    }
  }

  if (urlPath.endsWith("/index")) {
    urlPath = urlPath.slice(0, -"index".length - 1);
  }

  return `${BASE_URL}${urlPath ? "/" + urlPath : ""}`;
}

/**
 * Recursively walks a directory to find content files
 */
function walk(dir: string): string[] {
  let results: string[] = [];

  try {
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat && stat.isDirectory()) {
        results = results.concat(walk(fullPath));
      } else if (VALID_EXTENSIONS.includes(path.extname(fullPath))) {
        results.push(fullPath);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return results;
}

/**
 * Writes a file to both root and public directories
 */
function writeToMultipleLocations(filename: string, content: string): void {
  const rootFilePath = path.join(ROOT_DIR, filename);
  const publicFilePath = path.join(PUBLIC_DIR, filename);

  try {
    // Ensure public directory exists
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });

    // Write to root directory
    fs.writeFileSync(rootFilePath, content);
    console.log(`✅ ${filename} generated at ${rootFilePath}`);

    // Write to public directory
    fs.writeFileSync(publicFilePath, content);
    console.log(`✅ ${filename} generated at ${publicFilePath}`);
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

/**
 * Generates sitemap.xml
 */
function generateSitemap(urls: string[]): string {
  const timestamp = new Date().toISOString();
  const xmlEntries = urls
    .map((url) => {
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${timestamp}</lastmod>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlEntries}
</urlset>`;
}

/**
 * Generates robots.txt
 */
function generateRobotsTxt(urls: string[]): string {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${SITEMAP_PATH}

# Disallow specific paths
${DISALLOW_PATHS.map((path) => `Disallow: ${path}`).join("\n")}

# Allow paths from sitemap
${urls.map((url) => `Allow: ${new URL(url).pathname}`).join("\n")}

# Crawl delay
Crawl-delay: 10
`;
}

/**
 * Main function to generate both sitemap.xml and robots.txt
 */
function generateSEOFiles(): void {
  console.log("Starting SEO files generation...");
  console.log(`Using base URL: ${BASE_URL}`);

  if (BASE_URL === DEV_BASE_URL) {
    console.warn(
      "⚠️ Warning: Using development URL. Set USE_DEV_URL=false for production URLs."
    );
  }

  // Get content files and generate URLs
  const files = walk(CONTENT_DIR);
  const urls = files.map(getUrlPathFromFile);

  if (urls.length === 0) {
    console.warn(`No content files found in ${CONTENT_DIR}`);
    return;
  }

  console.log(`Found ${urls.length} content URLs`);

  // Generate and write sitemap.xml
  const sitemap = generateSitemap(urls);
  writeToMultipleLocations("sitemap.xml", sitemap.trim());

  // Generate and write robots.txt
  const robotsTxt = generateRobotsTxt(urls);
  writeToMultipleLocations("robots.txt", robotsTxt.trim());

  console.log("SEO files generation completed successfully!");
}

// Execute the main function
generateSEOFiles();
