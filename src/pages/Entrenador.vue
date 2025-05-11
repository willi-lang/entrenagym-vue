<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Hero Section: Título y descripción -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Encuentra tu <span class="text-yellow-300">Entrenador Ideal</span>
          </h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Conecta con los mejores profesionales del fitness en Colombia. Filtra, compara y reserva sesiones con entrenadores certificados.
          </p>
        </div>

        <!-- Filtros Avanzados -->
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Filtro por nombre -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input 
                v-model="filtros.nombre" 
                type="text" 
                placeholder="Buscar entrenador..." 
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pl-10"
              >
              <svg class="absolute left-3 top-10 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <!-- Filtro por especialidad -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
              <select 
                v-model="filtros.especialidad" 
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Todas las especialidades</option>
                <option v-for="esp in especialidades" :key="esp" :value="esp">{{ esp }}</option>
              </select>
            </div>
            <!-- Filtro por ciudad -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <select 
                v-model="filtros.ciudad" 
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Todas las ciudades</option>
                <option v-for="ciudad in ciudades" :key="ciudad" :value="ciudad">{{ ciudad }}</option>
              </select>
            </div>
            <!-- Botón para limpiar filtros -->
            <div class="flex items-end">
              <button 
                @click="limpiarFiltros" 
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content: Estadísticas, resultados y grid de entrenadores -->
    <div class="max-w-7xl mx-auto py-12 px-4">
      <!-- Barra de estadísticas -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div class="p-4">
            <div class="text-3xl font-bold text-blue-600">{{ entrenadores.length }}+</div>
            <div class="text-gray-600">Entrenadores</div>
          </div>
          <div class="p-4">
            <div class="text-3xl font-bold text-blue-600">{{ especialidades.length }}</div>
            <div class="text-gray-600">Especialidades</div>
          </div>
          <div class="p-4">
            <div class="text-3xl font-bold text-blue-600">4.8</div>
            <div class="text-gray-600">Rating promedio</div>
          </div>
          <div class="p-4">
            <div class="text-3xl font-bold text-blue-600">95%</div>
            <div class="text-gray-600">Clientes satisfechos</div>
          </div>
        </div>
      </div>

      <!-- Encabezado de resultados y orden -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          {{
            entrenadoresFiltrados.length === entrenadores.length 
              ? 'Nuestros Entrenadores' 
              : `${entrenadoresFiltrados.length} Entrenadores encontrados`
          }}
        </h2>
        <div class="flex items-center">
          <span class="text-gray-600 mr-2">Ordenar por:</span>
          <select class="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
            <option>Recomendados</option>
            <option>Mejor valorados</option>
            <option>Precio más bajo</option>
            <option>Precio más alto</option>
          </select>
        </div>
      </div>

      <!-- Grid de entrenadores -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Tarjeta de entrenador -->
        <div 
          v-for="entrenador in entrenadoresFiltrados" 
          :key="entrenador.id" 
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <!-- Badge destacado -->
          <div v-if="entrenador.destacado" class="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
            DESTACADO
          </div>
          <!-- Imagen de perfil y nombre -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="entrenador.foto" 
              :alt="entrenador.nombre" 
              class="w-full h-full object-cover"
            >
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 class="text-xl font-bold text-white">{{ entrenador.nombre }}</h3>
              <p class="text-blue-200">{{ entrenador.especialidad }}</p>
            </div>
          </div>
          <!-- Detalles del entrenador -->
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <!-- Rating y ciudad -->
                <div class="flex items-center mb-1">
                  <span v-for="n in 5" :key="n" class="text-yellow-400">
                    <i :class="n <= entrenador.rating ? 'fas fa-star' : n-0.5 <= entrenador.rating ? 'fas fa-star-half-alt' : 'far fa-star'"></i>
                  </span>
                  <span class="ml-2 text-sm text-gray-600">({{ entrenador.reseñas }} reseñas)</span>
                </div>
                <div class="flex items-center text-gray-600 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ entrenador.ciudad }}
                </div>
              </div>
              <!-- Precio por sesión -->
              <div class="text-right">
                <div class="text-sm text-gray-500">Desde</div>
                <div class="text-2xl font-bold text-blue-600">${{ entrenador.precio.toLocaleString() }}</div>
                <div class="text-xs text-gray-500">por sesión</div>
              </div>
            </div>
            <!-- Descripción y tags -->
            <p class="text-gray-600 mb-6 line-clamp-2">{{ entrenador.descripcion }}</p>
            <div class="flex space-x-2 mb-4">
              <span 
                v-for="tag in entrenador.tags" 
                :key="tag" 
                class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {{ tag }}
              </span>
            </div>
            <!-- Botones de acción -->
            <div class="flex space-x-3">
              <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Perfil
              </button>
              <button class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div class="flex justify-center mt-12">
        <nav class="inline-flex rounded-md shadow">
          <!-- Botones de paginación (estáticos) -->
          <a href="#" class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </a>
          <a href="#" class="px-4 py-2 border-t border-b border-gray-300 bg-white text-blue-600 font-medium">1</a>
          <a href="#" class="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">2</a>
          <a href="#" class="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">3</a>
          <a href="#" class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4-4a1 1 0 010 1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </nav>
      </div>
    </div>

    <!-- CTA Section: Invitación a profesionales -->
    <div class="bg-blue-700 py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-white mb-6">¿Eres un profesional del fitness?</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Únete a nuestra plataforma y llega a más clientes potenciales. Gestiona tu agenda, recibe pagos y crece tu negocio.
        </p>
        <button class="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all">
          Regístrate como profesional
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const especialidades = [
  'Entrenamiento Personal',
  'Fisioterapia',
  'Nutrición Deportiva',
  'Yoga',
  'Pilates',
  'Rehabilitación',
  'Preparación Física',
  'Entrenamiento Funcional'
];

const ciudades = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Pereira',
  'Manizales'
];

const entrenadores = ref([
  {
    id: 1,
    nombre: 'Laura Gómez',
    especialidad: 'Entrenamiento Personal',
    ciudad: 'Bogotá',
    foto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
    rating: 4.8,
    reseñas: 124,
    precio: 65000,
    descripcion: 'Especialista en pérdida de peso y tonificación muscular con más de 8 años de experiencia trabajando con clientes de todos los niveles.',
    tags: ['Pérdida de peso', 'Tonificación', 'HIIT'],
    destacado: true
  },
  {
    id: 2,
    nombre: 'Carlos Ruiz',
    especialidad: 'Fisioterapia',
    ciudad: 'Medellín',
    foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
    rating: 4.9,
    reseñas: 87,
    precio: 75000,
    descripcion: 'Fisioterapeuta deportivo especializado en recuperación de lesiones y mejora del rendimiento físico.',
    tags: ['Rehabilitación', 'Lesiones deportivas', 'Terapia manual'],
    destacado: true
  },
  {
    id: 3,
    nombre: 'Ana López',
    especialidad: 'Nutrición Deportiva',
    ciudad: 'Cali',
    foto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
    rating: 4.7,
    reseñas: 56,
    precio: 60000,
    descripcion: 'Nutricionista deportiva con enfoque en planes alimenticios personalizados para atletas y personas activas.',
    tags: ['Nutrición deportiva', 'Rendimiento', 'Suplementación'],
    destacado: false
  },
  {
    id: 4,
    nombre: 'David Torres',
    especialidad: 'Yoga',
    ciudad: 'Barranquilla',
    foto: 'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
    rating: 4.9,
    reseñas: 142,
    precio: 55000,
    descripcion: 'Instructor de yoga certificado con especialización en yoga terapéutico y para manejo del estrés.',
    tags: ['Yoga terapéutico', 'Meditación', 'Flexibilidad'],
    destacado: true
  },
  {
    id: 5,
    nombre: 'María Pérez',
    especialidad: 'Pilates',
    ciudad: 'Cartagena',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
    rating: 4.8,
    reseñas: 93,
    precio: 60000,
    descripcion: 'Instructora de pilates con máquinas y mat especializada en corrección postural y fortalecimiento del core.',
    tags: ['Pilates reformer', 'Postura', 'Core'],
    destacado: false
  },
  {
    id: 6,
    nombre: 'Javier Ramírez',
    especialidad: 'Preparación Física',
    ciudad: 'Bogotá',
    foto: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
    rating: 4.6,
    reseñas: 78,
    precio: 70000,
    descripcion: 'Preparador físico para deportistas de alto rendimiento con metodologías basadas en ciencia.',
    tags: ['Alto rendimiento', 'Fuerza', 'Velocidad'],
    destacado: false
  }
]);

const filtros = ref({ 
  nombre: '', 
  especialidad: '', 
  ciudad: '' 
});

const entrenadoresFiltrados = computed(() => {
  return entrenadores.value.filter(e => {
    const matchNombre = filtros.value.nombre === '' || 
      e.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase());
    const matchEspecialidad = filtros.value.especialidad === '' || 
      e.especialidad === filtros.value.especialidad;
    const matchCiudad = filtros.value.ciudad === '' || 
      e.ciudad === filtros.value.ciudad;
    return matchNombre && matchEspecialidad && matchCiudad;
  });
});

function limpiarFiltros() {
  filtros.value = { nombre: '', especialidad: '', ciudad: '' };
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>