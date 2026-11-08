import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import type { Db } from "../db/types.js";
import { createTestDb, testConfig } from "../test/testDb.js";
import { SESSION_COOKIE } from "./sessions.js";

const ORIGIN = "http://localhost:5173";

const validSignup = {
  name: "Ana Flores",
  email: "Ana@Example.com",
  password: "mint-tea-2026",
  age: 29,
  weightKg: 61.5,
  heightCm: 165,
  goal: "Reduce stress",
  conditions: ["Asthma", "Migraines"],
};

let db: Db;
let app: ReturnType<typeof createApp>;

beforeAll(async () => {
  db = await createTestDb();
  app = createApp({ db, config: testConfig });
});
afterAll(() => db.close());

/** The session cookie from a response, ready to send back. */
function sessionCookie(res: request.Response): string {
  const cookies = ([] as string[]).concat(res.headers["set-cookie"] ?? []);
  const cookie = cookies.find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  if (!cookie) throw new Error("No session cookie set");
  return cookie.split(";")[0]!;
}

const post = (path: string) => request(app).post(path).set("Origin", ORIGIN);

describe("sign up", () => {
  it("creates the account, logs the user in, and never returns the password", async () => {
    const res = await post("/api/auth/signup").send(validSignup).expect(201);
    expect(res.body.user).toMatchObject({
      name: "Ana Flores",
      email: "ana@example.com",
      age: 29,
      weightKg: 61.5,
      heightCm: 165,
      goal: "Reduce stress",
      conditions: ["Asthma", "Migraines"],
    });
    expect(JSON.stringify(res.body)).not.toMatch(/password|mint-tea/i);

    const setCookie = String(res.headers["set-cookie"]);
    expect(setCookie).toMatch(/HttpOnly/);
    expect(setCookie).toMatch(/SameSite=Lax/);

    const me = await request(app).get("/api/auth/me").set("Cookie", sessionCookie(res)).expect(200);
    expect(me.body.user.email).toBe("ana@example.com");
  });

  it("stores a scrypt hash, not the password", async () => {
    const { rows } = await db.query<{ password_hash: string }>("SELECT password_hash FROM users WHERE email = $1", [
      "ana@example.com",
    ]);
    expect(rows[0]?.password_hash).toMatch(/^scrypt\$/);
  });

  it("rejects a duplicate email, ignoring case", async () => {
    const res = await post("/api/auth/signup").send({ ...validSignup, email: "ANA@example.com" }).expect(409);
    expect(res.body.fieldErrors.email).toMatch(/already exists/);
  });

  it("reports every invalid field", async () => {
    const res = await post("/api/auth/signup")
      .send({ name: "A", email: "nope", password: "short", age: 9, weightKg: "", heightCm: 500 })
      .expect(400);
    expect(Object.keys(res.body.fieldErrors).sort()).toEqual(["age", "email", "heightCm", "name", "password", "weightKg"]);
  });

  it("defaults the goal and removes duplicate conditions", async () => {
    const res = await post("/api/auth/signup")
      .send({ ...validSignup, email: "sam@example.com", goal: " ", conditions: ["Asthma", "Asthma"] })
      .expect(201);
    expect(res.body.user.goal).toBe("General wellbeing");
    expect(res.body.user.conditions).toEqual(["Asthma"]);
  });
});

describe("log in and out", () => {
  it("logs in with the right password (email is case-insensitive)", async () => {
    const res = await post("/api/auth/login").send({ email: " ANA@example.com ", password: validSignup.password }).expect(200);
    expect(res.body.user.name).toBe("Ana Flores");
    await request(app).get("/api/auth/me").set("Cookie", sessionCookie(res)).expect(200);
  });

  it("gives the same error for a wrong password and an unknown email", async () => {
    const wrong = await post("/api/auth/login").send({ email: "ana@example.com", password: "nope-nope" }).expect(401);
    const unknown = await post("/api/auth/login").send({ email: "who@example.com", password: "nope-nope" }).expect(401);
    expect(wrong.body).toEqual(unknown.body);
    expect(wrong.headers["set-cookie"]).toBeUndefined();
  });

  it("replaces an existing session on log-in", async () => {
    const first = sessionCookie(await post("/api/auth/login").send({ email: "ana@example.com", password: validSignup.password }));
    const second = sessionCookie(
      await post("/api/auth/login").set("Cookie", first).send({ email: "ana@example.com", password: validSignup.password }),
    );
    expect(second).not.toBe(first);
    await request(app).get("/api/auth/me").set("Cookie", first).expect(401);
    await request(app).get("/api/auth/me").set("Cookie", second).expect(200);
  });

  it("logs out by deleting the session", async () => {
    const cookie = sessionCookie(await post("/api/auth/login").send({ email: "ana@example.com", password: validSignup.password }));
    await post("/api/auth/logout").set("Cookie", cookie).expect(204);
    await request(app).get("/api/auth/me").set("Cookie", cookie).expect(401);
  });

  it("rejects expired sessions", async () => {
    const cookie = sessionCookie(await post("/api/auth/login").send({ email: "ana@example.com", password: validSignup.password }));
    await db.exec("UPDATE sessions SET expires_at = now() - interval '1 minute'");
    await request(app).get("/api/auth/me").set("Cookie", cookie).expect(401);
  });

  it("rejects made-up session tokens", async () => {
    await request(app).get("/api/auth/me").set("Cookie", `${SESSION_COOKIE}=forged`).expect(401);
    await request(app).get("/api/auth/me").expect(401);
  });
});

describe("request protection", () => {
  it("blocks state-changing requests from other sites", async () => {
    await request(app)
      .post("/api/auth/login")
      .set("Origin", "https://evil.example")
      .send({ email: "ana@example.com", password: validSignup.password })
      .expect(403);
  });

  it("only accepts JSON bodies", async () => {
    await post("/api/auth/login")
      .type("form")
      .send({ email: "ana@example.com", password: validSignup.password })
      .expect(415);
  });

  it("handles malformed JSON", async () => {
    const res = await post("/api/auth/login").set("Content-Type", "application/json").send("{oops").expect(400);
    expect(res.body.error).toBe("Invalid JSON.");
  });

  it("rate-limits log-in attempts", async () => {
    const limited = createApp({ db, config: { ...testConfig, authRateLimit: 2 } });
    const attempt = () =>
      request(limited).post("/api/auth/login").set("Origin", ORIGIN).send({ email: "x@example.com", password: "whatever" });
    await attempt().expect(401);
    await attempt().expect(401);
    await attempt().expect(429);
  });

  it("returns JSON 404s for unknown API routes", async () => {
    const res = await request(app).get("/api/nope").expect(404);
    expect(res.body.error).toBeDefined();
  });
});
