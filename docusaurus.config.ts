import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import path from 'path';
import { themes } from 'prism-react-renderer';

const config: Config = {
  title: 'SettleMint Developer Hub',
  tagline:
    'The Blockchain Transformation Platform for developers to rapidly build blockchain applications',
  url: 'https://console.settlemint.com',
  baseUrl: '/documentation/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  trailingSlash: true,
  favicon: 'img/favicon.ico',
  organizationName: 'settlemint', // Usually your GitHub org/user name.
  projectName: 'btp-docs', // Usually your repo name.
  plugins: [
    require.resolve('docusaurus-lunr-search'),
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'releases',
        routeBasePath: 'releases',
        path: './releases',
        blogSidebarCount: 'ALL',
        onUntruncatedBlogPosts: 'ignore'
      }
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    path.resolve(__dirname, 'src/plugins/docusaurus-llms-plugin'),
  ],
  presets: [
    [
      'classic',
      {
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        gtag: {
          trackingID: 'G-N1MMHFDVZZ',
          anonymizeIP: false
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Developer Blog',
          sortPosts: 'descending',
          onUntruncatedBlogPosts: 'ignore'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }

      } satisfies Preset.Options
    ]
  ],

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'SettleMint',
        src: 'img/settlemint-hub-black.png',
        srcDark: 'img/settlemint-hub-white.png'
      },
      items: [
        {
          type: 'doc',
          docId: 'about-settlemint/intro',
          position: 'left',
          label: 'Docs'
        },
        {
          to: '/docs/developer-guides/guide-library',
          label: 'Guides',
          position: 'left'
        },
        { to: '/blog/', label: 'Developer Blog', position: 'left' },
        {
          href: '/releases',
          label: 'Releases',
          position: 'right'
        },
        {
          href: 'https://settlemint.com',
          label: 'Website',
          position: 'right'
        },
        {
          href: 'https://console.settlemint.com/documentation/llms.txt',
          label: 'llms.txt',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'About SettleMint',
              to: '/docs/about-settlemint/intro'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'SettleMint Platform',
              href: 'https://console.settlemint.com'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/settlemintcom'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Developer Blog',
              to: '/blog'
            },
            {
              label: 'Website',
              href: 'https://settlemint.com'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SettleMint.`
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ['solidity']
    },
  } satisfies Preset.ThemeConfig
};

export default config;
