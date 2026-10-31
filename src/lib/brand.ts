// The brand: paths of the icon and link-preview images under public/, and the Codex prompts that paint them.
// Shared by the page head (BrandHead.astro), the brand CLI (scripts/brand.ts) and the tests.
// Bump BRAND_VERSION when the artwork changes: the versioned file names bust the Workers asset cache.
export const BRAND_VERSION = 1;
export const BRAND_NAME = "Vibe2Fire";
export const BRAND_COLOR = "#f4f0e7";
export const OG_SIZE: [number, number] = [1200, 630];
export const OG_ALT = "A red comic-burst flame rising from a longbox of comics under lamplight, the Vibe2Fire mark";

const v = (stem: string) => `/brand/${stem}-v${BRAND_VERSION}.png`;
export const BRAND = {
  favicon: "/favicon.ico",
  manifest: "/site.webmanifest",
  icon32: v("icon-32"),
  appleTouch: v("apple-touch-icon"),
  icon192: v("icon-192"),
  icon512: v("icon-512"),
  og: v("og"),
};

// Every image the head links, with its pixel size; scripts/brand.ts writes them, tests/brand.test.ts checks them.
export const BRAND_ASSETS: { path: string; w?: number; h?: number }[] = [
  { path: BRAND.favicon, w: 32, h: 32 },
  { path: BRAND.icon32, w: 32, h: 32 },
  { path: BRAND.appleTouch, w: 180, h: 180 },
  { path: BRAND.icon192, w: 192, h: 192 },
  { path: BRAND.icon512, w: 512, h: 512 },
  { path: BRAND.og, w: OG_SIZE[0], h: OG_SIZE[1] },
  { path: BRAND.manifest },
];

export const markPrompt = (
  name: string,
) => `Use your image generation tool to create ONE square image at size 1024x1024. Then copy the generated PNG into the current directory as ${name}.png and reply only with its path.

A brand mark for a comic studio. Subject: a single bold flame whose silhouette is a jagged comic-book impact burst, the spiky starburst shape used behind a sound effect, so the flame's tongues are the burst's spikes. Flat graphic design: solid stamp red (#a8321f) fill, one inner ember highlight in coral (#e8775e), a thick press-ink (#25251f) outline of even weight, a few halftone dots as the only texture. Centred and upright; the mark spans about 60% of the canvas with an even margin on every side. Background: one flat newsprint paper colour (#f4f0e7) edge to edge, no vignette, border, frame or shadow. It must still read as a tiny 16-pixel favicon: simple silhouette, few shapes, high contrast, no fine detail.

Strictly no text, letters, numbers, words, signature or watermark.`;

export const ogPrompt = (
  name: string,
) => `Use your image generation tool to create ONE wide image at size 1536x1024. Then copy the generated PNG into the current directory as ${name}.png and reply only with its path.

The attached image is the studio's brand mark: a red flame shaped like a comic-book impact burst with a thick ink outline. Paint a wide link-preview illustration for the comic studio around that exact mark, keeping its shape and colours. The flame mark glows softly as it rises out of an open cardboard comic longbox (#e4dac6) packed with comic issues seen edge-on from their top edges, standing on a print-shop workbench under warm lamplight (#f1d3aa), with loose newsprint sheets and ink pots nearby. Graphic-novel style: bold ink linework, flat colour, halftone shading, a warm limited palette of stamp red (#a8321f), press ink (#25251f), newsprint paper (#f4f0e7) and lamplight. Keep the flame and the box inside the middle band: the top and bottom eighth of the image will be cropped away.

Strictly no text, letters, numbers, words, logos with lettering, signage, signature or watermark; no comic cover is visible, only issue edges.`;
