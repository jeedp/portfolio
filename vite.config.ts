import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this repo at /portfolio/. Vercel (and most other hosts) serve it at /.
const base = process.env.VERCEL ? '/' : process.env.BASE_PATH ?? '/portfolio/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
