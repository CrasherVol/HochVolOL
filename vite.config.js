// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // oder '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
