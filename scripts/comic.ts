#!/usr/bin/env bun
// Generation CLI: comic.yaml -> cast sheet -> panels (Codex image generation) -> review -> webp.
// The page itself is built by Astro (bun run build); see AGENTS.md.
// Usage: bun run comic <check|prompts|cast|panels|review|webp|status|all> <slug | comics/<slug>> [--only ids|chapters] [--force] [--jobs N] [--dry-run]
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { allPanels, castPrompt, type Comic, listComics, loadComic, panelPrompt, refsFor, ROOT, validate } from "../src/lib/comic";
import { runCodex } from "./codex";

const die = (msg: string): never => {
  console.error(`comic: ${msg}`);
  process.exit(1);
};

const [command, target, ...rest] = process.argv.slice(2);
const flags: Record<string, string | boolean> = {};
for (let i = 0; i < rest.length; i++) {
  if (!rest[i].startsWith("--")) continue;
  const next = rest[i + 1];
  if (next && !next.startsWith("--")) flags[rest[i].slice(2)] = rest[++i];
  else flags[rest[i].slice(2)] = true;
}
if (!command)
  die("usage: bun run comic <check|prompts|cast|panels|review|webp|status|all> <slug> [--only ids] [--force] [--jobs N] [--dry-run]");

const comics: Comic[] = target ? [loadComic(basename(target.replace(/\/comic\.yaml$/, "").replace(/\/$/, "")))] : listComics();
if (!comics.length) die("no comics found under comics/*/comic.yaml");

const selected = (comic: Comic) => {
  const only = typeof flags.only === "string" ? new Set(flags.only.split(",").map((s) => s.trim())) : null;
  return allPanels(comic).filter((p) => !only || only.has(p.id) || only.has(p.chapter));
};
const publicPanels = (comic: Comic) => join(ROOT, "public", comic.panelsPath);

async function pool<T>(items: T[], jobs: number, fn: (t: T) => Promise<void>) {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.max(1, jobs) }, async () => {
      while (i < items.length) await fn(items[i++]);
    }),
  );
}

// ---------- steps ----------
function check(comic: Comic) {
  const errors = validate(comic);
  if (errors.length) die(`${comic.slug}: ${errors.length} error(s):\n- ${errors.join("\n- ")}`);
  if (comic.config.characters.length > 8) console.warn(`warning: ${comic.config.characters.length} characters crowd one model sheet`);
  console.log(
    `ok ${comic.slug}: ${comic.config.characters.length} characters, ${comic.config.chapters.length} chapters, ${allPanels(comic).length} panels`,
  );
}

async function cast(comic: Comic) {
  const { work } = comic;
  if (comic.config.cast?.sheet) {
    if (!existsSync(work.sheet)) die(`cast.sheet ${work.sheet} not found`);
    return console.log(`using provided sheet ${work.sheet}`);
  }
  for (const d of [work.dir, work.logs, work.prompts]) mkdirSync(d, { recursive: true });
  const prompt = castPrompt(comic);
  writeFileSync(join(work.prompts, "cast-sheet.txt"), prompt);
  if (flags["dry-run"]) return console.log(prompt);
  if (existsSync(work.sheet) && !flags.force) return console.log(`skip cast sheet (exists); --force to redo`);
  const ok = await runCodex(
    comic.config.generation,
    prompt,
    refsFor(
      comic,
      comic.config.characters.map((c) => c.id),
    ),
    work.dir,
    work.sheet,
    join(work.logs, "cast-sheet.log"),
  );
  console.log(ok ? `ok cast sheet -> ${work.sheet}` : `FAIL cast sheet (log: ${join(work.logs, "cast-sheet.log")})`);
  if (!ok) process.exitCode = 1;
}

async function panels(comic: Comic) {
  const { work } = comic;
  for (const d of [work.panels, work.logs, work.prompts]) mkdirSync(d, { recursive: true });
  if (!flags["dry-run"] && !existsSync(work.sheet)) die(`no cast sheet at ${work.sheet}; run the cast step first`);
  const failed: string[] = [];
  const jobs = Number(flags.jobs ?? comic.config.generation?.jobs ?? 4);
  await pool(selected(comic), flags["dry-run"] ? 1 : jobs, async (p) => {
    const prompt = panelPrompt(comic, p);
    writeFileSync(join(work.prompts, `${p.id}.txt`), prompt);
    if (flags["dry-run"]) return console.log(`--- ${p.id}\n${prompt}\n`);
    const out = join(work.panels, `${p.id}.png`);
    if (existsSync(out) && !flags.force) return console.log(`skip ${p.id}`);
    rmSync(out, { force: true });
    let ok = false;
    for (let attempt = 0; attempt < 2 && !ok; attempt++)
      ok = await runCodex(
        comic.config.generation,
        prompt,
        [work.sheet, ...refsFor(comic, p.cast ?? [])],
        work.panels,
        out,
        join(work.logs, `${p.id}.log`),
      );
    console.log(ok ? `ok ${p.id}` : `FAIL ${p.id}`);
    if (!ok) failed.push(p.id);
  });
  if (failed.length) {
    console.log(`failed: ${failed.join(",")} (logs in ${work.logs}); rerun with --only ${failed.join(",")}`);
    process.exitCode = 1;
  }
}

function review(comic: Comic) {
  const { work } = comic;
  mkdirSync(work.review, { recursive: true });
  const done = selected(comic).filter((p) => existsSync(join(work.panels, `${p.id}.png`)));
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const figures = done
    .map(
      (p) =>
        `<figure><img src="../panels/${p.id}.png" loading="lazy"><figcaption><b>${p.id}</b> ${esc(p.scene)}${p.cast?.length ? `<br><i>cast: ${p.cast.join(", ")}</i>` : ""}</figcaption></figure>`,
    )
    .join("\n");
  writeFileSync(
    join(work.review, "index.html"),
    `<!doctype html><meta charset="utf-8"><title>Review ${comic.slug}</title><style>body{font:14px system-ui;background:#222;color:#ddd;margin:20px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px}img{width:100%;display:block}figure{margin:0;background:#111;padding:8px}</style><main>${figures}</main>`,
  );
  console.log(`review page: ${join(work.review, "index.html")}`);
  if (Bun.spawnSync(["which", "ffmpeg"]).exitCode !== 0) return console.log("ffmpeg not found; skipped contact sheets");
  // Six panels per sheet for an agent to look at; the order is printed because this ffmpeg may lack drawtext.
  for (let s = 0; s * 6 < done.length; s++) {
    const group = done.slice(s * 6, s * 6 + 6);
    const args = ["ffmpeg", "-loglevel", "error", "-y"];
    let filter = "";
    group.forEach((p, k) => {
      args.push("-i", join(work.panels, `${p.id}.png`));
      filter += `[${k}]scale=480:360:force_original_aspect_ratio=decrease,pad=480:360[v${k}];`;
    });
    const layout = ["0_0", "w0_0", "w0+w1_0", "0_h0", "w0_h0", "w0+w1_h0"].slice(0, group.length).join("|");
    const out = join(work.review, `sheet-${s + 1}.png`);
    args.push(
      "-filter_complex",
      group.length === 1
        ? `${filter}[v0]null`
        : `${filter}${group.map((_, k) => `[v${k}]`).join("")}xstack=inputs=${group.length}:layout=${layout}:fill=black`,
      out,
    );
    const r = Bun.spawnSync(args);
    console.log(
      r.exitCode === 0
        ? `${out}: ${group.map((p) => p.id).join(" ")} (left to right, top to bottom)`
        : `sheet ${s + 1} failed: ${r.stderr.toString()}`,
    );
  }
}

function webp(comic: Comic) {
  const dir = publicPanels(comic);
  mkdirSync(dir, { recursive: true });
  const hasCwebp = Bun.spawnSync(["which", "cwebp"]).exitCode === 0;
  const maxWidth = 1400;
  let converted = 0;
  const missing: string[] = [];
  for (const p of selected(comic)) {
    const src = join(comic.work.panels, `${p.id}.png`);
    const dst = join(dir, `${p.id}.webp`);
    if (!existsSync(src)) {
      missing.push(p.id);
      continue;
    }
    if (existsSync(dst) && statSync(dst).mtimeMs > statSync(src).mtimeMs && !flags.force) continue;
    // Only ever shrink: a PNG's width is the big-endian uint32 at byte 16 of its IHDR chunk.
    const resize = readFileSync(src).readUInt32BE(16) > maxWidth ? ["-resize", String(maxWidth), "0"] : [];
    const r = hasCwebp
      ? Bun.spawnSync(["cwebp", "-quiet", "-q", "78", ...resize, src, "-o", dst])
      : Bun.spawnSync([
          "ffmpeg",
          "-loglevel",
          "error",
          "-y",
          "-i",
          src,
          "-vf",
          `scale='min(${maxWidth},iw)':-2`,
          "-c:v",
          "libwebp",
          "-quality",
          "78",
          dst,
        ]);
    if (r.exitCode !== 0) die(`webp failed for ${p.id}: ${r.stderr.toString()}`);
    converted++;
  }
  const total = readdirSync(dir)
    .filter((f) => f.endsWith(".webp"))
    .reduce((s, f) => s + statSync(join(dir, f)).size, 0);
  console.log(
    `webp ${comic.slug}: ${converted} converted, ${missing.length} without a PNG${missing.length ? ` (${missing.join(",")})` : ""}; ${Math.round(total / 1024)} KB in ${dir}`,
  );
}

function status(comic: Comic) {
  const ps = allPanels(comic);
  const png = ps.filter((p) => existsSync(join(comic.work.panels, `${p.id}.png`)));
  const web = ps.filter((p) => existsSync(join(publicPanels(comic), `${p.id}.webp`)));
  console.log(
    `${comic.slug}: cast sheet ${existsSync(comic.work.sheet) ? "ok" : "missing"}; ${png.length}/${ps.length} panels generated, ${web.length}/${ps.length} webp; style ${comic.config.style?.preset ?? "graphic-novel"}, theme ${comic.theme}, lettering ${comic.lettering}`,
  );
  const todo = ps.filter((p) => !web.includes(p)).map((p) => p.id);
  if (todo.length) console.log(`  no webp yet: ${todo.join(",")}`);
}

for (const comic of comics) {
  switch (command) {
    case "check":
      check(comic);
      break;
    case "prompts":
      if (!flags.only) console.log(`--- cast-sheet\n${castPrompt(comic)}\n`);
      for (const p of selected(comic)) console.log(`--- ${p.id}\n${panelPrompt(comic, p)}\n`);
      break;
    case "cast":
      await cast(comic);
      break;
    case "panels":
      await panels(comic);
      break;
    case "review":
      review(comic);
      break;
    case "webp":
      webp(comic);
      break;
    case "status":
      status(comic);
      break;
    case "all":
      check(comic);
      await cast(comic);
      await panels(comic);
      review(comic);
      webp(comic);
      console.log("next: look at the review sheets, then bun run build && bun run preview");
      break;
    default:
      die(`unknown command ${command}`);
  }
}
