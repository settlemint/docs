import { blog } from "@/lib/source";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import Link from "next/link";

export default function Home() {
  const posts = blog.getPages();

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return (
    <DocsPage>
      <DocsTitle>Release Notes</DocsTitle>
      <DocsDescription>
        Release notes for the SettleMint platform.
      </DocsDescription>
      <DocsBody>
        {sortedPosts.map((post) => {
          const Mdx = post.data.body;

          return (
            <article
              key={post.url}
              className="container flex flex-col rounded-xl border bg-fd-card px-4 py-8 mb-4"
            >
              <div className="prose min-w-0">
                <Mdx components={defaultMdxComponents} />
              </div>
              <div className="text-sm mt-4">
                <Link
                  href={post.url}
                  className="flex items-center gap-1 text-muted-foreground"
                >
                  Direct link to this release note
                </Link>
              </div>
            </article>
          );
        })}
      </DocsBody>
    </DocsPage>
  );
}
