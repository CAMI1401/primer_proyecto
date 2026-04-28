export default defineNuxtRouteMiddleware((to) => {
  const rol = useCookie('rol').value
  // Limpiamos la ruta para evitar errores por una "/" al final
  const path = to.path.replace(/\/$/, '') || '/'
  const publicRoutes = ['/']

  // 1. 🛡️ BARRERA DE SEGURIDAD PARA DESCONOCIDOS
  // Si no tiene rol y la página no es pública (el login), lo mandamos al inicio
  if (!rol && !publicRoutes.includes(path)) {
    return navigateTo('/')
  }

  // 2. 👑 SUPERPODER DEL ADMIN
  // Si es admin, "limpiamos" el camino. Al hacer 'return', Nuxt ignora 
  // los middlewares específicos (solojefe, etc.) de las páginas.
  if (rol === 'admin') {
    if (path === '/denegado') return 
    return 
  }
})