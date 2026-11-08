import { loadConfig } from "../config.js";
import { migrate } from "./migrate.js";
import { createPgDb } from "./pool.js";

const db = createPgDb(loadConfig().databaseUrl);
try {
  const applied = await migrate(db);
  console.log(applied.length ? `Applied: ${applied.join(", ")}` : "Database is up to date.");
} finally {
  await db.close();
}
