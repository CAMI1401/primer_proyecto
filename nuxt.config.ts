// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Mantenemos la fecha de compatibilidad y devtools
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page'},
    // // Removido 'mode: out-in' para evitar conflictos con los nodos raíz y garantizar la navegación fluida.
  },
  modules: [
    'nuxt-svgo', 
    '@vueuse/motion/nuxt' // 👈 Solo este debe estar aquí relacionado a motion
  ],
  css: ['~/assets/css/index.css'],

 
  

})