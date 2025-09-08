import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve("./src/components"),
      "@assets": path.resolve("./src/assets"),
      "@contexts": path.resolve("./src/contexts"),
      "@datasets": path.resolve("./src/datasets"),
      "@utils": path.resolve("./src/utils"),
      "@maps": path.resolve("./src/maps"),
      "@styles": path.resolve("./src/styles"),
      "@constants": path.resolve("./src/constants"),
      "@hooks": path.resolve("./src/hooks"),
    },
  },
});
