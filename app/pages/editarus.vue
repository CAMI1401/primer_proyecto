<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const auth = useAuth()
const route = useRoute() // Para leer el ID de la URL
const rolActual = auth.rolActual

const indexUsuario = ref(null)
const formulario = ref({
  ci: '', nombre: '', ap_paterno: '', ap_materno: '',
  edad: '', telefono: '', direccion: '', cargo: ''
})

onMounted(() => {
  // 1. Obtenemos el ID de la URL (ej: ?id=0)
  indexUsuario.value = route.query.id

  // 2. Cargamos la lista completa de LocalStorage
  const data = localStorage.getItem('usuarios')
  if (data && indexUsuario.value !== null) {
    const lista = JSON.parse(data)
    // 3. Llenamos el formulario con los datos del usuario específico
    formulario.value = { ...lista[indexUsuario.value] }
  }
})

const actualizar = () => {
  // 1. Limpiamos el rol para que no nos fallen las mayúsculas (GERENTE vs gerente)
  const miRol = String(rolActual.value || '').toLowerCase().trim();

  // 2. NUEVA LÓGICA: ¿Es gerente o es secretaria?
  if (miRol === 'gerente' || miRol === 'secretaria') {
    // ✅ SI TIENE PERMISO, PROCEDEMOS
    const data = localStorage.getItem('usuarios')
    if (data) {
      const lista = JSON.parse(data)
      lista[indexUsuario.value] = { ...formulario.value }
      localStorage.setItem('usuarios', JSON.stringify(lista))
      
      alert('¡Excelente! Registro actualizado correctamente.')
      return navigateTo('/registro')
    }
  } 
}

const cancelar = () => navigateTo('/registro')
</script>

<template>
  <div class="contenedor-editar">
    <h1>Editar Usuario</h1>
    <p>Editando registro número: {{ indexUsuario }}</p>

    <div class="formulario-card">
      <input v-model="formulario.ci" placeholder="Carnet" />
      <input v-model="formulario.nombre" placeholder="Nombre" />
      <input v-model="formulario.ap_paterno" placeholder="Apellido Paterno" />
      <input v-model="formulario.ap_materno" placeholder="Apellido Materno" />
      <input v-model="formulario.edad" placeholder="Edad" type="number" />
      <input v-model="formulario.telefono" placeholder="Teléfono" />
      <input v-model="formulario.direccion" placeholder="Dirección" />

      <select v-model="formulario.cargo">
        <option>Jefe</option>
        <option>Secretaria</option>
        <option>Pasante</option>
      </select>

      <div class="acciones">
        <button class="btn-actualizar" @click="actualizar">Guardar Cambios</button>
        <button class="btn-cancelar" @click="cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Puedes reutilizar el mismo estilo de registrarus.vue */
.contenedor-editar { padding: 20px; max-width: 500px; margin: auto; }
.formulario-card { display: flex; flex-direction: column; gap: 10px; background: #fffbe6; padding: 20px; border: 1px solid #ffe58f; border-radius: 8px; }
.btn-actualizar { background: #1890ff; color: white; padding: 10px; border: none; cursor: pointer; border-radius: 4px; }
.btn-cancelar { background: #8c8c8c; color: white; padding: 10px; border: none; cursor: pointer; border-radius: 4px; margin-top: 5px; }
</style>