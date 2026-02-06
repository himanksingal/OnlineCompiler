import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // server: {
  //   proxy: {
  //     '/admin': {
  //       //target: 'http://127.0.0.1:3000',  // Your backend server port
  //       target: 'http://localhost:3000', // Fallback for different environments
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});

