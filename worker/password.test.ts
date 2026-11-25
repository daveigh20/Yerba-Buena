import { describe, expect, it } from "vitest";
import { hashPassword, verifyAgainstDummy, verifyPassword } from "./password";

describe("worker passwords", () => {
  it("accepts the right password and rejects a wrong one", async () => {
    const stored = await hashPassword("correct horse");
    expect(stored.startsWith("pbkdf2$100000$")).toBe(true);
    expect(await verifyPassword("correct horse", stored)).toBe(true);
    expect(await verifyPassword("wrong horse", stored)).toBe(false);
  });

  it("salts each hash", async () => {
    expect(await hashPassword("same")).not.toBe(await hashPassword("same"));
  });

  it("rejects a malformed stored value", async () => {
    expect(await verifyPassword("x", "not-a-hash")).toBe(false);
  });

  it("dummy check always fails", async () => {
    expect(await verifyAgainstDummy("x")).toBe(false);
  });
});
