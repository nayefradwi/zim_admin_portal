import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    target: "esnext",
  },
  preview: {
    port: process.env.PORT || 5173,
    host: process.env.HOST || "localhost",
  },
});
