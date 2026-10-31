---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/vi/index.astro","src/components/Library.astro"]
---

# Library (/ and /vi/)

Scope: the comic library at `/` (English chrome) and `/vi/` (Vietnamese chrome). Mode: Experience. Readers pick a comic to read; comics are filed by their language. The reader page (`/<slug>/`) keeps its existing world and only gains a link back here.

Constraints: no JavaScript, no inline styles, same-origin images, embedded fonts only (CSP in `public/_headers`). Works from one comic to hundreds without per-comic layout work.

## Direction contract

THESIS: The library is a comic-shop longbox: every comic filed behind a tabbed divider card for its language. It refuses the category default of a hero banner over one undifferentiated card grid.

OWN-WORLD: The reader's own world. Paper masthead (#f4f0e7, Bangers wordmark with the red 2) over the dark reader ground (#191a18). Divider cards in warm board (#e4dac6) with a tab cut into the top edge, the language's own name set big in Bangers. Covers framed in the comic-page black (#111) like panel gutters, carrying a real caption in that comic's HTML lettering preset. Mono small caps for counts.

STORY: The visitor sees at once that comics come in languages, jumps to theirs, recognises each comic by its cover art and its real lettering, and opens one.

FIRST VIEWPORT: Paper masthead, wordmark left, EN / VI interface switch right. On the dark ground, the heading "Comics, filed by language." at ~46px left with jump links per language right. Below, the first box row: a 180px divider card, then portrait cover tiles (about five across at 1440).

FORM: The Longbox, fifth of my seven grounded structures by resonance (the dealt and chosen card); seed: 67a60c5f9289f710

Signature interaction: a cover lifts out of the box on hover and focus, the way you pull a comic from a longbox (CSS only, off under reduced motion).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
