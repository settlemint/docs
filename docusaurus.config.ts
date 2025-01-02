import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";

const config: Config = {
  title: "SettleMint Developer Hub",
  tagline:
    "The Blockchain Transformation Platform for developers to rapidly build blockchain applications",
  url: "https://console.settlemint.com",
  baseUrl: "/documentation/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  trailingSlash: true,
  favicon: "img/favicon.ico",
  organizationName: "settlemint", // Usually your GitHub org/user name.
  projectName: "btp-docs", // Usually your repo name.
  plugins: [require.resolve("docusaurus-lunr-search")],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        gtag: {
          trackingID: "G-N1MMHFDVZZ",
          anonymizeIP: false,
        },
        blog: {
          showReadingTime: true,
          blogTitle: "Developer Blog",
          sortPosts: "descending",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "",
      logo: {
        alt: "SettleMint",
        src: "img/settlemint-hub-black.png",
        srcDark: "img/settlemint-hub-white.png",
      },
      items: [
        {
          type: "doc",
          docId: "about-settlemint/intro",
          position: "left",
          label: "Docs",
        },
        {
          to: "/docs/developer-guides/guide-library",
          label: "Guides",
          position: "left",
        },
        { to: "/blog/", label: "Developer Blog", position: "left" },
        {
          href: "/docs/releases/attestation-service",
          label: "Releases",
          position: "right",
        },
        {
          href: "https://settlemint.com",
          label: "Website",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "About SettleMint",
              to: "/docs/about-settlemint/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "SettleMint Platform",
              href: "https://console.settlemint.com",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/settlemintcom",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Developer Blog",
              to: "/blog",
            },
            {
              label: "Website",
              href: "https://settlemint.com",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SettleMint.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ["solidity"],
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
