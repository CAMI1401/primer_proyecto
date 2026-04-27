// app/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const rol = useCookie('rol')
  const path = to.path.replace(/\/$/, '') || '/'
  const publicRoutes = ['/']

  if (!rol.value && !publicRoutes.includes(path)) {
    return navigateTo('/')
  }

  // 1. REGLAS BASE (Lo que antes tenías fijo)
  // Esto asegura que aunque la cookie esté vacía, haya seguridad mínima
  const reglasBase: Record<string, string> = {
    '/registrarus': 'jefe',
    '/editarus': 'secretaria',
    '/eliminarus': 'admin'
  }

  // 2. REGLAS DINÁMICAS (Lo que guardas en tu panel de permisos)
  const permisosCookie = useCookie<Record<string, string>>('tabla_permisos')
  
  // Combinamos: primero las base y luego las de la cookie (la cookie manda)
  const permisos = { ...reglasBase, ...(permisosCookie.value || {}) }

  // 👑 3. SUPERPODER DEL GERENTE
  // Si es gerente y NO va a la página de denegado, déjalo pasar a TODO
  if (rol.value === 'gerente') {
    if (path === '/denegado') return 
    return 
  }

  // 4. VERIFICACIÓN DE SEGURIDAD
  const rolRequerido = permisos[path]

  if (rolRequerido && rol.value !== rolRequerido) {
    // Si la ruta pide algo y tú no lo tienes, ¡A DENEGADO!
    return navigateTo(`/denegado?rol=${rolRequerido}`)
  }
})