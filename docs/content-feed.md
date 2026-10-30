# Content feed: `https://vibe2fire.dev/content.json`

The site publishes every comic as one JSON document so other studios can reuse it without scraping HTML. The first consumer is Omninoise (repo `cuongtranba/omninoise-ops`), which lists this feed in its `content/sources.yaml`.

- **Schema id:** `vibe2fire.content/v1` (the `schema` field). Built by `buildFeed()` in `src/lib/comic.ts`; the shape is pinned by `tests/comic.test.ts`.
- **Freshness:** regenerated on every deploy; `Cache-Control: public, max-age=300`. `generatedAt` is the build time.
- **CORS:** `Access-Control-Allow-Origin: *`.
- **Compatibility:** fields may be added within v1. Renaming or removing a field, or changing its meaning, ships as `vibe2fire.content/v2` at the same URL, announced in this file.

```jsonc
{
  "schema": "vibe2fire.content/v1",
  "generatedAt": "2026-10-30T10:24:18.910Z",
  "site": "https://vibe2fire.dev",
  "comics": [{
    "slug": "vibe2fire",
    "title": "Vibe2Fire",
    "lang": "vi",
    "url": "https://vibe2fire.dev/",
    "style": "graphic-novel",                 // style preset name
    "characters": [{ "id": "boss", "name": "Sếp" }],
    "chapters": [{
      "id": "sa-mac",
      "number": 1,
      "date": "Quý 3/2026",                    // or null
      "title": "Sa mạc nội dung",
      "url": "https://vibe2fire.dev/#sa-mac",
      "intro": ["…"],                          // plain-text paragraphs
      "transcript": "…",                       // plain text: the whole chapter's story in prose
      "context": ["…"],                        // plain-text factual notes, may be empty
      "panels": [{
        "id": "c01-p1",
        "image": "https://vibe2fire.dev/comics/vibe2fire/panels/c01-p1.webp",
        "shape": "wide",                       // wide | square | tall
        "width": 1536, "height": 1024,         // the shape's aspect ratio, not the file's pixel size
        "alt": "…",
        "cast": ["linh", "mai"],
        "text": [{ "kind": "caption", "text": "…" }, { "kind": "speech", "text": "…" }, { "kind": "sfx", "text": "…" }]
      }]
    }]
  }]
}
```

Images carry no lettering: `text` is the lettering, in reading order, so a consumer can re-letter panels, write captions, or build a carousel. The art is AI-generated (Codex image generation); label it as such wherever it is republished.
