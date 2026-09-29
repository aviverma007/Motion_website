import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const root = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // shadcn-style imports: "@/components/ui/card"
    alias: { '@': path.resolve(root, 'src') },
  },
  build: {
    // Spline / three.js lazy-load into their own ~1 MB chunks
    chunkSizeWarningLimit: 1600,
    // Multi-page build: the portfolio plus each demo site as its own page
    rolldownOptions: {
      input: {
        main: path.resolve(root, 'index.html'),
        pastel: path.resolve(root, 'demos/pastel/index.html'),
        estate: path.resolve(root, 'demos/estate/index.html'),
        dashboard: path.resolve(root, 'demos/dashboard/index.html'),
        studio: path.resolve(root, 'demos/studio/index.html'),
        scratch: path.resolve(root, 'demos/scratch/index.html'),
      },
    },
  },
})
