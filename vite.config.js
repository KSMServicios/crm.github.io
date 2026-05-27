import { defineConfig } from 'vite';

export default defineConfig({
  // Utilizar rutas relativas para compatibilidad total con GitHub Pages y Vercel
  base: './',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
  }
});
