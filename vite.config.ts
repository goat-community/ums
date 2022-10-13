import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://goat-dev.plan4better.de/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    react(),
    viteCompression({
      ext: ".br",
      algorithm: "brotliCompress",
    }),
  ],
  build: {
    sourcemap: false,
    target: "es2021",
    cssTarget: "chrome80",
    chunkSizeWarningLimit: 500,
  },
  resolve: {
    alias: [
      {
        find: "@types",
        replacement: path.resolve(__dirname, "src/types"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "src/styles"),
      },
      {
        find: "@context",
        replacement: path.resolve(__dirname, "src/context"),
      },
      {
        find: "@api",
        replacement: path.resolve(__dirname, "src/api"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
    ],
  },
});
