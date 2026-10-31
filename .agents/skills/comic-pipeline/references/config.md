# comic.yaml reference

A comic lives at `comics/<slug>/comic.yaml`; paths in it are relative to that folder. Text fields marked *md* accept inline markdown: `` `code` ``, `**strong**`, `*em*`, `[text](url)`. Everything is HTML-escaped first, so config text cannot inject markup.

## Top level

| Field | Required | Meaning |
|---|---|---|
| `title` | yes | Comic title; the default page title, wordmark and footer |
| `lang` | no | `<html lang>`; default `en` |
| `date` | no | Release date, `YYYY-MM-DD`. The library at `/` lists the newest comic first; comics without a date come last |
| `summary` *md* | no | One or two sentences shown on the comic's card in the library, and in the feed as plain text |
| `cover` | no | Panel id used as the comic's thumbnail in the library and the feed. Default: the first panel |
| `tags` | no | Topics, e.g. `[satire, ai, vibe-coding]`: lowercase letters, digits and hyphens, no repeats. Each tag gets a library filter page at `/tag/<tag>/` and is shown as `#tag` on the comic's card; also in the feed. Reuse tags other comics already use (the library's topic row lists them) so filters group comics instead of splitting them |
| `style` | no | Art style, below; default preset `graphic-novel` |
| `reader` | no | Reader theme, lettering preset, UI labels |
| `page` | no | Masthead, opening section, end card, write-up, footer |
| `characters` | yes | The cast, below |
| `cast.sheet` | no | Use your own model sheet image instead of generating one |
| `chapters` | yes | Chapters and their panels |
| `generation.jobs` | no | Parallel Codex generations; default 4 (`--jobs` overrides) |
| `generation.model` | no | Passed to `codex exec -m` |
| `generation.codex` | no | Codex binary; default `codex` |

## style

| Field | Meaning |
|---|---|
| `preset` | A key of `src/lib/styles.yaml`: `graphic-novel`, `noir`, `ligne-claire`, `fantasy`, `manga`, `pop-art`, `storybook` |
| `art` | Replaces the preset's style paragraph entirely (a fully custom look) |
| `extra` | Appended to the style paragraph: palette, era, mood, "set in 1990s Saigon", etc. |
| `sheet` | How the model sheet is staged (background, pose) |
| `headroom` | The sentence asking for calm space at the top for lettering; a panel can opt out with `headroom: false` |

## reader

| Field | Meaning |
|---|---|
| `theme` | `dark` (black gutters on a dark reader, like calif.io/php2shell) or `light` (white gutters on paper). Default from the preset |
| `lettering` | `ink` (black brush captions, white capitals), `pop` (yellow boxes), `manga` (white boxes, sentence case), `parchment` (aged scroll, serif italic). Default from the preset |
| `labels` | UI strings: `pages`, `panels`, `chapters`, `mode`, `readScene`, `skip`, `start`, `library` (the link back to the library). Translate them for non-English comics |

## page

| Field | Meaning |
|---|---|
| `pageTitle`, `description`, `robots` | `<title>`, meta description, meta robots (use `noindex, nofollow` for internal pages) |
| `wordmark` | Masthead wordmark; `*x*` is drawn in the accent colour |
| `home`, `credit` | Wordmark link; `{ text, href }` on the right of the masthead |
| `heading` *md* | The big opening line; `*em*` turns accent |
| `invitation` *md* | Italic opening paragraph |
| `shortcuts` | `[{ text, href }]` under the opening, e.g. start reading / skip to write-up |
| `note` *md* | Small print under the opening: satire or fiction notice, AI-art credit |
| `end` | `{ text, link: { text, href } }` after the last chapter |
| `writeup`, `writeupId` | An HTML fragment file included after the comic (a factual write-up), and its element id for the skip link |
| `footer` *md*, `backToTop` | Footer text and the back-to-top link text |

## characters

```yaml
characters:
  - id: boss                  # used in panel `cast` and scene placeholders {boss}
    name: Sếp                 # for people reading the config; never sent alone to the model
    tag: the man in the navy hoodie and black glasses   # how scenes refer to them
    look: "mid-30s man, short swept-up black hair, rectangular black glasses, navy hoodie..."
    props: "often carries a laptop"
    refs: [refs/boss.png]     # optional: real reference images (photo, earlier art, a logo)
```

The order of `characters` is the left-to-right order on the model sheet; prompts refer to "character N on the sheet". Keep `look` concrete and visual (hair, glasses, clothing colours, build); the image model cannot know who "Linh" is and will swap people when a prompt leans on names. `refs` are attached when generating the sheet and every panel the character appears in.

## chapters and panels

```yaml
chapters:
  - id: sa-mac               # anchor id
    nav: Quý 3               # toolbar link text
    date: Quý 3/2026         # small accent text before the title
    title: Sa mạc nội dung
    intro: "..."             # md; string or list of paragraphs, shown above the page
    transcript: "..."        # md; "Read the scene" text. Omitted: built from the lettering
    context: "..."           # md; paragraphs after the page (real-world notes)
    panels:
      - id: c01-p1           # lowercase, digits, hyphens; also the image file name
        span: 6              # columns of the 6-column page grid: 2, 3, 4 or 6
        shape: wide          # image shape: wide 1536x1024, square 1024x1024, tall 1024x1536
        focus: top           # optional crop focus in page view: top, bottom, left, right
        cast: [boss, linh]   # characters in the panel (their looks go into the prompt)
        scene: "{boss} stands at the window while {linh} ..."   # English art direction
        alt: "Vietnamese or English alt text"
        text:
          - { cap: "Caption", at: tl }
          - { say: "Speech", at: tr, tail: c }
          - { sfx: "RẦM!", at: tr, size: xl, color: red }
          - { stack: ["Rule 1", "Rule 2", "Rule 3"], at: tr }
```

- **Rows.** Panels flow left to right; each row's spans must add up to exactly 6 (`check` enforces it). Every row is the same height (34% of the page width), so pick `shape` to suit the span: `wide` for 4–6 columns, `square` for 2–3, `tall` for 2.
- **Positions** (`at`): `tl`, `tr`, `tc`, `ml`, `mr`, `bl`, `br`, `bc`.
- **Tails** (`say` only): `l` (default, tail toward the bottom-left), `c`, `r`, `up`, `up-c`, `up-r`, `none`.
- **SFX:** `color` is `red`, `yel` or `mint` (default white); `size: xl` for the big ones.
- **Scenes** are English art direction for the image model. Describe framing, light and action; never ask for text in the image. Keep the subject away from the very top so captions fit.

## Where files go

- PNG masters, the cast sheet, prompts, Codex logs and review sheets: `comics/<slug>/.work/` (gitignored).
- Panel images the site serves: `public/comics/<slug>/panels/<id>.webp` (committed), written by `bun run comic webp`.
- The page: every comic is at `/<slug>/` and listed in the library at `/` (`/vi/` for Vietnamese site chrome), on its language's filter page `/language/<lang>/` and on each of its tags' pages `/tag/<tag>/`, 24 comics to a page (`/page/2/`...); the feed: `/content.json`. A folder name cannot be a locale code (`en`, `vi`) or a route name (`language`, `tag`, `page`, `comics`, `art`, `brand`, `content.json`, `404`).
