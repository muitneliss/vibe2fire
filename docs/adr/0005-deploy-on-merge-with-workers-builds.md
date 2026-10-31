# 0005. Deploy on merge to main with Cloudflare Workers Builds

- **Status:** Accepted
- **Date:** 2026-10-31
- **Deciders:** Cuong Tran (owner), agent

## Context

ADR 0001 kept deploys local: CI checked, tested and built, then someone ran a vault-wrapped `wrangler deploy` by hand. On 2026-10-31 a merged PR (the comic library) sat undeployed while the live site still showed the old page, because nothing publishes `main`. The owner asked for merges to deploy themselves.

## Decision

- **Cloudflare Workers Builds deploys `main`.** The Worker `vibe2fire` is connected to `muitneliss/vibe2fire` through the Cloudflare Workers and Pages GitHub App. Every push to `main` runs `bun run build`, then `bunx wrangler deploy`, with `BUN_VERSION=1.4.2` and `NODE_VERSION=24` (the versions CI uses). Builds of other branches (previews) are off.
- **The deploy credential stays in Cloudflare.** The build uses the build token `vibe2fire`, backed by a scoped API token "Workers Builds - vibe2fire": Workers Scripts edit, Account Settings read and Workers Tail read on the account; Workers Routes edit, Zone read and DNS edit on `vibe2fire.dev`; User Details and Memberships read. GitHub holds no Cloudflare credential, and CI is unchanged.
- **The manual vault-wrapped deploy stays** as the fallback when a build fails or a hotfix cannot wait for a merge.
- Supersedes the deploy bullets of ADR 0001.

## Consequences

- Merging to `main` publishes within a couple of minutes. A PR merged while its CI is red still deploys if `bun run build` passes; keep merging only green PRs.
- Build status and logs are in the Cloudflare dashboard (Workers & Pages → vibe2fire → Deployments) or the Workers Builds API.
- Rotating the deploy credential means replacing the build token in Cloudflare, not touching the repo or GitHub.
