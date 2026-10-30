# 0002. vibe2fire publishes a versioned content feed for Omninoise

- **Status:** Accepted
- **Date:** 2026-10-30
- **Deciders:** Cuong Tran (owner), agent

## Context

The owner wants vibe2fire to be a content source for the Omninoise social studio (omninoise-ops). Omninoise should reuse chapters and panels without scraping HTML or copying files between repos.

## Decision

The site publishes `/content.json` (schema `vibe2fire.content/v1`, documented in `docs/content-feed.md`): every comic, chapter and panel with absolute image URLs, alt text, plain-text lettering and transcripts. Fields may be added within v1; breaking changes ship as v2. omninoise-ops lists the feed in its `content/sources.yaml`.

## Consequences

- The feed shape is a contract, pinned by a test and guarded by `.claude/rules/feed.md`.
- Images stay in this repo; omninoise-ops downloads the ones it posts.
