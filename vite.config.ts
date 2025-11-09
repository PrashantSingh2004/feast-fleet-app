import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Lovable-specific plugin - optional for other IDEs
let componentTagger: any;
try {
  componentTagger = require("lovable-tagger").componentTagger;
} catch {
  // Plugin not available - that's okay for other IDEs
  componentTagger = null;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger ? componentTagger() : null
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
