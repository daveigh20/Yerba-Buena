import { describe, expect, it } from "vitest";
import { originAllowed } from "./csrf.js";

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
