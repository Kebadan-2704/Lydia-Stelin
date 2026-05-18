import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.svg', 'favicon-circle.svg'],
      manifest: {
        name: 'Lydia & Stelin Wedding Invitation',
        short_name: 'Lydia & Stelin',
        description: 'Progressive Web App Wedding Invitation for Lydia & Stelin\'s Holy Matrimony',
        theme_color: '#6B2D3E',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'favicon-circle.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'favicon-circle.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
})
