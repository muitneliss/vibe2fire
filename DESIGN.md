---
name: Vibe2Fire
description: A comic studio and library printed as a weekly manga magazine; black ink on newsprint, screentone greys, and painted comic art as the only colour.
colors:
  key-black: "#111111"
  ink: "#0e0e0d"
  newsprint-white: "#fafaf7"
  press-grey: "#4a4945"
  tone-10: "#e3e2dd"
  tone-30: "#b4b3ae"
  tone-60: "#6a6965"
  panel-void: "#2a2a26"
  caption-cream: "#f6f1e6"
  balloon-white: "#ffffff"
  pop-yellow: "#ffe680"
  sfx-red: "#ff5a4a"
  sfx-yellow: "#ffd23f"
  sfx-mint: "#7ff0d1"
  parchment: "#efe0bd"
  parchment-ink: "#3b2a14"
  parchment-rule: "#6b4f26"
  parchment-balloon: "#fffaf0"
  parchment-sfx: "#ffd98a"
typography:
  wordmark:
    fontFamily: "Protest Revolution, Bangers, Arial Narrow, sans-serif"
    fontSize: "clamp(44px, 6.3vw, 104px)"
    fontWeight: 400
    lineHeight: 0.9
  display:
    fontFamily: "Protest Revolution, Bangers, Arial Narrow, sans-serif"
    fontSize: "clamp(60px, 8.6vw, 176px)"
    fontWeight: 400
    lineHeight: 1.12
  title-brush:
    fontFamily: "Protest Revolution, Bangers, Arial Narrow, sans-serif"
    fontSize: "clamp(38px, 4.7vw, 76px)"
    fontWeight: 400
    lineHeight: 0.95
  chapter-title:
    fontFamily: "Protest Revolution, Bangers, Arial Narrow, sans-serif"
    fontSize: "clamp(36px, 4.2vw, 64px)"
    fontWeight: 400
    lineHeight: 1.15
  end-line:
    fontFamily: "Protest Revolution, Bangers, Arial Narrow, sans-serif"
    fontSize: "clamp(26px, min(5vw, 10.5cqi), 72px)"
    fontWeight: 400
    lineHeight: 1.12
  headline:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 72px)"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline-library:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(26px, 3.05vw, 58px)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  numeral:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "48px"
    fontWeight: 900
    lineHeight: 1
    fontFeature: "\"tnum\""
  numeral-cell:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(18px, 2vw, 34px)"
    fontWeight: 900
    lineHeight: 1.1
    fontFeature: "\"tnum\""
  heading:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(26px, 2.4vw, 34px)"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  body-long:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.08em"
  control:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.3
  folio:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
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
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.86em"
    fontWeight: 400
rounded:
  none: "0px"
  balloon: "50% / 46%"
  balloon-pop: "1.4em"
  balloon-manga: "50%"
spacing:
  gutter: "10px"
  frame: "14px"
  sheet: "16px"
  panels-gap: "18px"
  spread-gap: "28px"
  writeup-gap: "72px"
  chapter: "80px"
  end: "104px"
components:
  wordmark:
    textColor: "{colors.ink}"
    typography: "{typography.wordmark}"
  edition-switch-item:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.press-grey}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 8px"
  edition-switch-item-active:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 8px"
  language-tab:
    backgroundColor: "{colors.tone-10}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  language-tab-active:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.newsprint-white}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  contents-cell:
    backgroundColor: "{colors.tone-30}"
    textColor: "{colors.newsprint-white}"
    rounded: "{rounded.none}"
  contents-cell-number:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.ink}"
    typography: "{typography.numeral-cell}"
    rounded: "{rounded.none}"
  contents-cell-title:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.newsprint-white}"
    padding: "6px 10px 7px"
  title-box:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.ink}"
    typography: "{typography.title-brush}"
    rounded: "{rounded.none}"
    padding: "0.9vw 1.3vw 1vw"
  shortcut:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  shortcut-hover:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.newsprint-white}"
  action-solid:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.newsprint-white}"
    rounded: "{rounded.none}"
    padding: "12px 22px"
  action-solid-hover:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.ink}"
  chapter-tab:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  chapter-tab-hover:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.newsprint-white}"
  mode-switch-segment:
    backgroundColor: "{colors.tone-10}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 16px"
  mode-switch-segment-hover:
    backgroundColor: "{colors.tone-30}"
  mode-switch-segment-active:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.newsprint-white}"
  chapter-number:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.newsprint-white}"
    typography: "{typography.numeral}"
    rounded: "{rounded.none}"
  transcript-summary:
    backgroundColor: "{colors.tone-10}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "7px 14px"
  transcript-summary-open:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.newsprint-white}"
  editors-note:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  caption:
    backgroundColor: "{colors.key-black}"
    textColor: "{colors.caption-cream}"
    typography: "{typography.lettering}"
    padding: "0.5em 1.1em 0.45em"
  balloon:
    backgroundColor: "{colors.balloon-white}"
    textColor: "{colors.key-black}"
    typography: "{typography.lettering}"
    rounded: "{rounded.balloon}"
    padding: "0.8em 1.15em"
---

# Design System: Vibe2Fire

## Overview

**Creative North Star: "The Black-and-White Weekly"**

Every page of Vibe2Fire is a page of a weekly manga magazine: cheap newsprint white, black ink panel borders, screentone greys, speed lines, a dry-brush title face. The library is a run of two-page spreads (this week's issue first, then one per comic language, then an index of every comic): a black-and-white contents page facing a title page whose comic's cover is printed in full colour, the way a weekly prints its colour opening pages. The reader, the language pages and the 404 are pages of the same issue: a masthead strip under speed lines, then title pages, chapter headings over 3px ink rules, printed comic pages, and a closing burst.

The one thing that carries colour is the comic. Chrome is black, white and tone; painted panels and the HTML lettering set on them are the only hue on any screen. On the contents page even the art starts in greyscale and prints in colour only while you point at or focus a panel (the colour-insert pull). Selection, the current item and the open state are solid black; secondary surfaces are screentone. Speed lines, the newsprint grain and the NEW burst are plates Codex painted, multiplied onto the paper, never drawn in CSS.

The type is two voices. Protest Revolution, a rough dry brush, is reserved for display titles: the wordmark, a language's name, a comic's title, chapter titles and the line struck inside the closing burst. Be Vietnam Pro sets everything else, heavy and slanted for headlines, 900 for every numeral, plain for prose. Comic lettering (Patrick Hand, Bangers) stays inside each comic's lettering preset. The world rejects the webcomic platform's banner over rows of rounded cards and the old cream editorial longbox; the page carries no JavaScript, so every state is CSS on native HTML.

**Key Characteristics:**
- Newsprint white ground with a painted paper grain; black ink and three screentone greys; no coloured accent anywhere in the chrome.
- Comic art is the only colour; greyscale panels print in colour on hover and focus.
- 3px ink rules frame everything structural; square corners everywhere outside speech balloons.
- Solid black means selected, current, open or the page's one action.
- Brush face for display titles only; Be Vietnam Pro for every other word and every number.
- Speed lines, newsprint and the NEW burst are Codex-painted plates, each shipped with its prompt.
- Lettering is HTML in the comic's own preset, on covers and in the reader alike.

## Colors

A black-and-white print palette with three screentone greys; every hue on the page belongs to a comic.

### Primary
- **Key Black** (#111111): the ink of the system. Every rule and frame, the printed page's gutters, caption boxes, the chapter number block, the numbered tab heads in the reader toolbar, and every selected or open state (active language tab, checked Pages / Panels segment, open transcript, hovered chapter tab and shortcut). Also text selection and the focus outline.

### Neutral
- **Newsprint White** (#fafaf7): the paper. Body ground under the painted newsprint grain, the inside of every framed control, the title box, the number box on a contents panel, the halo around the focus ring, and the meta theme colour.
- **Ink** (#0e0e0d): set text on paper.
- **Press Grey** (#4a4945): secondary text: inactive edition-switch and masthead links, the comic credit, the chapter dateline, folios.
- **Tone 10** (#e3e2dd): the light screen. Resting fill of language tabs, Pages / Panels segments, transcript summaries, inline code.
- **Tone 30** (#b4b3ae): the mid screen. Hover fill of segments and summaries, placeholder behind contents and cover images, 1px hairlines between write-up contents entries and table rows.
- **Tone 60** (#6a6965): the dark screen. The dot screentone laid under emphasised words in headlines; the scrollbar thumb.

### Tertiary
The lettering inks. They belong to comic content, are chosen per comic by lettering preset, and never appear in chrome.
- **Caption Cream** (#f6f1e6): text in the ink preset's black brush captions.
- **Balloon White** (#ffffff): speech balloons, default sound-effect fill, the light theme's page gutters.
- **Panel Void** (#2a2a26): the placeholder behind a panel in the reader before it paints.
- **Pop Yellow** (#ffe680): caption boxes in the pop preset.
- **SFX Red / SFX Yellow / SFX Mint** (#ff5a4a / #ffd23f / #7ff0d1): sound-effect colour options, always stroked and shadowed in Key Black.
- **Parchment / Parchment Ink / Parchment Rule** (#efe0bd / #3b2a14 / #6b4f26): the aged-scroll caption of the parchment preset; **Parchment Balloon** (#fffaf0) and **Parchment SFX** (#ffd98a) complete it.

### Named Rules
**The Colour Is the Comic Rule.** Chrome is Key Black, Newsprint White and screentone. The only colour on a page is painted comic art and the lettering set on it. No link colour, no accent, no coloured state, no coloured badge.

**The Solid Black Means Here Rule.** Selected, current, open and hovered-for-action states fill solid Key Black with Newsprint White text. The one primary action that ends a page (the closing link under the burst, the 404's way back) rests in solid black and inverts to paper on hover.

**The Screentone Is Secondary Rule.** Anything secondary or resting is a screentone grey, never a tint of a hue: Tone 10 at rest, Tone 30 on hover and behind images, a Tone 60 dot screen for emphasis.

## Typography

**Display Font:** Protest Revolution (with Bangers, Arial Narrow, sans-serif), embedded as base64 WOFF2, Latin and Vietnamese subsets.
**Body Font:** Be Vietnam Pro (with system-ui, sans-serif) at 400, 700 and 900, normal and italic, embedded the same way.
**Lettering Fonts:** Patrick Hand (captions, balloons) and Bangers (sound effects), embedded; used only inside comic lettering.
**Mono:** ui-monospace (SFMono-Regular, Menlo, Consolas) for inline code in write-ups only.

**Character:** A rough dry brush shouts the titles the way a weekly's letterer would; a heavy, slanted Vietnamese-native grotesk carries the headlines and every set word, so diacritics stay exact at every weight.

### Hierarchy
- **Wordmark** (brush 400, clamp(44px, 6.3vw, 104px), 0.9): top left of the first spread; the reader masthead sets it at clamp(40px, 4.6vw, 64px), 1.1. The "2" is struck harder: rotated -8deg and scaled 1.12.
- **Display** (brush 400, clamp(60px, 8.6vw, 176px), 1.12): a language's name, centred on its title page, set in that language.
- **Title** (brush 400, clamp(38px, 4.7vw, 76px), 0.95): a comic's title in its title box. **Chapter Title** (brush 400, clamp(36px, 4.2vw, 64px), 1.15) heads each chapter. **End Line** (brush 400, up to 72px, 1.12, balanced) is the last line struck inside the closing burst.
- **Headline** (Be Vietnam Pro 900 italic, clamp(34px, 4.4vw, 72px), 1.08, -0.025em, balanced): the reader's cold-open heading. The library headline is the same voice at clamp(26px, 3.05vw, 58px), 1.02; the 404 heading at clamp(24px, 3vw, 40px). Emphasis keeps the weight and lays a Tone 60 dot screen under the words.
- **Numeral** (Be Vietnam Pro 900, tabular figures): chapter number block 48px (36px on phones), contents panel number clamp(18px, 2vw, 34px), toolbar tab heads, write-up contents counters, the 404 at 21cqi italic. Counts in running text (chapters, panels, comics) are 700 to 900.
- **Heading** (Be Vietnam Pro 900, clamp(26px, 2.4vw, 34px), 1.2, -0.015em): write-up section heads over a 3px rule.
- **Body** (Be Vietnam Pro 400, 17px, 1.5): the base. Long-form copy runs at 18px/1.7 (write-up, max 68ch), chapter descriptions at clamp(17px, 1.25vw, 19px)/1.7 (max 42em), the invitation at clamp(18px, 1.5vw, 22px)/1.55 (max 36em), a title box summary at clamp(15px, 1.32vw, 21px)/1.4 (max 62ch). Emphasis inside a summary is 700 upright.
- **Label** (Be Vietnam Pro 700, 14px, 0.08em): the edition switch and the reader's masthead links. **Control** (700, 13-15px): language tabs, shortcuts, chapter tabs, Pages / Panels, transcript summaries, contents titles.
- **Folio** (Be Vietnam Pro 400, 13px, Press Grey): the notice and colophon at the foot of the last spread and the reader's foot line.
- **Lettering** (Patrick Hand 400, clamp(12.5px, 1.4cqi, 16px), 1.25, 0.03em, uppercase in the ink preset): captions and balloons, sized in container units. Pop and manga drop the capitals; parchment switches to Georgia italic.
- **SFX** (Bangers 400, clamp(30px, 5cqi, 60px), 1, 0.04em, rotated -9deg): sound effects; XL up to 92px.

### Named Rules
**The Brush Is for Titles Rule.** Protest Revolution sets only display titles: the wordmark, a language's name, a comic's title, chapter titles, the end line in the burst and the NEW in the burst. Never a sentence of prose, a control, a label or a count.

**The Numbers Are Grotesk Rule.** Numerals that carry information are Be Vietnam Pro 900 with tabular figures. The brush 4 reads as an A, so even the 404 struck inside the burst is set in the grotesk.

**The Letterer's Faces Rule.** Patrick Hand and Bangers appear only inside a comic's lettering preset (captions, balloons, sound effects); Bangers otherwise survives only as the brush's fallback.

## Layout

The library is a column of spreads, `16px` from the viewport edge and `28px` apart. Each spread is a two-column grid of equal pages (head and contents left, title page right, a folio row across the foot), at least one viewport tall, edged in a 2px ink line. A 44px fold runs down the centre: a 2px ink line inside a soft gradient of shade, as the paper dips into the binding. The left page holds the masthead (first spread only) or a running head, then the contents: a two-column grid of numbered panels. A comic's chapters stretch to fill the page in rows of at least 108px; a list of comics keeps a fixed 16:10 panel over a caption (an odd count opens with one panel across both columns), and a screentone panel fills the rest of the page. After the spreads, single sheets: a language page's overflow grid, and the index of every comic (two text columns, one group per language, title, date and chapter count per row). The right page stacks the language head, a 16:9 cover bleeding to both page edges between 3px rules, a ruled title box inset about 1vw, and a strip of three panels (0.86fr, 1.05fr, 1fr) that fills the rest. Spacing inside spreads scales with the viewport in vw so the spread keeps its proportions.

The reader is one centred column family under a full-bleed masthead: masthead and cold open at `min(1240px, 100% - 40px)`, the sticky toolbar at 1400px, chapters at 1160px with 24px side padding (760px in Panels mode), `80px` between chapters, `104px` above the end burst. From 980px the cold open sets the headline and the cover side by side (1.08fr / 0.92fr, 56px gap). The printed page is a six-column grid with rows of 34cqi, `10px` gutters and a `14px` frame; panels span 2, 3, 4 or 6 columns. Panels mode stacks panels one per row at their own proportions, `18px` apart. The write-up is a 220px sticky contents column beside a 68ch prose column with a `72px` gap.

Phones: below 760px a spread reads as one page (head, title page, contents, folio), the fold disappears, and contents rows become 104px. Below 720px the reader hides the Pages / Panels switch, scrolls its chapter tabs sideways, drops the printed page's frame, and turns each panel into a black card with its lettering lifted into a strip above the art so nothing covers the picture. At 860px the write-up collapses to one column.

## Elevation & Depth

Flat print with one lift. Chrome sits flat on the paper and is separated by ink rules and screentone, never by shadow. Paper objects that lie on the paper (the spread, the reader's cover, the printed page from 720px, the 404 panel) share one soft, short shadow, a page lifted off the table, not a slab. Depth inside the art comes from the plates: speed lines multiplied onto the paper converge on what matters, and the fold shades the binding. Hard offset shadows exist only as comic lettering devices.

### Shadow Vocabulary
- **Print lift** (`box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.45)`): the spread, the reader's cover, the printed page (720px and up), the 404 panel.
- **Focus halo** (`box-shadow: 0 0 0 7px #fafaf7` under a 3px Key Black outline at 3px offset): every focusable element.
- **SFX shadow** (`text-shadow: 4px 4px 0 #111`): sound effects only.
- **Parchment edge** (`box-shadow: 0 2px 0 #6b4f26`): parchment captions only.

### Named Rules
**The One Lift Rule.** One shadow value in the chrome, the print lift, and only under paper objects. Controls, rules, tabs and boxes stay flat.

**The Pull, Not Bounce Rule.** Motion eases out on `cubic-bezier(0.16, 1, 0.3, 1)`: colour prints into a panel over 480ms, a contents title slides up over 320ms, control fills change over 160ms, and sound effects pop once as their panel scrolls into view. Nothing moves under reduced motion; colour still shows on focus.

## Shapes

Print geometry: every frame, tab, box, panel, cell, cover and button is square-cornered. Rule weight carries hierarchy: a 3px Key Black rule for structure (panel and cover borders, the title box, chapter headings, write-up section heads, the masthead and toolbar edges, the number box's two inner sides), a 2px line for framed controls and the spread's edge, and a 1px Tone 30 hairline only between list entries and table rows. The number box on a contents panel tucks into the top-left corner with rules on its right and bottom sides, like a panel number in a printed contents page. The only curves are comic lettering: the speech balloon is an ellipse (50% / 46%) with a two-layer clip-path tail, rounded to 1.4em in pop and a full 50% in manga; the ink caption has a rough brush edge cut with clip-path. The burst's spiky silhouette comes from its painted plate, never from a CSS shape.

### Named Rules
**The Square Corner Rule.** No border-radius anywhere in the chrome. Rounding belongs to speech balloons.

**The Three-Pixel Ink Rule.** Structure is drawn in 3px Key Black; 2px is for control frames and the sheet edge; hairlines are Tone 30 and live only inside lists and tables.

## Components

### Wordmark
Brush "Vibe2Fire" in Ink, the "2" rotated -8deg and scaled 1.12. Top left of the first spread, under the speed-line plate; in the reader masthead it carries the comic's own wordmark the same way.

### Edition Switch and Masthead Links
A framed bar on paper (2px Key Black border, segments split by 2px rules), Label type. Inactive links are Press Grey and turn Ink on hover; the current interface language is Ink with a 3px underline (`aria-current="page"`). The reader masthead uses the same bar for "library" and the credit link, with 7px 12px segments and a 3px underline on hover.

### Language Tabs
- **Style:** Control type, 6px 12px, Tone 10 fill inside a 3px rule, the language named in itself, its comic count in tabular figures.
- **Hover / Current:** solid Key Black with Newsprint White text.

### Contents Cell (signature)
A numbered panel on the contents page: square, 3px rule, Tone 30 behind a greyscale image (`grayscale(1) contrast(1.18)`). The number sits in a Newsprint White box in the top-left corner (Numeral, 900, tabular). The title sits in a Key Black bar that slides up from the foot on hover or focus (always shown where there is no hover). **The colour-insert pull:** on hover or focus the image prints in colour (filter off over 480ms). A spread with no other comics to list shows its comic's chapters, deep-linking to each, with the title bar. **Comic cells** list comics instead: the cover panel at 16:10 over a Key Black caption that always names the comic (700) with its language and chapter count (Tone 30, 12.5px), so a catalogue reads without hover.

### Screentone Fill
The last panel of a contents page: Tone 30 dots at 6px pitch inside a 3px rule, taking whatever height the contents leave so pages close square. It carries the way on as a Key Black tab (900): "Every comic" on the opening spread, "All N in <language>" on a language spread.

### Title Page
The language's name in Display, its interface-language name and comic count beneath in 900. Then the cover: the newest comic's cover panel at 16:9 in full colour between 3px rules, carrying its first caption or balloon in the comic's own lettering preset (tilted -4deg, bottom right), and, on the newest comic, the NEW burst breaking the top edge. Below it, the **title box**: a 3px-ruled paper box with the comic's title in brush (underlined 4px on hover), counts in 700, a summary, and the credit in Press Grey. Then the **strip** of three greyscale panels that print in colour together on hover or focus and open the first chapter.

### NEW Burst
The painted ink starburst plate (480 / 350) with the word set over it in brush, rotated -8deg, about a fifth of the cover's width. The same plate holds the reader's end line (rotated -4deg, up to 720px wide) and the 404.

### Running Head and Folio
Spreads after the first open with a running head: "Vibe2Fire" in brush at 30px followed by the word for contents in 700 14px uppercase at 0.12em, as a magazine heads its pages. The last spread closes with a folio row: the AI-art notice and colophon under the left page, the `content.json` link in 700 Ink under the right.

### Reader Masthead and Cold Open
A full-bleed strip under the top speed-line plate with a 3px rule beneath. The cold open sets the Headline, the invitation, a row of **shortcut** buttons (2px frame, paper, Control type, solid black on hover and focus), and the **editor's note** (2px frame, 14px, max 38em) that declares the fictional team and the AI art. From 980px the comic's cover panel sits beside it at 3:2 in colour, with a 3px rule, the print lift, its caption in the comic's lettering, and the corner speed-line plate on its top-right corner.

### Reader Toolbar
Sticky, on paper with the newsprint grain, a 3px rule above and below. **Chapter tabs** at the left: a 2px-framed tab with a Key Black number head (900, tabular) and the chapter's short label; on hover or focus the tab goes black and the head goes paper. **Pages / Panels** at the right: a 2px-framed pair of segments in Tone 10 (Tone 30 on hover), the checked one solid Key Black; built from two hidden radio inputs read by sibling selectors, with the focus ring drawn on the whole switch.

### Chapter Heading
A Key Black number block (Numeral 48px) beside the chapter title in brush, with the dateline (Press Grey, uppercase, 0.06em) over "n / total" at the right, all over a 3px rule.

### Printed Page and Panels
A six-column grid in a Key Black frame with the print lift (720px and up). Panels are images with `object-fit: cover` and a focus position (top, bottom, left, right). The light theme swaps the gutters to white and outlines each panel 3px in Key Black; both themes sit on newsprint.

### Lettering Presets
Unchanged mechanics, chosen per comic.
- **Ink (default):** Key Black brush caption with a rough clip-path edge and Caption Cream uppercase Patrick Hand; Balloon White ellipse with a 2px Key Black stroke and a two-layer tail (left, centre, right or up).
- **Pop:** Pop Yellow caption with a 2.5px black border, 1.4em-rounded balloons, sentence case, SFX Yellow sound effects.
- **Manga:** white boxed caption with a 2px rule, round balloons, sentence case, white sound effects at -14deg.
- **Parchment:** Parchment caption in Georgia italic with a Parchment Rule border and hard 2px edge, Parchment Balloon balloons, Parchment SFX sound effects.
- **Sound effects:** Bangers with a 2.5px Key Black stroke and the SFX shadow, rotated -9deg, popping in once (scale 0.3 to 1.12 to 1) as the panel scrolls into view where scroll timelines are supported.

### Transcript
A native `<details>` under each page: the summary is a 2px-framed Tone 10 tab (Tone 30 on hover) with a small ink triangle that turns 90deg; open, it goes solid Key Black. Text at 16px/1.7, max 46em.

### End and 404
The comic closes on the burst plate with the end line in brush and one **solid action** below it (Key Black, 2px frame, 12px 22px, 700 16px; paper on hover). The 404 is one 16:9 panel, 3px rule and print lift, with the corner speed-line plate closing in from two corners on the burst and "404" in 900 italic grotesk, then a heading and a solid action for each interface language.

### Write-up
A sticky contents column (3px rule on top, a 900 italic title, entries split by Tone 30 hairlines with 900 tabular counters, solid black on hover) beside the prose. Section heads in Heading type over a 3px rule; asides in a 2px frame; tables ruled 2px at head and foot with Tone 30 row hairlines and tabular figures.

### Painted Plates
`/art/newsprint-v2.webp` tiles behind the body, every spread and the toolbar. `/art/speedlines-top-v2.webp` runs across the top of the first page and the reader masthead; `/art/speedlines-corner-v2.webp` closes in on the title page's top-right corner, the reader's cover and both corners of the 404 panel. `/art/burst-v1.webp` is the burst. Each sits beside a `.json` sidecar holding the prompt Codex painted it from.

**The Plates Are Painted Rule.** Speed lines, the burst and the paper grain are Codex rasters, multiplied (`mix-blend-mode: multiply`) onto the paper or set as a contained background. They are never drawn with CSS gradients, SVG or clip-path, and every shipped plate keeps its prompt beside it.

## Do's and Don'ts

### Do:
- **Do** keep the chrome in Key Black (#111111), Newsprint White (#fafaf7) and the three tones (#e3e2dd, #b4b3ae, #6a6965); let the comic art carry all the colour.
- **Do** mark the selected, current or open state with a solid Key Black fill and Newsprint White text.
- **Do** draw structure with 3px Key Black rules and keep every corner square.
- **Do** set display titles (wordmark, language and comic titles, chapter titles, the end line, NEW) in Protest Revolution and everything else in Be Vietnam Pro.
- **Do** set every informative numeral in Be Vietnam Pro 900 with tabular figures.
- **Do** emphasise a headline word with the Tone 60 dot screen under it, keeping the weight.
- **Do** start contents panels in greyscale and print them in colour on hover and on focus; show their titles without hover where there is no pointer.
- **Do** use the painted plates for speed lines, newsprint and bursts, multiplied onto the paper, each with its prompt sidecar.
- **Do** set captions, balloons and sound effects as HTML in the comic's own lettering preset, on covers and in the reader.
- **Do** give every focusable element the 3px Key Black outline at 3px offset with the 7px paper halo, and switch every transition off under `prefers-reduced-motion`.

### Don't:
- **Don't** round a corner in the chrome; rounding belongs to speech balloons.
- **Don't** add a coloured accent, link colour, coloured badge or coloured state; colour is the comic's.
- **Don't** put a kicker or eyebrow above a heading.
- **Don't** draw speed lines, bursts or paper texture in CSS; they are painted plates.
- **Don't** mark NEW with a pill or a badge; NEW is the painted burst.
- **Don't** set prose, controls, labels or numbers in the brush face; the brush 4 reads as an A.
- **Don't** use Patrick Hand or Bangers outside comic lettering.
- **Don't** bake text into panel images; lettering is HTML, never pixels.
- **Don't** add a second shadow value in the chrome; the print lift is the only one, and hard offsets belong to lettering.
- **Don't** add script, inline `style=` attributes, external fonts or external images; the CSP forbids them and the world is built without them.
