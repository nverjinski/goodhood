import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve("./src/assets"),
      "@components": path.resolve("./src/components"),
      "@constants": path.resolve("./src/constants"),
      "@contexts": path.resolve("./src/contexts"),
      "@datasets": path.resolve("./src/datasets"),
      "@hooks": path.resolve("./src/hooks"),
      "@maps": path.resolve("./src/maps"),
      "@store": path.resolve("./src/store"),
      "@styles": path.resolve("./src/styles"),
      "@utils": path.resolve("./src/utils"),
    },
  },
});
