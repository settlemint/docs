import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  basePath: "/documentation",
  serverExternalPackages: ["oxc-transform"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [],
    unoptimized: false,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    inlineCss: true,
    reactCompiler: true,
  },
  async rewrites() {
    return [
      {
        source: "/documentation/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/documentation/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/documentation/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default withMDX(config);
