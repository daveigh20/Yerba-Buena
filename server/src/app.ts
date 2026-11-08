import { resolve } from "node:path";
import cookieParser from "cookie-parser";
import express from "express";
import { loadUser } from "./auth/middleware.js";
import { authRouter } from "./auth/routes.js";
import type { Config } from "./config.js";
import type { Db } from "./db/types.js";
import { csrfProtection } from "./http/csrf.js";
import { errorHandler } from "./http/errors.js";

export function createApp({ db, config }: { db: Db; config: Config }) {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", config.trustProxy);

  app.use((_req, res, next) => {
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Referrer-Policy", "same-origin");
    next();
  });

  const api = express.Router();
  api.use((_req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });
  api.use(express.json({ limit: "20kb" }));
  api.use(cookieParser());
  api.use(csrfProtection(config.allowedOrigins));
  api.use(loadUser(db));

  api.get("/health", async (_req, res) => {
    await db.query("SELECT 1");
    res.json({ ok: true });
  });
  api.use("/auth", authRouter(db, config));
  api.use((_req, res) => {
    res.status(404).json({ error: "Not found." });
  });
  app.use("/api", api);

  // In production, also serve the built React app, sending index.html for client-side routes.
  if (config.webDist) {
    const dist = resolve(config.webDist);
    app.use(express.static(dist, { index: false }));
    app.use((req, res, next) => {
      if (req.method === "GET" && req.accepts("html")) res.sendFile(resolve(dist, "index.html"));
      else next();
    });
  }

  app.use(errorHandler);
  return app;
}
