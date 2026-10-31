# 0001. Astro static site on Cloudflare Workers, Bun and Vite+

- **Status:** Accepted
- **Date:** 2026-10-30
- **Deciders:** Cuong Tran (owner), agent

## Context

The Vibe2Fire comic began inside omninoise-ops as a hand-built page, then as a Bun script that generated HTML from `comic.yaml`. Its images could not be deployed by that repo's site, which inlines only HTML and CSS into a Compose file. The owner asked for a dedicated private repo using Bun, Astro and Vite+, hosted on Cloudflare Workers under their personal account (Workers Paid plan).

## Decision

- **Astro, static output.** `comic.yaml` is rendered at build time by `src/components/ComicPage.astro`; no adapter, no server code. Stylesheets are never inlined so the CSP can forbid inline styles.
- **Workers static assets.** `wrangler.jsonc` serves `dist/` with no Worker script, `404-page` not-found handling, and the custom domain `vibe2fire.dev`. Headers come from `public/_headers`.
- **Bun** is the package manager and runs the generation CLI. **Vite+** (`vp`) owns formatting, linting with type checks, and tests; Astro keeps its own Vite for building. TypeScript is pinned to 6 because `astro check` does not support 7.
- **Deploys run locally through Agent Vault** (`cloudflare-lowbit`, the owner's global key). CI only checks, tests and builds; it holds no Cloudflare credential. *Superseded by ADR 0005: merges to `main` deploy through Cloudflare Workers Builds; the vault-wrapped deploy is the fallback.*

## Consequences

- Publishing is `bun run build` plus one vault-wrapped `wrangler deploy`; there is no deploy on merge. *(Superseded by ADR 0005.)*
- A future server feature (search, comments) needs the Astro Cloudflare adapter and a new ADR.
