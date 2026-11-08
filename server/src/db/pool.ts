import pg from "pg";
import type { Db, Queryable } from "./types.js";

function wrap(client: pg.Pool | pg.PoolClient): Queryable {
  return {
    async query<R>(text: string, params?: unknown[]) {
      const result = await client.query(text, params);
      return { rows: result.rows as R[] };
    },
    async exec(text: string) {
      await client.query(text);
    },
  };
}

/** Postgres connection pool for the running app. */
export function createPgDb(connectionString: string): Db {
  const pool = new pg.Pool({ connectionString, max: 10 });
  pool.on("error", (err) => console.error("Postgres pool error:", err));

  return {
    ...wrap(pool),
    async transaction(fn) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await fn(wrap(client));
        await client.query("COMMIT");
        return result;
      } catch (err) {
        await client.query("ROLLBACK").catch(() => {});
        throw err;
      } finally {
        client.release();
      }
    },
    close: () => pool.end(),
  };
}
