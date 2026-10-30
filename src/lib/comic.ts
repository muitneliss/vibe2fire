// The comic model: load a comic.yaml, validate it, build image prompts, and build the content feed.
// Shared by the Astro pages, the generation CLI (scripts/comic.ts) and the tests.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { parse } from "yaml";

// The repo root. Astro bundles this module into dist/ before prerendering, so import.meta.url is not
// stable; every entry point (astro, bun run comic, vitest) runs from the repo root instead.
export const ROOT = process.cwd();
export const COMICS_DIR = join(ROOT, "comics");
export const SITE = "https://vibe2fire.dev";
export const FEED_SCHEMA = "vibe2fire.content/v1";

export const SHAPES = { wide: [1536, 1024], square: [1024, 1024], tall: [1024, 1536] } as const;
export type Shape = keyof typeof SHAPES;
const SPANS = [2, 3, 4, 6];
export const POSITIONS = ["tl", "tr", "tc", "ml", "mr", "bl", "br", "bc"] as const;
export const TAILS: Record<string, string> = {
  l: "",
  c: "tail-c",
  r: "tail-r",
  up: "tail-up",
  "up-c": "tail-up tail-c",
  "up-r": "tail-up tail-r",
  none: "",
};
const NO_TEXT = "Strictly no text, letters, numbers, logos, speech bubbles, captions, signage text or watermark anywhere in the image.";
const HEADROOM = "Keep the top fifth of the frame visually calm (wall, sky or shadow) because lettering will be added there later.";

export type Lettering =
  | { cap: string; at?: string }
  | { say: string; at?: string; tail?: string }
  | { sfx: string; at?: string; size?: "xl"; color?: "red" | "yel" | "mint" }
  | { stack: string[]; at?: string };
export interface Character {
  id: string;
  name?: string;
  tag?: string;
  look: string;
  props?: string;
  refs?: string[];
}
export interface Panel {
  id: string;
  span?: number;
  shape?: Shape;
  focus?: string;
  cast?: string[];
  scene: string;
  alt?: string;
  headroom?: boolean;
  text?: Lettering[];
}
export interface Chapter {
  id: string;
  nav?: string;
  date?: string;
  title: string;
  intro?: string | string[];
  transcript?: string;
  context?: string | string[];
  panels: Panel[];
}
export interface ComicConfig {
  title: string;
  lang?: string;
  home?: boolean;
  style?: { preset?: string; art?: string; extra?: string; sheet?: string; headroom?: string };
  reader?: { theme?: "dark" | "light"; lettering?: string; labels?: Record<string, string> };
  page?: Record<string, any>;
  characters: Character[];
  cast?: { sheet?: string };
  generation?: { jobs?: number; model?: string; codex?: string };
  chapters: Chapter[];
}
export interface Comic {
  slug: string;
  dir: string;
  config: ComicConfig;
  style: { art: string; sheet: string; headroom: string };
  theme: string;
  lettering: string;
  labels: Record<string, string>;
  /** URL path of the comic's page: "/" for the home comic, "/<slug>/" otherwise. */
  path: string;
  /** URL path of the folder holding the panel webp files. */
  panelsPath: string;
  work: { dir: string; panels: string; logs: string; prompts: string; review: string; sheet: string };
}

const DEFAULT_LABELS = {
  pages: "Pages",
  panels: "Panels",
  chapters: "Chapters",
  mode: "Reading mode",
  readScene: "Read the scene",
  skip: "Skip to the write-up",
  start: "Start reading",
};

export function loadStyles(): Record<string, any> {
  return parse(readFileSync(join(ROOT, "src/lib/styles.yaml"), "utf8"));
}

export function loadComic(slug: string, comicsDir = COMICS_DIR): Comic {
  const dir = join(comicsDir, slug);
  const config: ComicConfig = parse(readFileSync(join(dir, "comic.yaml"), "utf8"));
  const styles = loadStyles();
  const presetName = config.style?.preset ?? "graphic-novel";
  const preset = styles[presetName];
  if (!preset && !config.style?.art)
    throw new Error(`${slug}: unknown style preset "${presetName}" (presets: ${Object.keys(styles).join(", ")})`);
  const workDir = join(dir, ".work");
  return {
    slug,
    dir,
    config,
    style: {
      art: [config.style?.art ?? preset.art, config.style?.extra].filter(Boolean).join(" "),
      sheet: config.style?.sheet ?? preset?.sheet ?? "plain paper background, full body, front three-quarter view",
      headroom: config.style?.headroom ?? HEADROOM,
    },
    theme: config.reader?.theme ?? preset?.reader ?? "dark",
    lettering: config.reader?.lettering ?? preset?.lettering ?? "ink",
    labels: { ...DEFAULT_LABELS, ...config.reader?.labels },
    path: config.home ? "/" : `/${slug}/`,
    panelsPath: `/comics/${slug}/panels/`,
    work: {
      dir: workDir,
      panels: join(workDir, "panels"),
      logs: join(workDir, "logs"),
      prompts: join(workDir, "prompts"),
      review: join(workDir, "review"),
      sheet: config.cast?.sheet ? resolve(dir, config.cast.sheet) : join(workDir, "cast-sheet.png"),
    },
  };
}

export function listComics(comicsDir = COMICS_DIR): Comic[] {
  if (!existsSync(comicsDir)) return [];
  return readdirSync(comicsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(comicsDir, d.name, "comic.yaml")))
    .map((d) => loadComic(d.name, comicsDir))
    .sort((a, b) => Number(Boolean(b.config.home)) - Number(Boolean(a.config.home)) || a.slug.localeCompare(b.slug));
}

export const allPanels = (comic: Comic) => comic.config.chapters.flatMap((c) => c.panels.map((p) => ({ ...p, chapter: c.id })));

/** Every problem in a comic's config, as readable sentences. An empty list means the comic is valid. */
export function validate(comic: Comic): string[] {
  const { config } = comic;
  const errors: string[] = [];
  const charIds = new Set<string>();
  (config.characters ?? []).forEach((c, i) => {
    if (!c.id) errors.push(`characters[${i}] has no id`);
    if (charIds.has(c.id)) errors.push(`duplicate character id ${c.id}`);
    charIds.add(c.id);
    if (!c.look) errors.push(`character ${c.id} has no look (the image model identifies characters by looks, not names)`);
    for (const r of c.refs ?? []) if (!existsSync(resolve(comic.dir, r))) errors.push(`character ${c.id}: reference ${r} not found`);
  });
  const panelIds = new Set<string>();
  const chapterIds = new Set<string>();
  for (const ch of config.chapters ?? []) {
    if (chapterIds.has(ch.id)) errors.push(`duplicate chapter id ${ch.id}`);
    chapterIds.add(ch.id);
    let row = 0;
    for (const p of ch.panels ?? []) {
      const where = `${ch.id}/${p.id}`;
      if (!/^[a-z0-9-]+$/.test(p.id ?? "")) errors.push(`${where}: panel id must be lowercase letters, digits and hyphens`);
      if (panelIds.has(p.id)) errors.push(`duplicate panel id ${p.id}`);
      panelIds.add(p.id);
      if (!(String(p.shape ?? "wide") in SHAPES)) errors.push(`${where}: shape must be one of ${Object.keys(SHAPES).join(", ")}`);
      if (!SPANS.includes(p.span ?? 6)) errors.push(`${where}: span must be one of ${SPANS.join(", ")}`);
      if (!p.scene) errors.push(`${where}: no scene`);
      for (const c of p.cast ?? []) if (!charIds.has(c)) errors.push(`${where}: cast member ${c} is not a character`);
      for (const m of String(p.scene ?? "").matchAll(/\{([a-z0-9-]+)\}/g))
        if (!charIds.has(m[1])) errors.push(`${where}: scene placeholder {${m[1]}} is not a character`);
      for (const t of p.text ?? []) {
        const at = (t as any).at;
        const tail = (t as any).tail;
        if (at && !(POSITIONS as readonly string[]).includes(at))
          errors.push(`${where}: position ${at} must be one of ${POSITIONS.join(", ")}`);
        if (tail && !(tail in TAILS)) errors.push(`${where}: tail ${tail} must be one of ${Object.keys(TAILS).join(", ")}`);
        if (!["cap", "say", "sfx", "stack"].some((k) => k in t)) errors.push(`${where}: lettering needs cap, say, sfx or stack`);
      }
      row += p.span ?? 6;
      if (row > 6) errors.push(`${where}: row overflows 6 columns (the spans in a row must add up to exactly 6)`);
      if (row >= 6) row = 0;
    }
    if (row !== 0) errors.push(`${ch.id}: last row has ${row} of 6 columns filled`);
  }
  return errors;
}

// ---------- image prompts ----------
const charNumber = (comic: Comic, id: string) => comic.config.characters.findIndex((c) => c.id === id) + 1;
const tagOf = (comic: Comic, id: string) => {
  const c = comic.config.characters.find((x) => x.id === id);
  return `${c?.tag ?? "the character"} (character ${charNumber(comic, id)} on the sheet)`;
};

export function castPrompt(comic: Comic): string {
  const chars = comic.config.characters;
  const refs = chars.some((c) => c.refs?.length);
  return [
    `Use your image generation tool to create ONE image at size 1536x1024.${refs ? " The attached images are reference material for some characters: keep their faces, outfits and designs." : ""} Then copy the generated PNG into the current directory as cast-sheet.png and reply only with its path.`,
    "",
    `Image: a character model sheet for a comic, ${chars.length} characters standing side by side, ${comic.style.sheet}, each clearly separated.`,
    `Art style: ${comic.style.art}`,
    "Characters, left to right:",
    ...chars.map((c, i) => `${i + 1}. ${c.look}${c.props ? `; ${c.props}` : ""}`),
    NO_TEXT,
  ].join("\n");
}

/** The prompt for one panel. Characters are named by their looks and sheet number only: image models swap people when a prompt leans on names. */
export function panelPrompt(comic: Comic, panel: Panel): string {
  const [w, h] = SHAPES[panel.shape ?? "wide"];
  const placeholders = [...String(panel.scene).matchAll(/\{([a-z0-9-]+)\}/g)].map((m) => m[1]);
  const cast = Array.from(new Set([...(panel.cast ?? []), ...placeholders]));
  const scene = String(panel.scene).replace(/\{([a-z0-9-]+)\}/g, (_, id) => tagOf(comic, id));
  return [
    `Use your image generation tool to create ONE image at size ${w}x${h}. The first attached image is the character model sheet: match every character's face, hair, clothes and design exactly when they appear. Then copy the generated PNG into the current directory as ${panel.id}.png and reply only with its path.`,
    "",
    ...(cast.length
      ? [
          "Characters in this panel (identify them by these looks and their number on the sheet):",
          ...cast.map(
            (id) => `- character ${charNumber(comic, id)} on the sheet: ${comic.config.characters.find((c) => c.id === id)?.look}`,
          ),
          "",
        ]
      : []),
    `Panel: ${scene}`,
    "",
    `Art style: ${comic.style.art} ${panel.headroom === false ? "" : comic.style.headroom}`.trim(),
    NO_TEXT,
  ].join("\n");
}

export const refsFor = (comic: Comic, ids: string[]) =>
  comic.config.characters.filter((c) => ids.includes(c.id)).flatMap((c) => (c.refs ?? []).map((r) => resolve(comic.dir, r)));

// ---------- text helpers ----------
const escapeHtml = (s: string | number | null | undefined) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
/** Inline markdown (`code`, **strong**, *em*, [text](url)) to HTML. Escapes first, so config text cannot inject markup. */
export function inlineMarkdown(s: string | number | null | undefined): string {
  return escapeHtml(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}
/** The same inline markdown reduced to plain text, for feeds and social captions. */
export function plainText(s: string | number | null | undefined): string {
  return String(s ?? "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1");
}
export const paragraphs = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);

export function transcriptOf(chapter: Chapter): string {
  if (chapter.transcript) return chapter.transcript;
  return chapter.panels
    .flatMap((p) => (p.text ?? []).map((t) => ("stack" in t ? t.stack.join(" ") : "cap" in t ? t.cap : "say" in t ? `“${t.say}”` : null)))
    .filter(Boolean)
    .join(" ");
}

// ---------- content feed ----------
type FeedText = { kind: "caption" | "speech" | "sfx"; text: string };
const feedText = (t: Lettering): FeedText[] =>
  "stack" in t
    ? t.stack.map((text) => ({ kind: "caption" as const, text }))
    : "cap" in t
      ? [{ kind: "caption", text: t.cap }]
      : "say" in t
        ? [{ kind: "speech", text: t.say }]
        : [{ kind: "sfx", text: t.sfx }];

/** The public content feed (schema vibe2fire.content/v1) that downstream studios such as Omninoise read. */
export function buildFeed(comics: Comic[], site = SITE, generatedAt = new Date().toISOString()) {
  return {
    schema: FEED_SCHEMA,
    generatedAt,
    site,
    comics: comics.map((comic) => {
      const { config } = comic;
      const url = new URL(comic.path, site).href;
      return {
        slug: comic.slug,
        title: config.title,
        lang: config.lang ?? "en",
        url,
        style: config.style?.preset ?? "graphic-novel",
        characters: config.characters.map((c) => ({ id: c.id, name: c.name ?? c.id })),
        chapters: config.chapters.map((ch, i) => ({
          id: ch.id,
          number: i + 1,
          date: ch.date ?? null,
          title: ch.title,
          url: `${url}#${ch.id}`,
          intro: paragraphs(ch.intro).map(plainText),
          transcript: plainText(transcriptOf(ch)),
          context: paragraphs(ch.context).map(plainText),
          panels: ch.panels.map((p) => {
            const [width, height] = SHAPES[p.shape ?? "wide"];
            return {
              id: p.id,
              image: new URL(`${comic.panelsPath}${p.id}.webp`, site).href,
              shape: p.shape ?? "wide",
              width,
              height,
              alt: p.alt ?? "",
              cast: p.cast ?? [],
              text: (p.text ?? []).flatMap(feedText).map((t) => ({ ...t, text: plainText(t.text) })),
            };
          }),
        })),
      };
    }),
  };
}
