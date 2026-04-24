// composables/useAuth.ts
export const useAuth = () => {
  // Definimos la cookie del rol
  const rolActual = useCookie('rol', {
    maxAge: 60 * 60 * 24 * 365 * 10 // definimos el tiempo que se va dar a la cookie para que funcione enseg,min,horas,dias, años 10 años
  })

  //con esto iniciamos seccion 

  const login = async (rol: string) => {
    //aqui guardo lo que viene a ser mi rol
    rolActual.value = rol
    // Usamos el await para que nos mande directo a /registro la ruta exacta para evitar redirecciones fallidas
    return await navigateTo('/registro')
  }

  const logout = () => {
    rolActual.value = null
    return navigateTo('/')
  }

  return {
    rolActual,
    login,
    logout
  }
}