import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1024,
    proxy: {
      "/api": {
        target: "https://goat-dev.plan4better.de/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/local": {
        target: "https://dfvz2uuq63.execute-api.eu-central-1.amazonaws.com/Prod/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/local/, ""),
      },
    },
  },
  plugins: [
    react(),
    viteCompression({
      ext: ".br",
      algorithm: "brotliCompress",
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Map4Citizens",
        short_name: "Map4Citizens",
        description: "Map4Citizens",
        theme_color: "#fafafa",
        background_color: "#283648",
        icons: [
          {
            src: "src/images/pwa/android/android-launchericon-512-512.png",
            sizes: "512x512",
          },
          {
            src: "src/images/pwa/android/android-launchericon-192-192.png",
            sizes: "192x192",
          },
          {
            src: "src/images/pwa/android/android-launchericon-144-144.png",
            sizes: "144x144",
          },
          {
            src: "src/images/pwa/android/android-launchericon-96-96.png",
            sizes: "96x96",
          },
          {
            src: "src/images/pwa/android/android-launchericon-72-72.png",
            sizes: "72x72",
          },
          {
            src: "src/images/pwa/android/android-launchericon-48-48.png",
            sizes: "48x48",
          },
          {
            src: "src/images/pwa/ios/16.png",
            sizes: "16x16",
          },
          {
            src: "src/images/pwa/ios/20.png",
            sizes: "20x20",
          },
          {
            src: "src/images/pwa/ios/29.png",
            sizes: "29x29",
          },
          {
            src: "src/images/pwa/ios/32.png",
            sizes: "32x32",
          },
          {
            src: "src/images/pwa/ios/40.png",
            sizes: "40x40",
          },
          {
            src: "src/images/pwa/ios/50.png",
            sizes: "50x50",
          },
          {
            src: "src/images/pwa/ios/57.png",
            sizes: "57x57",
          },
          {
            src: "src/images/pwa/ios/58.png",
            sizes: "58x58",
          },
          {
            src: "src/images/pwa/ios/60.png",
            sizes: "60x60",
          },
          {
            src: "src/images/pwa/ios/64.png",
            sizes: "64x64",
          },
          {
            src: "src/images/pwa/ios/72.png",
            sizes: "72x72",
          },
          {
            src: "src/images/pwa/ios/76.png",
            sizes: "76x76",
          },
          {
            src: "src/images/pwa/ios/80.png",
            sizes: "80x80",
          },
          {
            src: "src/images/pwa/ios/87.png",
            sizes: "87x87",
          },
          {
            src: "src/images/pwa/ios/100.png",
            sizes: "100x100",
          },
          {
            src: "src/images/pwa/ios/114.png",
            sizes: "114x114",
          },
          {
            src: "src/images/pwa/ios/120.png",
            sizes: "120x120",
          },
          {
            src: "src/images/pwa/ios/128.png",
            sizes: "128x128",
          },
          {
            src: "src/images/pwa/ios/144.png",
            sizes: "144x144",
          },
          {
            src: "src/images/pwa/ios/152.png",
            sizes: "152x152",
          },
          {
            src: "src/images/pwa/ios/167.png",
            sizes: "167x167",
          },
          {
            src: "src/images/pwa/ios/180.png",
            sizes: "180x180",
          },
          {
            src: "src/images/pwa/ios/192.png",
            sizes: "192x192",
          },
          {
            src: "src/images/pwa/ios/256.png",
            sizes: "256x256",
          },
          {
            src: "src/images/pwa/ios/512.png",
            sizes: "512x512",
          },
          {
            src: "src/images/pwa/ios/1024.png",
            sizes: "1024x1024",
          },
        ],
      },
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
      {
        find: "@images",
        replacement: path.resolve(__dirname, "src/images"),
      },
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "src/layouts"),
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants"),
      },
      {
        find: "@i18n",
        replacement: path.resolve(__dirname, "src/i18n"),
      },
      {
        find: "@containers",
        replacement: path.resolve(__dirname, "src/containers"),
      },
    ],
  },
});
