import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'path'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { ViteEjsPlugin as ejs } from 'vite-plugin-ejs'
import minify from 'vite-plugin-minify'
import mp from 'vite-plugin-mp'
import { ejsConfig } from './ejs.config';

const Cookie  = 'doublec_session=eyJpdiI6InNqbUZQNXJkOXM3TlRCWng1Q1BiNXc9PSIsInZhbHVlIjoiYjFMMnd6QXUreStYdlNEeFZ5SGFhUnNvZ2t3S0pZcTlsYVlYMkh4Y1VaTWpqbE9qdjlOV3lCWk9GZml5VDJKZDhJUTBkVThFcUM5Ulk1UUVoRnVxSEQ1U1Evb21KZ080Ym1iU0FSbTdNRUViUGxxRVZkdzF6TFYvOWNaQnpCR2giLCJtYWMiOiJjMDQ3MWZiMzQ1YjgwMmM3MTNjOWEwMzAzNzgzZDEzZmQ4MWY3NzdmMmIxMjY3ZThhOWUwNWQ1YjIyOTg4MmVmIiwidGFnIjoiIn0%3D; path=/; secure; httponly; samesite=none';

const r = p => resolve(__dirname, p)

export default defineConfig({  
  base: process.env.NODE_ENV === 'production' ? '/左面应用/electron_demo/dist/' : '/',
  plugins: [
    autoImport({
      dts: r('auto-imports.d.ts'),
      imports: ['vue'],
    }),
    components({
      dirs: [r('src/common/components')],
      dts: r('components.d.ts'),
    }),
    vue(),
    mp(),
    ejs(ejsConfig),
    minify(),
  ],
  resolve: {
    dedupe: ['vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/admin': {
        target: 'https://doublec.intonecc.com',
        changeOrigin: true,
        headers: {
          Cookie: Cookie
        },
      },
      '/oss': {
          target: 'https://doublec.intonecc.com',
          changeOrigin: true,
          headers: {
              Cookie: Cookie
          },
      }
    },
  },
  build: {
    chunkSizeWarningLimit: 9999,
  },
})
