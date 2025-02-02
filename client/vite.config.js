import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {

    proxy: {

      '/api/login': {
        target: 'http:localhost:3000',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/auth, '/auth')

      }
    },
  },
  plugins: [
    react(),
    svgr({

      svgrOptions: {
        exportType: "default", ref: true, svgo: false, titleProp: true
      },
      include: "**/*.svg",
    }),
  ],
})
