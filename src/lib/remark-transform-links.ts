import { visit } from "unist-util-visit";
import type { Root, Link } from "mdast";
import type { Plugin } from "unified";
import type { VFile } from "vfile";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";

/**
 * Link transformation rules for different content sections.
 *
 * Each section can have its own mapping of source link patterns
 * to target URL prefixes. This handles content aggregated from
 * multiple sources with different link conventions.
 */
const SECTION_LINK_RULES: Record<
  string,
  Array<{ pattern: RegExp; replacement: string }>
> = {
  // ATK content uses /docs/... links which should become /asset-tokenization-kit/...
  // Note: basePath (/documentation) is added automatically by Next.js at runtime
  // Patterns use (\/|$) to match both /docs/ and /docs (without trailing slash)
  "asset-tokenization-kit": [
    {
      pattern: /^\/docs(\/|$)/,
      replacement: "/asset-tokenization-kit/",
    },
    {
      pattern: /^\/api(\/|$)/,
      replacement: "/asset-tokenization-kit/api/",
    },
  ],

  // Blockchain platform content may use various patterns
  "blockchain-platform": [
    {
      pattern: /^\/docs(\/|$)/,
      replacement: "/blockchain-platform/",
    },
  ],

  // SDK content
  sdk: [
    {
      pattern: /^\/docs(\/|$)/,
      replacement: "/sdk/",
    },
  ],

  // Legacy ATK content
  "asset-tokenization-kit-legacy": [
    {
      pattern: /^\/docs(\/|$)/,
      replacement: "/asset-tokenization-kit-legacy/",
    },
  ],
};

/**
 * Detect which content section a file belongs to based on its path.
 */
function detectSection(filePath: string): string | null {
  const normalizedPath = filePath.replace(/\\/g, "/");

  if (normalizedPath.includes("content/docs/asset-tokenization-kit-legacy/")) {
    return "asset-tokenization-kit-legacy";
  }
  if (normalizedPath.includes("content/docs/asset-tokenization-kit/")) {
    return "asset-tokenization-kit";
  }
  if (normalizedPath.includes("content/docs/blockchain-platform/")) {
    return "blockchain-platform";
  }
  if (normalizedPath.includes("content/docs/sdk/")) {
    return "sdk";
  }

  return null;
}

/**
 * Check if a URL should be skipped from transformation.
 */
function shouldSkipUrl(url: string): boolean {
  // Skip external links
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:")
  ) {
    return true;
  }

  // Skip protocol-relative URLs (e.g., //cdn.example.com/path)
  if (url.startsWith("//")) {
    return true;
  }

  // Skip anchor-only links
  if (url.startsWith("#")) {
    return true;
  }

  // Skip URLs that already have the basePath prefix
  // This prevents double-prefixing if migrate-links.ts has been run
  if (url.startsWith("/documentation/")) {
    return true;
  }

  // Skip static assets and special paths
  // Note: /api/ is NOT excluded here because section rules may transform it
  // (e.g., ATK's /api/ -> /asset-tokenization-kit/api/ for API documentation).
  // The migrate-links.ts script excludes /api/ differently because it adds
  // the /documentation/ basePath, which shouldn't apply to Next.js API routes.
  if (
    url.startsWith("/images/") ||
    url.startsWith("/ingest/") ||
    url.startsWith("/_next/")
  ) {
    return true;
  }

  return false;
}

/**
 * Remark plugin to transform internal links based on content section.
 *
 * This plugin:
 * 1. Detects which content section a file belongs to
 * 2. Applies section-specific link transformations (e.g., /docs/ -> /documentation/asset-tokenization-kit/)
 * 3. Falls back to adding the basePath prefix for other root-relative links
 *
 * This handles content aggregated from multiple sources where each source
 * may have different link conventions that need to be normalized.
 */
export const remarkTransformLinks: Plugin<[], Root> = () => {
  return (tree, file: VFile) => {
    const filePath = file.path || file.history[0] || "";
    const section = detectSection(filePath);
    const sectionRules = section ? SECTION_LINK_RULES[section] || [] : [];

    // Transform standard markdown links
    visit(tree, "link", (node: Link) => {
      node.url = transformUrl(node.url, section, sectionRules);
    });

    // Transform MDX component href attributes (like Card, Cards, etc.)
    visit(tree, "mdxJsxFlowElement", (node) => {
      transformMdxJsxAttributes(
        node as MdxJsxFlowElement,
        section,
        sectionRules
      );
    });

    visit(tree, "mdxJsxTextElement", (node) => {
      transformMdxJsxAttributes(
        node as MdxJsxTextElement,
        section,
        sectionRules
      );
    });
  };
};

/**
 * Transform a URL based on section rules and basePath.
 */
function transformUrl(
  url: string,
  section: string | null,
  sectionRules: Array<{ pattern: RegExp; replacement: string }>
): string {
  if (shouldSkipUrl(url)) {
    return url;
  }

  // Try section-specific transformations first
  for (const rule of sectionRules) {
    if (rule.pattern.test(url)) {
      return url.replace(rule.pattern, rule.replacement);
    }
  }

  // Fall back: for other root-relative links, add section prefix if within a section
  // Note: basePath (/documentation) is added automatically by Next.js at runtime
  if (url.startsWith("/")) {
    // Derive known sections from SECTION_LINK_RULES to avoid duplication
    const knownSections = Object.keys(SECTION_LINK_RULES);

    const startsWithSection = knownSections.some(
      (s) => url.startsWith(`/${s}/`) || url === `/${s}`
    );

    if (startsWithSection) {
      // Already has section prefix, return as-is (Next.js will add basePath)
      return url;
    } else if (section) {
      // Add section prefix for relative links within section content.
      // This assumes links like /glossary in ATK content should become /asset-tokenization-kit/glossary.
      // For intentional cross-section links, use the full section path (e.g., /sdk/viem).
      return `/${section}${url}`;
    }
    // For links outside any section, return as-is (Next.js will add basePath)
  }

  return url;
}

/**
 * Transform href attributes in MDX JSX elements.
 */
function transformMdxJsxAttributes(
  node: MdxJsxFlowElement | MdxJsxTextElement,
  section: string | null,
  sectionRules: Array<{ pattern: RegExp; replacement: string }>
): void {
  if (!node.attributes) return;

  for (const attr of node.attributes) {
    if (
      attr.type === "mdxJsxAttribute" &&
      attr.name === "href" &&
      typeof attr.value === "string"
    ) {
      attr.value = transformUrl(attr.value, section, sectionRules);
    }
  }
}
