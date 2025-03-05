import { source } from "@/lib/source";
import type { MetadataRoute } from "next";
import { join } from "node:path";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string =>
    new URL(
      join("documentation", path),
      "https://console.settlemint.com"
    ).toString();

  return [
    ...source.getPages().map((page) => {
      return {
        url: url(page.url),
        changeFrequency: "weekly",
        priority: 1,
      } as MetadataRoute.Sitemap[number];
    }),
  ];
}
