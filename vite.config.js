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
    build: {
        chunkSizeWarningLimit: 9999,
    },
})
