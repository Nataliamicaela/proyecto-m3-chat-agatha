# Agatha Chat

## Descripción

Agatha Chat es una Single Page Application (SPA) desarrollada como Proyecto Integrador del Módulo 3 Frontend.

La aplicación permite conversar con Agatha Harkness, personaje ficticio del universo Marvel, utilizando inteligencia artificial mediante Google Gemini.

La personalidad del personaje fue diseñada mediante un System Prompt personalizado para que responda de forma inteligente, elegante, irónica y conversacional, manteniendo el estilo característico de Agatha.

---

## Personaje elegido

### Agatha Harkness

Agatha Harkness es una poderosa bruja perteneciente al universo Marvel.

Posee amplios conocimientos sobre magia, historia, cultura y diversos temas generales. En esta aplicación actúa como asistente conversacional manteniendo una personalidad segura, ingeniosa y misteriosa.

---

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (ES Modules)
* History API
* LocalStorage
* Google Gemini AI
* Vercel Functions
* Vitest
* Git y GitHub

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
GEMINI_API_KEY=TU_API_KEY
```

### 4. Ejecutar la aplicación

```bash
npx vercel dev
```

Abrir:

```text
http://localhost:3000
```

---

## Ejecución de tests

Ejecutar:

```bash
npm test
```

La aplicación incluye 4 tests unitarios desarrollados con Vitest.

---

## Despliegue en Vercel

1. Conectar el repositorio de GitHub a Vercel.
2. Configurar la variable de entorno:

```env
GEMINI_API_KEY
```

3. Realizar el deploy.
4. Verificar el correcto funcionamiento de la aplicación.

---

## Estructura del proyecto

```text
/api
  functions.js

/src
  index.html
  styles.css
  app.js
  chat.js
  utils.js

/tests
  app.test.js
  utils.test.js

.env.example
README.md
package.json
```

---

## Uso de Inteligencia Artificial

Durante el desarrollo se utilizó inteligencia artificial como herramienta de apoyo para:

* Diseño de la arquitectura del proyecto.
* Implementación de la integración con Google Gemini.
* Creación de Serverless Functions.
* Resolución de problemas de routing SPA.
* Implementación de tests unitarios con Vitest.
* Diseño del System Prompt del personaje.

Las sugerencias generadas fueron evaluadas y adaptadas antes de incorporarlas al proyecto.

---

## Capturas de pantalla

Agregar aquí capturas de:

* Home
* Chat funcionando
* About
* Conversación con Agatha

---

## Aplicación desplegada

URL de producción:

[PENDIENTE DE AGREGAR]
