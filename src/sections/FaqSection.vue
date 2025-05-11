<script setup>
import { ref } from "vue";

const faqs = ref([
  {
    id: 1,
    title: "¿Cómo encuentro al profesional adecuado para mis necesidades?",
    description: "Puedes usar nuestro buscador avanzado filtrando por especialidad, ubicación y tipo de servicio. Además, cada profesional tiene un perfil detallado con su experiencia, certificaciones y reseñas de otros usuarios."
  },
  {
    id: 2,
    title: "¿Cuáles son los métodos de pago aceptados?",
    description: "Aceptamos pagos con tarjetas de crédito/débito (Visa, Mastercard, American Express), transferencias bancarias y PayPal. Todos los pagos son seguros a través de nuestra plataforma."
  },
  {
    id: 3,
    title: "¿Puedo cancelar o reprogramar una sesión?",
    description: "Sí, puedes cancelar o reprogramar con al menos 24 horas de anticipación sin costo alguno. Las cancelaciones con menos tiempo pueden estar sujetas a cargos según la política del profesional."
  },
  {
    id: 4,
    title: "¿Los profesionales están certificados?",
    description: "Todos los profesionales en nuestra plataforma son verificados y deben presentar sus certificaciones válidas. Puedes ver sus credenciales en sus perfiles y las instituciones que los certificaron."
  }
]);

const activeFaq = ref(null);

const toggleFaq = (id) => {
  activeFaq.value = activeFaq.value === id ? null : id;
};
</script>

<template>
  <!-- Sección de Preguntas Frecuentes -->
  <div id="faq" class="bg-[#f9fafb] py-16 px-4 scroll-mt-32 mt-24">
    <div class="container mx-auto max-w-6xl">
      <!-- Título y descripción -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl md:text-4xl font-bold mb-4"
          style="color: #2563eb;"
        >
          Preguntas Frecuentes
        </h2>
        <p class="text-lg max-w-2xl mx-auto" style="color: #4b5563;">
          Encuentra respuestas a las dudas más comunes sobre nuestros servicios.
          ¿No encuentras lo que buscas? <a href="#" style="color: #2563eb; text-decoration: underline;">Contáctanos</a>.
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <div class="space-y-4">
          <!-- Renderiza cada pregunta frecuente como un acordeón -->
          <div 
            v-for="faq in faqs" 
            :key="faq.id" 
            class="border rounded-xl overflow-hidden transition-all duration-300"
            :class="{'shadow-md': activeFaq === faq.id}"
            style="border-color: #e5e7eb;"
          >
            <!-- Botón para abrir/cerrar la respuesta -->
            <button
              @click="toggleFaq(faq.id)"
              class="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <h3 class="text-lg md:text-xl font-semibold" style="color: #1f2937;">
                {{ faq.title }}
              </h3>
              <svg 
                class="w-6 h-6 transition-transform duration-300"
                :class="{'rotate-180': activeFaq === faq.id}"
                fill="none" 
                viewBox="0 0 24 24" 
                :stroke="activeFaq === faq.id ? '#2563eb' : '#14b8a6'"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Respuesta de la pregunta, visible solo si está activa -->
            <div 
              v-show="activeFaq === faq.id"
              class="px-6 pb-6 pt-0 transition-all duration-300"
              :class="{'animate-fade-in': activeFaq === faq.id}"
              style="color: #4b5563;"
            >
              <p>{{ faq.description }}</p>
            </div>
          </div>
        </div>

        <!-- Botón para ver más preguntas (puede enlazar a otra página o expandir más FAQs) -->
        <div class="mt-12 text-center">
          <button class="font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            style="background: #2563eb; color: #fff;">
            Ver más preguntas frecuentes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Animación para mostrar la respuesta de la FAQ */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>