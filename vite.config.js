import { defineConfig } from 'vite';

export default defineConfig({
  // Add custom configurations here
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
  },

});