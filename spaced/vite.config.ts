import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [ tailwindcss(),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@routes': path.resolve(__dirname, './src/routes')
    },
  },
})