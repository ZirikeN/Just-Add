import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
            external: [],
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('firebase')) {
                            return 'firebase'
                        }
                        if (id.includes('vue')) {
                            return 'vendor'
                        }
                        return 'common'
                    }
                },
            },
        },
    },
    optimizeDeps: {
        include: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
        exclude: ['firebase'], // Исключаем основной пакет
    },
    define: {
        global: 'globalThis',
        'process.env': {},
    },
    base: process.env.NODE_ENV === 'production' ? '/Just-Add/' : '/',
    server: {
        port: 3000,
        open: true,
    },
})
