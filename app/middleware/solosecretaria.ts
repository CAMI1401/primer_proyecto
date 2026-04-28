export default defineNuxtRouteMiddleware((to) => {
  const rol = useCookie('rol').value
  // 👑 CORRECCIÓN: Si es admin, terminamos el middleware aquí mismo
  if (rol === 'admin') return
  
  const path = to.path.replace(/\/$/, '') || '/'
  
  // 1. Leemos la cookie de permisos dinámicos que guarda tu panel
  const permisosCookie = useCookie<Record<string, string>>('tabla_permisos').value || {}
  
  // 2. Buscamos si el Admin cambió el permiso para esta ruta específica
  // Si no hay nada en la cookie, usamos el valor por defecto: 'secretaria'
  const rolRequerido = permisosCookie[path] || 'secretaria'

  // 3. Verificamos (El Admin ya pasó por el global, así que aquí solo filtramos al resto)
  if (rol !== rolRequerido) {
    return navigateTo(`/denegado?rol=${rolRequerido}`)
  }
})