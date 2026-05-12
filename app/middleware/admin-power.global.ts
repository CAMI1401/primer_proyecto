export default defineNuxtRouteMiddleware((to) => {
  const rol = useCookie('rol').value
  const path = to.path.replace(/\/$/, '') || '/'
  
  // 1. 🔓 ACTUALIZAMOS LAS RUTAS PÚBLICAS
  // Añadimos '/recuperar' para que el guardia deje pasar a cualquiera
  const publicRoutes = ['/', '/login', '/recuperar']

  // 2. 🛡️ BARRERA PARA DESCONOCIDOS
  if (!rol && !publicRoutes.includes(path)) {
    // Si no tiene rol y no es una ruta pública, lo mandamos al inicio
    return navigateTo('/')
  }

  // 3. 👑 SUPERPODER DEL ADMIN (Y OTROS ROLES)
  if (rol === 'admin') {
    if (path === '/login' || path === '/recuperar') {
      return navigateTo('/registro')
    }
    return 
  }
  
  // Nota: Si tienes otros roles como 'secretaria' o 'encargado', 
  // también deberías evitar que entren a /recuperar si ya están logueados.
})