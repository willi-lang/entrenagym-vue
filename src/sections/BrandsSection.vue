<script setup>
// Importa funciones de Vue para reactividad y ciclo de vida
import { ref, onMounted } from 'vue';

// Lista de marcas patrocinadoras
const sponsors = [
  { name: 'EYBEX', logo: './images/sponsors/eybex.svg', url: '#' },
  { name: 'SIGMA', logo: './images/sponsors/sigma.svg', url: '#' },
  { name: 'TECHNOGYM', logo: './images/sponsors/technogym.svg', url: '#' },
  { name: 'WaterRower', logo: './images/sponsors/waterrower.svg', url: '#' },
  { name: 'BH FITNESS', logo: './images/sponsors/bh-fitness.svg', url: '#' }
]

// Estado para controlar el hover animado de cada logo
const isHovered = ref(Array(sponsors.length).fill(false))

// Función para activar/desactivar el hover de un logo
const handleHover = (index, value) => {
  isHovered.value[index] = value
}

// Efecto de iluminación aleatoria sobre los logos
onMounted(() => {
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * sponsors.length)
    handleHover(randomIndex, true)
    setTimeout(() => handleHover(randomIndex, false), 1000)
  }, 3000)

  return () => clearInterval(interval)
})
</script>

<template>
  <!-- Sección de marcas patrocinadoras -->
  <section id="marcas" class="relative bg-gradient-to-b from-[#f9fafb] to-white py-20 px-4 overflow-hidden">
    <!-- Fondos decorativos animados -->
    <div class="absolute inset-0 opacity-10 pointer-events-none select-none">
      <div class="absolute top-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style="background: #2563eb; opacity: 0.18;"></div>
      <div class="absolute top-0 right-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" style="background: #14b8a6; opacity: 0.16;"></div>
      <div class="absolute bottom-0 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" style="background: #facc15; opacity: 0.13;"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Encabezado de la sección -->
      <div class="text-center mb-14 transform transition-all duration-1000 hover:scale-105">
        <span class="inline-block bg-gradient-to-r from-[#2563eb] to-[#14b8a6] text-white text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest mb-4 shadow-lg drop-shadow-lg">
          Partners Oficiales
        </span>
        <h3 class="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#14b8a6] drop-shadow-lg">
            Marcas de Élite
          </span>
        </h3>
        <p class="mt-4 text-lg font-medium" style="color: #1f2937;">
          Colaboramos con los líderes del sector fitness mundial
        </p>
      </div>

      <!-- Grid de logos de marcas con animación y efecto hover -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
        <a 
          v-for="(sponsor, index) in sponsors" 
          :key="sponsor.name"
          :href="sponsor.url"
          class="relative flex items-center justify-center p-7 rounded-2xl transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-[#2563eb]/30"
          :class="{
            'transform hover:-translate-y-2 shadow-2xl': true,
            'bg-white/95 backdrop-blur-md ring-2 ring-[#2563eb]/10': isHovered[index],
            'bg-white/60': !isHovered[index]
          }"
          @mouseenter="handleHover(index, true)"
          @mouseleave="handleHover(index, false)"
          tabindex="0"
        >
          <!-- Logo de la marca -->
          <img 
            :src="sponsor.logo" 
            :alt="sponsor.name" 
            class="h-16 object-contain max-w-full transition-all duration-300 drop-shadow-xl"
            :class="{
              'grayscale-0 scale-110 brightness-110': isHovered[index],
              'grayscale opacity-80': !isHovered[index]
            }"
            loading="lazy"
          >
          <!-- Efecto de destello al hacer hover -->
          <div 
            class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
            v-if="isHovered[index]"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
          </div>
        </a>
      </div>

      <!-- CTA para invitar a nuevas marcas a ser partners -->
      <div class="mt-20 text-center">
        <a 
          href="#contacto" 
          class="relative inline-flex items-center px-10 py-5 overflow-hidden text-lg font-extrabold rounded-2xl shadow-2xl group focus:outline-none focus:ring-4 focus:ring-[#2563eb]/30"
          style="background: linear-gradient(90deg, #2563eb 60%, #14b8a6 100%); color: #fff; letter-spacing: 0.04em;"
        >
          <span class="absolute top-0 left-0 w-full h-full bg-white opacity-10 group-hover:opacity-20 transition duration-500"></span>
          <span class="relative z-10 flex items-center">
            ¿Quieres ser partner?
            <svg class="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animaciones personalizadas para blobs de fondo */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Efectos de transición y escala para logos */
.grayscale {
  filter: grayscale(1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.grayscale-0 {
  filter: grayscale(0);
}

/* Accesibilidad: desactiva animaciones si el usuario lo prefiere */
@media (prefers-reduced-motion) {
  .animate-blob, .transform, .transition-all {
    animation: none;
    transition: none;
  }
}
</style>