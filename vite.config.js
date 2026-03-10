import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "src/renderer",
  base: "./",
  css: {
    postcss: {},
  },
  build: {
    outDir: "../../dist/renderer",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve("src/renderer/src"),
    },
  },
  server: {
    port: 5173,
  },
});