---
paths:
  - "comics/**/comic.yaml"
---

# Editing a comic.yaml

- `scene` is English art direction for the image model: framing, light, action. Refer to characters only as `{id}` placeholders; never write names or ask for any text, sign, label or number in the image.
- Lettering (`text`) is in the comic's `lang`. Keep captions short: they cover part of the art.
- Each chapter's panel spans fill rows of exactly 6 columns. Match `shape` to `span`: `wide` for 4–6, `square` for 2–3, `tall` for 2.
- A changed `scene` needs a regenerated panel (`bun run comic panels <slug> --only <id> --force`); a changed `text`, `at`, `tail` or `focus` only needs `bun run build`.
- After any edit run `bun run comic check <slug>`. Field reference: `.agents/skills/comic-pipeline/references/config.md`.
