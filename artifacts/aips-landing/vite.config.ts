import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// PORT only affects the dev server, and BASE_PATH is "/" for every deploy target we
// use. Hard-failing the config when they are absent broke `vite build` in any context
// that did not pre-set them (CI, a plain `pnpm build`, Vercel without the inline env).
// Default them instead, and keep validating values that ARE supplied.
const rawPort = process.env.PORT ?? "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

if (!basePath.startsWith("/")) {
  throw new Error(`Invalid BASE_PATH value: "${basePath}" (must start with "/")`);
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Split long-lived dependencies out of the app chunk so a content change does
    // not invalidate the whole download, and so the entry chunk stays small.
    // Route-level splitting is handled by React.lazy boundaries in RootApp/App.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "wouter"],
          query: ["@tanstack/react-query"],
          icons: ["lucide-react"],
          // Hoist framer-motion to one long-lived chunk instead of duplicating the
          // animation runtime across route chunks.
          motion: ["framer-motion"],
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
