<template>
  <div class="container-permisos">
    <h1>🛡️ Panel de Control de Accesos</h1>
    <p>Solo el Gerente puede modificar estas reglas.</p>

    <div class="card-config">
      <div class="form-group">
        <label>Ruta a proteger:</label>
        <select v-model="form.ruta">
          <option value="/registrarus">Registrar Usuarios</option>
          <option value="/editarus">Editar Usuarios</option>
          <option value="/eliminarus">Eliminar Usuarios</option>
          <option value="/dashboard">Dashboard de Ventas</option>
        </select>
      </div>

      <div class="form-group">
        <label>Rol Permitido:</label>
        <select v-model="form.rol">
          <option value="admin">Administrador</option>
          <option value="jefe">Jefe</option>
          <option value="secretaria">Secretaria</option>
          <option value="gerente">Gerente (Acceso Total)</option>
        </select>
      </div>

      <button @click="guardarPermiso" class="btn-guardar">
        Actualizar Regla de Acceso
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

// 1. SOLO UNA VARIABLE 'form'. 
// Este es el valor inicial que aparece al cargar la página.
const form = ref({ 
  ruta: '/editarus', // Puedes poner la que quieras por defecto
  rol: 'admin' 
})

// 2. La función para guardar en Cookies
const guardarPermiso = () => {
  // Configuramos la cookie con una duración de 30 días
  const permisosCookie = useCookie('tabla_permisos', {
    watch: true,
    maxAge: 60 * 60 * 24 * 30, // 30 días
    default: () => ({})
  })
  
  // Creamos una copia para no borrar lo que ya tenías guardado
  const actual = { ...permisosCookie.value }
  
  // Asignamos la ruta y el rol que elegiste en los select
  actual[form.value.ruta] = form.value.rol
  
  // Guardamos en la cookie
  permisosCookie.value = actual
  
  alert(`¡Guardado! Ahora para entrar a "${form.value.ruta}" se necesita ser: ${form.value.rol}`)
}
</script>

<style scoped>
/* Aquí puedes poner un CSS parecido al de tu login para que combine */
.container-permisos { padding: 2rem; max-width: 500px; margin: auto; }
.card-config { background: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
.btn-guardar { background: #4CAF50; color: white; border: none; padding: 10px; cursor: pointer; border-radius: 4px; }
</style>