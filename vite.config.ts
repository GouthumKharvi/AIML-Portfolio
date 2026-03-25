import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/AIML-Portfolio/",   // ✅ MUST BE THIS
  plugins: [react()],
});
