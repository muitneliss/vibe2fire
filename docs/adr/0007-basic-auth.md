# 0007. The site and feed sit behind HTTP Basic Auth

- **Status:** Accepted (supersedes the "public" part of 0003)
- **Date:** 2026-10-31
- **Deciders:** Cuong Tran (owner)

## Context

ADR 0003 published vibe2fire.dev openly, studio name included. The owner has since decided to lock the whole site, `/content.json` and the panel images included, and accepts that omninoise-ops must then send credentials to read the feed.

## Decision

A Worker (`src/worker.ts`) runs in front of the static assets (`run_worker_first` in `wrangler.jsonc`) and answers every request without valid HTTP Basic credentials with `401` and `WWW-Authenticate: Basic`. The user and password are compared in constant time (SHA-256 of both sides, then an XOR loop). With either secret unset, nobody is let in.

The credentials are Worker secrets `BASIC_AUTH_USER` and `BASIC_AUTH_PASSWORD`, set with `wrangler secret put` through `kanna-vault-run` and rotated by putting them again. They are never in the repo.

## Consequences

- omninoise-ops must send credentials when it fetches `/content.json` and the image URLs in it. The feed schema is unchanged (`vibe2fire.content/v1`).
- Crawlers and link-preview bots (the `og:image` card) no longer see the site.
- Gated responses leave the Worker with `Cache-Control: private` instead of `public`, so shared caches never store them; browsers still cache them.
- `astro dev` has no auth. `bun run preview` (wrangler dev) needs a `.dev.vars` file with both secrets; it is gitignored.
- Deploying this change before the secrets exist locks everybody out, because a missing secret fails closed. Put the secrets first.
