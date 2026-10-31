#!/usr/bin/env bun
// Brand CLI: paint the studio mark and the link-preview image with Codex, then derive the icons under public/.
// Usage: bun run brand <prompts|mark|review|pick|og|icons|status> [n] [--variants N] [--force] [--jobs N]
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BRAND, BRAND_ASSETS, BRAND_COLOR, BRAND_NAME, markPrompt, OG_SIZE, ogPrompt } from "../src/lib/brand";
import { ROOT } from "../src/lib/comic";
import { runCodex } from "./codex";

const die = (msg: string): never => {
  console.error(`brand: ${msg}`);
  process.exit(1);
};

const [command, ...rest] = process.argv.slice(2);
const args: string[] = [];
const flags: Record<string, string | boolean> = {};
for (let i = 0; i < rest.length; i++) {
  if (!rest[i].startsWith("--")) {
    args.push(rest[i]);
    continue;
  }
  const next = rest[i + 1];
  if (next && !next.startsWith("--")) flags[rest[i].slice(2)] = rest[++i];
  else flags[rest[i].slice(2)] = true;
}
if (!command) die("usage: bun run brand <prompts|mark|review|pick|og|icons|status> [n] [--variants N] [--force] [--jobs N]");

const WORK = join(ROOT, "brand", ".work");
const LOGS = join(WORK, "logs");
const PROMPTS = join(WORK, "prompts");
const MARK = join(WORK, "mark.png");
const OG = join(WORK, "og.png");
const nonEmpty = (f: string) => existsSync(f) && statSync(f).size > 0;
const candidates = () =>
  (existsSync(WORK) ? readdirSync(WORK) : [])
    .filter((f) => /^mark-\d+\.png$/.test(f))
    .sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5)))
    .map((f) => join(WORK, f));
const publicFile = (path: string) => join(ROOT, "public", path);
const ffmpeg = (...a: string[]) => {
  const r = Bun.spawnSync(["ffmpeg", "-y", "-v", "error", ...a]);
  if (r.exitCode !== 0) die(`ffmpeg failed: ${r.stderr.toString()}`);
};

async function pool<T>(items: T[], jobs: number, fn: (t: T) => Promise<void>) {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.max(1, jobs) }, async () => {
      while (i < items.length) await fn(items[i++]);
    }),
  );
}

// ---------- steps ----------
function writePrompts() {
  for (const d of [LOGS, PROMPTS]) mkdirSync(d, { recursive: true });
  const prompts = { mark: markPrompt("mark"), og: ogPrompt("og") };
  for (const [name, prompt] of Object.entries(prompts)) {
    writeFileSync(join(PROMPTS, `${name}.txt`), prompt);
    console.log(`--- ${name}\n${prompt}\n`);
  }
  return prompts;
}

async function mark() {
  writePrompts();
  const variants = Number(flags.variants ?? 3);
  const jobs = Number(flags.jobs ?? 3);
  const failed: number[] = [];
  await pool(
    Array.from({ length: variants }, (_, i) => i + 1),
    jobs,
    async (i) => {
      const out = join(WORK, `mark-${i}.png`);
      if (nonEmpty(out) && !flags.force) return console.log(`skip mark-${i}`);
      rmSync(out, { force: true });
      let ok = false;
      for (let attempt = 0; attempt < 2 && !ok; attempt++)
        ok = await runCodex(undefined, markPrompt(`mark-${i}`), [], WORK, out, join(LOGS, `mark-${i}.log`));
      console.log(ok ? `ok mark-${i}` : `FAIL mark-${i}`);
      if (!ok) failed.push(i);
    },
  );
  if (failed.length) {
    console.log(`failed: ${failed.join(",")} (logs in ${LOGS}); rerun with --force`);
    process.exitCode = 1;
  }
  review();
}

function review() {
  const files = candidates();
  if (!files.length) die(`no ${join(WORK, "mark-*.png")}; run the mark step first`);
  if (Bun.spawnSync(["which", "ffmpeg"]).exitCode !== 0) return console.log("ffmpeg not found; skipped the review sheet");
  // Each column: the candidate large, then the same image at 32px blown up with neighbour sampling, as a favicon would look.
  const inputs = files.flatMap((f) => ["-i", f]);
  const columns = files.map(
    (_, i) =>
      `[${i}]split[a${i}][b${i}];[a${i}]scale=384:384:flags=lanczos[big${i}];` +
      `[b${i}]scale=32:32:flags=lanczos,scale=128:128:flags=neighbor,pad=384:128:(ow-iw)/2:0:color=0xf4f0e7[small${i}];` +
      `[big${i}][small${i}]vstack[col${i}]`,
  );
  const sheet = join(WORK, "review.png");
  const hstack = files.length > 1 ? `;${files.map((_, i) => `[col${i}]`).join("")}hstack=inputs=${files.length}[sheet]` : "";
  ffmpeg(...inputs, "-filter_complex", columns.join(";") + hstack, "-map", files.length > 1 ? "[sheet]" : "[col0]", sheet);
  console.log(`${sheet}: ${files.map((f) => f.slice(WORK.length + 1)).join(" ")} (left to right)`);
}

function pick(n: string | undefined) {
  const src = join(WORK, `mark-${n}.png`);
  if (!n || !nonEmpty(src)) die(`usage: bun run brand pick <n>; ${src} not found`);
  copyFileSync(src, MARK);
  console.log(`picked mark-${n} -> ${MARK}`);
}

async function og() {
  if (!nonEmpty(MARK)) die(`no ${MARK}; run mark and pick first`);
  for (const d of [LOGS, PROMPTS]) mkdirSync(d, { recursive: true });
  const prompt = ogPrompt("og");
  writeFileSync(join(PROMPTS, "og.txt"), prompt);
  if (nonEmpty(OG) && !flags.force) return console.log("skip og (exists); --force to redo");
  rmSync(OG, { force: true });
  let ok = false;
  for (let attempt = 0; attempt < 2 && !ok; attempt++) ok = await runCodex(undefined, prompt, [MARK], WORK, OG, join(LOGS, "og.log"));
  console.log(ok ? `ok og -> ${OG}` : `FAIL og (log: ${join(LOGS, "og.log")})`);
  if (!ok) process.exitCode = 1;
}

function icons() {
  if (!nonEmpty(MARK)) die(`no ${MARK}; run mark and pick first`);
  mkdirSync(join(ROOT, "public", "brand"), { recursive: true });
  const written: string[] = [];
  // The link-preview crop cuts a quarter of the excess from the top and the rest from the bottom: the flame rises near the top of the scene.
  const crop = (w: number, h: number, y = "(ih-oh)/2") =>
    `scale=${w}:${h}:force_original_aspect_ratio=increase:flags=lanczos,crop=${w}:${h}:(iw-ow)/2:${y}`;
  for (const { path, w, h } of BRAND_ASSETS) {
    if (!path.endsWith(".png") || !w || !h) continue;
    if (path === BRAND.og) {
      if (!nonEmpty(OG)) {
        console.warn(`warning: no ${OG}; skipped ${path}`);
        continue;
      }
      ffmpeg("-i", OG, "-vf", crop(OG_SIZE[0], OG_SIZE[1], "(ih-oh)/4"), publicFile(path));
    } else ffmpeg("-i", MARK, "-vf", crop(w, h), publicFile(path));
    written.push(path);
  }
  ffmpeg("-i", publicFile(BRAND.icon32), publicFile(BRAND.favicon));
  written.push(BRAND.favicon);
  const icon = (src: string, size: number) => ({ src, sizes: `${size}x${size}`, type: "image/png", purpose: "any maskable" });
  writeFileSync(
    publicFile(BRAND.manifest),
    JSON.stringify(
      {
        name: BRAND_NAME,
        short_name: BRAND_NAME,
        start_url: "/",
        display: "browser",
        theme_color: BRAND_COLOR,
        background_color: BRAND_COLOR,
        icons: [icon(BRAND.icon192, 192), icon(BRAND.icon512, 512)],
      },
      null,
      2,
    ) + "\n",
  );
  written.push(BRAND.manifest);
  for (const p of written) console.log(`${p}: ${statSync(publicFile(p)).size} bytes`);
}

function status() {
  const mark = (f: string) => console.log(`${existsSync(f) ? "present" : "missing"}  ${f.slice(ROOT.length + 1)}`);
  if (existsSync(WORK)) candidates().forEach(mark);
  mark(MARK);
  mark(OG);
  BRAND_ASSETS.forEach((a) => mark(publicFile(a.path)));
}

switch (command) {
  case "prompts":
    writePrompts();
    break;
  case "mark":
    mkdirSync(LOGS, { recursive: true });
    await mark();
    break;
  case "review":
    review();
    break;
  case "pick":
    pick(args[0]);
    break;
  case "og":
    await og();
    break;
  case "icons":
    icons();
    break;
  case "status":
    status();
    break;
  default:
    die(`unknown command ${command}`);
}
