import { createHash, randomBytes } from "node:crypto";
import type { CookieOptions } from "express";
import type { PublicUser } from "../../../shared/auth.js";
import type { Config } from "../config.js";
import type { Queryable } from "../db/types.js";
import { PUBLIC_COLUMNS, toPublicUser } from "./users.js";

export const SESSION_COOKIE = "yb_session";

/** Sessions are stored by token hash, so the database never holds a usable token. */
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export function sessionCookieOptions(config: Config): CookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: config.isProduction,
    path: "/",
    maxAge: config.sessionDays * 24 * 60 * 60 * 1000,
  };
}

export async function createSession(db: Queryable, userId: number, days: number): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  await db.query(
    "INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, now() + make_interval(days => $3))",
    [hashToken(token), userId, days],
  );
  // Housekeeping: clear out expired sessions now and then.
  await db.query("DELETE FROM sessions WHERE expires_at < now()");
  return token;
}

export async function findSessionUser(db: Queryable, token: string): Promise<PublicUser | undefined> {
  const columns = PUBLIC_COLUMNS.split(", ").map((c) => `u.${c}`).join(", ");
  const { rows } = await db.query<Parameters<typeof toPublicUser>[0]>(
    `SELECT ${columns} FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.id = $1 AND s.expires_at > now()`,
    [hashToken(token)],
  );
  return rows[0] && toPublicUser(rows[0]);
}

export async function deleteSession(db: Queryable, token: string): Promise<void> {
  await db.query("DELETE FROM sessions WHERE id = $1", [hashToken(token)]);
}
