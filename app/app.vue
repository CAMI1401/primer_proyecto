<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
/* NUXT BUSCA ESTOS NOMBRES EXACTOS 
   porque en el config pusiste name: 'page' 
*/

/* 1. La velocidad del movimiento */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}

/* 2. El estado "invisible" (de donde viene y a donde va) */
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem); /* El efecto de desenfoque que querías */
  transform: translateY(6px); /* Un pequeño salto hacia arriba/abajo */
}


</style>