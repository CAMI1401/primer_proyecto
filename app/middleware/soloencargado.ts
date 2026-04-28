export default defineNuxtRouteMiddleware((to) => {
    // 1. Obtenemos el valor de la cookie
    const rol = useCookie('rol').value


    // 2. Verificamos: Si NO es admin Y NO es encargado...
    if (rol !== 'admin' && rol !== 'encargado') {
        // 3. Redirigimos a la página de denegado corregida
        return navigateTo('/denegado?rol=encargado')
    }
    
})