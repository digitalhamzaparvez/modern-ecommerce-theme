import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: 'assets/scripts/main.ts',
        styles: 'assets/styles/main.css'
      },
      output: {
        assetFileNames: () => 'main.css',
        entryFileNames: () => 'main.js'
      }
    }
  }
})
