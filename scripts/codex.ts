// Codex image generation, shared by the comic CLI (scripts/comic.ts) and the brand CLI (scripts/brand.ts).
import { copyFileSync, existsSync, statSync, writeFileSync } from "node:fs";

export async function runCodex(
  gen: { codex?: string; model?: string } | undefined,
  prompt: string,
  images: string[],
  cwd: string,
  out: string,
  log: string,
) {
  const args = [gen?.codex ?? "codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", cwd];
  if (gen?.model) args.push("-m", gen.model);
  args.push(prompt); // the prompt must come before -i: -i takes every following path as an image
  if (images.length) args.push("-i", ...images);
  const proc = Bun.spawn(args, { stdout: "pipe", stderr: "pipe" });
  const [o, e] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text()]);
  await proc.exited;
  writeFileSync(log, o + e);
  if (existsSync(out) && statSync(out).size > 0) return true;
  // Codex keeps every generated image under ~/.codex/generated_images; recover the last one its log names.
  const found = [...(o + e).matchAll(/(\/[^\s'"]*generated_images\/[^\s'"]+\.png)/g)].map((m) => m[1]).filter(existsSync);
  if (found.length) {
    copyFileSync(found[found.length - 1], out);
    return true;
  }
  return false;
}
