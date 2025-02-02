import type { LoadContext, Plugin } from '@docusaurus/types';
import fs from 'fs';
import path from 'path';

interface PluginOptions {
  // Add any plugin-specific options here
}

interface ContentItem {
  title: string;
  description?: string;
  permalink: string;
  sectionNesting: number;
}

interface DocusaurusPlugin {
  loadVersions: () => Promise<string[]>;
  loadDocs: (version: string) => Promise<Array<{
    id: string;
    title: string;
    description?: string;
    permalink: string;
  }>>;
  loadBlog: () => Promise<Array<{
    title: string;
    description?: string;
    permalink: string;
  }>>;
}

// Helper function to recursively get all markdown files
function getMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (item.name.endsWith('.md') || item.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Changed to module.exports for Docusaurus plugin compatibility
module.exports = function (
  context: LoadContext,
  options: PluginOptions
): Plugin<ContentItem[]> {
  return {
    name: 'docusaurus-llms-plugin',

    async loadContent(): Promise<ContentItem[]> {
      console.log('Loading content...');
      const items: ContentItem[] = [];

      try {
        // Load docs
        const docsRouteBasePath = 'docs';
        const docsDir = path.join(context.siteDir, docsRouteBasePath);

        if (fs.existsSync(docsDir)) {
          const docFiles = getMarkdownFiles(docsDir);
          console.log('Found doc files:', docFiles.length);

          for (const file of docFiles) {
            const content = fs.readFileSync(file, 'utf8');
            const relativePath = path.relative(docsDir, file);
            const fileNameMatch = file.match(/([^/]+)\.mdx?$/);
            const fileName = fileNameMatch ? fileNameMatch[1] : '';

            const matter = require('gray-matter');
            const { data: frontmatter, content: markdownContent } = matter(content);

            let title = frontmatter.title;
            if (!title) {
              const headerMatch = markdownContent.match(/^#\s+(.+)$/m);
              title = headerMatch ? headerMatch[1].trim() : fileName;
            }

            items.push({
              title,
              description: frontmatter.description || '',
              permalink: `/${docsRouteBasePath}/${relativePath.replace(/\.mdx?$/, '')}/`,
              sectionNesting: (relativePath.match(/\//g) || []).length
            });
          }
        }

        // Load blog posts
        const blogDir = path.join(context.siteDir, 'blog');
        if (fs.existsSync(blogDir)) {
          const blogFiles = getMarkdownFiles(blogDir);
          console.log('Found blog files:', blogFiles.length);

          for (const file of blogFiles) {
            const content = fs.readFileSync(file, 'utf8');
            const relativePath = path.relative(blogDir, file);
            const fileNameMatch = file.match(/([^/]+)\.mdx?$/);
            const fileName = fileNameMatch ? fileNameMatch[1] : '';

            const matter = require('gray-matter');
            const { data: frontmatter, content: markdownContent } = matter(content);

            let title = frontmatter.title;
            if (!title) {
              const headerMatch = markdownContent.match(/^#\s+(.+)$/m);
              title = headerMatch ? headerMatch[1].trim() : fileName;
            }

            items.push({
              title,
              description: frontmatter.description || '',
              permalink: `/blog/${relativePath.replace(/\.mdx?$/, '')}/`,
              sectionNesting: 0
            });
          }
        }

        // Load releases
        const releasesDir = path.join(context.siteDir, 'releases');
        if (fs.existsSync(releasesDir)) {
          const releaseFiles = getMarkdownFiles(releasesDir);
          console.log('Found release files:', releaseFiles.length);

          for (const file of releaseFiles) {
            const content = fs.readFileSync(file, 'utf8');
            const relativePath = path.relative(releasesDir, file);
            const fileNameMatch = file.match(/([^/]+)\.mdx?$/);
            const fileName = fileNameMatch ? fileNameMatch[1] : '';

            const matter = require('gray-matter');
            const { data: frontmatter, content: markdownContent } = matter(content);

            let title = frontmatter.title;
            if (!title) {
              const headerMatch = markdownContent.match(/^#\s+(.+)$/m);
              title = headerMatch ? headerMatch[1].trim() : fileName;
            }

            items.push({
              title,
              description: frontmatter.description || '',
              permalink: `/releases/${relativePath.replace(/\.mdx?$/, '')}/`,
              sectionNesting: 0
            });
          }
        }

      } catch (error) {
        console.error('Error loading content:', error);
      }

      console.log('Total items collected:', items.length);
      return items;
    },

    async contentLoaded({ content, actions }): Promise<void> {
      console.log('Content loaded, storing content...');
      console.log('Content array?', Array.isArray(content));
      console.log('Content length:', content?.length);
      this.content = content;
    },

    async postBuild({ outDir }): Promise<void> {
      console.log('Post build starting...');
      console.log('Content array?', Array.isArray(this.content));
      console.log('Content length:', this.content?.length);

      if (!Array.isArray(this.content)) {
        console.log('No content available');
        return;
      }

      // Sort docs by permalink for consistent ordering
      this.content.sort((a, b) => a.permalink.localeCompare(b.permalink));

      // Create markdown content
      let markdownContent = `# SettleMint Developer Documentation

This file contains links to all documentation pages, blog posts, and other content from the SettleMint Developer Hub.

## Documentation

`;

      // Add docs without indentation
      this.content.forEach(doc => {
        if (doc.permalink.startsWith('/docs/')) {
          markdownContent += `- [${doc.title}](${context.siteConfig.url}${context.siteConfig.baseUrl}${doc.permalink})\n`;
          if (doc.description) {
            markdownContent += `  ${doc.description}\n`;
          }
        }
      });

      // Add Developer Blog section
      markdownContent += `\n## Developer Blog\n\n`;
      this.content.forEach(doc => {
        if (doc.permalink.startsWith('/blog/')) {
          markdownContent += `- [${doc.title}](${context.siteConfig.url}${context.siteConfig.baseUrl}${doc.permalink})\n`;
          if (doc.description) {
            markdownContent += `  ${doc.description}\n`;
          }
        }
      });

      // Add Releases section
      markdownContent += `\n## Releases\n\n`;
      this.content.forEach(doc => {
        if (doc.permalink.startsWith('/releases/')) {
          markdownContent += `- [${doc.title}](${context.siteConfig.url}${context.siteConfig.baseUrl}${doc.permalink})\n`;
          if (doc.description) {
            markdownContent += `  ${doc.description}\n`;
          }
        }
      });

      // Write directly to the output directory
      const path = require('path');
      fs.writeFileSync(path.join(outDir, 'llms.txt'), markdownContent);
      console.log('Generated llms.txt file for LLM indexing');
    }
  };
}