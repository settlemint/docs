import { Logo } from "@/components/logo/logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo className="w-32" />,
  },
  links: [
    {
      text: "Home",
      url: "https://settlemint.com/",
      active: "nested-url",
    },
    {
      text: "Platform",
      url: "https://console.settlemint.com",
      active: "nested-url",
    },
    {
      text: "SDK",
      url: "https://github.com/settlemint/sdk",
      active: "nested-url",
    },
    {
      text: "Release Notes",
      url: "/release-notes",
      active: "nested-url",
    },
    {
      text: "llms.txt",
      url: "/llms.txt",
      active: "nested-url",
    },
  ],
};
