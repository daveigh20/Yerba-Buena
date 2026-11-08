import type { NextFunction, Request, Response } from "express";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * CSRF protection for a cookie-authenticated JSON API:
 * 1. State-changing requests must be JSON. HTML forms can't send JSON, and cross-site fetches
 *    with a JSON body trigger a CORS preflight that this server never approves.
 * 2. If the browser says where the request came from (Origin / Sec-Fetch-Site), it must be us.
 * The session cookie is also SameSite=Lax, which stops it being sent on cross-site POSTs.
 */
export function csrfProtection(allowedOrigins: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (SAFE_METHODS.has(req.method)) return next();

    const origin = req.get("origin");
    if ((origin && !allowedOrigins.includes(origin)) || req.get("sec-fetch-site") === "cross-site") {
      res.status(403).json({ error: "Cross-site request blocked." });
      return;
    }
    const hasBody = req.headers["transfer-encoding"] !== undefined || Number(req.headers["content-length"] ?? 0) > 0;
    if (hasBody && !req.is("application/json")) {
      res.status(415).json({ error: "Requests must be sent as JSON." });
      return;
    }
    next();
  };
}
