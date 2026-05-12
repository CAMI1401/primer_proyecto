<template>
  <div class="inicio">
    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenida</h1>
        <p>Sistema principal de prácticas - Importaciones Asia</p>
        <button @click="manejarAcceso" class="btn-comenzar">
          {{ cookieRol ? 'Ir al Panel' : 'Empezar ahora' }}
        </button>
      </div>
    </section>

    <section class="sobre-nosotros">
      </section>
  </div>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted } from 'vue'

const cookieRol = useCookie('rol') // Revisamos si ya hay sesión

const manejarAcceso = () => {
  if (cookieRol.value) {
    return navigateTo('/registro') // Si ya eres personal, entras directo
  } else {
    return navigateTo('/login') // Si eres nueva o tu amiga, van al login
  }
}

onMounted(() => {
  AOS.init({ duration: 1000 })
})

const animacionCard = { /* ... tu código de animaciones que ya tienes ... */ }
</script>

<style src="~/assets/css/index.css"></style>

