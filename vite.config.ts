import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on every network interface (IPv4 and IPv6), so http://localhost, http://127.0.0.1,
    // and a phone on the same Wi-Fi (http://<this computer's IP>:5173) can all open the app.
    host: true,
    // Always use port 5173, so the address you open in Safari (or bookmark on your phone) never changes.
    // If 5173 is busy, Vite stops with an error instead of quietly moving to 5174, 5175…
    port: 5173,
    strictPort: true,
    // Let a temporary Cloudflare link (npm run dev:share) reach the dev server.
    allowedHosts: [".trycloudflare.com"],
    // During development the API runs separately (npm run dev:api); forward /api to it.
    // changeOrigin: false keeps the browser's Host header, so the API can see the page and the
    // request share an address (needed when the app is opened by IP address).
    proxy: { "/api": { target: `http://localhost:${process.env.API_PORT ?? 3001}`, changeOrigin: false } },
  },
  preview: { host: true },
  test: {
    environment: "node",
  },
});
