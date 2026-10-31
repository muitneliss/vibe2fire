import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { loadComic } from "../src/lib/comic";
import { libraryPages, libraryUrl, PAGE_SIZE } from "../src/lib/library";

const ok = loadComic("ok", join(import.meta.dirname, "fixtures"));
// 30 comics, newest first, every third one tagged "rain".
const comics = Array.from({ length: 30 }, (_, i) => ({
  ...ok,
  slug: `c${i}`,
  config: { ...ok.config, tags: i % 3 === 0 ? ["rain"] : [] },
}));

test("each filter's pages list every matching comic exactly once, in order, a page at a time", () => {
  const pages = libraryPages(comics).filter((p) => p.locale === "en");
  const all = pages.filter((p) => !p.lang && !p.tag);
  expect(all.map((p) => p.comics.length)).toEqual([PAGE_SIZE, 30 - PAGE_SIZE]);
  expect(all.flatMap((p) => p.comics.map((c) => c.slug))).toEqual(comics.map((c) => c.slug));
  const rain = pages.filter((p) => p.tag === "rain");
  expect(rain.flatMap((p) => p.comics.map((c) => c.slug))).toEqual(["c0", "c3", "c6", "c9", "c12", "c15", "c18", "c21", "c24", "c27"]);
});

test("library URLs keep the locale, the filter and the page in the path", () => {
  expect(libraryUrl("en")).toBe("/");
  expect(libraryUrl("vi", { lang: "vi" })).toBe("/vi/language/vi/");
  expect(libraryUrl("vi", { tag: "ai" }, 2)).toBe("/vi/tag/ai/page/2/");
});
