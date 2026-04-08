// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Mantenemos la fecha de compatibilidad y devtools
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page'},
    // // Removido 'mode: out-in' para evitar conflictos con los nodos raíz y garantizar la navegación fluida.
  },
  css: ['~/assets/css/index.css'],

  modules: ['nuxt-svgo']
})