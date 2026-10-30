import { join } from "node:path";
import { describe, expect, test } from "vite-plus/test";
import { buildFeed, listComics, loadComic, panelPrompt, validate } from "../src/lib/comic";

const fixtures = join(import.meta.dirname, "fixtures");

describe("comic model", () => {
  test("the shipped comics are valid", () => {
    const comics = listComics();
    expect(comics.length).toBeGreaterThan(0);
    for (const comic of comics) expect(validate(comic)).toEqual([]);
  });

  test("validate reports unknown characters and rows that do not fill six columns", () => {
    const errors = validate(loadComic("broken", fixtures));
    expect(errors).toContain("one/p1: scene placeholder {villain} is not a character");
    expect(errors).toContain("one/p2: row overflows 6 columns (the spans in a row must add up to exactly 6)");
  });

  // Regression: the image model swapped characters when prompts named them ("LINH", "THE BOSS").
  test("panel prompts identify characters by looks and sheet number, never by name", () => {
    const comic = loadComic("ok", fixtures);
    const prompt = panelPrompt(comic, comic.config.chapters[0].panels[0]);
    expect(prompt).toContain("- character 1 on the sheet: tall woman in her 40s, short black hair, long red coat");
    expect(prompt).toContain("the woman in the red coat (character 1 on the sheet) waits under a streetlight");
    expect(prompt).not.toContain("Ana");
  });

  test("the feed gives absolute image URLs and plain-text lettering", () => {
    const feed = buildFeed([loadComic("ok", fixtures)], "https://vibe2fire.dev", "2026-10-30T00:00:00.000Z");
    const chapter = feed.comics[0].chapters[0];
    expect(feed.schema).toBe("vibe2fire.content/v1");
    expect(chapter).toMatchObject({ title: "One", url: "https://vibe2fire.dev/#one", intro: ["Set in 1999."] });
    expect(chapter.panels[0]).toMatchObject({
      image: "https://vibe2fire.dev/comics/ok/panels/p1.webp",
      text: [
        { kind: "caption", text: "Midnight." },
        { kind: "speech", text: "He is late." },
        { kind: "sfx", text: "DRIP" },
      ],
    });
  });
});
