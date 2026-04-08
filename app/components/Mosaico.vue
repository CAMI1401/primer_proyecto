<script setup>
// 🔥 AQUÍ controlas TODO desde Nuxt (no desde CSS)

// Lista de imágenes con su posición en el grid
const imagenes = [
  {
    src: "/img1.jpg",
    col: "1 / 2",   // columna 1
    row: "1 / 2"    // fila 1
  },
  {
    src: "/img2.jpg",
    col: "2 / 4",   // ocupa columna 2 y 3 (imagen grande derecha)
    row: "1 / 3"    // ocupa 2 filas (altura grande)
  },
  {
    src: "/img3.jpg",
    col: "1 / 2",   // abajo izquierda
    row: "2 / 3"
  },
  {
    src: "/img4.jpg",
    col: "2 / 3",   // abajo centro
    row: "3 / 4"
  }
]
</script>

<template>
  <!-- CONTENEDOR GRID -->
  <div class="mosaico">
    
    <!-- 🔁 Recorremos imágenes dinámicamente -->
    <div
      v-for="(img, i) in imagenes"
      :key="i"
      class="item"
      :style="{
        gridColumn: img.col, // posición horizontal
        gridRow: img.row     // posición vertical
      }"
    >
      <img :src="img.src" />
    </div>

  </div>
</template>

<style scoped>
/* ============================================================
   GRID PRINCIPAL
   ============================================================ */
.mosaico {
  display: grid;

  /* 3 columnas iguales */
  grid-template-columns: repeat(3, 1fr);

  /* altura automática en filas */
  grid-auto-rows: 200px;

  gap: 20px; /* espacio entre imágenes */
}


/* ============================================================
   ITEM CONTENEDOR
   ============================================================ */
.item {
  width: 100%;
  height: 100%;
}


/* ============================================================
   IMÁGENES
   ============================================================ */
.item img {
  width: 100%;
  height: 100%;

  object-fit: cover; /* evita deformación */
  border-radius: 15px;
}
</style>