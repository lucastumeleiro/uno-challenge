import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Router": path.resolve(__dirname, "./src/Router"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@Layout": path.resolve(__dirname, "./src/Layout"),
      "@Components": path.resolve(__dirname, "./src/Components"),
      "@Lib": path.resolve(__dirname, "./src/Lib"),
      "@Hooks": path.resolve(__dirname, "./src/Hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@uno/api": path.resolve(__dirname, "../api/src"),
    },
  },
});
