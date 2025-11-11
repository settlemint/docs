# Development Guide for AI Agents

## Commands

- **Dev**: `bun run dev` (generates SDK docs + starts Next.js dev server)
- **Build**: `bun run build` (generates SDK docs + builds for production)
- **Type check**: `bun check-types`
- **Lint**: `bun lint`
- **Format**: `bun format`
- **Clean install**: `bun clean` (removes build artifacts and reinstalls)

## Code Style

- **Runtime**: Bun (not Node.js) - use `bun` commands
- **Imports**: Use `@/` path alias for `src/` (e.g., `@/lib/source`,
  `@/components/markdown`)
- **Formatting**: Prettier with semicolons, trailing commas (ES5), arrow parens
  always
- **Types**: Strict TypeScript - no `any`, use type annotations, leverage
  Next.js types
- **Spacing**: 2 spaces for indentation
- **Components**: React Server Components by default (no `"use client"` unless
  needed)
- **Styling**: Tailwind CSS with `cn()` utility from `tailwind-merge`
- **MDX**: Content in `content/docs/`, uses Fumadocs framework
- **File extensions**: `.tsx` for React, `.ts` for utilities, `.mdx` for
  documentation

## Architecture

- Next.js 16 with App Router (standalone output, basePath `/documentation`)
- Documentation powered by Fumadocs (fumadocs-ui, fumadocs-mdx, fumadocs-core)
- SDK docs auto-generated from `@settlemint/sdk-*` packages on build
- PostHog analytics, AI chat integration (OpenAI SDK)
