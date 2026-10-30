# Vibe2Fire

Comics made with Codex image generation and Astro, served at https://vibe2fire.dev. The first comic, *Vibe2Fire*, is a Vietnamese satire about a boss who taught himself AI, built a social studio in three days, and dissolved the marketing team.

- `comics/<slug>/comic.yaml`: a comic (style, cast, chapters, panels, lettering)
- `bun run comic all <slug>`: generate the cast sheet and panels, review, convert
- `bun run build && bun run preview`: the site, as Cloudflare Workers serves it
- `/content.json`: the content feed (see `docs/content-feed.md`)

Agents: start with `AGENTS.md` and `.agents/skills/comic-pipeline/SKILL.md`.
