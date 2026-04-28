//middleware/solojefe.ts
export default defineNuxtRouteMiddleware((to) => {
  const rol = useCookie('rol').value
  

  // El Admin y el Jefe pueden pasar
  if (rol !== 'admin' && rol !== 'jefe') {
    return navigateTo('/denegado?rol=jefe')
  }
})