import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
         'swiper/modules': 'swiper/modules/modules',
    },
  },
  optimizeDeps: {
    include: ['swiper','leaflet'],
  },
})
