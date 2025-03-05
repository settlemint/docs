import fg from "fast-glob";
import { remarkAdmonition } from "fumadocs-core/mdx-plugins";
import { remarkInstall } from "fumadocs-docgen";
import { remarkInclude } from "fumadocs-mdx/config";
import matter from "gray-matter";
import * as fs from "node:fs/promises";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";

export const revalidate = false;

export async function GET() {
  // all scanned content
  const files = await fg(["./content/docs/**/*.mdx"]);

  const scan = files.map(async (file) => {
    const fileContent = await fs.readFile(file);
    const { content, data } = matter(fileContent.toString());

    const processed = await processContent(content);
    return `file: ${file}
meta: ${JSON.stringify(data, null, 2)}

${processed}`;
  });

  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"));
}

async function processContent(content: string): Promise<string> {
  const file = await remark()
    .use(remarkMdx)
    // https://fumadocs.vercel.app/docs/mdx/include
    .use(remarkInclude)
    // gfm styles
    .use(remarkGfm)
    // your remark plugins
    .use(remarkInstall, { persist: { id: "package-manager" } })
    .use(remarkAdmonition)
    // to string
    .use(remarkStringify)
    .process(content);

  return String(file);
}
