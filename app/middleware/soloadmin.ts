export default defineNuxtRouteMiddleware((to) => {
  const rol = useCookie('rol').value

  // 🛡️ BLOQUEO TOTAL: Si el usuario no es 'admin', 
  // no lo dejamos ver ni un segundo del panel de permisos.
  if (rol !== 'admin') {
    return navigateTo('/denegado?rol=admin')
  }
})