# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The SettleMint Documentation Repository contains the official documentation for the SettleMint Blockchain Transformation Platform. Built with modern tools, it provides a comprehensive documentation experience including API references, guides, and SDK documentation.

### Technology Stack

**Documentation Framework**
- Runtime: Node.js 24 with Bun
- Framework: Next.js 15.3.4 with React 19
- Documentation Engine: Fumadocs (modern MDX-based docs framework)
- UI: Tailwind CSS, Lucide React icons
- Content: MDX with enhanced features (Mermaid diagrams, code highlighting)
- Analytics: PostHog integration
- Build: Bun package manager, experimental React compiler

**Project Structure**
- content/docs/ - Main documentation pages (MDX)
- content/release-notes/ - Product release notes
- content/snippets/ - Reusable MDX snippets
- src/ - Next.js application source
- scripts/ - Build and generation scripts
- public/ - Static assets

**Key Features**
- Automatic SDK documentation generation from @settlemint/sdk-* packages
- MDX-based content with advanced features
- Dark mode support
- Search functionality
- Responsive design

## Essential Commands

### Development Workflow
```bash
# Setup
bun install                  # Install dependencies

# Development
bun run dev                  # Start development server (http://localhost:3001/documentation)
bun run build               # Build for production
bun run start               # Start production server

# Code Quality
bun run lint                # Run Next.js linter
bun run format              # Format with Prettier

# Documentation Generation
bun generate-sdk-docs       # Generate SDK documentation from @settlemint packages
bun generate-sitemap        # Generate sitemap.xml

# Docker & Deployment
bun run docker              # Build multi-platform Docker image

# Utilities
bun run clean               # Clean and reinstall dependencies
bun run postinstall         # Run post-install scripts (fumadocs-mdx)
```

### Writing Documentation
```bash
# Create new documentation page
# Add MDX file to content/docs/

# Preview changes
bun run dev

# Test production build
bun run build && bun run start
```

## Architecture & Code Organization

### Repository Structure
```
/
├── content/              # Documentation content
│   ├── docs/            # Main documentation pages (MDX)
│   │   ├── concepts/    # Conceptual documentation
│   │   ├── guides/      # How-to guides
│   │   ├── sdk/         # SDK reference (auto-generated)
│   │   └── reference/   # API reference
│   ├── release-notes/   # Product release notes
│   ├── snippets/        # Reusable MDX snippets
│   └── img/             # Documentation images
├── src/                 # Next.js application
│   ├── app/            # App router pages
│   │   └── docs/       # Documentation routes
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   └── mdx/        # MDX-specific components
│   └── lib/            # Utilities and helpers
├── scripts/            # Build scripts
│   ├── generate-sdk-docs.ts    # SDK doc generation
│   └── generate-sitemap.ts     # Sitemap generation
├── public/             # Static assets
└── config files        # Various config (next.config.mjs, etc.)
```

### Key Architecture Patterns

1. **MDX-Based Documentation**
   - Fumadocs for documentation framework
   - Enhanced MDX with plugins for diagrams, code highlighting
   - Component-based content architecture

2. **SDK Documentation Generation**
   - Automatic generation from @settlemint/sdk-* packages
   - TypeScript type extraction
   - API reference generation

3. **Modern Frontend Stack**
   - Next.js 15 with App Router
   - React 19 with experimental compiler
   - Server Components for performance
   - Tailwind CSS for styling

## Development Guidelines

### TypeScript Conventions
- **NO default exports** (except when framework requires)
- Use `import type` for type imports
- Prefer interfaces over type intersections
- **Never use `any`** - everything must be fully typed
- Use discriminated unions for custom errors
- Naming conventions:
  - Files: kebab-case
  - Variables/functions: camelCase
  - Types/interfaces/classes: PascalCase

### Code Style Rules
- Prefer nullish coalescing (`??`) over logical OR (`||`)
- Never use barrel files (index.ts exports)
- Use structured logging:
  ```typescript
  const logger = createLogger({
    level: (process.env.SETTLEMINT_LOG_LEVEL as LogLevel) || "info",
  });
  ```
- No console.log statements

### Documentation Standards
- Write clear, concise MDX content
- Include code examples with proper syntax highlighting
- Use Mermaid diagrams for complex flows
- Add appropriate frontmatter metadata
- Cross-reference related documentation
- Keep SDK docs auto-generated (don't edit manually)

### Git Workflow
- **Never push to main branch**
- Branch management:
  - Check current branch before creating new ones
  - Only create new branches when on main
  - Stay on feature branch for updates
- Commit format: `type(scope): description`
  - Types: feat, fix, chore, docs, style, refactor, perf, test, build, ci, revert
  - Breaking changes: `feat!:` or `BREAKING CHANGE:` in body

## Claude Code Best Practices

- Always read entire files. Otherwise, you don't know what you don't know, and
  will end up making mistakes, duplicating code that already exists, or
  misunderstanding the architecture.
- Commit early and often. BUT NEVER TO THE main BRANCH, create a new branch
  first!!! When working on large tasks, your task could be broken down into
  multiple logical milestones. After a certain milestone is completed you should
  commit it. If you do not, if something goes wrong in further steps, we would
  need to end up throwing away all the code, which is expensive and time
  consuming.
- Your internal knowledgebase of libraries might not be up to date. When working
  with any external library, unless you are 100% sure that the library has a
  super stable interface, you will look up the latest syntax and usage via
  either Context7 (first preference), DeepWiki or web search (less preferred,
  only use if Context7 and DeepWiki are not available)
- Do not say things like: "x library isn't working so I will skip it".
  Generally, it isn't working because you are using the incorrect syntax or
  patterns. This applies doubly when the user has explicitly asked you to use a
  specific library, if the user wanted to use another library they wouldn't have
  asked you to use a specific one in the first place.
- Always run format, linting and tests after making major changes. Otherwise,
  you won't know if you've corrupted a file or made syntax errors, or are using
  the wrong methods, or using methods in the wrong way.
- Code is read more often than it is written, make sure your code is always
  optimised for readability
- Unless explicitly asked otherwise, the user never wants you to do a "dummy"
  implementation of any given task. Never do an implementation where you tell
  the user: "This is how it _would_ look like". Just implement the thing.
- Whenever you are starting a new task, it is of utmost importance that you have
  clarity about the task. You should ask the user follow up questions if you do
  not, rather than making incorrect assumptions.
- Do not carry out large refactors unless explicitly instructed to do so.
- When starting on a new task, you should first understand the current
  architecture, identify the files you will need to modify, and come up with a
  Plan. In the Plan, you will think through architectural aspects related to the
  changes you will be making, consider edge cases, and identify the best
  approach for the given task. Get your Plan approved by the user before writing
  a single line of code.
- If you are running into repeated issues with a given task, figure out the root
  cause instead of throwing random things at the wall and seeing what sticks, or
  throwing in the towel by saying "I'll just use another library / do a dummy
  implementation".
- You are an incredibly talented and experienced polyglot with decades of
  experience in diverse areas such as software architecture, system design,
  development, UI & UX, copywriting, and more.
- When doing UI & UX work, make sure your designs are both aesthetically
  pleasing, easy to use, and follow UI / UX best practices. You pay attention to
  interaction patterns, micro-interactions, and are proactive about creating
  smooth, engaging user interfaces that delight users. The more you can stick to
  existing components and styles in the project, the happier your users will be.
- When you receive a task that is very large in scope or too vague, you will
  first try to break it down into smaller subtasks. If that feels difficult or
  still leaves you with too many open questions, push back to the user and ask
  them to consider breaking down the task for you, or guide them through that
  process. This is important because the larger the task, the more likely it is
  that things go wrong, wasting time and energy for everyone involved.
- When doing similar tasks across multiple files, always try to spawn a fleet of
  sub agents to handle the work more quickly

# Code References

**THIS IS OF UTTER IMPORTANCE THE USERS HAPPINESS DEPENDS ON IT!** When
referencing code locations, you MUST use clickable format that VS Code
recognizes:

- `path/to/file.ts:123` format (file:line)
- `path/to/file.ts:123-456` (ranges)
- Always use relative paths from the project root
- Examples:
- `src/server/fwd.ts:92` - single line reference
- `src/server/pty/pty-manager.ts:274-280` - line range
- `web/src/client/app.ts:15` - when in parent directory

## Package Management with Bun

### Always Use Bun
```bash
# Instead of npm/yarn/pnpm:
bun install              # NOT npm install
bun run <script>         # NOT npm run
bun <file>              # NOT node <file>
bun test                # NOT jest/vitest
```

### Bun-Specific APIs
- `Bun.serve()` for servers (not Express)
- `bun:sqlite` for SQLite (not better-sqlite3)
- `Bun.redis` for Redis (not ioredis)
- `Bun.sql` for Postgres (not pg)
- `Bun.File()` for file operations
- `Bun.$` for shell commands (not execa)
- Built-in WebSocket support
- Automatic .env loading (no dotenv)

## Documentation Writing

### MDX Features
- **Code blocks**: Use triple backticks with language identifiers
- **Mermaid diagrams**: Supported via code blocks with `mermaid` language
- **Components**: Import and use React components in MDX
- **Frontmatter**: Include title, description, and metadata
- **Snippets**: Reuse content via `content/snippets/`

### Content Guidelines
- Follow the SettleMint style guide
- Use active voice and present tense
- Include practical examples
- Link to related documentation
- Keep paragraphs concise

## Before Creating a PR

1. **Test locally**: `bun run dev` and verify all pages render
2. **Build check**: `bun run build` to ensure production build works
3. **Format code**: `bun run format`
4. **Lint check**: `bun run lint`

## Troubleshooting

### Common Issues
1. **Build failures**: Check Node version matches .nvmrc (v24)
2. **MDX errors**: Validate frontmatter and MDX syntax
3. **Missing SDK docs**: Run `bun generate-sdk-docs`
4. **Port conflicts**: Default port is 3001, check if in use

### Local Development Setup
1. Install prerequisites:
   - Node.js v24 (use fnm or nvm)
   - Bun package manager
2. Clone repository
3. Install dependencies: `bun install`
4. Start development: `bun run dev`
5. Access at: http://localhost:3001/documentation

## Project-Specific Notes

- This is the documentation site, not the main platform codebase
- Documentation is served under `/documentation` base path
- SDK docs are auto-generated - don't edit them manually
- Use Fumadocs components for consistent UI
- Check existing documentation patterns before adding new content

## Command Reference

Use these Claude Code commands when appropriate:
- `/pr` - Create pull requests
- `/qa` - Run quality checks
- `/explore` - Understand architecture
- `/stuck` - Debug systematically
- `/deps` - Update dependencies safely
- `/performance` - Analyze performance

## Documentation Updates

When updating documentation:
1. Check if it's user-facing content (content/docs/) or auto-generated (SDK docs)
2. For user content, edit the MDX files directly
3. For SDK docs, update the source packages and regenerate
4. Test changes locally with `bun run dev`
5. Verify build with `bun run build`

## MCP Server Usage

### Linear (Project Management)
When working with Linear tickets, use the MCP Linear tools:

```
# Search for issues
mcp__linear__list_issues(query="ENG-3236", limit=10)

# Get issue details
mcp__linear__get_issue(id="ENG-3236")

# Update issue with comment and/or status
mcp__linear__update_issue(
  id="ENG-3236",
  stateId="<state-id>",  # Optional: update status
  description="Updated description"  # Optional: update description
)

# Create comment on issue
mcp__linear__create_comment(
  issueId="<issue-id>",
  body="PR created: https://github.com/..."
)

# List issue statuses to find stateId
mcp__linear__list_issue_statuses(teamId="<team-id>")
```

When you create a PR for a Linear ticket:
1. Add a comment with the PR link using `mcp__linear__create_comment`
2. Update the issue status if needed using `mcp__linear__update_issue`
3. Include the Linear issue ID in the PR description for automatic linking

### Sentry (Error Tracking)
Use Sentry MCP tools for error investigation:

```
# Find organizations you have access to
mcp__sentry__find_organizations()

# Find issues in an organization
mcp__sentry__find_issues(
  organizationSlug="settlemint",
  query="is:unresolved",
  sortBy="last_seen"
)

# Get detailed error information
mcp__sentry__get_issue_details(
  organizationSlug="settlemint",
  issueId="PROJECT-123"
)

# Update issue status
mcp__sentry__update_issue(
  organizationSlug="settlemint",
  issueId="PROJECT-123",
  status="resolved"
)
```

### Context7 (Documentation)
Use for checking latest documentation:

```
# Search for library documentation
mcp__context7__resolve-library-id(libraryName="next.js")

# Get library docs
mcp__context7__get-library-docs(
  context7CompatibleLibraryID="/vercel/next.js",
  topic="routing"
)
```

### DeepWiki (GitHub Documentation)
Use for repository documentation:

```
# Get repository documentation structure
mcp__deepwiki__read_wiki_structure(repoName="facebook/react")

# Read repository documentation
mcp__deepwiki__read_wiki_contents(repoName="facebook/react")

# Ask questions about a repository
mcp__deepwiki__ask_question(
  repoName="facebook/react",
  question="How does the reconciliation algorithm work?"
)
```

## Fumadocs Usage Guidelines

### Recommended UI Components
- Make optimal use of Fumadocs capabilities:
  - Use `Accordion` for Q/A sections
  - Implement Table of Contents (TOC)
  - Utilize step-by-step guides with built-in components
  - Leverage `Tabs` for showing multiple code examples or configuration options
  - Integrate responsive and interactive documentation components

### Best Practices
- Leverage Fumadocs' built-in MDX features for enhanced documentation
- Use semantic MDX components for better structure and readability
- Take advantage of Fumadocs' performance and SEO optimizations
- Explore and utilize advanced Fumadocs UI components for better user experience

### SEO Best Practices
- Ensure all pages always have optimal seo metadata (descriptions, titles, etc)