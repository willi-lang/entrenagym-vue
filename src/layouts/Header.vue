<script setup>
// Header.vue - Barra de navegación principal con autenticación y menú responsivo

// Importaciones de Vue y Router
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// Estado reactivo para el menú móvil, autenticación y vista del modal
let mobileNav = ref(false);
const isLoggedIn = ref(false);
const showAuthModal = ref(false);
const isLoginView = ref(true);
const router = useRouter();

// Referencias para los elementos del DOM
const profileMenuButton = ref(null);
const profileMenuDropdown = ref(null);

// Campos de formulario y errores
const loginEmail = ref('');
const loginPassword = ref('');
const registerNombre = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerPassword2 = ref('');
const registerError = ref('');
const loginError = ref('');

// Estado para el menú de perfil
const showProfileMenu = ref(false);

// Abre/cierra el menú móvil
const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};

const closeMobileNav = () => {
  mobileNav.value = false;
};

// Muestra/oculta el modal de autenticación
const toggleAuthModal = (view = 'login') => {
  showAuthModal.value = !showAuthModal.value;
  isLoginView.value = view === 'login';
  loginError.value = '';
  registerError.value = '';
};

// Abre/cierra el menú de perfil
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

const closeProfileMenu = () => {
  showProfileMenu.value = false;
};

// Cierra el menú de perfil al hacer clic fuera
const handleClickOutside = (event) => {
  if (profileMenuDropdown.value && 
      !profileMenuDropdown.value.contains(event.target) && 
      profileMenuButton.value && 
      !profileMenuButton.value.contains(event.target)) {
    closeProfileMenu();
  }
};

// Realiza el login
const handleLogin = async () => {
  loginError.value = '';
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail.value, password: loginPassword.value })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error de login');
    isLoggedIn.value = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', data.token);
    showAuthModal.value = false;
    window.dispatchEvent(new Event('login-change'));
    router.push('/citas');
  } catch (err) {
    loginError.value = err.message;
  }
};

// Realiza el registro
const handleRegister = async () => {
  registerError.value = '';
  if (registerPassword.value !== registerPassword2.value) {
    registerError.value = 'Las contraseñas no coinciden';
    return;
  }
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: registerNombre.value,
        email: registerEmail.value,
        password: registerPassword.value
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error de registro');
    await handleLogin({ email: registerEmail.value, password: registerPassword.value });
  } catch (err) {
    registerError.value = err.message;
  }
};

// Realiza el logout
const handleLogout = () => {
  isLoggedIn.value = false;
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('login-change'));
  router.push('/');
};

// Sincroniza el estado de login
const syncLogin = () => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
};

// Configuración de eventos
onMounted(() => {
  syncLogin();
  window.addEventListener('login-change', syncLogin);
  document.addEventListener('click', handleClickOutside, true);
  // NUEVO: Escucha evento global para abrir modal de autenticación
  window.addEventListener('abrir-modal-auth', (e) => {
    toggleAuthModal(e?.detail?.view || 'login');
  });
});

onUnmounted(() => {
  window.removeEventListener('login-change', syncLogin);
  document.removeEventListener('click', handleClickOutside, true);
  window.removeEventListener('abrir-modal-auth', () => {});
});
</script>

<template>
  <!-- Barra de navegación principal -->
  <div class="container mx-auto px-4 sm:px-6 sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur shadow-sm">
    <header class="flex justify-between items-center py-3 sm:py-4">
      <!-- Logo principal -->
      <router-link to="/" class="text-xl sm:text-2xl font-bold text-theme-primary hover:opacity-90 transition-opacity whitespace-nowrap">
        ENTRENAGYM
      </router-link>

      <!-- Navegación desktop -->
      <nav class="hidden lg:flex items-center space-x-1 xl:space-x-2">
        <div class="flex items-center space-x-2 xl:space-x-4 mr-2 xl:mr-4">
          <router-link
            to="/"
            class="text-sm xl:text-base font-medium text-gray-800 hover:text-theme-primary transition-colors duration-200 py-2 px-1 xl:px-2"
            active-class="text-theme-primary"
          >
            INICIO
          </router-link>
          <router-link
            :to="{ path: '/', hash: '#especialidades' }"
            class="text-sm xl:text-base font-medium text-gray-800 hover:text-theme-primary transition-colors duration-200 py-2 px-1 xl:px-2"
          >
            ESPECIALIDADES
          </router-link>
          <router-link
            :to="{ path: '/', hash: '#faq' }"
            class="text-sm xl:text-base font-medium text-gray-800 hover:text-theme-primary transition-colors duration-200 py-2 px-1 xl:px-2"
          >
            FAQ
          </router-link>
          <router-link
            to="/citas"
            class="text-sm xl:text-base font-medium text-gray-800 hover:text-theme-primary transition-colors duration-200 py-2 px-1 xl:px-2"
          >
            CITAS
          </router-link>
          <router-link
            to="/contacto"
            class="text-sm xl:text-base font-medium text-gray-800 hover:text-theme-primary transition-colors duration-200 py-2 px-1 xl:px-2"
            active-class="text-theme-primary"
          >
            CONTACTO
          </router-link>
        </div>
        <div class="flex items-center space-x-2 xl:space-x-4">
          <button
            v-if="!isLoggedIn"
            @click="toggleAuthModal('login')"
            class="text-sm xl:text-base bg-theme-primary px-3 py-1.5 xl:px-4 xl:py-2 text-white rounded-md hover:bg-white hover:text-theme-primary hover:border-theme-primary border-2 border-transparent transition-all duration-300 ease-in-out font-medium whitespace-nowrap"
          >
            INICIAR SESIÓN
          </button>
          <div v-else class="relative">
            <button
              ref="profileMenuButton"
              @click="toggleProfileMenu"
              class="text-sm xl:text-base font-medium text-gray-800 hover:text-theme-primary transition-colors duration-200 py-2 px-1 xl:px-3 flex items-center"
              aria-label="Toggle profile menu"
            >
              MI PERFIL
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <transition name="fade">
              <ul
                v-if="showProfileMenu"
                ref="profileMenuDropdown"
                id="profile-menu-dropdown"
                class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <li>
                  <router-link
                    to="/perfil"
                    class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    @click="closeProfileMenu"
                  >Ver perfil</router-link>
                </li>
                <li>
                  <button
                    @click="() => { handleLogout(); closeProfileMenu(); }"
                    class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >Cerrar sesión</button>
                </li>
              </ul>
            </transition>
          </div>
          <router-link
            to="/entrenador"
            class="text-sm xl:text-base bg-theme-primary px-3 py-1.5 xl:px-4 xl:py-2 text-white rounded-md hover:bg-white hover:text-theme-primary hover:border-theme-primary border-2 border-transparent transition-all duration-300 ease-in-out font-medium whitespace-nowrap"
            active-class="!bg-white !text-theme-primary !border-theme-primary"
          >
            BUSCAR ENTRENADOR
          </router-link>
        </div>
      </nav>

      <!-- Navegación tablet simplificada -->
      <nav class="hidden md:flex lg:hidden items-center space-x-3">
        <router-link
          to="/citas"
          class="text-sm font-medium text-gray-800 hover:text-theme-primary transition-colors duration-200 py-2"
        >
          CITAS
        </router-link>
        <button
          v-if="!isLoggedIn"
          @click="toggleAuthModal('login')"
          class="text-sm bg-theme-primary px-3 py-1.5 text-white rounded-md hover:bg-white hover:text-theme-primary hover:border-theme-primary border-2 border-transparent transition-all duration-300 ease-in-out font-medium whitespace-nowrap"
        >
          INICIAR SESIÓN
        </button>
        <router-link
          v-else
          to="/perfil"
          class="text-sm font-medium text-gray-800 hover:text-theme-primary transition-colors duration-200 py-2 px-2"
        >
          MI PERFIL
        </router-link>
      </nav>

      <!-- Botón menú móvil -->
      <button
        @click="toggleMobileNav"
        class="md:hidden focus:outline-none p-2"
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current text-gray-800">
          <path
            fill-rule="evenodd"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          ></path>
        </svg>
      </button>
    </header>
  </div>

  <!-- Menú móvil -->
  <transition name="fade">
    <div
      v-show="mobileNav"
      class="fixed inset-0 z-40 bg-white overflow-y-auto md:hidden transition-all duration-300 ease-in-out"
    >
      <div class="container mx-auto px-4 h-full flex flex-col min-h-screen">
        <div class="flex justify-between items-center py-4 sticky top-0 bg-white z-10">
          <span class="text-xl font-bold text-theme-primary">ENTRENAGYM</span>
          <button
            @click="toggleMobileNav"
            class="focus:outline-none p-2"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-x text-gray-800"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 
                .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 
                8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 
                8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>

        <ul class="flex-1 flex flex-col space-y-4 py-6">
          <li>
            <router-link
              to="/"
              @click="() => { closeMobileNav(); window.scrollTo({ top: 0, behavior: 'smooth' }); }"
              class="block text-lg text-center text-gray-800 hover:text-theme-primary transition-colors duration-200 py-3"
              active-class="text-theme-primary"
            >
              INICIO
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ path: '/', hash: '#especialidades' }"
              @click="closeMobileNav"
              class="block text-lg text-center text-gray-800 hover:text-theme-primary transition-colors duration-200 py-3"
            >
              ESPECIALIDADES
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ path: '/', hash: '#faq' }"
              @click="closeMobileNav"
              class="block text-lg text-center text-gray-800 hover:text-theme-primary transition-colors duration-200 py-3"
            >
              FAQ
            </router-link>
          </li>
          <li>
            <router-link
              to="/citas"
              @click="closeMobileNav"
              class="block text-lg text-center text-gray-800 hover:text-theme-primary transition-colors duration-200 py-3"
            >
              CITAS
            </router-link>
          </li>
          <li>
            <router-link
              to="/contacto"
              @click="closeMobileNav"
              class="block text-lg text-center text-gray-800 hover:text-theme-primary transition-colors duration-200 py-3"
            >
              CONTACTO
            </router-link>
          </li>
          <li class="mt-4 pt-4 border-t border-gray-200">
            <button
              v-if="!isLoggedIn"
              @click="toggleAuthModal('login'); closeMobileNav()"
              class="block bg-theme-primary text-white text-lg font-medium py-3 px-6 rounded-md hover:bg-white hover:text-theme-primary hover:border-theme-primary border-2 border-transparent transition-all duration-300 ease-in-out text-center mx-auto w-full max-w-xs"
            >
              INICIAR SESIÓN
            </button>
            <div v-else class="relative">
              <button
                @click="toggleProfileMenu"
                class="block text-lg text-center text-gray-800 hover:text-theme-primary transition-colors duration-200 py-3 w-full"
              >
                MI PERFIL
                <svg class="ml-1 w-4 h-4 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <transition name="fade">
                <ul
                  v-if="showProfileMenu"
                  class="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <li>
                    <router-link
                      to="/perfil"
                      class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      @click="() => { closeProfileMenu(); closeMobileNav(); }"
                    >Ver perfil</router-link>
                  </li>
                  <li>
                    <button
                      @click="() => { handleLogout(); closeProfileMenu(); closeMobileNav(); }"
                      class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >Cerrar sesión</button>
                  </li>
                </ul>
              </transition>
            </div>
          </li>
          <li>
            <router-link
              to="/entrenador"
              @click="closeMobileNav"
              class="block bg-theme-primary text-white text-lg font-medium py-3 px-6 rounded-md hover:bg-white hover:text-theme-primary hover:border-theme-primary border-2 border-transparent transition-all duration-300 ease-in-out text-center mx-auto w-full max-w-xs mt-4"
            >
              BUSCAR ENTRENADOR
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </transition>

  <!-- Modal de autenticación: login y registro -->
  <transition name="modal">
    <div v-if="showAuthModal" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 shadow-lg max-w-md w-full relative">
        <button @click="toggleAuthModal" class="absolute top-4 right-4 text-gray-500 text-xl">&times;</button>
        <h2 class="text-2xl font-bold mb-6 text-center">
          {{ isLoginView ? 'Iniciar Sesión' : 'Registrarse' }}
        </h2>
        <form v-if="isLoginView" @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              v-model="loginEmail"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              v-model="loginPassword"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
            >
          </div>
          <div v-if="loginError" class="text-red-500 text-sm">{{ loginError }}</div>
          <button
            type="submit"
            class="w-full bg-theme-primary text-white py-2 rounded-lg font-semibold hover:bg-theme-primary/90 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <form v-else @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              v-model="registerNombre"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              v-model="registerEmail"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              v-model="registerPassword"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
            <input
              v-model="registerPassword2"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
            >
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              required
              class="h-4 w-4 text-theme-primary focus:ring-theme-primary border-gray-300 rounded"
            >
            <label class="ml-2 block text-sm text-gray-700">
              Acepto los <a href="#" class="text-theme-primary underline">términos y condiciones</a>
            </label>
          </div>
          <div v-if="registerError" class="text-red-500 text-sm">{{ registerError }}</div>
          <button
            type="submit"
            class="w-full bg-theme-primary text-white py-2 rounded-lg font-semibold hover:bg-theme-primary/90 transition"
          >
            Registrarse
          </button>
        </form>
        <div class="mt-6 text-center">
          <span v-if="isLoginView" class="text-sm text-gray-600">
            ¿No tienes una cuenta?
            <button @click="isLoginView = false" class="text-theme-primary underline ml-1">Regístrate</button>
          </span>
          <span v-else class="text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <button @click="isLoginView = true" class="text-theme-primary underline ml-1">Inicia sesión</button>
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  nav.md\:flex {
    display: flex;
  }
}
@media (min-width: 1024px) {
  nav.lg\:flex {
    display: flex;
  }
}
</style>