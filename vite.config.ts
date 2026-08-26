import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    target: "es2022",
    cssMinify: "lightningcss",
    rollupOptions: {
      input: {
        main: "index.html",
        golf: "golf/index.html",
      },
    },
  },
});
