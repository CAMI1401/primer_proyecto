//middleware/solosecretaria.ts
export default defineNuxtRouteMiddleware((to) => {
  const rol = useCookie('rol').value
  
  // El Admin y la Secretaria pueden pasar
  if (rol !== 'admin' && rol !== 'secretaria') {
    return navigateTo('/denegado?rol=secretaria')
  }
})