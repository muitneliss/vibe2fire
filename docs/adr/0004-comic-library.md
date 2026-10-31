# 0004. A comic library at the root, every comic at /<slug>/

- **Status:** Accepted
- **Date:** 2026-10-30
- **Deciders:** Cuong Tran (owner)

## Context

The site served one "home" comic at `/` and every other comic at `/<slug>/`. A second comic, possibly in another language, had no front door: visitors landed on whichever comic was marked `home`.

## Decision

- `/` is a library of all comics, newest first, each with a cover, summary, language and size. Comics are filed by their own language (`lang`) in one drawer per language, behind a divider card, with jump links to each drawer (`#lang-<code>`). A drawer on the library shows at most two rows (ten covers); a fuller drawer shows nine and a card that opens that language's own page (`/language/<code>/`, `/vi/language/<code>/`), so the library stays short however many comics there are. The reader page links back to its comic's drawer.
- The site chrome (library, 404) has interface locales: English at `/` (default) and Vietnamese at `/vi/`, defined in `src/lib/i18n.ts`. A comic's own reader labels stay in its `comic.yaml`.
- Every comic is served at `/<slug>/`. The `home` field is removed; comics gain `date`, `summary` and `cover`.
- A comic folder name cannot be a locale code or a route name (`language`, `comics`, `content.json`, `404`); `validate()` rejects it.

## Consequences

- Old `/#chapter` links land on the library. Fragments never reach the server, so no redirect can carry them. Acceptable: the Vibe2Fire page is `noindex` and not publicly linked, per its own footer.
- Feed `url` values change within `vibe2fire.content/v1` (comic and chapter URLs now include the slug); field meanings are unchanged and `date`, `summary`, `cover` are added. Recorded in `docs/content-feed.md`.
- Adding an interface language means adding a locale and its strings to `src/lib/i18n.ts` and a page file `src/pages/<code>/index.astro`; a comic in a new language needs nothing, its drawer appears on its own; adding a comic means adding a folder.
