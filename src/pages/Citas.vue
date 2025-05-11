<script setup>
// Página de gestión de citas con entrenadores

import { ref, computed, onMounted } from 'vue';

const API_URL = import.meta.env.VITE_API_URL + '/citas';
const token = localStorage.getItem('token');

// --- NUEVO: Estado de autenticación y función para abrir modal ---
const isLoggedIn = ref(!!localStorage.getItem('token'));
function abrirModalAuth() {
  window.dispatchEvent(new CustomEvent('abrir-modal-auth', { detail: { view: 'login' } }));
}

// Lista de entrenadores disponibles
const entrenadores = ref([
  { id: 1, nombre: 'Laura Gómez', especialidad: 'Fuerza y Condicionamiento', foto: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, nombre: 'Carlos Méndez', especialidad: 'CrossFit', foto: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, nombre: 'Ana Torres', especialidad: 'Yoga y Movilidad', foto: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 4, nombre: 'David Ruiz', especialidad: 'Pérdida de Peso', foto: 'https://randomuser.me/api/portraits/men/75.jpg' }
]);

// Estado principal de la página de citas
const citas = ref([]);
const nuevaCita = ref({ 
  fecha: '', 
  hora: '', 
  entrenadorId: '', 
  descripcion: '',
  tipo: 'presencial' 
});
const editandoId = ref(null);
const filtro = ref('todas');
const loading = ref(true);
const modalConfirmacion = ref({ abierto: false, id: null });

// Cargar citas desde el backend al iniciar
onMounted(async () => {
  isLoggedIn.value = !!localStorage.getItem('token');
  if (isLoggedIn.value) {
    await cargarCitas();
    loading.value = false;
  }
  // Escucha cambios de login para recargar si es necesario
  window.addEventListener('login-change', () => {
    isLoggedIn.value = !!localStorage.getItem('token');
    if (isLoggedIn.value) cargarCitas();
  });
});

// Cargar citas desde el backend
async function cargarCitas() {
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    if (!res.ok) throw new Error('No autenticado');
    citas.value = await res.json();
  } catch {
    citas.value = [];
  }
}

// Citas filtradas por tipo (todas, futuras, pasadas)
const citasFiltradas = computed(() => {
  const hoy = new Date().toISOString().split('T')[0];
  
  switch(filtro.value) {
    case 'pasadas':
      return citas.value.filter(c => c.fecha < hoy);
    case 'futuras':
      return citas.value.filter(c => c.fecha >= hoy);
    default:
      return citas.value;
  }
});

// Entrenador seleccionado en el formulario
const entrenadorSeleccionado = computed(() => {
  return entrenadores.value.find(e => e.id === parseInt(nuevaCita.value.entrenadorId));
});

// CRUD de citas
async function agregarCita() {
  if (!nuevaCita.value.fecha || !nuevaCita.value.hora || !nuevaCita.value.entrenadorId) return;
  try {
    const entrenador = entrenadores.value.find(e => e.id === parseInt(nuevaCita.value.entrenadorId));
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        fecha: nuevaCita.value.fecha,
        hora: nuevaCita.value.hora,
        entrenador: entrenador.nombre,
        descripcion: nuevaCita.value.descripcion,
        tipo: nuevaCita.value.tipo
      })
    });
    if (!res.ok) throw new Error('Error al crear cita');
    await cargarCitas();
    resetFormulario();
  } catch {}
}

async function eliminarCita(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    await cargarCitas();
    modalConfirmacion.value.abierto = false;
  } catch {}
}

function editarCita(cita) {
  editandoId.value = cita._id || cita.id;
  nuevaCita.value = { 
    fecha: cita.fecha,
    hora: cita.hora,
    entrenadorId: '', // No se puede mapear el id real, solo nombre
    descripcion: cita.descripcion,
    tipo: cita.tipo
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function guardarEdicion() {
  try {
    const entrenador = entrenadores.value.find(e => e.id === parseInt(nuevaCita.value.entrenadorId));
    await fetch(`${API_URL}/${editandoId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        fecha: nuevaCita.value.fecha,
        hora: nuevaCita.value.hora,
        entrenador: entrenador ? entrenador.nombre : '',
        descripcion: nuevaCita.value.descripcion,
        tipo: nuevaCita.value.tipo
      })
    });
    await cargarCitas();
    resetFormulario();
  } catch {}
}

function resetFormulario() {
  editandoId.value = null;
  nuevaCita.value = { fecha: '', hora: '', entrenadorId: '', descripcion: '', tipo: 'presencial' };
}

function abrirModalConfirmacion(id) {
  modalConfirmacion.value = { abierto: true, id };
}

function formatearFecha(fecha) {
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Si NO está logueado, muestra mensaje y botón -->
    <div v-if="!isLoggedIn" class="flex flex-col items-center justify-center min-h-[60vh]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-indigo-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
      <h2 class="text-2xl font-bold mb-2 text-gray-800">¡Acceso restringido!</h2>
      <p class="text-gray-600 mb-6">Debes iniciar sesión o registrarte para gestionar tus citas.</p>
      <button
        @click="abrirModalAuth"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
      >
        Iniciar sesión o registrarse
      </button>
    </div>
    <!-- Si está logueado, muestra la página de citas -->
    <div v-else>
      <!-- Header de la página de citas -->
      <header class="bg-gradient-to-r from-[#1d89cc] to-blue-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
        <h1 class="text-3xl font-bold">AgendaFit</h1>
        <p class="text-[#b3d9f2]">Tu gestor de citas con entrenadores</p>
          </div>
          <div class="flex items-center space-x-4">
        <img 
          src="https://randomuser.me/api/portraits/lego/1.jpg" 
          alt="User Avatar" 
          class="w-10 h-10 rounded-full object-cover"
        >
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <!-- Panel de control y formulario de cita -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Formulario para crear/editar cita -->
          <div class="lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">
              {{ editandoId ? 'Editar Cita' : 'Nueva Cita' }}
            </h2>
            
            <form @submit.prevent="editandoId ? guardarEdicion() : agregarCita()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input 
                  v-model="nuevaCita.fecha" 
                  type="date" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  :min="new Date().toISOString().split('T')[0]"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <input 
                  v-model="nuevaCita.hora" 
                  type="time" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Entrenador</label>
                <select 
                  v-model="nuevaCita.entrenadorId"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="" disabled>Selecciona un entrenador</option>
                  <option 
                    v-for="entrenador in entrenadores" 
                    :key="entrenador.id" 
                    :value="entrenador.id"
                  >
                    {{ entrenador.nombre }} - {{ entrenador.especialidad }}
                  </option>
                </select>
              </div>
              
              <div v-if="entrenadorSeleccionado" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img :src="entrenadorSeleccionado.foto" class="w-12 h-12 rounded-full object-cover">
                <div>
                  <p class="font-medium">{{ entrenadorSeleccionado.nombre }}</p>
                  <p class="text-sm text-gray-500">{{ entrenadorSeleccionado.especialidad }}</p>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de sesión</label>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input 
                      v-model="nuevaCita.tipo" 
                      type="radio" 
                      value="presencial" 
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    >
                    <span class="ml-2 text-gray-700">Presencial</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input 
                      v-model="nuevaCita.tipo" 
                      type="radio" 
                      value="virtual" 
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    >
                    <span class="ml-2 text-gray-700">Virtual</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Notas adicionales</label>
                <textarea 
                  v-model="nuevaCita.descripcion" 
                  rows="3" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Objetivos, lesiones, preferencias..."
                ></textarea>
              </div>
              
              <div class="flex space-x-3 pt-2">
                <button 
                  type="submit" 
                  class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  {{ editandoId ? 'Guardar cambios' : 'Agendar cita' }}
                </button>
                
                <button 
                  v-if="editandoId" 
                  type="button" 
                  @click="resetFormulario"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
          
          <!-- Listado de citas -->
          <div class="lg:col-span-3 space-y-6">
            <!-- Filtros y listado -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h2 class="text-2xl font-bold text-gray-800">Tus Citas Programadas</h2>
              
              <div class="flex space-x-2">
                <button 
                  @click="filtro = 'todas'"
                  :class="{'bg-indigo-100 text-indigo-700': filtro === 'todas'}"
                  class="px-3 py-1 text-sm rounded-full border hover:bg-indigo-50 transition"
                >
                  Todas
                </button>
                <button 
                  @click="filtro = 'futuras'"
                  :class="{'bg-indigo-100 text-indigo-700': filtro === 'futuras'}"
                  class="px-3 py-1 text-sm rounded-full border hover:bg-indigo-50 transition"
                >
                  Futuras
                </button>
                <button 
                  @click="filtro = 'pasadas'"
                  :class="{'bg-indigo-100 text-indigo-700': filtro === 'pasadas'}"
                  class="px-3 py-1 text-sm rounded-full border hover:bg-indigo-50 transition"
                >
                  Pasadas
                </button>
              </div>
            </div>
            
            <!-- Estado de carga -->
            <div v-if="loading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
            
            <!-- Mensaje cuando no hay citas -->
            <div v-else-if="citasFiltradas.length === 0" class="bg-white p-8 rounded-xl shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="mt-4 text-lg font-medium text-gray-900">No hay citas {{ filtro === 'pasadas' ? 'pasadas' : 'programadas' }}</h3>
              <p class="mt-1 text-gray-500">
                {{ filtro === 'futuras' ? 'Agenda tu primera sesión con un entrenador' : '' }}
              </p>
            </div>
            
            <!-- Lista de citas -->
            <ul v-else class="space-y-4">
              <li 
                v-for="cita in citasFiltradas" 
                :key="cita._id"
                class="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
                :class="{
                  'border-l-4 border-indigo-500': new Date(cita.fecha) >= new Date(),
                  'opacity-80': new Date(cita.fecha) < new Date()
                }"
              >
                <div class="p-5">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div class="flex items-start space-x-4">
                      <img :src="cita.entrenadorFoto" class="w-12 h-12 rounded-full object-cover">
                      
                      <div>
                        <h3 class="font-bold text-gray-900">
                          Sesión con {{ cita.entrenadorNombre }}
                        </h3>
                        <p class="text-sm text-gray-500">{{ cita.entrenadorEspecialidad }}</p>
                        
                        <div class="mt-2 flex flex-wrap gap-2">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {{ cita.tipo === 'presencial' ? 'Presencial' : 'Virtual' }}
                          </span>
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {{ cita.hora }}
                          </span>
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {{ formatearFecha(cita.fecha) }}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="mt-4 sm:mt-0 flex space-x-2">
                      <button 
                        @click="editarCita(cita)"
                        class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button 
                        @click="abrirModalConfirmacion(cita._id)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                  
                  <div v-if="cita.descripcion" class="mt-4 pl-16 sm:pl-16">
                    <p class="text-sm text-gray-600 whitespace-pre-line">{{ cita.descripcion }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <!-- Modal de confirmación para eliminar cita -->
      <div v-if="modalConfirmacion.abierto" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
          <h3 class="text-lg font-medium text-gray-900">Confirmar eliminación</h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">¿Estás seguro que deseas eliminar esta cita? Esta acción no se puede deshacer.</p>
          </div>
          <div class="mt-4 flex justify-end space-x-3">
            <button 
              @click="modalConfirmacion.abierto = false"
              type="button" 
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button 
              @click="eliminarCita(modalConfirmacion.id)"
              type="button" 
              class="px-4 py-2 bg-red-600 rounded-md text-sm font-medium text-white hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Animaciones y estilos adicionales */
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>