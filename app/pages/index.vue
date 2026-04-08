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
           <img src="/reunion.jpg" data-aos="fade-up" data-aos-delay="300" class="img-mosaico img-2">
           <img src="/reunion.jpg" data-aos="zoom-in-right" data-aos-delay="600" class="img-mosaico img-3">
           <img src="/reunion.jpg" data-aos="fade-up-left" data-aos-delay="900" class="img-mosaico img-4">
        </div>
      </div>
      </div>
    </section>
     <!-- <img src="/reunion.jpg" alt="Reunión 1" class="img-mosaico img-1">
          <img src="/reunion.jpg" alt="Reunión 2" class="img-mosaico img-2">
          <img src="/reunion.jpg" alt="Reunión 3" class="img-mosaico img-3">
          <img src="/reunion.jpg" alt="Reunión 4" class="img-mosaico img-4"> -->

   <!-- CONTENER SOBRE LOS SERVCIOS QUE OFRECE-->
   <section class="contenido-servicios" >
  <h1>Nuestros Servicios</h1>
  <div class="contenedor-cards">
    
    <div class="card" v-motion="animacionCard" >
      <div class="icono">
        <img src="/servicio-al-cliente.png" alt="Atencion">
      </div>
      <h3>Atención al cliente</h3>
      <p>Control total de documentos y procesos internos.</p>
    </div>

    <div class="card" v-motion="animacionCard" >
      <div class="icono">
        <img src="/analitica.png" alt="Analisis">
      </div>
      <h3>Análisis y Balance</h3>
      <p>Visualización de datos en tiempo real.</p>
    </div>

    <div class="card" v-motion="animacionCard">
      <div class="icono">
        <img src="/technical-service.png" alt="Tecnico">
      </div>
      <h3>Servicio técnico</h3>
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
const animacionCard = {
  initial: { 
    opacity: 0, // La tarjeta empieza siendo totalmente invisible.
    y: 100,
    scale: 1 // Aseguramos que el punto de partida sea escala 1
  },
  visible: { 
    opacity: 1, 
    y: 0, // Sube suavemente hasta su posición final (0 desplazamiento).
    scale: 1, // Al aparecer, se mantiene en escala 1
    transition: { duration: 800 } // La animación de entrada dura 0.8 segundos (muy elegante).
  },
  hovered: { 
    scale: 1.05, 
    y: -15, // La tarjeta "flota" subiendo 15 píxeles.
    boxShadow: '0 20px 25px rgba(0,0,0,0.1)' 
  },
  // Fuerza a la tarjeta a volver cuando el mouse sale
  leave: {
    scale: 1,// Obliga a la tarjeta a encogerse de nuevo a su tamaño original 
    y: 0,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  tapped: { scale: 0.95 } // Se encoge un 5% (simula que la tarjeta se hunde al presionarla).
}
</script>