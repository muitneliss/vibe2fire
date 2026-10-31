// Worker in front of the static assets (ADR 0007): every request needs HTTP Basic credentials,
// including /content.json and the images. The credentials are Worker secrets, never in the repo.

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  BASIC_AUTH_USER?: string;
  BASIC_AUTH_PASSWORD?: string;
}

// Same security headers as the global block in public/_headers (a 401 never reaches the assets layer).
const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy":
    "default-src 'none'; style-src 'self'; img-src 'self'; manifest-src 'self'; font-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
};

const encoder = new TextEncoder();

async function digest(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

// Hash both sides so the lengths match, then compare every byte with no early exit.
async function sameSecret(given: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([digest(given), digest(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

function parseBasic(header: string | null): { user: string; password: string } | null {
  const match = /^Basic\s+(\S+)$/i.exec(header ?? "");
  if (!match) return null;
  let decoded: string;
  try {
    const bytes = Uint8Array.from(atob(match[1]!), (c) => c.charCodeAt(0));
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
  const colon = decoded.indexOf(":");
  if (colon < 0) return null;
  return { user: decoded.slice(0, colon), password: decoded.slice(colon + 1) };
}

async function authorized(request: Request, env: Env): Promise<boolean> {
  if (!env.BASIC_AUTH_USER || !env.BASIC_AUTH_PASSWORD) return false;
  const given = parseBasic(request.headers.get("Authorization"));
  if (!given) return false;
  const [userOk, passwordOk] = await Promise.all([
    sameSecret(given.user, env.BASIC_AUTH_USER),
    sameSecret(given.password, env.BASIC_AUTH_PASSWORD),
  ]);
  return userOk && passwordOk;
}

function unauthorized(): Response {
  return new Response("Authentication required.\n", {
    status: 401,
    headers: {
      ...SECURITY_HEADERS,
      "WWW-Authenticate": 'Basic realm="vibe2fire", charset="UTF-8"',
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (!(await authorized(request, env))) return unauthorized();
    const response = await env.ASSETS.fetch(request);
    // Gated content must never sit in a shared cache.
    const cacheControl = response.headers.get("Cache-Control");
    if (!cacheControl) return response;
    const gated = new Response(response.body, response);
    gated.headers.set("Cache-Control", cacheControl.replace(/\bpublic\b/i, "private"));
    return gated;
  },
};
