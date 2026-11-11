import { describe, expect, it } from "vitest";
import { basicSignupSchema, fieldErrorsFrom, loginSchema, signupSchema } from "../../shared/auth";
import { MESSAGES } from "./messages";

describe("Spanish error messages", () => {
  it("translates every sign-up and log-in validation message", () => {
    const bad = [
      signupSchema.safeParse({ name: "", email: "x", password: "1", age: "", weightKg: "abc", heightCm: 999 }),
      signupSchema.safeParse({ name: "a".repeat(101), email: "a@b.co", password: "x".repeat(201), age: 5, weightKg: 1, heightCm: 1, goal: "g".repeat(81) }),
      basicSignupSchema.safeParse({}),
      loginSchema.safeParse({ email: "", password: "" }),
    ];
    for (const result of bad) {
      expect(result.success).toBe(false);
      if (result.success) continue;
      for (const message of Object.values(fieldErrorsFrom(result.error))) {
        expect(MESSAGES.es.translateError(message), message).toBeTruthy();
      }
    }
  });

  it("agrees in gender", () => {
    expect(MESSAGES.es.translateError("Please enter a valid weight in kg (20–400).")).toBe(
      "Escribe un peso válido en kg (20–400).",
    );
    expect(MESSAGES.es.translateError("Please enter a valid age (13–110).")).toBe("Escribe una edad válida (13–110).");
  });
});
