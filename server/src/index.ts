import { createApp } from "./app.js";
import { loadConfig } from "./config.js";
import { migrate } from "./db/migrate.js";
import { createPgDb } from "./db/pool.js";

const config = loadConfig();
const db = createPgDb(config.databaseUrl);

try {
  const applied = await migrate(db);
  if (applied.length) console.log(`Applied migrations: ${applied.join(", ")}`);
} catch (err) {
  console.error(`Couldn't connect to or migrate the database at ${redact(config.databaseUrl)}.`);
  console.error("Is Postgres running, and does the database exist? See README.md.");
  console.error(err);
  process.exit(1);
}

const server = createApp({ db, config }).listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    server.close(() => void db.close().then(() => process.exit(0)));
  });
}

function redact(url: string): string {
  return url.replace(/\/\/([^:/@]+):[^@]+@/, "//$1:***@");
}
