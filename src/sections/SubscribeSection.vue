<script setup>
// Importa ref para reactividad y SweetAlert2 para notificaciones
import { ref } from "vue";
import Swal from "sweetalert2";

// Estado reactivo para el email y errores de validación
const email = ref("");
const emailError = ref("");
// Expresión regular para validar el email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Maneja el envío del formulario de suscripción
const handleSubmit = async () => {
  if (!email.value) {
    emailError.value = "El email es requerido";
  } else if (!emailRegex.test(email.value)) {
    emailError.value = "Por favor ingresa un email válido";
  } else {
    emailError.value = "";
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al suscribirse');
      Swal.fire({
        icon: "success",
        title: "¡Gracias por suscribirte!",
        text: data.message || `Te has registrado con ${email.value}`,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
        backdrop: `
          rgba(0,0,0,0.5)
          url("/images/fitness-confetti.gif")
          center top
          no-repeat
        `
      });
      email.value = "";
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo suscribir",
        confirmButtonColor: "#4f46e5"
      });
    }
  }
};
</script>

<template>
  <!-- Sección de suscripción al newsletter -->
  <div id="subscribe" class="bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#14b8a6] py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Mensaje destacado de usuarios registrados -->
      <div class="mb-8">
        <span class="inline-block bg-[#facc15] text-[#1f2937] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-md">
          Más de 5,000 usuarios registrados
        </span>
      </div>
      
      <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
        Mantente actualizado con EntrenaGym
      </h2>
      <p class="text-lg text-[#dbeafe] max-w-2xl mx-auto mb-10">
        Recibe consejos de fitness, promociones exclusivas y novedades directamente en tu email.
      </p>

      <!-- Formulario de suscripción -->
      <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <input
              v-model="email"
              @input="emailError = ''"
              type="email"
              placeholder="Ingresa tu email"
              class="w-full px-5 py-3 rounded-lg border-2 focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] focus:outline-none transition bg-white text-[#1f2937] placeholder-[#4b5563] font-medium shadow-sm"
              :class="{'border-red-400': emailError, 'border-[#e5e7eb]': !emailError}"
            >
            <!-- Mensaje de error de validación -->
            <transition name="fade">
              <p v-if="emailError" class="absolute left-0 mt-1 text-sm text-[#facc15] font-semibold">
                {{ emailError }}
              </p>
            </transition>
          </div>
          
          <!-- Botón de suscripción -->
          <button
            type="submit"
            class="bg-[#facc15] hover:bg-[#fde68a] text-[#1f2937] font-extrabold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl whitespace-nowrap flex items-center gap-2"
          >
            <svg class="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4"/></svg>
            Suscribirse
          </button>
        </div>
      </form>
      
      <p class="text-[#dbeafe] text-sm mt-4">
        Nos preocupamos por tu privacidad. No compartiremos tu información.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Animación para mostrar/ocultar mensajes de error */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
