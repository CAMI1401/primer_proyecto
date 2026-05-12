<script setup>
import { ref } from 'vue' // ¡No olvides importar ref!
import { useAuth } from '~/composables/useAuth'

const auth = useAuth()
const rolActual = auth.rolActual
const isMenuOpen = ref(false) // Controla el menú

const cerrarSesion = () => {
  if (confirm('¿Quieres cerrar la sesión?')) {
    auth.logout()
    isMenuOpen.value = false
  }
}
</script>

<template>
  <header class="nav">
    <div class="logo">
      <img src="/aj_logo.png" alt="logo" />
      <span>Proyecto de prueba</span>
    </div>

    <!-- BOTÓN PARA EL CELULAR -->
    <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
      {{ isMenuOpen ? '✕' : '☰' }}
    </button>

    <!-- MENÚ CON CLASE DINÁMICA -->
    <nav :class="{ 'nav-open': isMenuOpen }">
      <NuxtLink to="/index" @click="isMenuOpen = false">Inicio</NuxtLink>
      <NuxtLink to="/registro" @click="isMenuOpen = false">Registro</NuxtLink>
      <NuxtLink to="/contacto" @click="isMenuOpen = false">Contacto</NuxtLink>
      <NuxtLink to="/login" @click="isMenuOpen = false">Acceso</NuxtLink>

      <div v-if="rolActual" class="user-section">
        <span class="badge-rol">{{ rolActual }}</span>
        <button class="btn-salir" @click="cerrarSesion">Salir</button>
      </div>
    </nav>
  </header>
</template>
<style scoped>

@import "~/assets/css/navbar.css";

</style> 