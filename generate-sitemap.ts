import * as fs from "fs";
import * as path from "path";

// Configuration
const BASE_URL = "http://localhost:3000/documentation";
const CONTENT_DIR = path.join(__dirname, "content");
const OUTPUT_FILE = path.join(__dirname, "public", "sitemap.xml");
const VALID_EXTENSIONS = [".md", ".mdx"];

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

function walk(dir: string): string[] {
  let results: string[] = [];
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

  return results;
}

function generateSitemap() {
  const files = walk(CONTENT_DIR);
  const urls = files.map(getUrlPathFromFile);

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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlEntries}
</urlset>`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, sitemap.trim());
  console.log(`✅ Sitemap generated at ${OUTPUT_FILE}`);
}

generateSitemap();
