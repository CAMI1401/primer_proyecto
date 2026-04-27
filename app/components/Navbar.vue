
<script setup>
import { useAuth } from '~/composables/useAuth'

// Accedemos a la sesión
const auth = useAuth()
const rolActual = auth.rolActual

// Función para cerrar sesión
const cerrarSesion = () => {
  if (confirm('¿Quieres cerrar la sesión?')) {
    auth.logout()
  }
}
</script>

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
      <NuxtLink to="/bienvenida">Inicio</NuxtLink>
      <NuxtLink to="/registro">Registro</NuxtLink>
      <NuxtLink to="/contacto">Contacto</NuxtLink>
<NuxtLink 
        v-if="rolActual === 'gerente'" 
        to="/admin/permisos" 
        class="link-admin"
      >
        ⚙️ Permisos
      </NuxtLink>

        <div v-if="rolActual" class="user-section">
        <span class="badge-rol">{{ rolActual }}</span>
        <button class="btn-salir" @click="cerrarSesion">Salir</button>
        </div>
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
/* Sección que agrupa Rol y Botón */
.user-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 20px; /* Separa de los links normales */
  border-left: 1px solid #60a5fa; /* Una pequeña línea divisoria */
  padding-left: 20px;
}

/* Etiqueta del Rol */
.badge-rol {
  background: #1e3a8a; /* Azul oscuro */
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
}

/* Botón Salir */
.btn-salir {
  background: #ef4444; /* Rojo */
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn-salir:hover {
  background: #b91c1c;
}
/* Estilo especial para el link de Admin/Gerente */
.link-admin {
  color: #fbbf24 !important; /* Un color amarillo/dorado para que resalte del resto */
  border: 1px solid #fbbf24;
  padding: 5px 12px !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.link-admin:hover {
  background-color: #fbbf24 !important;
  color: #1e3a8a !important;
}
</style>