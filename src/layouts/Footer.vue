<script setup>
const socialLinks = [
  {
    name: 'Facebook',
    icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
    url: '#'
  },
  {
    name: 'Instagram',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    url: '#'
  },
  {
    name: 'Twitter',
    icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
    url: '#'
  },
  {
    name: 'TikTok',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
    url: '#'
  }
];
</script>

<template>
  <!-- Footer principal del sitio -->
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo y descripción -->
        <div class="md:col-span-2">
          <div class="flex items-center mb-6">          
            <!-- Logo de la marca -->
            <span class="text-xl font-bold">EntrenaGym</span>
          </div>
          <p class="text-gray-400 text-sm mb-6">
            Conectamos a los mejores profesionales del fitness con personas que buscan transformar su vida y alcanzar sus metas de salud y bienestar.
          </p>
          <!-- Redes sociales -->
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              :aria-label="social.name"
              class="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="social.icon" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <!-- Enlaces de navegación -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Navegación</h3>
          <ul class="space-y-3">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white transition-colors duration-300">Inicio</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/', hash: '#especialidades' }" class="text-gray-400 hover:text-white transition-colors duration-300">Especialidades</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/', hash: '#faq' }" class="text-gray-400 hover:text-white transition-colors duration-300">FAQ</router-link>
            </li>
            <li>
              <router-link to="/citas" class="text-gray-400 hover:text-white transition-colors duration-300">Citas</router-link>
            </li>
            <li>
              <router-link to="/contacto" class="text-gray-400 hover:text-white transition-colors duration-300">Contacto</router-link>
            </li>
            <li>
              <router-link to="/entrenador" class="text-gray-400 hover:text-white transition-colors duration-300">Buscar entrenador</router-link>
            </li>
          </ul>
        </div>
        <!-- Información de contacto -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contacto</h3>
          <address class="not-italic text-gray-400">
            <p class="mb-2">Bogotá, Colombia</p>
            <p class="mb-2">info@entrenagym.com</p>
            <p>+57 123 456 7890</p>
          </address>
        </div>
      </div>
      <!-- Divider y legales -->
      <div class="border-t border-gray-800 my-8"></div>
      <div class="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2023 EntrenaGym. Todos los derechos reservados.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-white transition-colors">Términos de servicio</a>
          <a href="#" class="hover:text-white transition-colors">Política de privacidad</a>
          <a href="#" class="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Efecto hover para los enlaces */
a {
  position: relative;
}

a:not(.social-link):after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #ffffff;
  transition: width 0.3s ease;
}

a:not(.social-link):hover:after {
  width: 100%;
}
</style>