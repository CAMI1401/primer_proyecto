<template>
  <!-- CONTENEDOR PRINCIPAL -->
  <div class="inicio">
    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenida</h1>
        <p>Sistema principal de prácticas</p>
        <NuxtLink to="/registro" class="btn-comenzar">
          Empezar ahora
        </NuxtLink>
      </div>
    </section>
    <!-- CONTENEDOR sobre nosotros-->
    <section class="sobre-nosotros">
      <div class="fila-layout">  <!-- que va a la izquierda y que va a la derecha-->
       <div class="columna-texto">
        <h1>Sobre Nosotros</h1>
        <p class="texto-descripcion">
          Aquí va tu texto informativo. Puedes hablar de la trayectoria de la empresa, 
          sus valores o el propósito de este sistema de prácticas. 
        </p>
      </div>

    <div class="columna-mosaico">
        <div class="grid-mosaico">
           <img src="/reunion.jpg" data-aos="flip-left" class="img-mosaico img-1">
           <img src="/reunion.jpg" data-aos="fade-up" data-aos-delay="200" class="img-mosaico img-2">
           <img src="/reunion.jpg" data-aos="zoom-in-right" data-aos-delay="400" class="img-mosaico img-3">
           <img src="/reunion.jpg" data-aos="fade-up-left" data-aos-delay="600" class="img-mosaico img-4">
        </div>
      </div>
      </div>
    </section>
     <!-- <img src="/reunion.jpg" alt="Reunión 1" class="img-mosaico img-1">
          <img src="/reunion.jpg" alt="Reunión 2" class="img-mosaico img-2">
          <img src="/reunion.jpg" alt="Reunión 3" class="img-mosaico img-3">
          <img src="/reunion.jpg" alt="Reunión 4" class="img-mosaico img-4"> -->

    <section class="contenido-extra">
      <h2>Nuestros Servicios</h2>
      <div class="contenedor-cards">
        <div class="card">
          <div class="icono">📁</div>
          <h3>Gestión</h3>
          <p>Control total de documentos y procesos internos.</p>
        </div>
        <div class="card">
          <div class="icono">📊</div>
          <h3>Reportes</h3>
          <p>Visualización de datos en tiempo real.</p>
        </div>
        <div class="card">
          <div class="icono">👥</div>
          <h3>Usuarios</h3>
          <p>Administración eficiente de todo el personal.</p>
        </div>
      </div>
    </section>
  </div>
</template>


<!-- IMPORTAMOS EL CSS EXTERNO -->
<style src="~/assets/css/index.css"></style>
<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted } from 'vue'

onMounted(() => {
  AOS.init({
    // Configuraciones opcionales:
    duration: 1000, // Qué tan lento se mueve (1000 = 1 segundo)
    once: false,    // Si quieres que se repita la animación cada vez que subas y bajes
    mirror: true,   // Animación al hacer scroll hacia arriba también
  })
})
</script>