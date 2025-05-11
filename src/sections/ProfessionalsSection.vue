<script setup>
import { ref } from 'vue';

const profesionales = ref([
  {
    id: 1,
    titulo: "Entrenadores Personales",
    subtitulo: "Más de 450 profesionales certificados",
    icono: "./images/entrenador-icon.svg",
    categorias: ["Fuerza", "Resistencia", "Pérdida de peso", "Rehabilitación"]
  },
  {
    id: 2,
    titulo: "Fisioterapeutas",
    subtitulo: "Especialistas en recuperación física",
    icono: "./images/fisio-icon.svg",
    categorias: ["Lesiones", "Postoperatorio", "Terapia manual", "Deportiva"]
  },
  {
    id: 3,
    titulo: "Nutricionistas",
    subtitulo: "Planes alimenticios personalizados",
    icono: "./images/nutricion-icon.svg",
    categorias: ["Deportiva", "Pérdida de peso", "Vegana", "Intolerancias"]
  }
]);

const localidades = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena'
];

const especialidades = [
  'Entrenamiento personal',
  'Fisioterapia',
  'Nutrición deportiva',
  'Yoga',
  'Pilates',
  'Rehabilitación'
];

const selectedEspecialidad = ref('');
const selectedLocalidad = ref('');
</script>

<template>
  <!-- Sección de profesionales destacados -->
  <div class="container mx-auto px-5 py-16 mt-24">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: #2563eb;">
        Explora Profesionales
      </h2>
      <p class="text-xl max-w-2xl mx-auto" style="color: #1f2937;">
        Encuentra el especialista perfecto para tus necesidades, ya sea en tu domicilio, en centros especializados o en línea
      </p>
    </div>

    <!-- Grid de tarjetas de profesionales -->
    <div class="grid md:grid-cols-3 gap-8">
      <div v-for="profesional in profesionales" :key="profesional.id" 
           class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#e5e7eb]">
        <div class="p-8 text-center">
          <!-- Icono del profesional -->
          <div class="bg-[#dbeafe] p-4 rounded-full inline-block">
            <img :src="profesional.icono" :alt="profesional.titulo" class="h-16 w-16 mx-auto">
          </div>
          <h3 class="text-2xl font-bold mt-6" style="color: #2563eb;">{{ profesional.titulo }}</h3>
          <p class="mt-2" style="color: #4b5563;">{{ profesional.subtitulo }}</p>
          
          <!-- Lista de categorías del profesional -->
          <div class="mt-6">
            <ul class="text-left space-y-2">
              <li v-for="categoria in profesional.categorias" :key="categoria" class="flex items-center" style="color: #1f2937;">
                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="#14b8a6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ categoria }}
              </li>
            </ul>
          </div>
          
          <!-- Botón para ver todos los profesionales de ese tipo -->
          <router-link to="/entrenador">
            <button class="mt-8 w-full font-semibold py-2 px-4 rounded-lg transition"
              style="background: #facc15; color: #1f2937; font-weight: bold;">
              Ver profesionales
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Sección CTA para invitar a profesionales a unirse -->
  <div style="background: linear-gradient(90deg, #2563eb 60%, #14b8a6 100%);" class="py-16">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6" style="color: #fff;">
        ¿Eres un profesional?
      </h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto" style="color: #f3f4f6;">
        Únete a nuestra plataforma y llega a más clientes potenciales
      </p>
      <button class="font-bold py-3 px-8 rounded-full text-lg transition"
        style="background: #facc15; color: #2563eb;">
        Regístrate como profesional
      </button>
    </div>
  </div>
</template>

<style>
/* Estilos generales para la sección de profesionales */
body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #1f2937;
}
</style>