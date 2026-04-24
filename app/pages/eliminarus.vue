<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const auth = useAuth()
const route = useRoute()
const rolActual = auth.rolActual

const indexUsuario = ref(null)
const datosUsuario = ref(null)

onMounted(() => {
  // Capturamos el ID de la URL
  indexUsuario.value = route.query.id
  
  const data = localStorage.getItem('usuarios')
  if (data && indexUsuario.value !== null) {
    const lista = JSON.parse(data)
    // Guardamos los datos para mostrarlos en pantalla antes de borrar
    datosUsuario.value = lista[indexUsuario.value]
  }
})

const confirmarEliminacion = () => {
  // SEGURIDAD: Solo el ADMIN puede borrar (según tu lógica)
  if (rolActual.value !== 'admin') {
    alert('No tienes permisos de administrador para borrar')
    return navigateTo('/registro')
  }

  const data = localStorage.getItem('usuarios')
  if (data) {
    const lista = JSON.parse(data)
    // Borramos el elemento en esa posición
    lista.splice(indexUsuario.value, 1)
    // Guardamos la lista actualizada
    localStorage.setItem('usuarios', JSON.stringify(lista))
    // Regresamos a la tabla
    return navigateTo('/registro')
  }
}

const cancelar = () => navigateTo('/registro')
</script>

<template>
  <div class="contenedor-eliminar">
    <div class="card-alerta" v-if="datosUsuario">
      <h1>¿Eliminar Registro?</h1>
      <p class="advertencia">Esta acción no se puede deshacer.</p>
      
      <div class="info-usuario">
          <p><strong>CI:</strong> {{ datosUsuario.ci }}</p>
        <p><strong>Nombre:</strong> {{ datosUsuario.nombre }}</p>
     <p><strong>Ap. Paterno:</strong> {{ datosUsuario.ap_paterno }}</p>
      <p><strong>Ap. Materno:</strong> {{ datosUsuario.ap_materno }}</p>
       <p><strong>Edad:</strong> {{ datosUsuario.edad}}</p>
        <p><strong>Telefono:</strong> {{ datosUsuario.telefono}}</p>
         <p><strong>Dirección: </strong> {{ datosUsuario.direccion}}</p>
        <p><strong>Cargo:</strong> {{ datosUsuario.cargo }}</p>
        
      </div>

      <div class="acciones">
        <button class="btn-confirmar" @click="confirmarEliminacion">Sí, Eliminar permanentemente</button>
        <button class="btn-cancelar" @click="cancelar">No, Volver a la lista</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contenedor-eliminar { 
  display: flex; 
  justify-content: center; 
  padding: 50px; 
}
.card-alerta { 
  background: #fff5f5; 
  border: 2px solid #feb2b2; 
  padding: 30px; 
  border-radius: 12px; 
  text-align: center; 
  max-width: 400px;
}
.advertencia { color: #c53030; font-weight: bold; margin-bottom: 20px; }
.info-usuario { background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: left; }
.btn-confirmar { background: #e53e3e; color: white; padding: 12px; border: none; border-radius: 6px; cursor: pointer; width: 100%; font-weight: bold; }
.btn-cancelar { background: #718096; color: white; padding: 10px; border: none; border-radius: 6px; cursor: pointer; width: 100%; margin-top: 10px; }
</style>