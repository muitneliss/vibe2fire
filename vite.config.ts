// Vite+ (vp): formatting (Oxfmt), linting and type checks (Oxlint + tsgolint), tests (Vitest).
// Astro builds the site with its own Vite; this file only configures the vp toolchain.
import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ["dist/**", ".astro/**", "comics/*/.work/**", "public/**", "node_modules/**"],
  },
  fmt: {
    printWidth: 140,
    ignorePatterns: ["dist/**", ".astro/**", "comics/**", "public/**", "src/styles/fonts.css", "src/styles/fonts-magazine.css", "*.md"],
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
