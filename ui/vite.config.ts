import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.join(process.cwd(), "../"));
  const API_URL = `${env.VITE_API_URL ?? "http://localhost:4200"}`;
  const PORT = `${env.VITE_PORT ?? "3000"}`;

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(PORT),
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
