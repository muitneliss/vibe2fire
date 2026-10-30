---
paths:
  - "src/lib/comic.ts"
  - "src/pages/content.json.ts"
  - "docs/content-feed.md"
---

# The content feed is a published contract

omninoise-ops reads `https://vibe2fire.dev/content.json`. Adding a field is safe. Renaming, removing or changing the meaning of a field breaks that consumer: bump `FEED_SCHEMA` to `vibe2fire.content/v2`, document the change in `docs/content-feed.md`, and tell the owner so omninoise-ops is updated in the same change window. The feed test in `tests/comic.test.ts` pins the shape.
