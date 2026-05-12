<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/aj_logo.png" alt="Logo" class="logo" />
      <h1>Acceso Personal</h1>
      <p v-if="!bloqueado">Inicia sesión para gestionar el sistema</p>
      
      <!-- Mensaje de bloqueo -->
      <div v-else class="error-message">
        <p><strong>Cuenta bloqueada temporalmente</strong></p>
        <p>Has superado los 3 intentos permitidos.</p>
      </div>

      <div class="form">
        <input v-model="usuario" type="text" placeholder="Usuario" :disabled="bloqueado" />
        
        <div class="password-wrapper">
          <input 
            v-model="password" 
            :type="mostrarPassword ? 'text' : 'password'" 
            placeholder="Contraseña" 
            @keyup.enter="entrar"
            :disabled="bloqueado"
          />
          <span class="toggle-eye" @click="mostrarPassword = !mostrarPassword">
            {{ mostrarPassword ? '👁️‍🗨️' : '👁️' }}
          </span>
        </div>

        <button @click="entrar" class="btn-login" :disabled="bloqueado">
          {{ bloqueado ? 'Bloqueado' : 'Entrar al Sistema' }}
        </button>
      </div>
      
      <!-- Opción de recuperación -->
<div v-if="intentos > 0 || bloqueado" class="recovery-section">
  <p v-if="!bloqueado && intentos < 3">Intentos fallidos: {{ intentos }} / 3</p>
  <NuxtLink to="/recuperar" class="link-recovery">¿Olvidaste tu contraseña?</NuxtLink>
</div>
      <NuxtLink to="/" class="link-back">
        Volver a la página principal
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const usuario = ref('')  
const password = ref('')
const mostrarPassword = ref(false)

// Lógica de seguridad
const intentos = ref(0)
const bloqueado = ref(false)

const entrar = async () => {
  if (bloqueado.value) return

  try {
    // Supongamos que login devuelve true o false
    const exito = await auth.login(usuario.value, password.value)
    
    if (exito) {
      intentos.value = 0
      // La redirección suele estar dentro de auth.login o puedes ponerla aquí
    } else {
      intentos.value++
      if (intentos.value >= 3) {
        bloqueado.value = true
        alert("Has fallado 3 veces. Por seguridad, la entrada se ha bloqueado.")
      }
    }
  } catch (error) {
    console.error("Error al intentar conectar con el servidor")
  }
}
</script>

<style scoped>
.password-wrapper {
  position: relative;
  width: 100%;
}
.password-wrapper input {
  width: 100%;
  padding-right: 40px;
}
.toggle-eye {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;
}

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

input:disabled {
  background-color: #f9f9f9;
  cursor: not-allowed;
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
  margin-top: 10px;
}

.btn-login:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  background: #fff5f5;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.recovery-section {
  margin-top: 15px;
  font-size: 0.85rem;
}

.link-recovery {
  color: #3B82F6;
  text-decoration: none;
  font-weight: bold;
}

.link-back {
  display: block; 
  margin-top: 20px; 
  font-size: 0.8rem; 
  color: #666;
  text-decoration: none;
}
</style>