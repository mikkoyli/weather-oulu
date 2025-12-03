import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Tarvitaan jos haluat käyttää Viteä kontissa
    proxy: {
      "/api": {
        target: "http://backend:5001",
        changeOrigin: true,
      },
    },
  },
});
