<template>
  <div>
    <!-- IMPORTAMOS EL NAVBAR (se verá en todas las páginas) -->
    <Navbar />

    <!-- AQUÍ SE CARGAN LAS PÁGINAS -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// IMPORTAMOS EL COMPONENTE NAVBAR
import Navbar from '~/components/Navbar.vue'
</script>