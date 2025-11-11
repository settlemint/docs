import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  basePath: "/documentation",
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
    dangerouslyAllowSVG: true, // img.shields.io returns SVGs
    unoptimized: true,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/asset-tokenization-kit/executive-overview/introduction',
        permanent: false,
      },
      // Redirects for blockchain-platform pages that moved from /{section}/* to /blockchain-platform/{section}/*
      {
        source: '/about-settlemint/:path*',
        destination: '/blockchain-platform/about-settlemint/:path*',
        permanent: true,
      },
      {
        source: '/about-settlemint',
        destination: '/blockchain-platform/about-settlemint',
        permanent: true,
      },
      {
        source: '/launching-the-platform/:path*',
        destination: '/blockchain-platform/launching-the-platform/:path*',
        permanent: true,
      },
      {
        source: '/launching-the-platform',
        destination: '/blockchain-platform/launching-the-platform',
        permanent: true,
      },
      {
        source: '/supported-blockchains/:path*',
        destination: '/blockchain-platform/supported-blockchains/:path*',
        permanent: true,
      },
      {
        source: '/supported-blockchains',
        destination: '/blockchain-platform/supported-blockchains',
        permanent: true,
      },
      {
        source: '/platform-components/:path*',
        destination: '/blockchain-platform/platform-components/:path*',
        permanent: true,
      },
      {
        source: '/platform-components',
        destination: '/blockchain-platform/platform-components',
        permanent: true,
      },
      {
        source: '/building-with-settlemint/:path*',
        destination: '/blockchain-platform/building-with-settlemint/:path*',
        permanent: true,
      },
      {
        source: '/building-with-settlemint',
        destination: '/blockchain-platform/building-with-settlemint',
        permanent: true,
      },
      {
        source: '/use-case-guides/:path*',
        destination: '/blockchain-platform/use-case-guides/:path*',
        permanent: true,
      },
      {
        source: '/use-case-guides',
        destination: '/blockchain-platform/use-case-guides',
        permanent: true,
      },
      {
        source: '/blockchain-and-ai/:path*',
        destination: '/blockchain-platform/blockchain-and-ai/:path*',
        permanent: true,
      },
      {
        source: '/blockchain-and-ai',
        destination: '/blockchain-platform/blockchain-and-ai',
        permanent: true,
      },
      {
        source: '/application-kits/:path*',
        destination: '/blockchain-platform/application-kits/:path*',
        permanent: true,
      },
      {
        source: '/application-kits',
        destination: '/blockchain-platform/application-kits',
        permanent: true,
      },
      {
        source: '/knowledge-bank/:path*',
        destination: '/blockchain-platform/knowledge-bank/:path*',
        permanent: true,
      },
      {
        source: '/knowledge-bank',
        destination: '/blockchain-platform/knowledge-bank',
        permanent: true,
      },
      {
        source: '/support/:path*',
        destination: '/blockchain-platform/support/:path*',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/blockchain-platform/support',
        permanent: true,
      },
      {
        source: '/account-billing/:path*',
        destination: '/blockchain-platform/account-billing/:path*',
        permanent: true,
      },
      {
        source: '/account-billing',
        destination: '/blockchain-platform/account-billing',
        permanent: true,
      },
      {
        source: '/releases/:path*',
        destination: '/blockchain-platform/releases/:path*',
        permanent: true,
      },
      {
        source: '/releases',
        destination: '/blockchain-platform/releases',
        permanent: true,
      },
      {
        source: '/reference/:path*',
        destination: '/blockchain-platform/reference/:path*',
        permanent: true,
      },
      {
        source: '/reference',
        destination: '/blockchain-platform/reference',
        permanent: true,
      },
      {
        source: '/terms-and-policies/:path*',
        destination: '/blockchain-platform/terms-and-policies/:path*',
        permanent: true,
      },
      {
        source: '/terms-and-policies',
        destination: '/blockchain-platform/terms-and-policies',
        permanent: true,
      },
      {
        source: '/security/:path*',
        destination: '/blockchain-platform/security/:path*',
        permanent: true,
      },
      {
        source: '/security',
        destination: '/blockchain-platform/security',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
