# 0006. The site becomes a weekly manga magazine

- **Status:** Accepted
- **Date:** 2026-10-31
- **Deciders:** Cuong Tran (owner), agents (Claude, Codex)

## Context

The 2026-10-30 redesign kept the reader's look (dark ground, paper masthead, Georgia) and filed the library as a comic-shop longbox: one drawer per language behind a board divider card (ADR 0004, PRODUCT.md). On 2026-10-31 the owner asked for a new UI for the whole site that shows Claude and Codex designing together, with no copied style. The old look also sat in a common AI-generated cluster (cream paper, editorial serif, terracotta accent).

Claude dealt seven grounded directions and a set of outside challengers; Codex painted a full-page mockup of each finalist from the real Vibe2Fire cover. The owner chose the Weekly Manga Page, then the two-page-spread composition (`.impeccable/mocks/manga-spread.png`).

## Decision

- **One world for every page:** a weekly manga magazine. Newsprint white, black ink panel borders with white gutters, screentone greys, speed lines, a rough brush face for the wordmark and titles. Comic art is the only colour on the page, printed like a weekly's colour opening pages.
- **The library is a run of two-page spreads, one per comic language.** The right page is the language's title page with its newest comic's cover in colour; the left page is its contents: the chapters of that comic when the language holds one comic, otherwise its other comics. This replaces the longbox's drawer and divider card. Filing by language, the jump links `#lang-<code>`, the ten-comic cap with a link to `/language/<code>/`, the interface locales and every URL from ADR 0004 stay.
- **The reader joins the same world.** It keeps its mechanics (six-column printed page, Pages / Panels switch without JavaScript, HTML lettering presets, transcripts, write-up), and replaces its chrome and ground. This reverses PRODUCT.md's 2026-10-30 decision that the reader keeps its existing look.
- **Codex paints the site's artwork** (speed-line, screentone and burst plates) from prompts Claude writes; each shipped raster embeds its prompt. The site credits the collaboration.
- Supersedes the visual parts of ADR 0004 (drawers, divider cards) and the "reader keeps its look" line of PRODUCT.md.

## Consequences

- DESIGN.md is rewritten from the built world; the old longbox tokens and rules no longer apply.
- Greyscale chapter thumbnails print in colour on hover and focus; with no pointer, focus still shows colour, so the interaction never hides content.
- A language with one comic shows chapters on its contents page, deep-linking to `/<slug>/#<chapter>`; a second comic in that language switches the contents page to comics with no config change.
- The feed (`/content.json`) is untouched.
