# EntrenaGym

Plataforma web integral para conectar usuarios con profesionales del fitness, fisioterapia y nutrición en Colombia. Permite buscar especialistas, agendar y gestionar citas, suscribirse a un newsletter, contactar a la plataforma y mucho más. Incluye autenticación segura y una experiencia moderna y responsiva.

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Backend (Node.js + Express + MongoDB)](#backend-nodejs--express--mongodb)
- [Frontend (Vue 3 + TailwindCSS)](#frontend-vue-3--tailwindcss)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Variables de Entorno](#variables-de-entorno)
- [Funcionamiento de la API y Gestión de Citas](#funcionamiento-de-la-api-y-gestión-de-citas)
- [Flujo de Uso](#flujo-de-uso)
- [Captura de Pantalla](#captura-de-pantalla)
- [Pruebas recomendadas en Postman](#pruebas-recomendadas-en-postman)
- [Licencia](#licencia)

---

## Descripción General

EntrenaGym es una plataforma web que facilita la conexión entre personas interesadas en mejorar su salud y bienestar y profesionales certificados en entrenamiento personal, fisioterapia y nutrición. Los usuarios pueden:

- Buscar profesionales por especialidad y ubicación.
- Agendar, editar y eliminar citas (requiere registro e inicio de sesión).
- Suscribirse a un newsletter para recibir novedades.
- Contactar a la plataforma mediante un formulario.
- Navegar por preguntas frecuentes y conocer marcas asociadas.
- Acceder a una experiencia moderna, rápida y adaptada a dispositivos móviles y escritorio.

---

## Características Principales

- **Búsqueda avanzada** de profesionales por especialidad y ciudad.
- **Gestión de citas**: agenda, edita y elimina sesiones con entrenadores, fisioterapeutas o nutricionistas.
- **Autenticación segura** con JWT y formularios de login/registro.
- **Newsletter**: suscripción fácil y notificaciones visuales.
- **Formulario de contacto** para dudas o soporte.
- **Panel de usuario** para gestionar citas y perfil.
- **Sección de marcas asociadas** y partners oficiales.
- **Preguntas frecuentes** y recursos informativos.
- **Interfaz SPA** rápida y fluida con Vue Router.
- **Notificaciones visuales** con SweetAlert2.
- **Diseño responsive** y moderno con TailwindCSS.

---

## Estructura del Proyecto

```
entrenagym-vue/
│
├── backend/         # API RESTful con Node.js, Express y MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── src/             # Frontend SPA con Vue 3
│   ├── layouts/
│   ├── pages/
│   ├── sections/
│   ├── router/
│   ├── App.vue
│   └── main.js
│
├── public/          # Recursos estáticos (imágenes, favicon, etc.)
├── index.html
├── README.md
└── screenshot.png   # Captura de pantalla de la app (ver sección abajo)
```

---

## Backend (Node.js + Express + MongoDB)

- **API RESTful** para usuarios, autenticación, citas, newsletter y contacto.
- **Autenticación JWT**: registro e inicio de sesión, rutas protegidas para gestión de citas.
- **Modelos Mongoose**: User, Cita, Newsletter, Contacto.
- **Rutas principales**:
  - `/api/auth`: registro e inicio de sesión.
  - `/api/citas`: CRUD de citas (protegido).
  - `/api/newsletter`: suscripción al newsletter.
  - `/api/contacto`: envío de mensajes de contacto.
  - `/api/users`: listado de usuarios (ejemplo).
- **Validaciones** y manejo de errores robusto.
- **Configuración**: variables de entorno en `.env` para puerto, conexión MongoDB, JWT y URL frontend.
- **CORS** configurado para permitir la comunicación con el frontend.
- **Persistencia** de datos en MongoDB.

---

## Frontend (Vue 3 + TailwindCSS)

- **SPA** con Vue Router y composición de componentes.
- **Secciones principales**:
  - Hero, Especialidades, Profesionales, FAQ, Marcas, Newsletter, Contacto.
- **Gestión de citas**: página protegida, requiere login.
- **Autenticación**: modal de login/registro, estado persistente en localStorage.
- **Notificaciones**: uso de SweetAlert2 para feedback visual.
- **Responsive**: diseño adaptativo para móviles y escritorio.
- **Integración con backend**: consumo de API REST usando fetch.
- **Animaciones** y transiciones suaves.
- **Panel de usuario** para ver y gestionar citas.
- **Formulario de contacto** con validación y feedback visual.
- **Listado de profesionales destacados** y buscador avanzado.
- **Sección de marcas patrocinadoras** con animaciones y CTA para partners.
- **Preguntas frecuentes** con acordeón interactivo.
- **Footer** con enlaces rápidos y redes sociales.

---

## Instalación y Puesta en Marcha

### 1. Clonar el repositorio

```bash
git clone <https://github.com/willi-lang/entrenagym-vue.git>
cd entrenagym-vue
```

### 2. Backend

```bash
cd backend
npm install
# Configura el archivo .env según tu entorno (ver sección abajo)
npm run dev
# El backend corre por defecto en http://localhost:5000
```

### 3. Frontend

```bash
cd ..
npm install
npm run dev
# El frontend corre por defecto en http://localhost:5173
```

---

## Variables de Entorno

Ejemplo de `.env` para el backend:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/entrenagym
JWT_SECRET=supersecreto
FRONTEND_URL=http://localhost:5173
```

Asegúrate de tener MongoDB corriendo localmente o ajusta `MONGO_URI` según tu entorno.

---

## Funcionamiento de la API y Gestión de Citas

### Endpoints principales

- **Autenticación**
  - `POST /api/auth/register`: Registra un nuevo usuario.
  - `POST /api/auth/login`: Inicia sesión y devuelve un token JWT.

- **Citas (protegido con JWT)**
  - `GET /api/citas`: Obtiene todas las citas del usuario autenticado.
  - `POST /api/citas`: Crea una nueva cita. Requiere campos como fecha, hora, entrenador, tipo y descripción.
  - `PUT /api/citas/:id`: Edita una cita existente del usuario.
  - `DELETE /api/citas/:id`: Elimina una cita del usuario.

- **Newsletter**
  - `POST /api/newsletter`: Suscribe un email al boletín.

- **Contacto**
  - `POST /api/contacto`: Envía un mensaje de contacto.

### Gestión de Citas

- **Crear cita**: Desde la sección "Citas", el usuario elige fecha, hora, entrenador, tipo de sesión (presencial o virtual) y puede añadir notas. Al enviar, se realiza una petición POST autenticada.
- **Editar cita**: El usuario puede modificar cualquier campo de una cita existente. Se usa el endpoint PUT.
- **Eliminar cita**: El usuario puede eliminar una cita desde la lista, confirmando la acción. Se usa el endpoint DELETE.
- **Filtrar citas**: Se pueden ver todas, solo futuras o solo pasadas.
- **Visualización**: Cada cita muestra detalles del entrenador, fecha, hora, tipo y notas.

### Seguridad

- Todas las rutas de citas requieren autenticación JWT.
- El token se almacena en localStorage y se envía en el header Authorization.
- El backend valida el token y asocia las citas al usuario autenticado.

---

## Flujo de Uso

1. **Navega a la página principal**: explora especialidades, profesionales y marcas.
2. **Regístrate o inicia sesión** para acceder a la gestión de citas.
3. **Agrega, edita o elimina citas** con entrenadores desde la sección "Citas".
4. **Suscríbete al newsletter** para recibir novedades.
5. **Contacta a la plataforma** mediante el formulario de contacto.
6. **Cierra sesión** desde el menú de perfil.
7. **Explora preguntas frecuentes** y accede a recursos útiles.
8. **Descubre marcas asociadas** y oportunidades para partners.

---

## Captura de Pantalla

![Screenshot de EntrenaGym](./screenshot.png)

---

## Pruebas recomendadas en Postman

A continuación se describen las mejores pruebas que puedes realizar en Postman para verificar el correcto funcionamiento de la API de EntrenaGym. Recuerda incluir el header `Authorization: Bearer <token>` en las rutas protegidas.

### 1. Autenticación

- **Registro de usuario**
  - Método: `POST`
  - URL: `http://localhost:5000/api/auth/register`
  - Body (JSON):
    ```json
    {
      "nombre": "Juan Pérez",
      "email": "juan@email.com",
      "password": "123456"
    }
    ```

- **Login de usuario**
  - Método: `POST`
  - URL: `http://localhost:5000/api/auth/login`
  - Body (JSON):
    ```json
    {
      "email": "juan@email.com",
      "password": "123456"
    }
    ```
  - **Respuesta esperada:** token JWT y datos del usuario.

### 2. Gestión de Citas (requiere token JWT)

- **Crear cita**
  - Método: `POST`
  - URL: `http://localhost:5000/api/citas`
  - Headers: `Authorization: Bearer <token>`
  - Body (JSON):
    ```json
    {
      "fecha": "2024-07-01",
      "hora": "10:00",
      "entrenador": "Nombre Entrenador",
      "tipo": "presencial",
      "descripcion": "Sesión de entrenamiento funcional"
    }
    ```

- **Obtener citas del usuario**
  - Método: `GET`
  - URL: `http://localhost:5000/api/citas`
  - Headers: `Authorization: Bearer <token>`

- **Editar cita**
  - Método: `PUT`
  - URL: `http://localhost:5000/api/citas/<id_cita>`
  - Headers: `Authorization: Bearer <token>`
  - Body (JSON):
    ```json
    {
      "hora": "11:00",
      "descripcion": "Cambio de horario"
    }
    ```

- **Eliminar cita**
  - Método: `DELETE`
  - URL: `http://localhost:5000/api/citas/<id_cita>`
  - Headers: `Authorization: Bearer <token>`

### 3. Newsletter

- **Suscribirse al newsletter**
  - Método: `POST`
  - URL: `http://localhost:5000/api/newsletter`
  - Body (JSON):
    ```json
    {
      "email": "juan@email.com"
    }
    ```

### 4. Contacto

- **Enviar mensaje de contacto**
  - Método: `POST`
  - URL: `http://localhost:5000/api/contacto`
  - Body (JSON):
    ```json
    {
      "nombre": "Juan Pérez",
      "email": "juan@email.com",
      "mensaje": "Tengo una duda sobre los entrenadores."
    }
    ```

---

## Licencia

Este proyecto es solo para fines educativos y demostrativos.