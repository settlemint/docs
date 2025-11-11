# AGENTS
1. Repo uses Next.js 16 App Router + Fumadocs; package manager is Bun.
2. Install deps with `bun install` and respect the pinned Node version in .nvmrc.
3. Dev server: `bun run dev` (auto-runs generate-sdk-docs).
4. Production build: `bun run build`; preview: `bun run start`.
5. Quality gates: `bun run lint`, `bun run check-types`, `bun run format`.
6. Tests aren't configured - use Bun's built-in runner (`bun test path/to/file.test.ts`) for single files when they exist.
7. Regenerate docs via `bun run generate-sdk-docs`; never hand-edit .source artifacts.
8. CI relies on .github/workflows/qa.yml; keep local commands consistent.
9. No Cursor (.cursor/rules) or Copilot (.github/copilot-instructions.md) rule files exist.
10. Prettier enforces semicolons, trailingComma=es5, arrowParens=always, proseWrap=always.
11. ESLint extends next/core-web-vitals and next/typescript; resolve warnings instead of disabling rules.
12. TypeScript is strict with moduleResolution=bundler; avoid any and rely on precise types.
13. Prefer type-only imports (`import { type Foo } from '...';`) and keep React types explicit.
14. Use the @/ alias for shared modules per tsconfig and keep relative paths shallow elsewhere.
15. UI primitives use React.forwardRef and well-named props; keep hooks under roughly 30 lines.
16. Use the shared cn helper for class merging; skip manual string concatenation of Tailwind classes.
17. Throw explicit errors for invalid states (see Tabs context) and favor guard clauses over nesting.
18. Client components stay slim; heavy data/side effects belong in server components with explicit fetch caching options.
19. Follow Next.js App Router guidance (useReportWebVitals, fetch cache/no-store) when adding routes or layouts.
20. Before pushing, run lint -> types -> format -> build and note any intentional deviations inline.
