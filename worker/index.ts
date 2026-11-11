/**
 * Accounts API for the public Cloudflare site, backed by a D1 database. Everything except /api/* is
 * served straight from the built React app (see run_worker_first in wrangler.jsonc).
 * Mirrors the protections of the Express API in server/, with only name, email, and password.
 */
import { type ApiError, basicSignupSchema, fieldErrorsFrom, loginSchema, type PublicUser } from "../shared/auth";
import { hashPassword, verifyAgainstDummy, verifyPassword } from "./password";

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
}
interface Env {
  DB: { prepare(sql: string): D1Statement };
  ASSETS: { fetch(request: Request): Promise<Response> };
}
interface UserRow {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

const COOKIE = "yb_session";
const SESSION_SECONDS = 30 * 24 * 60 * 60;
const RATE_WINDOW_SECONDS = 15 * 60;
const RATE_LIMIT = 20;
const MAX_BODY_CHARS = 20_000;
const USER_COLUMNS = "id, name, email, created_at";

const now = () => Math.floor(Date.now() / 1000);

function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });
}
const fail = (status: number, body: ApiError) => json(status, body);

function toPublicUser(row: UserRow): PublicUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    age: null,
    weightKg: null,
    heightCm: null,
    goal: "General wellbeing",
    conditions: [],
    createdAt: row.created_at,
  };
}

const hex = (bytes: Uint8Array) => [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");

async function hashToken(token: string): Promise<string> {
  return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token))));
}

function sessionToken(request: Request): string | undefined {
  return request.headers.get("Cookie")?.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]+)`))?.[1];
}

function cookie(url: URL, value: string, maxAge: number): string {
  const secure = url.protocol === "https:" ? "; Secure" : "";
  return `${COOKIE}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`;
}

/** Issues a fresh session, replacing any token the browser already had. */
async function startSession(env: Env, request: Request, url: URL, userId: number): Promise<string> {
  const old = sessionToken(request);
  if (old) await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(await hashToken(old)).run();
  await env.DB.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(now()).run();

  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  await env.DB.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(await hashToken(token), userId, now() + SESSION_SECONDS)
    .run();
  return cookie(url, token, SESSION_SECONDS);
}

/** Records an attempt and returns true if this visitor has made too many recently. */
async function rateLimited(env: Env, request: Request): Promise<boolean> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const since = now() - RATE_WINDOW_SECONDS;
  await env.DB.prepare("DELETE FROM auth_attempts WHERE at < ?").bind(since).run();
  const row = await env.DB.prepare("SELECT COUNT(*) AS n FROM auth_attempts WHERE ip = ? AND at >= ?")
    .bind(ip, since)
    .first<{ n: number }>();
  if ((row?.n ?? 0) >= RATE_LIMIT) return true;
  await env.DB.prepare("INSERT INTO auth_attempts (ip, at) VALUES (?, ?)").bind(ip, now()).run();
  return false;
}

/** Same rules as server/src/http/csrf.ts: state changes must be same-origin JSON. Returns a rejection, if any. */
function csrfRejection(request: Request, url: URL): Response | undefined {
  const origin = request.headers.get("Origin");
  if ((origin && origin !== url.origin) || request.headers.get("Sec-Fetch-Site") === "cross-site") {
    return fail(403, { error: "Cross-site request blocked." });
  }
  const hasBody = Number(request.headers.get("Content-Length") ?? 0) > 0 || request.headers.has("Transfer-Encoding");
  if (hasBody && !request.headers.get("Content-Type")?.startsWith("application/json")) {
    return fail(415, { error: "Requests must be sent as JSON." });
  }
  return undefined;
}

async function readBody(request: Request): Promise<unknown> {
  const text = await request.text();
  if (text.length > MAX_BODY_CHARS) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

const TOO_MANY = "Too many attempts. Please wait a few minutes and try again.";

async function signup(request: Request, env: Env, url: URL): Promise<Response> {
  if (await rateLimited(env, request)) return fail(429, { error: TOO_MANY });
  const parsed = basicSignupSchema.safeParse(await readBody(request));
  if (!parsed.success) {
    return fail(400, { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFrom(parsed.error) });
  }
  const { name, email, password } = parsed.data;
  let user: UserRow | null;
  try {
    user = await env.DB.prepare(`INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?) RETURNING ${USER_COLUMNS}`)
      .bind(name, email, await hashPassword(password))
      .first<UserRow>();
  } catch (err) {
    if (String(err).includes("UNIQUE constraint failed")) {
      const message = "An account with that email already exists.";
      return fail(409, { error: message, fieldErrors: { email: message } });
    }
    throw err;
  }
  const setCookie = await startSession(env, request, url, user!.id);
  return json(201, { user: toPublicUser(user!) }, { "Set-Cookie": setCookie });
}

async function login(request: Request, env: Env, url: URL): Promise<Response> {
  if (await rateLimited(env, request)) return fail(429, { error: TOO_MANY });
  const parsed = loginSchema.safeParse(await readBody(request));
  if (!parsed.success) {
    return fail(400, { error: "Please enter your email and password.", fieldErrors: fieldErrorsFrom(parsed.error) });
  }
  const { email, password } = parsed.data;
  const row = await env.DB.prepare(`SELECT ${USER_COLUMNS}, password_hash FROM users WHERE email = ?`)
    .bind(email)
    .first<UserRow & { password_hash: string }>();
  const ok = row ? await verifyPassword(password, row.password_hash) : await verifyAgainstDummy(password);
  if (!row || !ok) return fail(401, { error: "Incorrect email or password." });
  const setCookie = await startSession(env, request, url, row.id);
  return json(200, { user: toPublicUser(row) }, { "Set-Cookie": setCookie });
}

async function me(request: Request, env: Env): Promise<Response> {
  const token = sessionToken(request);
  const row = token
    ? await env.DB.prepare(
        "SELECT u.id, u.name, u.email, u.created_at FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ? AND s.expires_at > ?",
      )
        .bind(await hashToken(token), now())
        .first<UserRow>()
    : null;
  return row ? json(200, { user: toPublicUser(row) }) : fail(401, { error: "Please log in." });
}

async function logout(request: Request, env: Env, url: URL): Promise<Response> {
  const token = sessionToken(request);
  if (token) await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(await hashToken(token)).run();
  return new Response(null, { status: 204, headers: { "Set-Cookie": cookie(url, "", 0), "Cache-Control": "no-store" } });
}

async function api(request: Request, env: Env, url: URL): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    const rejection = csrfRejection(request, url);
    if (rejection) return rejection;
  }
  const route = `${request.method} ${url.pathname}`;
  if (route === "POST /api/auth/signup") return signup(request, env, url);
  if (route === "POST /api/auth/login") return login(request, env, url);
  if (route === "POST /api/auth/logout") return logout(request, env, url);
  if (route === "GET /api/auth/me") return me(request, env);
  return fail(404, { error: "Not found." });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    try {
      return await api(request, env, url);
    } catch (err) {
      console.error(err);
      return fail(500, { error: "Something went wrong. Please try again." });
    }
  },
};
