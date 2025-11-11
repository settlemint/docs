import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      /**
       * Full page title for SEO and browser tab.
       * Used in search engine results and browser titles.
       */
      pageTitle: z.string().optional(),

      /**
       * Meta description for SEO.
       * Used in search engine results and social media previews.
       */
      description: z.string(),

      /**
       * Additional keywords for SEO.
       */
      keywords: z.array(z.string()).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
