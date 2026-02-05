# Content Package

This package contains markdown source files for blog posts and articles. It is a workspace package but is **not consumed as an npm dependency** by the app.

## How It Works

The content package exists as a sibling folder that the app reads via direct filesystem paths at build time:

```
front-end/
├── app/
│   └── scripts/generate-content.js  ← reads from ../content/src/posts
├── content/
│   ├── src/posts/
│   │   ├── blog/
│   │   └── articles/
│   └── images/
└── pnpm-workspace.yaml
```

### Why This Pattern?

1. **Cloudflare Workers constraint**: The app deploys to Cloudflare Workers, which cannot access the filesystem at runtime. All content must be compiled into JS bundles at build time.

2. **Build-time generation**: The app's `generate-content.js` script:
   - Reads markdown files from `../content/src/posts/`
   - Parses frontmatter with `gray-matter`
   - Converts markdown to HTML with `marked`
   - Generates TypeScript files in `app/lib/content/generated/`
   - Creates Lunr search indexes in `app/public/static/search/`

3. **Not a package dependency**: Unlike `@giki/curriculum` or `@giki/interpreters`, this package is not listed in app's `package.json` dependencies. It's accessed via relative filesystem paths.

### Why Keep It as a Workspace Package?

- Allows separate CI workflow for content formatting
- Provides isolated Prettier configuration for markdown files
- Organizational boundary for content authoring (AGENTS.md, Claude skills)

## Reference Implementation

For a fully fleshed-out example of this pattern, see:
`/Users/iHiD/Code/jiki/front-end/content/`

That implementation includes:

- `src/posts/blog/` and `src/posts/articles/` with config.json + locale markdown files
- `src/authors.json` for author metadata
- `.claude/` skills for content authoring and translation
- `.context/` documentation for Claude

## CI Workflow

The `.github/workflows/content.yml` workflow runs on changes to `content/**` and checks:

- **format**: Prettier formatting for markdown files

This is a lightweight workflow since content files don't require typechecking or linting.
