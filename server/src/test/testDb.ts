import { PGlite } from "@electric-sql/pglite";
import type { Config } from "../config.js";
import { migrate } from "../db/migrate.js";
import type { Db, Queryable } from "../db/types.js";

type PGliteLike = Pick<PGlite, "query" | "exec">;

function wrap(pg: PGliteLike): Queryable {
  return {
    async query<R>(text: string, params?: unknown[]) {
      const result = await pg.query<R>(text, params as unknown[]);
      return { rows: result.rows };
    },
    async exec(text: string) {
      await pg.exec(text);
    },
  };
}

/** A fresh in-memory Postgres (PGlite) with migrations applied. */
export async function createTestDb(): Promise<Db> {
  const pg = new PGlite();
  const db: Db = {
    ...wrap(pg),
    transaction: (fn) => pg.transaction((tx) => fn(wrap(tx))),
    close: () => pg.close(),
  };
  await migrate(db);
  return db;
}

export const testConfig: Config = {
  port: 0,
  databaseUrl: "pglite://memory",
  isProduction: false,
  allowedOrigins: ["http://localhost:5173"],
  trustProxy: false,
  sessionDays: 30,
  authRateLimit: 1000,
};
