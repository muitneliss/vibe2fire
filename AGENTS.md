# vibe2fire: agent instructions

Vibe2Fire is a comic studio and site. Each comic is one `comics/<slug>/comic.yaml`; Codex image generation paints the panels, Astro renders a no-JavaScript reader page, and Cloudflare Workers serves it at https://vibe2fire.dev. The site also publishes a content feed (`/content.json`) that the Omninoise social studio (repo `cuongtranba/omninoise-ops`) reads as a content source.

This file is the single source of instructions for Claude Code and Codex. `CLAUDE.md` only imports it (`@AGENTS.md`); edit this file, not that one. Keep it under 200 lines: procedures belong in the skill, file-type rules in `.claude/rules/`.

## Read first

| File | Why |
|---|---|
| `.agents/skills/comic-pipeline/SKILL.md` | How to make, extend, regenerate and review a comic, end to end |
| `.agents/skills/comic-pipeline/references/config.md` | Every `comic.yaml` field |
| `docs/content-feed.md` | The `/content.json` contract other repos depend on |
| `docs/adr/` | Why things are the way they are. Do not undo a decision without a new ADR |

## Layout

```
comics/<slug>/comic.yaml   a comic: style, cast, chapters, panels, lettering (the source of truth)
comics/<slug>/writeup.html optional HTML fragment shown after the comic
comics/<slug>/.work/       gitignored: PNG masters, cast sheet, prompts, Codex logs, review sheets
public/comics/<slug>/panels/*.webp   committed panel images the site serves
src/lib/comic.ts           the comic model: load, validate, image prompts, content feed
src/lib/brand.ts          brand asset paths (icons, link-preview image) and their Codex prompts
src/lib/i18n.ts          interface languages for the site chrome (library, 404)
src/lib/styles.yaml        art style presets (graphic-novel, noir, ligne-claire, fantasy, manga, pop-art, storybook)
src/components/ComicPage.astro   the reader page
src/components/Library.astro     the library page
src/components/BrandHead.astro   favicon, touch icon, manifest and og:image tags for every <head>
src/pages/                 / and /vi/ (library), /[vi/]language/<code>/ (one comic language), /<slug>/ (each comic), /content.json, 404
src/styles/reader.css      reader page chrome: masthead strip, title page, toolbar, chapters, end burst, write-up, folio
src/styles/lettering.css   comic mechanics: printed page, lettering, Pages/Panels, themes (dark, light), presets (ink, pop, manga, parchment)
src/styles/notfound.css    the 404 panel
src/styles/library.css     library layout: one two-page spread per comic language (contents page, title page)
src/styles/magazine.css    the shared world (ADR 0006): tokens, newsprint, wordmark, focus, the NEW burst
src/styles/fonts.css       embedded Bangers + Patrick Hand (Latin and Vietnamese), the comics' lettering
src/styles/fonts-magazine.css  embedded Protest Revolution (dry-brush titles) + Be Vietnam Pro (set text)
public/art/                site art painted by Codex (speed lines, burst, newsprint); each prompt beside it as .json
scripts/comic.ts           generation CLI (bun run comic ...)
scripts/brand.ts           brand CLI: paint the mark and link-preview image, derive public/brand/* (bun run brand ...)
brand/.work/               gitignored: mark candidates, og master, prompts, Codex logs, review sheet
public/_headers            CSP and caching for Workers static assets
wrangler.jsonc             Worker "vibe2fire", custom domain vibe2fire.dev
```

## Commands

```bash
bun install
bun run dev                      # astro dev
bun run check                    # vp check (Oxfmt, Oxlint, type checks) + astro check
bun run test                     # vp test run (Vitest)
bun run build                    # astro build -> dist/
bun run preview                  # wrangler dev: dist/ with _headers, as Workers serves it
bun run comic check|prompts|cast|panels|review|webp|status|all <slug> [--only ids] [--force] [--jobs N] [--dry-run]
bun run brand prompts|mark|review|pick|og|icons|status [n] [--variants N] [--force]   # site icon + share image; costs Codex images

# Deploy: merging to main deploys automatically (Cloudflare Workers Builds, ADR 0005).
# Manual fallback (personal Cloudflare global key, injected by Agent Vault; never pass a key yourself):
bun run build && kanna-vault-run --vault cloudflare-lowbit -- env CLOUDFLARE_API_KEY=placeholder CLOUDFLARE_EMAIL=placeholder bunx wrangler deploy
```

Run `bun run check && bun run test && bun run build` before every commit; CI runs the same.

## Rules

- **Lettering is HTML, never pixels.** Image prompts forbid text; captions, speech and sound effects live in `comic.yaml` under `text`. Models garble Vietnamese diacritics and baked text cannot be edited.
- **Characters by looks, not names.** Prompts describe each character by `look` and their number on the cast sheet. Names make the model swap people. `src/lib/comic.ts` enforces this; keep it that way.
- **Every image costs money and minutes.** `bun run comic prompts` is free; read a prompt before generating. Generation skips existing PNGs; use `--only id --force` to redo one panel, never a whole comic by accident.
- **Review every generated panel** on the contact sheets (`bun run comic review`) before converting and shipping: wrong character, stray text, cropped faces, style drift.
- **The page stays script-free.** No `<script>`, no inline `style=` attributes, no external fonts or images: `public/_headers` sets `default-src 'none'`. Astro is set to never inline stylesheets.
- **The feed is a contract.** `/content.json` (schema `vibe2fire.content/v1`) is read by omninoise-ops. Adding fields is fine; renaming or removing one needs `vibe2fire.content/v2` and a note in `docs/content-feed.md`.
- **The site is public.** It names the Omninoise studio by the owner's decision (ADR 0003). The marketing team in Vibe2Fire is fictional, and the page says so; keep that notice. Facts in write-ups must trace to the omninoise-ops log or ADRs.
- **Secrets.** No key, token or password in a file, commit, argument or log. Cloudflare calls go through `kanna-vault-run --vault cloudflare-lowbit --`; GitHub through `gh`.
- **Git.** One branch per change, never commit to `main`; open a PR, merge it with `gh pr merge --squash --delete-branch` once CI is green; the merge deploys to vibe2fire.dev. Never commit `comics/*/.work/`, `dist/` or `.wrangler/`.

## Gotchas

- `codex exec -i` takes every following path as an image: the prompt must come before `-i`.
- `src/lib/comic.ts` resolves the repo root from the working directory, because Astro bundles it into `dist/` before prerendering. Run every command from the repo root.
- `astro check` does not support TypeScript 7; `typescript` is pinned to 6.
- The Workers asset cache: `/content.json` is cached 5 minutes, panels a day. Rename a panel file rather than overwrite it when an image changes after release.
- Vite+ (`vp`) configures lint, fmt and test in `vite.config.ts`; Astro builds with its own Vite and ignores that file.
