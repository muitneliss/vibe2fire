---
name: Vibe2Fire
description: A comic studio and library; painted panels, real HTML lettering, filed by language in a dark reader's longbox.
colors:
  stamp-red: "#a8321f"
  ember-coral: "#e8775e"
  longbox-board: "#e4dac6"
  lamplight: "#f1d3aa"
  newsprint-paper: "#f4f0e7"
  press-ink: "#25251f"
  pencil-muted: "#67655b"
  paper-rule: "#d5cfc0"
  reader-night: "#191a18"
  night-text: "#e6dfcf"
  night-body: "#ded6c5"
  night-muted: "#aaa79b"
  night-rule: "#54544a"
  toolbar-rule: "#44443e"
  gutter-black: "#111111"
  panel-void: "#2a2a26"
  box-floor: "#1f201d"
  box-wall: "#2c2d28"
  board-pencil: "#4a4740"
  brass-date: "#c1a685"
  kiln-focus: "#c16b44"
  light-reader-ground: "#ece6d8"
  caption-white: "#f6f1e6"
  balloon-white: "#ffffff"
  pop-yellow: "#ffe680"
  sfx-red: "#ff5a4a"
  sfx-yellow: "#ffd23f"
  sfx-mint: "#7ff0d1"
  parchment: "#efe0bd"
  parchment-ink: "#3b2a14"
  parchment-rule: "#6b4f26"
typography:
  display:
    fontFamily: "Bangers, Arial Narrow, sans-serif"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.03em"
  wordmark:
    fontFamily: "Bangers, Arial Narrow, sans-serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(30px, 4.1vw, 54px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline-library:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(32px, 3.6vw, 48px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "26px"
    fontWeight: 400
  title-cover:
    fontFamily: "Bangers, Arial Narrow, sans-serif"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.03em"
  body:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.7
  body-lead:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  lettering:
    fontFamily: "Patrick Hand, Comic Sans MS, Chalkboard SE, cursive"
    fontSize: "clamp(12.5px, 1.4cqi, 16px)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.03em"
  sfx:
    fontFamily: "Bangers, Arial Narrow, sans-serif"
    fontSize: "clamp(30px, 5cqi, 60px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em"
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.3
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
  mono-count:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
    fontFeature: "\"c2sc\", \"smcp\""
rounded:
  none: "0px"
  xs: "2px"
  sm: "3px"
  md: "4px"
  balloon: "50% / 46%"
  pop-balloon: "1.4em"
spacing:
  gutter: "10px"
  frame: "14px"
  box: "16px"
  drawer: "18px"
  chapter-edge: "22px"
  edge: "24px"
  section: "56px"
  opening: "72px"
components:
  wordmark:
    textColor: "{colors.press-ink}"
    typography: "{typography.wordmark}"
  ui-switch-item:
    textColor: "{colors.pencil-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "8px 10px"
  ui-switch-item-active:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.newsprint-paper}"
    rounded: "{rounded.xs}"
    padding: "8px 10px"
  lang-jump:
    textColor: "{colors.lamplight}"
    rounded: "{rounded.xs}"
    padding: "9px 12px"
  lang-jump-active:
    backgroundColor: "{colors.longbox-board}"
    textColor: "{colors.reader-night}"
    rounded: "{rounded.xs}"
    padding: "9px 12px"
  divider-card:
    backgroundColor: "{colors.longbox-board}"
    textColor: "{colors.reader-night}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "44px 18px 18px"
    width: "184px"
  cover:
    backgroundColor: "{colors.gutter-black}"
    textColor: "{colors.night-text}"
    rounded: "{rounded.none}"
    padding: "8px 8px 14px"
  cover-title:
    textColor: "{colors.caption-white}"
    typography: "{typography.title-cover}"
  cover-title-hover:
    textColor: "{colors.lamplight}"
  cover-new:
    backgroundColor: "{colors.stamp-red}"
    textColor: "{colors.balloon-white}"
    padding: "6px 10px 5px"
  cover-more:
    backgroundColor: "{colors.longbox-board}"
    textColor: "{colors.reader-night}"
    rounded: "{rounded.none}"
    padding: "16px"
  cover-more-hover:
    textColor: "{colors.stamp-red}"
  mode-switch-active:
    backgroundColor: "{colors.longbox-board}"
    textColor: "{colors.reader-night}"
    rounded: "{rounded.xs}"
    padding: "7px 12px"
  printed-page:
    backgroundColor: "{colors.gutter-black}"
    rounded: "{rounded.none}"
    padding: "14px"
  caption:
    backgroundColor: "{colors.gutter-black}"
    textColor: "{colors.caption-white}"
    typography: "{typography.lettering}"
    padding: "0.5em 1.1em 0.45em"
  balloon:
    backgroundColor: "{colors.balloon-white}"
    textColor: "{colors.gutter-black}"
    typography: "{typography.lettering}"
    rounded: "{rounded.balloon}"
    padding: "0.8em 1.15em"
---

# Design System: Vibe2Fire

## Overview

**Creative North Star: "The Longbox and the Printed Page"**

Vibe2Fire is one world with two rooms. The reader is a printed comic laid on a dark table: a paper masthead and an editorial Georgia opening, then the night ground where pages sit in comic-page black gutters and the lettering is real HTML set over painted panels. The library is the comic-shop longbox in the same room: each comic language is a drawer behind a tabbed board divider card, and every comic stands in it as a cover framed in that same gutter black, carrying its own caption in its own lettering preset.

The material vocabulary is physical and print-shop: newsprint paper, press ink, board stock, gutter black, a stamp red. Density is generous around prose (19px Georgia at 1.7, 46em measure) and tight inside the art (10px gutters, 14px page frame). Comic faces (Bangers, Patrick Hand) appear only where a comic would put them: the wordmark, divider cards, cover titles, captions, balloons and sound effects. Everything else speaks in Georgia, with a plain sans for small controls and monospace for measurements.

The system rejects the category default of a hero banner over an undifferentiated card grid; comics are filed, not merchandised. The page carries no JavaScript, so every state is CSS on native HTML: links, radio inputs, `<details>`, `aria-current`.

**Key Characteristics:**
- Paper masthead over a dark reader ground; the two rooms share one masthead and one wordmark.
- Comic-page black (#111) frames anything that holds art: the printed page, the cover, the caption box.
- Warm board (#e4dac6) marks filing and the selected state: divider cards, the "all in this language" card, the active language chip, the active reader mode.
- Lettering is HTML, never pixels; covers carry real captions in the comic's own preset.
- Measurements (counts, chapter numbers, chapter dates in the toolbar) are monospace; counts in the library are mono small caps.
- Square corners on every paper object; small 2-4px radii only on controls.

## Colors

A warm print palette: newsprint and board on one side, a near-black reader night on the other, one stamp red that turns ember coral on the dark.

### Primary
- **Stamp Red** (#a8321f): the wordmark's "2", emphasised words in a paper-side headline, link underlines and link hover on paper, the "Newest" badge on a cover, hover on the board card. On paper it is the only accent.
- **Ember Coral** (#e8775e): Stamp Red's counterpart on the dark ground, for the emphasised words of the library headline, where #a8321f would sink into #191a18.

### Secondary
- **Longbox Board** (#e4dac6): the filing stock. Divider cards, the drawer-overflow card, the selected language chip and the selected reader mode (Pages / Panels). Board means "this is where you are" or "this is a section of the box".
- **Lamplight** (#f1d3aa): warm light on the dark. Text selection everywhere, hover on dark links and summaries, the language-chip text, hovered cover titles, emphasis inside cover summaries.

### Tertiary
The lettering inks. They belong to comic content, not to chrome, and are chosen per comic by lettering preset.
- **Caption White** (#f6f1e6): text in black brush captions; cover titles.
- **Balloon White** (#ffffff): speech balloons, sound-effect fill, the light reader's page gutters.
- **Pop Yellow** (#ffe680): caption boxes in the pop preset.
- **SFX Red / SFX Yellow / SFX Mint** (#ff5a4a / #ffd23f / #7ff0d1): sound-effect colour options, always stroked in gutter black.
- **Parchment / Parchment Ink / Parchment Rule** (#efe0bd / #3b2a14 / #6b4f26): the aged-scroll caption of the parchment preset for fantasy and storybook comics.

### Neutral
- **Newsprint Paper** (#f4f0e7): the masthead, the cold open and the write-up; the page's base.
- **Press Ink** (#25251f): text on paper; the active interface-language chip.
- **Pencil Muted** (#67655b): secondary text on paper, footer, inactive interface switch.
- **Paper Rule** (#d5cfc0): hairlines on paper (masthead rule, section rules, table rows, link underlines in shortcuts).
- **Reader Night** (#191a18): the dark reader and library ground; also the ink printed on board.
- **Night Text** (#e6dfcf): default text on the dark ground.
- **Night Body** (#ded6c5): long-form copy on the dark (chapter descriptions, the library lead).
- **Night Muted** (#aaa79b): toolbar links, chapter counters, cover counts, footer on dark.
- **Night Rule** (#54544a): outlines of controls on dark (reader mode switch, language chips).
- **Toolbar Rule** (#44443e): the hairline under the sticky reader toolbar.
- **Gutter Black** (#111111): printed-page gutters, cover frames, caption boxes, balloon strokes, sound-effect strokes.
- **Panel Void** (#2a2a26): the placeholder behind a panel or cover image before it paints.
- **Box Floor / Box Wall** (#1f201d / #2c2d28): the inside of a longbox drawer and its walls, slightly lifted from Reader Night.
- **Board Pencil** (#4a4740): secondary text printed on board (local language name, comic count).
- **Brass Date** (#c1a685): the date that leads a chapter title on the dark reader.
- **Kiln Focus** (#c16b44): the 3px focus outline on links, summaries, covers and the mode switch.
- **Light Reader Ground** (#ece6d8): the comic section in the light theme.

### Named Rules
**The Gutter Black Rule.** Anything that holds comic art is framed in #111: the printed page, the cover, the caption box. Art never sits directly on Reader Night.

**The Board Means Filing Rule.** Longbox Board is reserved for dividers and the selected state. It is never a generic card fill.

**The One Red Rule.** Stamp Red is the only accent on paper and Ember Coral its only counterpart on dark. Lettering inks never leak into chrome.

## Typography

**Display Font:** Bangers (with Arial Narrow, sans-serif), embedded as base64 WOFF2, Latin and Vietnamese subsets.
**Body Font:** Georgia (with Times New Roman, serif).
**Lettering Font:** Patrick Hand (with Comic Sans MS, Chalkboard SE, cursive), embedded like Bangers.
**Label/Mono Font:** Arial/Helvetica for small controls; ui-monospace (SFMono-Regular, Menlo, Consolas) for measurements.

**Character:** A quiet editorial serif carries every sentence; the comic faces are props from the comic itself, used where a letterer would use them. Monospace is the reader's voice for numbers.

### Hierarchy
- **Display** (Bangers 400, 40px, 0.95, 0.03em): the language name on a divider card, set in that language (30px on phones). The wordmark is the same face at 30px/1, 0.02em.
- **Headline** (Georgia 400, clamp(30px, 4.1vw, 54px), 1.2, -0.02em, balanced): a comic's cold-open heading on paper. The library headline is the same voice on the dark at clamp(32px, 3.6vw, 48px), 1.12, max 16em. Emphasis is italic in the accent of its ground.
- **Title** (Georgia 400, 26px): chapter headings, led by a Brass Date. Write-up section heads use 30px/1.25.
- **Cover Title** (Bangers 400, 23px, 1, 0.03em): the comic's name under its cover (21px on phones).
- **Body** (Georgia 400, 19px, 1.7-1.75, max 46em in chapters, 68ch in the write-up): chapter descriptions and prose (17-18px on phones). The library lead is 18px/1.6, max 44em. The invitation is italic clamp(20px, 2.1vw, 26px)/1.5.
- **Lettering** (Patrick Hand 400, clamp(12.5px, 1.4cqi, 16px), 1.25, 0.03em, uppercase in the ink preset): captions and balloons, sized in container units so they scale with the page. Pop, manga and parchment drop the capitals; parchment switches to Georgia italic.
- **SFX** (Bangers 400, clamp(30px, 5cqi, 60px), 1, 0.04em, rotated -9deg): sound effects, white fill with a 2.5px black stroke; XL up to 92px.
- **Label** (Arial 400, 12-14px, 1.3): interface switch, reader mode, shortcuts, the footer and the satire notice.
- **Mono** (ui-monospace 400, 11-12px, 1.4): toolbar chapter links, chapter counters, transcript summaries. **Mono Count** (13-14px, all-small-caps, 0.06em, tabular figures in chips): comic counts and chapter/panel counts in the library.

### Named Rules
**The Letterer's Faces Rule.** Bangers and Patrick Hand appear only where a comic would print them: wordmark, dividers, cover titles, captions, balloons, sound effects. Headlines and prose stay in Georgia.

**The Measurements Are Mono Rule.** Counts, chapter numbers and dates in navigation are monospace; in the library they are small caps.

## Layout

One centred column family. The masthead, library intro, drawers and footer share `min(1240px, 100% - 48px)` (a 24px edge each side). The cold open narrows to 1000px, chapters to 1060px (760px in Panels mode), the reader toolbar to 1100px; the write-up is a 190px sticky contents column beside a 720px prose column with a 68px gap.

The printed page is a six-column grid with rows of 34cqi, 10px gutters and a 14px black frame; panels span 2, 3, 4 or 6 columns. Panels mode stacks panels one per row at their own proportions with an 18px gap. A library drawer is a 184px divider column beside a cover grid of `auto-fill, minmax(168px, 1fr)` with 16px gaps inside a 16px box padding, about five covers across at 1440px; a drawer shows at most two rows (nine covers and a board card linking to the language's own page).

Vertical rhythm: 72px above the cold open, 52px above each chapter, 56px between drawers, 64px between write-up sections.

Phones (max-width 719px): the reader toolbar hides the mode switch and scrolls its chapter links horizontally; each panel becomes a black card with its lettering moved into a strip above the art so nothing covers the picture; the divider becomes a sticky tab bar over its drawer; covers go two across with 12px gaps and drop their summaries. At 860px the write-up collapses to one column.

## Elevation & Depth

A hybrid: chrome is flat and separated by hairlines and tonal grounds; only the physical paper objects that sit on the table cast shadows, and those shadows are soft and downward. Depth in the library is a lift: a cover rises 10px out of its box on hover or focus while its shadow deepens, eased by `cubic-bezier(0.16, 1, 0.3, 1)` over 260ms, and only under `(hover: hover)` with no reduced-motion preference. Hard offset shadows exist, but only as comic lettering devices.

### Shadow Vocabulary
- **Printed page** (`box-shadow: 0 22px 48px rgba(0, 0, 0, 0.5)`): the page on the dark reader.
- **Printed page, light** (`box-shadow: 0 14px 34px rgba(60, 50, 30, 0.18)`): the white-gutter page in the light theme.
- **Cover at rest** (`box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35)`): a cover standing in its box.
- **Cover lifted** (`box-shadow: 0 26px 40px rgba(0, 0, 0, 0.55)`): a cover pulled out on hover or focus.
- **SFX stroke shadow** (`text-shadow: 4px 4px 0 #111`): sound effects only.
- **Parchment edge** (`box-shadow: 0 2px 0 #6b4f26`): parchment captions only.

### Named Rules
**The Table Light Rule.** Shadows fall straight down and only under paper objects (pages, covers). Controls, dividers and the masthead stay flat.

**The Pull, Don't Bounce Rule.** The only library motion is the cover lift (and the board card's matching lift); the only reader motion is the scroll-driven sound-effect pop. Both switch off under reduced motion.

## Shapes

Print geometry: paper objects are square-cornered (pages, panels, covers, divider cards, the drawer box). Small radii are reserved for controls: 2px on interface-switch and language chips and the mode-switch segments, 4px on the mode-switch housing, 3px on inline code. The one curve is the speech balloon, an ellipse (50% / 46%) with a two-layer clip-path tail; the pop preset rounds it to 1.4em, manga to a full 50%. Two silhouettes are cut with clip-path: the ink caption's rough brush edge and the divider card's tab notched into its top edge (the tab sits right of centre on desktop, nearer the left on phones). The drawer box closes with a heavier 6px bottom wall, like the floor of a longbox.

## Components

### Masthead and Wordmark
Paper strip, full bleed in the library, ruled underneath on the reader. The wordmark is Bangers in Press Ink with a Stamp Red "2". The reader carries a sans "library" link and a mono credit at the right; the library carries the interface switch.

### Interface Switch (EN / VI)
- **Style:** Arial 13px, 8px 10px padding, 2px radius, Pencil Muted text on paper.
- **Active:** Press Ink chip with Newsprint Paper text (`aria-current="page"`).
- **Hover:** Stamp Red text.

### Language Chips
- **Style:** Georgia 15px in Lamplight, 9px 12px padding, 1px Night Rule outline, 2px radius, with the comic count in mono 12px tabular figures. Each language is named in itself.
- **Hover:** outline turns Lamplight.
- **Active:** Longbox Board fill with Reader Night text and Board Pencil count, on a language's own page.

### Divider Card (signature)
Longbox Board, 184px wide, at least 300px tall, sticky at 16px, with the tab cut into the top edge. The language's own name in Bangers 40px; under it, the name in the interface language when they differ (Arial 14px, Board Pencil); the count in mono small caps pinned to the bottom. On phones it becomes a sticky row: name, local name, count right-aligned.

### Cover (signature)
- **Frame:** Gutter Black, 8px padding (14px at the foot), square corners, Cover-at-rest shadow.
- **Art:** 3:4 window on Panel Void, the cover panel cropped by its focus, carrying the panel's first caption or balloon in the comic's own lettering preset, sized clamp(12.5px, 6.4cqi, 17px).
- **Text:** Bangers cover title in Caption White, mono small-caps counts in Night Muted, a three-line Georgia 14px summary.
- **Newest:** a Stamp Red Bangers badge in the art's bottom-right corner.
- **Hover / Focus:** lifts 10px with the Cover-lifted shadow; title turns Lamplight; focus adds the 3px Kiln Focus outline at 4px offset.

### Drawer Overflow Card
A board card in the cover grid when a language holds more than ten comics: Bangers 24px "all N in this language" set bottom-left, lifts with the covers, text turns Stamp Red on hover.

### Reader Toolbar
Sticky, 97% opaque Reader Night with a Toolbar Rule hairline. Mono chapter links in Night Muted (Lamplight on hover) at the left; the Pages / Panels switch at the right: a Night Rule housing (4px radius, 3px padding) with Arial 12px segments, the checked one in Longbox Board. Built from two hidden radio inputs read by sibling selectors. Light theme: paper toolbar, Press Ink active segment.

### Printed Page and Panels
Six-column grid in a Gutter Black frame with the Printed-page shadow. Panels are images with `object-fit: cover` and a focus position (top, bottom, left, right). The light theme swaps the frame to white and outlines each panel 3px in Gutter Black.

### Lettering Presets
- **Ink (default):** black brush caption with a rough clip-path edge, Caption White uppercase Patrick Hand; white elliptical balloon with a 2px Gutter Black stroke and a two-layer tail (left, centre, right, or up).
- **Pop:** Pop Yellow caption with a 2.5px black border, 1.4em-rounded balloons, sentence case, yellow sound effects.
- **Manga:** white boxed caption, round balloons, sentence case, white sound effects at -14deg.
- **Parchment:** Parchment caption in Georgia italic with a Parchment Rule border and hard 2px edge, warm-white balloons.
- **Sound effects:** Bangers with a 2.5px black stroke and 4px hard black shadow, rotated -9deg, popping in once (scale 0.3 to 1.12 to 1) as the panel scrolls into view where scroll timelines are supported.

### Transcript
A native `<details>` under each page: mono 12px summary in Night Muted (Lamplight on hover), Arial 15px/1.7 text, max 46em.

## Do's and Don'ts

### Do:
- **Do** frame every piece of comic art in Gutter Black (#111): pages, covers, captions.
- **Do** set every caption, balloon and sound effect as HTML in the comic's lettering preset; on covers too.
- **Do** keep Longbox Board (#e4dac6) for dividers and the selected state.
- **Do** use Stamp Red (#a8321f) as the only accent on paper and Ember Coral (#e8775e) on the dark.
- **Do** set counts and navigation measurements in monospace, small caps in the library.
- **Do** build interaction from native HTML and CSS (links, radio inputs, `<details>`, `aria-current`), with a 3px Kiln Focus (#c16b44) outline on every focusable element.
- **Do** switch every movement off under `prefers-reduced-motion` and keep hover lifts behind `(hover: hover)`.
- **Do** name each language in itself on dividers and chips, with the interface-language name as the secondary line.

### Don't:
- **Don't** bake text into panel images; lettering is HTML, never pixels.
- **Don't** set headlines or prose in Bangers or Patrick Hand; those faces are for the wordmark, dividers, cover titles and lettering.
- **Don't** round paper objects: pages, panels, covers and divider cards stay square.
- **Don't** use hard offset shadows outside lettering; they belong to sound effects and parchment captions only.
- **Don't** put a hero banner over one undifferentiated card grid on the library; comics are filed by language behind dividers.
- **Don't** add script, inline `style=` attributes, external fonts or external images; the CSP forbids them and the world is built without them.
