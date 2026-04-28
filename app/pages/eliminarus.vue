<script setup>
definePageMeta({
  middleware: 'soloencargado'
})
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
  // 1. Obtenemos el rol limpio
  const miRol = String(rolActual.value || '').toLowerCase().trim();
  
  // 2. Traemos permisos de la cookie
  const permisosCookie = useCookie('tabla_permisos').value || {};
  const rolRequerido = permisosCookie['/eliminarus'] || 'encargado';

  // 3. Verificamos: ¿Es admin o el rol permitido?
  if (miRol === 'admin' || miRol === rolRequerido) {
    
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      const data = localStorage.getItem('usuarios');
      if (data && indexUsuario.value !== null) {
        let lista = JSON.parse(data);
        
        // 🛠️ CORRECCIÓN AQUÍ: Usamos indexUsuario.value
        lista.splice(indexUsuario.value, 1); 
        
        localStorage.setItem('usuarios', JSON.stringify(lista));
        
        alert('¡Registro eliminado con éxito!');
        
        // 🛠️ CORRECCIÓN AQUÍ: Volvemos a la lista en lugar de recargar
        return navigateTo('/registro');
      }
    }

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