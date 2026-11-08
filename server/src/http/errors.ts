import type { NextFunction, Request, Response } from "express";

/** Last-resort error handler: client errors get a short message, everything else is logged and hidden. */
export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);
  const status = (err as { status?: unknown })?.status;
  if (typeof status === "number" && status >= 400 && status < 500) {
    const type = (err as { type?: string }).type;
    const message =
      type === "entity.parse.failed" ? "Invalid JSON." : type === "entity.too.large" ? "Request is too large." : "Bad request.";
    res.status(status).json({ error: message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong. Please try again." });
}
