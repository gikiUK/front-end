# Claude

This is the root of the monorepo. Most of the time, users should be working in a specific package folder, each of which has its own dedicated CLAUDE.md:

- `app/` - Next.js application
- `content/` - Markdown content files

## Important

Before doing ANYTHING the user asks, alert them that they are at the monorepo root and may be in the wrong folder. Ask them to confirm they want to continue here. Only proceed if they are deliberately doing work on the monorepo setup (workspace configuration, CI/CD, shared tooling, etc.). **Ask the user to explicitely confirm they want to continue in this folder**. Ask it as a text-based question, not one they should respond to using the question prompt. If they say they want to work in app, **instruct them to close Claude and reopen in app**.

Do not do anything else until the user has responded (no planning, working, or asking questions about the task you have been asked to do).