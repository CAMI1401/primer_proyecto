<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

// Intentemos llamar a useAuth de forma segura
const auth = useAuth()

const rolActual = auth.rolActual

// 📦 Lista de usuarios
const lista = ref([])

// 📋 Formulario
const formulario = ref({
  ci: '', nombre: '', ap_paterno: '', ap_materno: '',
  edad: '', telefono: '', direccion: '', cargo: ''
})

// 🎛️ Modal
const mostrarModal = ref(false)

// ✏️ Edición
const editando = ref(false)
const indexEditar = ref(null)

// 🔍 Buscador
const busqueda = ref('')

// 🔘 Abrir modal
const abrirModal = () => {
  return navigateTo('/registrarus')
  // mostrarModal.value = true
  // editando.value = false
  // limpiar()
}

// ❌ Cerrar modal
const cerrarModal = () => {
  mostrarModal.value = false
}

// 🧹 Limpiar formulario
const limpiar = () => {
  formulario.value = {
    ci: '', nombre: '', ap_paterno: '', ap_materno: '',
    edad: '', telefono: '', direccion: '', cargo: ''
  }
}

// 💾 Guardar en LocalStorage
const guardarLocal = () => {
  localStorage.setItem('usuarios', JSON.stringify(lista.value))
}

// 💾 Guardar o actualizar lo estamos manejando para que  guarde los datos y solo le aparesca a jefe
// pages/registro.vue
const guardar = () => {
  // 1. Convertimos lo que sea que venga en la cookie a minúsculas
  const miRol = String(rolActual.value || '').toLowerCase().trim();



  // 3. Si pasó el filtro, guardamos...
  if (editando.value) {
    lista.value[indexEditar.value] = { ...formulario.value };
    editando.value = false;
  } else {
    lista.value.push({ ...formulario.value });
  }

  guardarLocal();
  cerrarModal();
  alert('¡Cambios guardados!');
};

// Creamos una función aparte para no repetir código
const ejecutarGuardado = () => {
  if (editando.value) {
    lista.value[indexEditar.value] = { ...formulario.value }
    editando.value = false
  } else {
    lista.value.push({ ...formulario.value })
  }
  
  guardarLocal() 
  cerrarModal()
  alert('¡Datos guardados con éxito!')
}

// ✏️ Editar
const editar = (index) => {
return navigateTo({
    path: '/editarus',
    query: { id: index }
  })

  // formulario.value = { ...lista.value[index] }
  // editando.value = true
  // indexEditar.value = index
  // mostrarModal.value = true
}

// 🗑️ Eliminar
const eliminar = (index) => {
  // Mandamos el ID (índice) por la URL: /eliminarus?id=0
  return navigateTo({
    path: '/eliminarus',
    query: { id: index }
  })
  // lista.value.splice(index, 1)
  // guardarLocal() 
}

// 🔍 Filtrar
const listaFiltrada = () => {
  return lista.value.filter(item =>
    item.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
}

// 📥 CARGAR DATOS AL INICIAR
onMounted(() => {
  const data = localStorage.getItem('usuarios')
  if (data) {
    lista.value = JSON.parse(data)
  }
})

const guardarPermiso = () => {
  // 🟢 USAMOS COOKIES, NO LOCALSTORAGE
  const permisosCookie = useCookie('tabla_permisos', {
    watch: true,
    default: () => ({})
  })
  
  const actual = { ...permisosCookie.value }
  // form.value.ruta debe ser "/editarus" o "/eliminarus"
  actual[form.value.ruta] = form.value.rol
  
  permisosCookie.value = actual
  
  alert(`Regla guardada: ${form.value.ruta} ahora es para ${form.value.rol}`)
}
</script>
<template>
  <div class="registro">

    <h1>Registro de Usuarios</h1>
    <p v-if="rolActual">Conectado como: <strong>{{ rolActual }}</strong></p>

    <div class="acciones">
      <button 
      
        class="btn-registrar" 
        @click="abrirModal"
      >
        Registrar
      </button>
      
      <input v-model="busqueda" placeholder="Buscar por nombre" />
    </div>

    <table>
      <thead>
        <tr>
          <th>CI</th>
          <th>Nombre</th>
          <th>Ap. Paterno</th>
          <th>Ap. Materno</th>
          <th>Edad</th>
          <th>Teléfono</th>
          <th>Cargo</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in listaFiltrada()" :key="index">
          <td>{{ item.ci }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.ap_paterno}}</td>
          <td>{{ item.ap_materno }}</td>
          <td>{{ item.edad }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.cargo }}</td>
          <td>
  <button class="btn-editar" @click="editar(index)">
    Editar
  </button>

  <button class="btn-eliminar" @click="eliminar(index)">
    Eliminar
  </button>
</td>

        </tr>
      </tbody>
    </table>

    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <h2>{{ editando ? 'Editar' : 'Registrar' }}</h2>
        <input v-model="formulario.ci" placeholder="Carnet" />
        <input v-model="formulario.nombre" placeholder="Nombre" />
        <input v-model="formulario.ap_paterno" placeholder="Apellido Paterno" />
        <input v-model="formulario.ap_materno" placeholder="Apellido Materno" />
        <input v-model="formulario.edad" placeholder="Edad" />
        <input v-model="formulario.telefono" placeholder="Teléfono" />
        <input v-model="formulario.direccion" placeholder="Dirección" />

        <select v-model="formulario.cargo">
          <option value="">Seleccione cargo</option>
          <option>Jefe</option>
          <option>Secretaria</option>
          <option>Pasante</option>
        </select>

        <div class="modal-botones">
          <button class="btn-guardar" @click="guardar">Guardar</button>
          <button class="btn-cancelar" @click="cerrarModal">Cancelar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style src="~/assets/css/registro.css"></style>