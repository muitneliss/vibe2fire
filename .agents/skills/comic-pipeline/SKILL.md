---
name: comic-pipeline
description: Make, extend, restyle or fix an illustrated comic in the vibe2fire repo, end to end - a character model sheet and painted panels generated with Codex image generation, contact-sheet review, WebP conversion, and the Astro reader page (calif.io/php2shell layout, page and panel modes, HTML speech bubbles and captions in any language) deployed to vibe2fire.dev. Configurable art styles (graphic-novel, noir, ligne-claire, fantasy, manga, pop-art, storybook), dark or light reader, lettering presets and per-character reference images. Use it whenever someone wants a new comic, manga, webtoon or illustrated story, more chapters or panels, a panel regenerated or re-lettered, a different style, or the Vibe2Fire comic changed - even if they only say "make it look like a comic".
---

# comic-pipeline

A comic is one `comics/<slug>/comic.yaml`. Everything else is derived from it:

```
comic.yaml ─▶ cast sheet ─▶ panels ─▶ review ─▶ webp ─▶ astro build ─▶ wrangler deploy
             (Codex)       (Codex,    (look at    (public/   (dist/,        (vibe2fire.dev)
                            parallel)  them!)      comics/)   no JS)
```

```bash
bun run comic check   <slug>                  # validate cast, rows of 6 columns, positions
bun run comic prompts <slug> [--only c01-p2]  # the exact image prompts, free
bun run comic cast    <slug> [--force]        # character model sheet -> comics/<slug>/.work/cast-sheet.png
bun run comic panels  <slug> [--only ids|chapter] [--force] [--jobs 4]
bun run comic review  <slug>                  # .work/review/index.html + 6-up contact sheets
bun run comic webp    <slug>                  # PNG -> public/comics/<slug>/panels/*.webp (only shrinks)
bun run comic status  <slug>                  # what is generated, converted, missing
bun run comic all     <slug>                  # check, cast, panels, review, webp
bun run build && bun run preview              # the site as Workers will serve it
```

Generation skips PNGs already on disk, so `panels` and `all` resume after a failure. One image is one Codex image generation, about 70–90 s; a 40-panel comic takes 15–20 minutes at 4 jobs. Run big batches in the background and check `status`.

## A new comic

1. **Agree the story first**: arc, chapter list, who the characters are. A chapter is one printed page of 2–6 panels in rows that fill 6 columns.
2. **Scaffold**: copy `templates/comic.example.yaml` to `comics/<slug>/comic.yaml`. Set `home: true` only on the comic that should be the front page; the others are served at `/<slug>/`. Every field: `references/config.md`.
3. **Pick the look**: `style.preset` (see `src/lib/styles.yaml`) sets the art plus a default reader `theme` and `lettering`; override either, add mood with `style.extra`, or write a whole `style.art`. Add a preset to `styles.yaml` when a look should be reusable.
4. **Cast**: concrete visual `look`s and a short `tag` per character; `refs` for anyone who must resemble a real person, product or earlier art. Run `cast`, open the sheet and fix it before any panel: every panel copies it.
5. **Panels**: English `scene` with `{id}` placeholders, lettering in the comic's language under `text`. `check`, then `prompts --only` one panel and read it.
6. **Generate, review, convert**: `panels` → `review` → look at every contact sheet → regenerate failures (`--only id --force`) → `webp`.
7. **Letter and ship**: `bun run build && bun run preview`; screenshot each chapter at desktop width, in the "Panels" mode and at 390 px. Move lettering (`at`, `tail`, `focus`) wherever a bubble covers a face. Then the repo's check/test/build, a PR, and the deploy command in AGENTS.md.

## Extending an existing comic

Add chapters or panels to its `comic.yaml`, then `panels <slug> --only <new ids or chapter id>`, `review`, `webp`, build. The cast sheet in `.work/` is reused, so new panels match the old ones. If `.work/` is missing on this machine (it is gitignored), ask the owner for it before regenerating the sheet: a new sheet changes how every character looks.

## What review must catch

- **Swapped characters**: the commonest failure. Prompts already use looks and sheet numbers; if a panel still swaps, add a negative to its scene ("not the woman in the magenta blazer") and regenerate.
- **Text in the image**: signs, screens and posters grow gibberish. Describe the surface as blank and regenerate.
- **Crowded top fifth**: captions sit there; move the lettering or set `focus`.
- **Style drift** from the sheet (robot design, outfit colour): tighten the `look`, regenerate.

## Gotchas

- `codex exec -i` is variadic; `scripts/comic.ts` puts the prompt before `-i`.
- If Codex forgets to copy its output, the script recovers it from `~/.codex/generated_images/` via the path in `.work/logs/<id>.log`.
- Fonts cover Latin and Vietnamese; add subsets to `src/styles/fonts.css` before lettering another script.
- Changing a published panel image: Workers caches panels for a day. Give the panel a new id (and file) rather than overwriting.
- Content rules for comics that Omninoise republishes: the feed is public, Omninoise's own rules (no studio name in social posts, sources for facts, "AI-generated art" notes) apply on its side.
