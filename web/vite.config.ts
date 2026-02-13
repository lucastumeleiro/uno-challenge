import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
    tailwindcss(),
  ],
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
      "@uno/api": path.resolve(__dirname, "../api/src"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
