/**
 * Sign-up and log-in rules shared by the React app (form validation) and the API server
 * (request validation), so both always agree.
 */
import { z } from "zod";

export const GOALS = [
  "General wellbeing",
  "Lose weight",
  "Build muscle",
  "Improve endurance",
  "Reduce stress",
  "Improve flexibility",
  "Sleep better",
] as const;

export const CONDITIONS = [
  "Asthma",
  "Diabetes",
  "High blood pressure",
  "Heart condition",
  "Joint or back problems",
  "Pregnancy",
] as const;

export const PASSWORD_MIN = 8;
/** Upper bound keeps password hashing cheap enough that huge inputs can't be used to tie up the server. */
export const PASSWORD_MAX = 200;

const email = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "Email is too long.")
  .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Please enter a valid email.");

/** Accepts numbers or numeric strings (form inputs), then checks the range. */
const numberInRange = (label: string, min: number, max: number, int = false) =>
  z.coerce
    .number({ invalid_type_error: `Please enter your ${label}.` })
    .refine((n) => Number.isFinite(n) && n >= min && n <= max && (!int || Number.isInteger(n)), {
      message: `Please enter a valid ${label} (${min}–${max}).`,
    });

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
  email,
  password: z
    .string()
    .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters.`)
    .max(PASSWORD_MAX, `Password must be at most ${PASSWORD_MAX} characters.`),
  age: numberInRange("age", 13, 110, true),
  weightKg: numberInRange("weight in kg", 20, 400),
  heightCm: numberInRange("height in cm", 80, 250),
  goal: z
    .string()
    .trim()
    .max(80, "Goal is too long.")
    .optional()
    .transform((g) => g || "General wellbeing"),
  conditions: z
    .array(z.string().trim().min(1).max(120, "Each condition must be at most 120 characters."))
    .max(12, "Please list at most 12 conditions.")
    .default([])
    .transform((list) => [...new Set(list)]),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, "Please enter your email."),
  password: z.string().min(1, "Please enter your password.").max(PASSWORD_MAX),
});

/** What a client may send. Numbers can come straight from form inputs as strings; the schema converts them. */
export type SignupInput = Omit<z.input<typeof signupSchema>, "age" | "weightKg" | "heightCm"> & {
  age: number | string;
  weightKg: number | string;
  heightCm: number | string;
};
export type SignupData = z.output<typeof signupSchema>;
export type LoginInput = z.input<typeof loginSchema>;

/** The user as the API returns it. Never includes the password hash. */
export interface PublicUser {
  id: number;
  name: string;
  email: string;
  age: number;
  weightKg: number;
  heightCm: number;
  goal: string;
  conditions: string[];
  createdAt: string;
}

/** Error body for 4xx responses. `fieldErrors` maps form fields to messages. */
export interface ApiError {
  error: string;
  fieldErrors?: Record<string, string>;
}

/** First error message per field, for showing next to form inputs. */
export function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
