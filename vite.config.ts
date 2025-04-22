
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
      // Handle embla-carousel version mismatches and warnings
      onwarn(warning, warn) {
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
          warning.message.includes('embla-carousel') ||
          warning.message.includes('Version mismatch') ||
          warning.message.includes('dependency conflict')
        ) {
          return;
        }
        warn(warning);
      },
      // Attempt to reduce chunk count
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          carousel: ['embla-carousel-react'],
        }
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
    // Handle dependency mismatches
    dedupe: ['react', 'react-dom', 'embla-carousel', 'embla-carousel-react', 'embla-carousel-autoplay']
  },
  optimizeDeps: {
    exclude: ['embla-carousel-autoplay'],
    // Force inclusion of dependencies that might be mismatched
    include: ['embla-carousel-react']
  },
  define: {
    // Add fallback for process.env to avoid errors
    'process.env': {}
  }
}));
