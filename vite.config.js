import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 5252, // For local dev only
    open: true,
  },
  build: {
    outDir: "dist", // Ensure this matches Vercel's build output
  },
  plugins: [react()],
});
