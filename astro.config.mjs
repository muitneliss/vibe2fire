// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://vibe2fire.dev",
  output: "static",
  trailingSlash: "ignore",
  // External stylesheets only: the CSP in public/_headers allows style-src 'self' and no inline styles.
  build: { inlineStylesheets: "never", format: "directory" },
  devToolbar: { enabled: false },
});
