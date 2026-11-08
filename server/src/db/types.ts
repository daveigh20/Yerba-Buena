/** The small slice of a Postgres client the app uses. Implemented by node-postgres in the app and PGlite in tests. */
export interface Queryable {
  query<R = Record<string, unknown>>(text: string, params?: unknown[]): Promise<{ rows: R[] }>;
  /** Runs one or more SQL statements without parameters (e.g. a migration file). */
  exec(text: string): Promise<void>;
}

export interface Db extends Queryable {
  /** Runs `fn` in a transaction: commits if it resolves, rolls back if it throws. */
  transaction<T>(fn: (tx: Queryable) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

/** Postgres error codes we handle. https://www.postgresql.org/docs/current/errcodes-appendix.html */
export const PG_UNIQUE_VIOLATION = "23505";

export function isPgError(err: unknown, code: string): boolean {
  return typeof err === "object" && err !== null && (err as { code?: unknown }).code === code;
}
