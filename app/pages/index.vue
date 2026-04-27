<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/aj_logo.png" alt="Logo" class="logo" />
      <h1>Bienvenida, Camila</h1>
      <p>Inicia sesión para gestionar el sistema</p>

      <div class="form">
        <input v-model="usuario" type="text" placeholder="Usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" @keyup.enter="entrar" />
        
        <button @click="entrar" class="btn-login">Entrar al Sistema</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 1. Importamos la lógica del cerebro
const auth = useAuth()

// 2. Creamos variables para lo que escribe el usuario
const usuario = ref('')
const password = ref('')

// 3. Función para el botón
const entrar = async () => {
  // Llamamos a la función login del cerebro pasándole usuario y pass
  await auth.login(usuario.value, password.value)
}
</script>

<style scoped>
/* Estilo rápido para que se vea bien */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  width: 350px;
}
.logo { width: 80px; margin-bottom: 1rem; }
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>