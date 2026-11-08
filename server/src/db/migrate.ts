import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { Db } from "./types.js";

/** server/migrations, both from source (server/src/db) and from the build (dist-server/server/src/db). */
export const MIGRATIONS_DIR = fileURLToPath(new URL("../../migrations/", import.meta.url));

/** Arbitrary constant so only one server process runs migrations at a time. */
const LOCK_ID = 727_001;

/**
 * Applies any .sql files in `dir` that haven't run yet, in filename order, each in its own transaction.
 * Returns the names of the files it applied.
 */
export async function migrate(db: Db, dir: string = MIGRATIONS_DIR): Promise<string[]> {
  await db.exec(
    "CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())",
  );
  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
  const applied: string[] = [];

  for (const file of files) {
    const sql = await readFile(`${dir}/${file}`, "utf8");
    const ran = await db.transaction(async (tx) => {
      await tx.query("SELECT pg_advisory_xact_lock($1)", [LOCK_ID]);
      const { rows } = await tx.query("SELECT 1 FROM schema_migrations WHERE name = $1", [file]);
      if (rows.length) return false;
      await tx.exec(sql);
      await tx.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
      return true;
    });
    if (ran) applied.push(file);
  }
  return applied;
}
