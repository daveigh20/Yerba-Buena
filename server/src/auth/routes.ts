import { Router, type Response } from "express";
import rateLimit from "express-rate-limit";
import { type ApiError, fieldErrorsFrom, loginSchema, signupSchema } from "../../../shared/auth.js";
import type { Config } from "../config.js";
import type { Db } from "../db/types.js";
import { requireUser, sessionToken } from "./middleware.js";
import { hashPassword, verifyAgainstDummy, verifyPassword } from "./password.js";
import { createSession, deleteSession, SESSION_COOKIE, sessionCookieOptions } from "./sessions.js";
import { createUser, EmailTakenError, findUserForLogin, toPublicUser } from "./users.js";

const sendError = (res: Response, status: number, body: ApiError) => res.status(status).json(body);

export function authRouter(db: Db, config: Config): Router {
  const router = Router();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: config.authRateLimit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many attempts. Please wait a few minutes and try again." } satisfies ApiError,
  });

  async function startSession(res: Response, userId: number, oldToken: string | undefined) {
    // Always issue a fresh token on sign-up/log-in so an old (possibly planted) one can't be reused.
    if (oldToken) await deleteSession(db, oldToken);
    const token = await createSession(db, userId, config.sessionDays);
    res.cookie(SESSION_COOKIE, token, sessionCookieOptions(config));
  }

  router.post("/signup", limiter, async (req, res) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFrom(parsed.error) });
    }
    try {
      const user = await createUser(db, parsed.data, await hashPassword(parsed.data.password));
      await startSession(res, user.id, sessionToken(req));
      return res.status(201).json({ user });
    } catch (err) {
      if (err instanceof EmailTakenError) {
        return sendError(res, 409, { error: err.message, fieldErrors: { email: err.message } });
      }
      throw err;
    }
  });

  router.post("/login", limiter, async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, { error: "Please enter your email and password.", fieldErrors: fieldErrorsFrom(parsed.error) });
    }
    const { email, password } = parsed.data;
    const row = await findUserForLogin(db, email);
    const ok = row ? await verifyPassword(password, row.password_hash) : await verifyAgainstDummy(password);
    if (!row || !ok) return sendError(res, 401, { error: "Incorrect email or password." });

    await startSession(res, row.id, sessionToken(req));
    return res.json({ user: toPublicUser(row) });
  });

  router.post("/logout", async (req, res) => {
    const token = sessionToken(req);
    if (token) await deleteSession(db, token);
    res.clearCookie(SESSION_COOKIE, { path: "/" });
    res.status(204).end();
  });

  router.get("/me", requireUser, (req, res) => {
    res.json({ user: req.user });
  });

  return router;
}
