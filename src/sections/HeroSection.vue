<script setup>
import { ref } from 'vue';

const profesiones = [
  'Entrenador Personal',
  'Fisioterapeuta',
  'Nutricionista',
  'Preparador Físico',
  'Especialista en Rehabilitación',
  'Entrenador de Yoga/Pilates'
];

const localidades = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Otra ciudad'
];

const selectedProfesion = ref('');
const selectedLocalidad = ref('');
const activeTab = ref('beneficios');

const testimonios = [
  {
    nombre: 'Carlos M.',
    ciudad: 'Medellín',
    texto: 'Encontré el entrenador perfecto para mis objetivos. En 3 meses he logrado resultados que no conseguí en años por mi cuenta.',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    nombre: 'Ana L.',
    ciudad: 'Bogotá',
    texto: 'Mi fisioterapeuta me ayudó a recuperarme de una lesión y ahora me siento mejor que nunca. ¡Totalmente recomendado!',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    nombre: 'David R.',
    ciudad: 'Cali',
    texto: 'El servicio de nutrición cambió completamente mi relación con la comida. He perdido 12kg de forma saludable.',
    foto: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
];

const features = [
  {
    id: 1,
    name: 'Entrenadores Personales',
    details: {
      description: 'Profesionales certificados para lograr tus objetivos fitness',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2936/2936886.png'
    }
  },
  {
    id: 2,
    name: 'Fisioterapeutas',
    details: {
      description: 'Especialistas en recuperación y prevención de lesiones',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2779/2779775.png'
    }
  },
  {
    id: 3,
    name: 'Nutricionistas',
    details: {
      description: 'Planes alimenticios personalizados para tu estilo de vida',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png'
    }
  },
  {
    id: 4,
    name: 'Sesiones en Casa',
    details: {
      description: 'Profesionales que van hasta tu domicilio',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/619/619153.png'
    }
  },
  {
    id: 5,
    name: 'Clases Online',
    details: {
      description: 'Entrenamientos y asesorías desde cualquier lugar',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2459/2459772.png'
    }
  },
  {
    id: 6,
    name: 'Centros Especializados',
    details: {
      description: 'Acceso a los mejores gimnasios y clínicas del país',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3348/3348345.png'
    }
  }
];
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-600 to-teal-500 py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Transforma tu vida con <span class="text-yellow-300">EntrenaGym</span>
          </h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Conecta directamente con los mejores profesionales de fitness, fisioterapia y nutrición en Colombia
          </p>
        </div>

        <!-- Buscador -->
        <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl mx-auto">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
            ¿Qué tipo de profesional necesitas?
          </h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
              <select 
                v-model="selectedProfesion" 
                class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="" disabled selected>Selecciona una especialidad</option>
                <option v-for="p in profesiones" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
              <select 
                v-model="selectedLocalidad" 
                class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="" disabled selected>Selecciona una localidad</option>
                <option v-for="l in localidades" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
          </div>
          
          <button class="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Buscar Profesionales
            <i class="ml-2 fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800">Más de <span class="text-blue-600">900 profesionales</span> confían en nosotros</h2>
          <p class="text-lg text-gray-600 mt-4">Únete a nuestra comunidad y comienza tu transformación hoy mismo</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-md text-center">
            <div class="text-5xl font-bold text-blue-600 mb-2">5,000+</div>
            <div class="text-gray-600">Usuarios satisfechos</div>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md text-center">
            <div class="text-5xl font-bold text-blue-600 mb-2">900+</div>
            <div class="text-gray-600">Profesionales certificados</div>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md text-center">
            <div class="text-5xl font-bold text-blue-600 mb-2">98%</div>
            <div class="text-gray-600">Satisfacción de clientes</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-16 bg-gradient-to-r from-blue-500 to-blue-600">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Explora Profesionales</h2>
        <p class="text-xl text-blue-100 mb-8">
          Encuentra el especialista perfecto para tus necesidades, ya sea en tu domicilio, en centros especializados o en línea
        </p>
        <router-link to="/entrenador">
          <button class="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all">
            Ver todos los profesionales
          </button>
        </router-link>
      </div>
    </div>

    <!-- Especialidades Section -->
    <div id="especialidades" class="py-14 bg-white mt-24 scroll-mt-32">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Nuestras Especialidades</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios para cubrir todas tus necesidades de salud y bienestar
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="feature in features" 
            :key="feature.id" 
            class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all cursor-pointer hover:border-blue-300"
          >
            <div class="bg-blue-100 p-4 rounded-full mb-4">
              <img 
                :src="feature.details.imageUrl" 
                :alt="feature.name" 
                class="w-16 h-16 object-contain"
              />
            </div>
            <h4 class="text-xl font-semibold text-gray-800 mb-2">{{ feature.name }}</h4>
            <p class="text-gray-600">{{ feature.details.description }}</p>
          </div>
        </div>
      </div>
    </div>    

    <!-- Final CTA -->
    <div class="py-16 bg-blue-600">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para comenzar?</h2>
        <p class="text-xl text-blue-100 mb-8">
          Regístrate ahora y encuentra al profesional perfecto para tus objetivos
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/entrenador">
            <button class="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all">
              Buscar Profesional
            </button>
          </router-link>
          <button class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-full text-lg transition-all">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>