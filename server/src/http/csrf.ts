import type { NextFunction, Request, Response } from "express";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * CSRF protection for a cookie-authenticated JSON API:
 * 1. State-changing requests must be JSON. HTML forms can't send JSON, and cross-site fetches
 *    with a JSON body trigger a CORS preflight that this server never approves.
 * 2. If the browser says where the request came from (Origin / Sec-Fetch-Site), it must be us.
 * The session cookie is also SameSite=Lax, which stops it being sent on cross-site POSTs.
 */
/** An allowed origin may end in ":*" to match any port, e.g. "http://localhost:*". */
export function originAllowed(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.some((allowed) => {
    if (!allowed.endsWith(":*")) return allowed === origin;
    const prefix = allowed.slice(0, -1); // "http://localhost:"
    return origin.startsWith(prefix) && /^\d+$/.test(origin.slice(prefix.length));
  });
}

/**
 * `allowSameHost` also accepts an Origin whose host equals the Host the request was sent to (development
 * only: the page and API share one address through Vite's proxy, which may be a Wi-Fi IP like
 * 192.168.1.20 or a temporary https://….trycloudflare.com link). Only the host is compared, because a
 * tunnel serves https to the browser but forwards plain http to us.
 */
function sameHost(origin: string, host: string | undefined): boolean {
  try {
    return host !== undefined && new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function csrfProtection(allowedOrigins: string[], { allowSameHost = false } = {}) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (SAFE_METHODS.has(req.method)) return next();

    const origin = req.get("origin");
    const originOk =
      !origin || (allowSameHost && sameHost(origin, req.get("host"))) || originAllowed(origin, allowedOrigins);
    if (!originOk || req.get("sec-fetch-site") === "cross-site") {
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
