import { expect, test } from "vite-plus/test";
import worker from "../src/worker";

const assets = {
  fetch: async (request: Request) =>
    new Response(`asset:${new URL(request.url).pathname}`, {
      headers: { "Cache-Control": "public, max-age=86400" },
    }),
};
const secrets = { BASIC_AUTH_USER: "omninoise", BASIC_AUTH_PASSWORD: "s3cret:pässword" };
const basic = (user: string, password: string) => ({
  Authorization: `Basic ${btoa(String.fromCharCode(...new TextEncoder().encode(`${user}:${password}`)))}`,
});
const get = (headers: HeadersInit, env: object = secrets) =>
  worker.fetch(new Request("https://vibe2fire.dev/content.json", { headers }), { ASSETS: assets, ...env });

test("a request without credentials gets a Basic challenge and never reaches the feed", async () => {
  const response = await get({});
  expect(response.status).toBe(401);
  expect(response.headers.get("WWW-Authenticate")).toContain("Basic");
  expect(await response.text()).not.toContain("asset:");
});

test("a wrong password is refused", async () => {
  expect((await get(basic("omninoise", "wrong"))).status).toBe(401);
});

test("correct credentials (colon and accents in the password) serve the feed with a private cache", async () => {
  const response = await get(basic("omninoise", "s3cret:pässword"));
  expect(response.status).toBe(200);
  expect(await response.text()).toBe("asset:/content.json");
  expect(response.headers.get("Cache-Control")).toBe("private, max-age=86400");
});

test("with no secrets configured nobody gets in, even with empty credentials", async () => {
  expect((await get(basic("", ""), {})).status).toBe(401);
  expect((await get(basic("omninoise", "s3cret:pässword"), {})).status).toBe(401);
});
