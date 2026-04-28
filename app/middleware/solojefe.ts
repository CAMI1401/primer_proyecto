export default defineNuxtRouteMiddleware((to) => {
  const rol = useCookie('rol').value
// 👑 CORRECCIÓN: Si es admin, terminamos el middleware aquí mismo
  if (rol === 'admin') return

  const path = to.path.replace(/\/$/, '') || '/'
  
  const permisosCookie = useCookie<Record<string, string>>('tabla_permisos').value || {}
  
  // Si el Admin no ha dicho lo contrario, el rol por defecto es 'jefe'
  const rolRequerido = permisosCookie[path] || 'jefe'

  if (rol !== rolRequerido) {
    return navigateTo(`/denegado?rol=${rolRequerido}`)
  }
})