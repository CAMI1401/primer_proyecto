// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 🚀 ESTA ES LA LÍNEA MÁGICA:
  srcDir: 'app/',

  // Mantenemos tu configuración de fecha
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page' },
  },

  modules: [
    'nuxt-svgo', 
    '@vueuse/motion/nuxt'
  ],

  // Al poner srcDir: 'app/', Nuxt buscará assets dentro de app/assets
  css: ['~/assets/css/index.css'],
})