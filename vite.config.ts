import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    // During development the API runs separately (npm run dev:api); forward /api to it.
    proxy: { "/api": `http://localhost:${process.env.API_PORT ?? 3001}` },
  },
  test: {
    environment: "node",
  },
});
