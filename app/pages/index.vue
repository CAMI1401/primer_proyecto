<script setup>
import { ref } from 'vue' // Agrega esto siempre para evitar errores de 'ref not defined'

// Importamos manualmente ya que los auto-imports parecen no estar activos
import { useAuth } from '~/composables/useAuth'

import Swal from 'sweetalert2' // 👈 AGREGA ESTA LÍNEA

// Llamamos al composable justo aquí
const auth = useAuth()

const user = ref('')
const pass = ref('')

// Los usuarios permitidos
const usuariosValidos = [
  { user: 'secretaria', pass: '123', rol: 'secretaria' },
  { user: 'jefe', pass: '123', rol: 'jefe' },
  { user: 'admin', pass: '123', rol: 'admin' }
]

const entrar = async () => {
  const encontrado = usuariosValidos.find(u => u.user === user.value && u.pass === pass.value)
  
  if (encontrado) {
    // Usamos auth.login porque lo definimos arriba
    await auth.login(encontrado.rol)
  } else {
    // Usando SweetAlert2 como tenías planeado
    Swal.fire({
      icon: 'error',
      title: 'Acceso Denegado',
      text: 'Usuario o contraseña incorrectos',
      confirmButtonColor: '#ff6b6b'
    })
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="decor-circle circle-1"></div>
    <div class="decor-circle circle-2"></div>

    <div class="login-card">
      <div class="login-header">
        <h2 class="title">¡Bienvenida!</h2>
        <p class="subtitle">Ingresa tus datos para gestionar el catálogo</p>
      </div>

      <div class="form-group">
        <label>Usuario</label>
        <input v-model="user" type="text" class="custom-input" placeholder="Ej: camila_admin">
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input v-model="pass" type="password" class="custom-input" placeholder="••••••••">
      </div>

      <button @click="entrar" class="btn-login">
        Ingresar al Sistema
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal con gradiente suave */
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  position: relative;
  overflow: hidden;
}

/* Tarjeta con efecto Glassmorphism */
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  color: #4a4a4a;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #8e8e8e;
  font-size: 0.9rem;
}

/* Grupos de formulario */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Inputs personalizados */
.custom-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #eee;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
}

.custom-input:focus {
  border-color: #d1bfa7;
  box-shadow: 0 0 8px rgba(209, 191, 167, 0.3);
}

/* Botón elegante */
.btn-login {
  width: 100%;
  padding: 14px;
  background-color: #4a4a4a;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.btn-login:hover {
  background-color: #333;
  transform: translateY(-2px);
}

/* Decoración del fondo */
.decor-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  z-index: 1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: #f5e1da;
  top: -50px;
  right: -50px;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: #d4e2d4;
  bottom: -100px;
  left: -100px;
}
</style>