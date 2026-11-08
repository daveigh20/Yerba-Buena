import { existsSync } from "node:fs";

export interface Config {
  port: number;
  databaseUrl: string;
  isProduction: boolean;
  /** Origins allowed to make state-changing requests (CSRF protection). */
  allowedOrigins: string[];
  /** Express "trust proxy" setting. Needed behind a load balancer so rate limiting sees real client IPs. */
  trustProxy: boolean | number | string;
  sessionDays: number;
  /** Max sign-up / log-in attempts per IP per 15 minutes. */
  authRateLimit: number;
  /** Folder with the built React app to serve, if any. */
  webDist?: string;
}

function intFrom(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

function trustProxyFrom(value: string | undefined): Config["trustProxy"] {
  if (!value || value === "false") return false;
  if (value === "true") return true;
  const n = Number(value);
  return Number.isInteger(n) ? n : value;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  if (env === process.env && existsSync(".env")) process.loadEnvFile(".env");

  const isProduction = env.NODE_ENV === "production";
  // API_PORT, so the API doesn't collide with tools that set PORT for the web dev server.
  // In production, hosting platforms usually assign PORT, so fall back to it there.
  const port = intFrom(env.API_PORT ?? (isProduction ? env.PORT : undefined), 3001);
  const origins = env.APP_ORIGIN?.split(",").map((o) => o.trim().replace(/\/$/, "")).filter(Boolean);
  if (isProduction && !origins?.length) {
    throw new Error("APP_ORIGIN must be set in production, e.g. APP_ORIGIN=https://yerbabuena.app");
  }
  if (isProduction && !env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set in production.");
  }

  return {
    port,
    databaseUrl: env.DATABASE_URL ?? "postgres://localhost:5432/yerba_buena",
    isProduction,
    allowedOrigins: origins ?? ["http://localhost:5173", `http://localhost:${port}`],
    trustProxy: trustProxyFrom(env.TRUST_PROXY),
    sessionDays: intFrom(env.SESSION_DAYS, 30),
    authRateLimit: intFrom(env.AUTH_RATE_LIMIT, 20),
    webDist: isProduction ? (env.WEB_DIST ?? "dist") : env.WEB_DIST,
  };
}
