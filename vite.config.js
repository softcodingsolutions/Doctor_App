import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 5252, 
    open: true,
  },
  build: {
    outDir: "dist", 
  },
  plugins: [react()],
});
