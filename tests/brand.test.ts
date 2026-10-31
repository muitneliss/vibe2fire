import { existsSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { BRAND_ASSETS } from "../src/lib/brand";
import { ROOT } from "../src/lib/comic";

test("every brand asset the page head links exists in public/", () => {
  const missing = BRAND_ASSETS.map((a) => a.path).filter((path) => !existsSync(join(ROOT, "public", path)));
  expect(missing).toEqual([]);
});
