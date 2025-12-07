import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dnd')) return 'dnd';
            if (id.includes('html2canvas')) return 'html2canvas';
            return 'vendor';
          }
        }
      }
    }
  }
})
