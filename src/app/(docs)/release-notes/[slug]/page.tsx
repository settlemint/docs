import { blog } from "@/lib/source";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <DocsPage>
      <DocsTitle>Release Notes</DocsTitle>
      <DocsDescription>
        Release notes for the SettleMint platform.
      </DocsDescription>
      <DocsBody>
        <article className="container flex flex-col rounded-xl border bg-fd-card px-4 py-8 mb-4">
          <div className="prose min-w-0">
            <Mdx components={defaultMdxComponents} />
          </div>
        </article>
      </DocsBody>
      <Link href="/release-notes">Back</Link>
    </DocsPage>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
