<template>
  <div class="recovery-container">
    <div class="recovery-card">
      <img src="/aj_logo.png" alt="Logo" class="logo" />
      <h1>Recuperar Acceso</h1>
      <p v-if="!enviado">Ingresa tu correo electrónico para enviarte un código de recuperación.</p>
      
      <div v-if="!enviado" class="form">
        <input v-model="email" type="email" placeholder="correo@ejemplo.com" required />
        <button @click="enviarCodigo" class="btn-recovery" :disabled="cargando">
          {{ cargando ? 'Enviando...' : 'Enviar Código' }}
        </button>
      </div>

      <!-- Mensaje de éxito -->
      <div v-else class="success-message">
        <p>✅ ¡Correo enviado!</p>
        <p>Revisa tu bandeja de entrada. Si no lo ves, busca en la carpeta de spam.</p>
        <button @click="enviado = false" class="btn-retry">Intentar con otro correo</button>
      </div>

      <NuxtLink to="/login" class="link-back">
        Volver al inicio de sesión
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' // <--- ¡ESTO ES VITAL!

// Esto le dice al middleware: "Deja pasar a este usuario aunque no tenga sesión"
definePageMeta({
  auth: false 
})

const email = ref('')
const enviado = ref(false)
const cargando = ref(false)

const enviarCodigo = async () => {
  if (!email.value) return alert("Por favor, ingresa un correo válido.")
  
  cargando.value = true
  try {
    // Simulación de envío
    setTimeout(() => {
      enviado.value = true
      cargando.value = false
    }, 2000)
    
  } catch (error) {
    alert("Hubo un error al enviar el correo. Intenta de nuevo.")
    cargando.value = false
  }
}
</script>
<style scoped>
.recovery-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.recovery-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  width: 400px;
}
.logo { width: 70px; margin-bottom: 1rem; }
input {
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.btn-recovery {
  width: 100%;
  padding: 12px;
  background-color: #10B981; /* Un verde para diferenciar del login */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
.btn-recovery:disabled { background-color: #a7f3d0; }

.success-message {
  margin: 20px 0;
  color: #065f46;
  background-color: #ecfdf5;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.btn-retry {
  margin-top: 10px;
  background: none;
  border: none;
  color: #10B981;
  text-decoration: underline;
  cursor: pointer;
}

.link-back {
  display: block;
  margin-top: 20px;
  font-size: 0.85rem;
  color: #666;
  text-decoration: none;
}
</style>