<template>
  <!-- HEADER principal (barra superior) -->
  <header class="nav">

    <!-- LOGO + NOMBRE -->
    <div class="logo">
      <!-- Imagen del logo (va en carpeta public) -->
      <img src="/aj_logo.png" alt="logo" />
      <!-- Nombre del sistema -->
      <span>Proyecto de prueba</span>
    </div>

    <!-- MENÚ DE NAVEGACIÓN -->
    <nav>
      <!-- NuxtLink sirve para cambiar de página sin recargar -->
      <NuxtLink to="/">Inicio</NuxtLink>
      <NuxtLink to="/registro">Registro</NuxtLink>
      <NuxtLink to="/contacto">Contacto</NuxtLink>
    </nav>

  </header>
</template>

<style scoped>
/* CONTENEDOR DEL NAVBAR */
.nav {
  display: flex; /* pone todo en fila */
  justify-content: space-between; /* separa logo y menú */
  align-items: center; /* centra verticalmente */
  background: #3B82F6; /* azul principal */
  padding: 15px 30px;
  color: white;
}


/* CONTENEDOR DEL LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 10px; /* espacio entre imagen y texto */
}

/* TAMAÑO DEL LOGO */
.logo img {
  width: 40px;
}

/* MENÚ */
nav {
  display: flex;
  gap: 20px; /* espacio entre links */
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;    /* Espacio interno para que el cambio de color se vea mejor */
  border-radius: 4px;   /* Bordes redondeados */
  transition: 0.3s;     /* Hace que el cambio de color sea suave */
}

/* Efecto cuando pasas el ratón por un link específico */
nav a:hover {
  background-color:#366dc5; /* Fondo verde solo para el link señalado */
  color: #ffffff;            /* Color de la letra */
}


/* LINKS */
a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>