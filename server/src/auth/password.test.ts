import { describe, expect, it } from "vitest";
import { hashPassword, verifyAgainstDummy, verifyPassword } from "./password.js";

describe("password hashing", () => {
  it("verifies the right password and rejects the wrong one", async () => {
    const hash = await hashPassword("correct horse battery staple");
    expect(hash).toMatch(/^scrypt\$32768\$8\$3\$/);
    expect(await verifyPassword("correct horse battery staple", hash)).toBe(true);
    expect(await verifyPassword("Correct horse battery staple", hash)).toBe(false);
  });

  it("salts every hash", async () => {
    expect(await hashPassword("same password")).not.toBe(await hashPassword("same password"));
  });

  it("rejects malformed stored hashes instead of throwing", async () => {
    for (const bad of ["", "plain", "pbkdf2:sha256:600000$abc$def", "scrypt$x$8$1$c2FsdA==$a2V5"]) {
      expect(await verifyPassword("anything", bad)).toBe(false);
    }
  });

  it("always fails the dummy check", async () => {
    expect(await verifyAgainstDummy("anything")).toBe(false);
  });
});
