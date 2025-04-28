import { remarkMermaid } from "@theguild/remark-mermaid";
import {
  rehypeCodeDefaultOptions,
  remarkAdmonition,
} from "fumadocs-core/mdx-plugins";
import { remarkInstall } from "fumadocs-docgen";
import {
  defineCollections,
  defineConfig,
  defineDocs,
} from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { z } from "zod";
export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkInstall, remarkAdmonition, remarkMermaid],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
      ],
    },
  },
});

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/release-notes",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    full: z.boolean().optional(),
    _openapi: z.object({}).passthrough().optional(),
    author: z.string(),
    date: z.string().date().or(z.date()),
  }),
});
