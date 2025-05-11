<script setup>
// Main.vue - Layout principal de la página de inicio

// Importa las secciones principales de la landing page
import HeroSection from "../sections/HeroSection.vue"; // Sección principal/hero
import ProfessionalsSection from "../sections/ProfessionalsSection.vue"; // Sección de profesionales destacados
import FaqSection from "../sections/FaqSection.vue"; // Sección de preguntas frecuentes
import BrandsSection from "../sections/BrandsSection.vue"; // Sección de marcas asociadas
import SubscribeSection from "../sections/SubscribeSection.vue"; // Sección de suscripción/newsletter
</script>

<template>
  <!-- Renderiza las secciones principales en orden -->
  <HeroSection />
  <ProfessionalsSection />
  <FaqSection />     
  <BrandsSection />
  <SubscribeSection />
</template>
