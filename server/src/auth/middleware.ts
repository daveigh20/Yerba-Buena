import type { NextFunction, Request, Response } from "express";
import type { PublicUser } from "../../../shared/auth.js";
import type { Db } from "../db/types.js";
import { findSessionUser, SESSION_COOKIE } from "./sessions.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      /** The logged-in user, set by loadUser when the session cookie is valid. */
      user?: PublicUser;
    }
  }
}

export function sessionToken(req: Request): string | undefined {
  const token: unknown = req.cookies?.[SESSION_COOKIE];
  return typeof token === "string" && token ? token : undefined;
}

/** Looks up the session cookie and sets req.user. Clears the cookie if the session is gone or expired. */
export function loadUser(db: Db) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = sessionToken(req);
    if (token) {
      req.user = await findSessionUser(db, token);
      if (!req.user) res.clearCookie(SESSION_COOKIE, { path: "/" });
    }
    next();
  };
}

/** Use on routes that need a logged-in user. */
export function requireUser(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({ error: "Please log in." });
    return;
  }
  next();
}
