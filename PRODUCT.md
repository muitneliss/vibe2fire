# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro static site (`output: "static"`), Bun, Vite+ for lint/format/test, served as static assets by Cloudflare Workers at https://vibe2fire.dev. No JavaScript reaches the browser: `public/_headers` sets a strict CSP (`default-src 'none'`, `style-src 'self'`, `img-src 'self'`, `font-src data:`), so no scripts, no inline `style=` attributes, no external fonts or images. Interactive state uses native HTML (links, radio inputs read by CSS, `<details>`).

## What it is

Vibe2Fire is a comic studio and site. Each comic is one `comics/<slug>/comic.yaml`; Codex image generation paints the panels, lettering (captions, speech, sound effects) is HTML laid over the art so any language's diacritics stay exact, and Astro renders a reader page per comic. The site also publishes `/content.json` (schema `vibe2fire.content/v1`), a content feed the Omninoise social studio reads.

## Users and jobs

- **Readers** arrive at the site to pick a comic and read it. Comics come in more than one language (the first, Vibe2Fire, is Vietnamese); readers need to find comics in a language they read.
- **The owner** publishes comics often; the site must keep working as the catalogue grows from one comic to many, without per-comic layout work.
- **Omninoise (machine reader)** consumes `/content.json`; its field names are a contract.

## Confirmed decisions (2026-10-30)

- The site supports many comics. The root `/` becomes the comic library; every comic, including Vibe2Fire, is served at `/<slug>/`.
- Site chrome is internationalised: the library and shared navigation exist in more than one interface language.
- Readers browse the library by comic language.

## Confirmed decisions (2026-10-31)

- The whole site (library, language pages, reader, 404) is redesigned as one world, a weekly manga magazine (ADR 0006). This replaces the 2026-10-30 decision that the reader keeps its existing look. The reader keeps its mechanics: the printed page, Pages / Panels, HTML lettering presets.
- The site shows Claude and Codex working together: Codex paints the site's artwork from Claude's prompts, and the pages credit both.

## Constraints and commitments

- Lettering is HTML, never pixels; image prompts forbid text.
- The page stays script-free under the CSP above.
- The feed is a contract: adding fields is fine; renaming or removing one needs `vibe2fire.content/v2`.
- The site is public and names the Omninoise studio (ADR 0003). The Vibe2Fire comic keeps its notice that the marketing team is fictional and that the art is AI-generated.
- Panels are committed WebP files under `public/comics/<slug>/panels/`; images are same-origin only.

## Open decisions

- Which interface languages ship beyond English and Vietnamese.
