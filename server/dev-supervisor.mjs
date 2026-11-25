// Development-only runner for the API (used by `npm run dev:api`).
// Like `tsx watch`, it restarts the API when a file in server/ or shared/ changes.
// Unlike `tsx watch`, it also restarts the API a few seconds after it crashes,
// so the app keeps working without anyone having to save a file.
import { spawn } from "node:child_process";
import { watch } from "node:fs";

const ENTRY = "server/src/index.ts";
const WATCH_DIRS = ["server/src", "shared"];
const CRASH_RESTART_MS = 2000;

let child = null;
let stopping = false;
let restartTimer = null;

function start() {
  restartTimer = null;
  child = spawn(process.execPath, ["--import", "tsx", ENTRY], { stdio: "inherit" });
  child.on("exit", (code, signal) => {
    const wasRestart = child?.restarting;
    child = null;
    if (stopping) return process.exit(0);
    if (wasRestart) return start();
    console.error(`API stopped (${signal ?? `code ${code}`}). Restarting in ${CRASH_RESTART_MS / 1000}s…`);
    restartTimer = setTimeout(start, CRASH_RESTART_MS);
  });
}

function restart() {
  if (child) {
    child.restarting = true;
    child.kill("SIGTERM");
  } else if (!restartTimer) {
    start();
  }
}

let debounce = null;
for (const dir of WATCH_DIRS) {
  watch(dir, { recursive: true }, (_event, file) => {
    if (!file || /\.test\.ts$/.test(file)) return;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      console.log(`Change in ${dir}/${file}, restarting API…`);
      restart();
    }, 150);
  });
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    stopping = true;
    clearTimeout(restartTimer);
    if (child) child.kill(signal);
    else process.exit(0);
  });
}

start();
