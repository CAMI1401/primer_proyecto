<script setup>
import { useRoute } from 'vue-router'
import {computed} from 'vue'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()


// Obtenemos el nombre del rol encargado desde la URL
// Ejemplo: /denegado?rol=administrador
// el query es el el que permite pasar los mensajes
const rolEncargado = computed(() => {
  return route.query.rol || 'el personal autorizado'
})

// Función para regresar a la tabla
const volver = () => {
  return navigateTo('/registro')
}
</script>

<template>
  <div class="contenedor-denegado">
    <div class="tarjeta-error">
      <div class="icono-bloqueo">🚫</div>
      
      <h1>Acceso Denegado</h1>
      
      <p class="mensaje">
        Lo sentimos, no tienes los permisos necesarios para acceder a esta sección.
      </p>
      
      <div class="instruccion">
        <p>Por favor, comuníquese con el <strong>{{ rolEncargado }}</strong> para realizar esta gestión.</p>
      </div>

      <button class="btn-volver" @click="volver">
        Volver a la Tabla de Registros
      </button>
    </div>
  </div>
</template>

<style scoped>
.contenedor-denegado {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-family: sans-serif;
}

.tarjeta-error {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 450px;
  border-top: 5px solid #ef4444; /* Rojo de advertencia */
}

.icono-bloqueo {
  font-size: 50px;
  margin-bottom: 20px;
}

h1 {
  color: #1f2937;
  margin-bottom: 10px;
}

.mensaje {
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.5;
}

.instruccion {
  background: #fee2e2;
  color: #b91c1c;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.btn-volver {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-volver:hover {
  background: #2563eb;
}
</style>