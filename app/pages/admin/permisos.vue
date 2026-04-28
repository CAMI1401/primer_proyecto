<template>
  <div class="container-permisos">
    <h1>🛡️ Panel de Control de Accesos</h1>
    <p>Configuración de permisos dinámicos del sistema</p>

    <div class="card-config">
      <div class="form-group">
        <label>Acción o Página a proteger:</label>
        <select v-model="form.ruta">
          <option value="/registrarus">Registrar Usuarios (Por defecto: Jefe)</option>
          <option value="/editarus">Editar Usuarios (Por defecto: Secretaria)</option>
          <option value="/eliminarus">Eliminar Usuarios (Por defecto: Encargado)</option>
        </select>
      </div>

      <div class="form-group">
        <label>Rol que recibirá el permiso:</label>
        <select v-model="form.rol">
          <option value="jefe">Jefe</option>
          <option value="secretaria">Secretaria</option>
          <option value="encargado">Encargado</option>
          <option value="pasante">Pasante</option>
        </select>
      </div>

      <button @click="guardarPermiso" class="btn-guardar">
        🚀 Actualizar Regla de Acceso
      </button>
    </div>

    <div class="card-lista" v-if="Object.keys(permisosActivos).length > 0">
      <h2>Reglas Personalizadas Actuales</h2>
      <table class="tabla-permisos">
        <thead>
          <tr>
            <th>Página / Acción</th>
            <th>Rol Autorizado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rol, ruta) in permisosActivos" :key="ruta">
            <td>
              <strong>{{ nombrePagina(ruta) }}</strong>
              <br>
              <small style="color: #999">{{ ruta }}</small>
            </td>
            <td>
              <span class="badge">{{ rol.toUpperCase() }}</span>
            </td>
            <td>
              <button @click="quitarPermiso(ruta)" class="btn-borrar">
                🗑️ Revocar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <button @click="resetearTodo" class="btn-reset">
        ⚠️ Restaurar todos los permisos originales
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'soloadmin'
})

import { ref, computed } from 'vue'

// 1. Estado del formulario
const form = ref({ 
  ruta: '', 
  rol: '' 
})

// 2. Conexión con la Cookie (Le decimos que es un objeto de textos)
const permisosCookie = useCookie<Record<string, string>>('tabla_permisos', { 
  watch: true, 
  default: () => ({}) 
})

// 3. Traductor de rutas (Añadimos el tipo Record para evitar errores)
const mapaNombres: Record<string, string> = {
  '/registrarus': 'Registro de Usuarios',
  '/editarus': 'Edición de Usuarios',
  '/eliminarus': 'Eliminación de Usuarios'
}

// 4. Especificamos que 'ruta' es un string
const nombrePagina = (ruta: string) => {
  return mapaNombres[ruta] || ruta
}

// 5. Propiedad computada
const permisosActivos = computed(() => permisosCookie.value || {})

// 6. Función para Guardar con validación
const guardarPermiso = () => {
  if (!form.value.ruta || !form.value.rol) {
    alert("Por favor selecciona una ruta y un rol.");
    return;
  }
  const actual = { ...permisosCookie.value }
  actual[form.value.ruta] = form.value.rol
  permisosCookie.value = actual
  alert(`Permiso actualizado para: ${nombrePagina(form.value.ruta)}`)
}

// 7. Función para borrar (especificamos string)
const quitarPermiso = (ruta: string) => {
  const actual = { ...permisosCookie.value }
  delete actual[ruta]
  permisosCookie.value = actual
  alert(`La página ${nombrePagina(ruta)} ha vuelto a su permiso original.`)
}

// 8. Limpieza total
const resetearTodo = () => {
  if(confirm("¿Estás seguro de que quieres borrar TODAS las reglas personalizadas?")) {
    permisosCookie.value = {} // En TS es mejor poner objeto vacío que null
  }
}
</script>

<style scoped>
@import "~/assets/css/permisos.css";
</style>