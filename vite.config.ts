import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/scss/variables.scss" as *;
          @use "@/scss/reset.scss" as *;
          @use "@/scss/base.scss" as *;
        `,
      },
    },
  },
  envPrefix: "ENV_",
  resolve: {
    alias: {
      "@": path.resolve("./src/"),
    },
  },
});
