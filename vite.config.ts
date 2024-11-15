import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 3000,
    host: true, // Allow external connections
  },
  preview: {
    port: 3000,
    host: true,
  }
});