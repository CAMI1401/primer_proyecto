<script setup>

import { ref, onMounted } from 'vue'

// 📦 Lista de usuarios
const lista = ref([])

// 📋 Formulario
const formulario = ref({
  ci: '',
  nombre: '',
  ap_paterno: '',
  ap_materno: '',
  edad: '',
  telefono: '',
  direccion: '',
  cargo: ''
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
  mostrarModal.value = true
  editando.value = false
  limpiar()
}

// ❌ Cerrar modal
const cerrarModal = () => {
  mostrarModal.value = false
}

// 🧹 Limpiar formulario
const limpiar = () => {
  formulario.value = {
    ci: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    edad: '',
    telefono: '',
    direccion: '',
    cargo: ''
  }
}

// */ 💾 GUARDAR EN LOCALSTORAGE
//const guardarLocal = () => {
 // localStorage.setItem('usuarios', JSON.stringify(lista.value))
//}

// 💾 Guardar o actualizar
const guardar = () => {
  if (editando.value) {
    lista.value[indexEditar.value] = { ...formulario.value }
    editando.value = false
    indexEditar.value = null
  } else {
    lista.value.push({ ...formulario.value })
  }

  guardarLocal() // 🔥 Guardamos
  cerrarModal()
}

// ✏️ Editar
const editar = (index) => {
  formulario.value = { ...lista.value[index] }
  editando.value = true
  indexEditar.value = index
  mostrarModal.value = true
}

// 🗑️ Eliminar
const eliminar = (index) => {
  lista.value.splice(index, 1)
  guardarLocal() // 🔥 Guardamos cambios
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
</script>

<template>
  <div class="registro">

    <h1>Registro de Usuarios</h1>

    <!-- BOTONES -->
    <div  class="acciones">
      <button class="btn-registrar" @click="abrirModal">Registrar</button>
      <input v-model="busqueda" placeholder="Buscar por nombre" />
    </div>

    <!-- TABLA -->
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
            <button class="btn-editar"  @click="editar(index)">Editar</button>
            <button class="btn-eliminar"  @click="eliminar(index)">Eliminar</button>
          </td>

        </tr>
      </tbody>
    </table>

    <!-- MODAL -->
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

<!-- CSS EXTERNO -->
<style src="~/assets/css/registro.css"></style>