import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // El SDK de Firestore pesa ~570 kB minificado; se aísla en su propio chunk.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Separa el SDK de Firebase en su propio chunk para aligerar el bundle principal.
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
})
