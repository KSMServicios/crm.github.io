import { defineConfig } from 'vite';

export default defineConfig({
  // Utilizar rutas relativas para que funcione correctamente tanto en dominio raíz como en subrutas de GitHub Pages
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Limpiar directorio de salida antes de compilar
    emptyOutDir: true,
  }
});
