
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "terser",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      // Attempt to handle embla-carousel version mismatches
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
            warning.message.includes('embla-carousel')) {
          return;
        }
        warn(warning);
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Attempt to handle dependency mismatches
    dedupe: ['react', 'react-dom', 'embla-carousel']
  },
  optimizeDeps: {
    exclude: ['embla-carousel-autoplay']
  }
}));
