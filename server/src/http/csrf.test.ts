import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { csrfProtection, originAllowed } from "./csrf.js";

describe("originAllowed", () => {
  const dev = ["http://localhost:*", "http://127.0.0.1:*"];

  it("accepts any local port in development", () => {
    expect(originAllowed("http://localhost:5173", dev)).toBe(true);
    expect(originAllowed("http://localhost:5180", dev)).toBe(true);
    expect(originAllowed("http://127.0.0.1:5174", dev)).toBe(true);
  });

  it("rejects look-alike and remote origins", () => {
    expect(originAllowed("http://localhost:5173.evil.example", dev)).toBe(false);
    expect(originAllowed("http://localhost.evil.example:80", dev)).toBe(false);
    expect(originAllowed("https://evil.example", dev)).toBe(false);
  });

  it("matches exact origins exactly", () => {
    expect(originAllowed("https://yerbabuena.app", ["https://yerbabuena.app"])).toBe(true);
    expect(originAllowed("https://yerbabuena.app:8443", ["https://yerbabuena.app"])).toBe(false);
  });
});

describe("csrfProtection allowSameHost", () => {
  function appWith(allowSameHost: boolean) {
    const app = express();
    app.use(csrfProtection(["http://localhost:*"], { allowSameHost }));
    app.post("/", (_req, res) => {
      res.json({ ok: true });
    });
    return app;
  }

  it("accepts a page opened by Wi-Fi IP posting to the same address", async () => {
    await request(appWith(true))
      .post("/")
      .set("Host", "192.168.1.20:5173")
      .set("Origin", "http://192.168.1.20:5173")
      .expect(200);
  });

  it("accepts an https tunnel link forwarding to plain http", async () => {
    await request(appWith(true))
      .post("/")
      .set("Host", "calm-fern-1234.trycloudflare.com")
      .set("Origin", "https://calm-fern-1234.trycloudflare.com")
      .expect(200);
  });

  it("still rejects an origin that doesn't match the host", async () => {
    await request(appWith(true))
      .post("/")
      .set("Host", "192.168.1.20:5173")
      .set("Origin", "http://evil.example")
      .expect(403);
  });

  it("is off unless enabled", async () => {
    await request(appWith(false))
      .post("/")
      .set("Host", "192.168.1.20:5173")
      .set("Origin", "http://192.168.1.20:5173")
      .expect(403);
  });
});
