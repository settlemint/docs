import { blogPosts, docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { icons } from "lucide-react";
import { createElement } from "react";

export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }

    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
  },
});

export const blog = loader({
  baseUrl: "/release-notes",
  source: createMDXSource(blogPosts),
});
