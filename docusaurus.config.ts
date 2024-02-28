import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";

const config: Config = {
  title: "SettleMint Developer Hub",
  tagline:
    "The Blockchain Transformation platform for developers to rapidly build blockchain applications",
  url: "https://console.settlemint.com",
  baseUrl: "/documentation/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: true,
  favicon: "img/favicon.ico",
  organizationName: "settlemint", // Usually your GitHub org/user name.
  projectName: "bpaas", // Usually your repo name.
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexDocs: true,
        indexDocSidebarParentCategories: 5,
        indexBlog: true,
        indexPages: true,
        language: "en",
      },
    ],
  ],

  scripts: [
    {
      src: "https://jsd-widget.atlassian.com/assets/embed.js",
      "data-jsd-embedded": true,
      "data-key": "5d7a0f9b-1691-4f56-9da7-95e3526950fb",
      "data-base-url": "https://jsd-widget.atlassian.com",
    },
    {
      src: "https://plausible.io/js/script.js",
      async: true,
      defer: true,
      "data-domain": "console.settlemint.com/documentation",
    },
    {
      async: true,
      src: "//static.hotjar.com/c/hotjar-3663550.js?sv=6",
      type: "text/javascript",
    },
  ],
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
          blogTitle: "Releases",
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
        { to: "/docs/blog/", label: "Blog", position: "left" },
        { to: "/blog", label: "Releases", position: "left" },

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
              label: "Discord",
              href: "https://discord.gg/4WPatxDJ6A",
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
              label: "Blog",
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
    hotjar: {
      siteId: 3_663_550,
    },
    hubspot: {
      accountId: 8_639_589,
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
