export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  runtimeConfig: {
    // 生产环境请通过环境变量 NUXT_AUTH_SECRET 覆盖
    authSecret: 'change-me-in-production',
  },
  vite: {
    optimizeDeps: { include: ['@vue/devtools-core'] },
  },
  nitro: {
    storage: {
      db: { driver: 'fs', base: './.data/db' },
    },
  },
})
