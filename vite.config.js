// Import Vite's configuration function
import { defineConfig } from 'vite'
// Import the React plugin for Vite (enables JSX and React features)
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Export the Vite configuration object
export default defineConfig({
  // Array of plugins to use with Vite
  plugins: [react()], // Enable React support (JSX, Fast Refresh, etc.)
})
