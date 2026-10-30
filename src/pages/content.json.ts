import type { APIRoute } from "astro";
import { buildFeed, listComics } from "../lib/comic";

// The content feed downstream studios read (schema vibe2fire.content/v1). See docs/content-feed.md.
export const GET: APIRoute = ({ site }) =>
  new Response(JSON.stringify(buildFeed(listComics(), site?.href.replace(/\/$/, "")), null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
