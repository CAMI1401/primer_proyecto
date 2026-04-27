```

---

### 2. Crear la nueva página `pages/registrarus.vue`

Ahora creamos este archivo. Aquí pondremos el formulario que antes estaba en el modal.

```vue
<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const auth = useAuth()
const rolActual = auth.rolActual

// Formulario reactivo
const formulario = ref({
  ci: '', nombre: '', ap_paterno: '', ap_materno: '',
  edad: '', telefono: '', direccion: '', cargo: ''
})

// Función para guardar
const guardarNuevo = () => {
  // 1. Limpiamos el rol para comparar sin errores
  const miRol = String(rolActual.value || '').toLowerCase().trim();

  // 2. 🛡️ FILTRO DE SEGURIDAD: Solo Jefe o Gerente pueden crear usuarios
  if (miRol !== 'gerente' && miRol !== 'jefe') {
   return navigateTo('/denegado?rol=jefe') // <--- EL REDIRECCIONAMIENTO
  }

  // 3. Si pasó el filtro (es jefe o gerente), procedemos:
  const datosExistentes = localStorage.getItem('usuarios')
  const lista = datosExistentes ? JSON.parse(datosExistentes) : []

  lista.push({ ...formulario.value })
  localStorage.setItem('usuarios', JSON.stringify(lista))

  alert('✅ Registro creado con éxito por el ' + miRol);
  return navigateTo('/registro')
}

const cancelar = () => {
  return navigateTo('/registro')
}
</script>

<template>
  <div class="contenedor-registro">
    <h1>Nuevo Registro de Usuario</h1>
    
    <div class="formulario-card">
      <input v-model="formulario.ci" placeholder="Carnet" />
      <input v-model="formulario.nombre" placeholder="Nombre" />
      <input v-model="formulario.ap_paterno" placeholder="Apellido Paterno" />
      <input v-model="formulario.ap_materno" placeholder="Apellido Materno" />
      <input v-model="formulario.edad" placeholder="Edad" type="number" />
      <input v-model="formulario.telefono" placeholder="Teléfono" />
      <input v-model="formulario.direccion" placeholder="Dirección" />

      <select v-model="formulario.cargo">
        <option value="">Seleccione cargo</option>
        <option>Jefe</option>
        <option>Secretaria</option>
        <option>Pasante</option>
      </select>

      <div class="acciones">
        <button class="btn-guardar" @click="guardarNuevo">Guardar Registro</button>
        <button class="btn-cancelar" @click="cancelar">Volver Atrás</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos rápidos para que se vea bien */
.contenedor-registro { padding: 20px; max-width: 500px; margin: auto; }
.formulario-card { display: flex; flex-direction: column; gap: 10px; background: #f9f9f9; padding: 20px; border-radius: 8px; }
input, select { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
.btn-guardar { background: #4caf50; color: white; padding: 10px; border: none; cursor: pointer; }
.btn-cancelar { background: #ff6b6b; color: white; padding: 10px; border: none; cursor: pointer; }
</style>