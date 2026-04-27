// composables/useAuth.ts
export const useAuth = () => {
  // 1. Definimos la cookie del rol con duración de 10 años como tenías
  const rolActual = useCookie('rol', {
    maxAge: 60 * 60 * 24 * 365 * 10 
  })

  // 2. Lista de usuarios permitidos (Aquí es donde vive el Gerente)
  const usuariosValidos = [
    { user: 'secretaria', pass: '123', rol: 'secretaria' },
    { user: 'jefe', pass: '123', rol: 'jefe' },
    { user: 'admin', pass: '123', rol: 'admin' },
    { user: 'gerente', pass: '456', rol: 'gerente' } // El nuevo nivel
  ]

  // 3. Función de Login mejorada
  const login = async (usuario: string, password: string) => {
    // Buscamos si el usuario y contraseña existen en nuestra lista
    const encontrado = usuariosValidos.find(
      u => u.user === usuario && u.pass === password
    )

    if (encontrado) {
      // Si existe, guardamos su rol en la cookie
      rolActual.value = encontrado.rol
      // Y lo mandamos al registro
      return await navigateTo('/registro')
    } else {
      // Si los datos son falsos, avisamos
      alert('Usuario o contraseña incorrectos')
      return false
    }
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