import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // shadcn-style imports: "@/components/ui/card"
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    // three.js and Spline each lazy-load into their own ~1 MB chunk
    chunkSizeWarningLimit: 1600,
  },
})
