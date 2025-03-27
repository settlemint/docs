import { XMLParser } from "fast-xml-parser";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function readSitemapAndExtractPaths(): Promise<string[]> {
  try {
    const sitemapPath = join(process.cwd(), "sitemap.xml");
    const sitemapContent = await readFile(sitemapPath, "utf-8");

    // Parse XML
    const parser = new XMLParser();
    const parsed = parser.parse(sitemapContent);

    // Extract URLs from sitemap
    const urls = parsed.urlset.url;
    // Add type assertion to ensure we're working with an array
    const paths = (Array.isArray(urls) ? urls : [urls]).map(
      (urlObj: { loc: string }) => {
        // Convert full URLs to paths
        const url = new URL(urlObj.loc);
        return url.pathname;
      }
    );

    // Remove duplicates and sort
    return [...new Set(paths)].sort();
  } catch (error) {
    console.error("❌ Error reading sitemap:", error);
    return [];
  }
}

async function generateRobotsTxt() {
  try {
    const publicDir = join(process.cwd(), "public");
    const robotsPath = join(publicDir, "robots.txt");

    // Create public directory if it doesn't exist
    if (!existsSync(publicDir)) {
      console.log("📁 Creating public directory...");
      await mkdir(publicDir, { recursive: true });
    }

    // Get paths from sitemap
    console.log("📑 Reading sitemap.xml...");
    const paths = await readSitemapAndExtractPaths();
    console.log(`📍 Found ${paths.length} paths in sitemap`);

    // Generate Allow paths section
    const allowPaths = paths.map((path) => `Allow: ${path}`).join("\n");

    // Define robots.txt content
    const robotsTxtContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap location
Sitemap: /sitemap.xml

# Disallow specific paths
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /documentation/release-notes/

# Allow paths from sitemap
${allowPaths}

# Crawl delay
Crawl-delay: 10
`;

    // Write the robots.txt file
    await writeFile(robotsPath, robotsTxtContent);
    console.log("✅ Successfully generated robots.txt in public folder");
    console.log(`📄 File location: ${robotsPath}`);

    // Log the content for verification
    console.log("\n📝 Generated content preview (first few lines):");
    console.log(robotsTxtContent.split("\n").slice(0, 20).join("\n") + "\n...");
  } catch (error) {
    console.error("❌ Error generating robots.txt:", error);
  }
}

// Execute the function
generateRobotsTxt();
