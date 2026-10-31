---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/vi/index.astro","src/components/Library.astro","src/components/ComicPage.astro","src/pages/404.astro"]
---

# Library (/ and /vi/, /language/<code>/)

Scope: the comic library at `/` (English chrome), `/vi/` (Vietnamese chrome) and each comic language's page. Mode: Experience. Readers pick a comic in a language they read and open it, or jump straight to a chapter. The reader page (`/<slug>/`) and 404 share the same world. The site credits the collaboration: Codex paints the art, Claude letters and builds.

Constraints: no JavaScript, no inline styles, same-origin images, embedded fonts only (CSP in `public/_headers`). Works from one comic to hundreds without per-comic layout work. Filing stays by comic language (ADR 0004's structure, ADR 0006's form).

Approved comp: `.impeccable/mocks/manga-spread.png` (comp round, option 2 of 3).

## Direction contract

THESIS: The library is an open weekly manga magazine: each comic language is a two-page spread, a black-and-white contents page facing a full-colour title page. It refuses both the webcomic platform's banner over rows of rounded cards and the old cream editorial longbox.

OWN-WORLD: Newsprint white ground, black ink panel borders and white gutters, screentone greys for every secondary surface, speed lines converging on what matters, a shaded centre gutter between pages. Comic art is the only colour, printed like a weekly's colour opening pages. Rough brush caps for the wordmark and language titles, a grotesk for set text, the comic's own HTML lettering on art. NEW is a drawn ink burst, never a pill.

STORY: The visitor sees comics are magazines filed by language, recognises one by its painted cover and real lettering, and opens it or a chapter.

FIRST VIEWPORT: Spread at full width with a centre gutter. Left page: brush wordmark top left, EN | VI right, the headline in heavy grotesk, then a 2×5 grid of numbered chapter panels in greyscale tone. Right page: huge brush language name, its local name and count, the newest cover in full colour bleeding to the page edge with a caption and an ink NEW burst, then a ruled title box with title, counts, summary, credit, and a strip of three panels below.

FORM: Weekly Manga Page (dealt challenger, chosen by the user over the assigned direction), fused with the colour-insert convention of manga weeklies; seed: e394b36eb1a80b8b

Signature interaction: a greyscale panel prints in colour as you point at or focus it (the colour-insert pull), with speed lines tightening on the cover; off under reduced motion, colour still shows on focus.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
