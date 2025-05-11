<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Sección Hero con título y descripción -->
    <div class="relative bg-gradient-to-r from-blue-600 to-blue-800 py-24 px-4 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <!-- Imagen de fondo decorativa -->
        <div class="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80')] bg-cover bg-center"></div>
      </div>
      <div
        class="max-w-7xl mx-auto relative z-10"
        id="contacto-titulo"
        style="scroll-margin-top: 120px;"
      >
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Contáctanos</h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Envíanos tus preguntas, comentarios o solicitudes y nuestro equipo te responderá lo antes posible.
          </p>
        </div>
      </div>
    </div>

    <!-- Contenido principal: formulario y datos de contacto -->
    <div class="max-w-7xl mx-auto py-16 px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Formulario de contacto -->
        <div class="bg-white rounded-xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Envía un mensaje</h2>
          
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input 
                  v-model="nombre"
                  type="text" 
                  id="nombre" 
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Tu nombre"
                  required
                >
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input 
                  v-model="email"
                  type="email" 
                  id="email" 
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="tu@email.com"
                  required
                >
              </div>
            </div>
            
            <div>
              <label for="asunto" class="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
              <select 
                v-model="asunto"
                id="asunto" 
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="" disabled>Selecciona un asunto</option>
                <option>Consulta general</option>
                <option>Soporte técnico</option>
                <option>Información para profesionales</option>
                <option>Prensa y medios</option>
                <option>Otro</option>
              </select>
            </div>
            
            <div>
              <label for="mensaje" class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea 
                v-model="mensaje"
                id="mensaje" 
                rows="5" 
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="newsletter" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="newsletter" class="ml-2 block text-sm text-gray-700">
                Quiero recibir noticias y promociones de EntrenaGym
              </label>
            </div>
            
            <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <span v-if="loading">Enviando...</span>
              <span v-else>Enviar mensaje <i class="fas fa-paper-plane ml-2"></i></span>
            </button>
          </form>
        </div>
        
        <!-- Información de contacto y redes sociales -->
        <div>
          <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Información de contacto</h2>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-blue-100 p-3 rounded-full text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-800">Teléfono</h3>
                  <p class="text-gray-600">+57 1 123 4567</p>
                  <p class="text-gray-600">+57 300 123 4567 (WhatsApp)</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-blue-100 p-3 rounded-full text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-800">Correo electrónico</h3>
                  <p class="text-gray-600">info@entrenagym.com</p>
                  <p class="text-gray-600">soporte@entrenagym.com</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-blue-100 p-3 rounded-full text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-800">Oficina principal</h3>
                  <p class="text-gray-600">Carrera 15 #88-64, Oficina 302</p>
                  <p class="text-gray-600">Bogotá, Colombia</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Redes sociales -->
          <div class="bg-white rounded-xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Síguenos</h2>
            <p class="text-gray-600 mb-6">Mantente conectado con nosotros a través de nuestras redes sociales:</p>
            
            <div class="flex space-x-4">
              <a href="#" class="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" class="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
              <a href="#" class="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a href="#" class="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mapa de ubicación -->
      <div class="mt-16 bg-white rounded-xl shadow-xl overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.785950686978!2d-74.05670992468622!3d4.628254942259843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a3e2e9cf6a5%3A0x3b8e2040f3a6e00!2sCarrera%2015%20%2388-64%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco" 
          width="100%" 
          height="450" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy"
          class="rounded-xl"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const nombre = ref('');
const email = ref('');
const asunto = ref('');
const mensaje = ref('');
const loading = ref(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre.value, email: email.value, asunto: asunto.value, mensaje: mensaje.value })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al enviar mensaje');
    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado',
      text: data.message || 'Gracias por contactarnos',
      confirmButtonColor: '#2563eb'
    });
    nombre.value = '';
    email.value = '';
    asunto.value = '';
    mensaje.value = '';
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.message || 'No se pudo enviar el mensaje',
      confirmButtonColor: '#2563eb'
    });
  }
  loading.value = false;
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>