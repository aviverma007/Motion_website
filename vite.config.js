import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // the three.js hero scene is lazy-loaded in its own ~1 MB chunk (≈265 kB gzipped)
    chunkSizeWarningLimit: 1100,
  },
})
