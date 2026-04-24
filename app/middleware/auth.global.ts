export default defineNuxtRouteMiddleware((to, from) => {
  // Obtenemos la cookie del rol 
  const rol = useCookie('rol')

  // 1. Definimos las rutas que son públicas (no requieren login)
  // Agregamos '/' (login) como pública por defecto. aqui estra cualquiera al login
  const publicRoutes = ['/']

  //ESTAMOS PODIENDO ESTO SI NO FUNIONA BORRA
const permisos: Record<string, string> = {
  '/registrarus': 'jefe',
    '/editarus': 'secretaria',
    '/eliminarus': 'admin'
}
  //BORRA

  // Si quieres que 'registro' sea pública para que cualquiera entre, descomenta la línea de abajo:
  // publicRoutes.push('/registro')

  // 2. Normalizamos la ruta de destino (quitando barras finales si las hay)
  const path = to.path.replace(/\/$/, '') || '/'

  // 3. LÓGICA DE PROTECCIÓN
  // Si NO hay rol y la ruta NO está en la lista de públicas -> Mandar al login
  if (!rol.value && !publicRoutes.includes(path)) {
    return navigateTo('/')
  }

  // 4. LÓGICA DE REDIRECCIÓN (Evitar que un logueado vea el login)
  // Si SÍ hay rol e intenta ir al login ('/') -> Mandar al panel principal (registro)
  if (rol.value && path === '/') {
    return navigateTo('/registro')
  }

  //si no funciona borra
if(permisos[path]){
   const rolRequerido = permisos[path]

   if (rol.value !==rolRequerido) {
    return navigateTo(`/denegado?rol=${rolRequerido}`)
   }
}

  //si no funciona borra

})
