// Importa funciones de Vue Router y los componentes de página
import { createRouter, createWebHistory } from 'vue-router';
import Entrenador from '../pages/Entrenador.vue';
import Main from '../layouts/Main.vue';
import Contact from '../pages/Contact.vue';
import Citas from '../pages/Citas.vue';

// Define las rutas de la aplicación
const routes = [
  { path: '/', component: Main }, // Página principal
  { path: '/entrenador', component: Entrenador }, // Página de entrenadores
  { path: '/contacto', component: Contact }, // Página de contacto
  { path: '/citas', component: Citas }, // Página de citas
];

// Crea la instancia del router con historial HTML5 y scroll personalizado
const router = createRouter({
  history: createWebHistory('/'), // Cambiado de '/vue-landing-page/' a '/'
  routes,
  // Controla el comportamiento del scroll al navegar entre rutas
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Si la ruta tiene hash, hace scroll suave al elemento
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (to.path === '/contacto') {
      // Si navega a contacto, hace scroll al título de contacto
      return {
        el: '#contacto-titulo',
        behavior: 'smooth',
      };
    }
    // Por defecto, scroll al inicio de la página
    return { top: 0 };
  },
});

// Exporta el router para usarlo en la app principal
export default router;

/*
Cómo funciona:
- Define las rutas principales de la app y qué componente renderiza cada una.
- El scrollBehavior permite navegación suave a secciones específicas.
- Se importa en main.js y se pasa a la app Vue para habilitar la navegación SPA.
*/
