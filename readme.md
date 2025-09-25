# Parcial 1 - Aplicaciones Híbridas
**Alumno:** Carlos García de Castro  
**Materia:** Aplicaciones Híbridas  
**Institución:** Escuela Da Vinci  
**Año:** 2025

---

## Descripción
Este proyecto corresponde al primer parcial de la materia Aplicaciones Híbridas.  
El objetivo fue desarrollar una aplicación web completa que combine:

- Un backend en Node.js y Express.
- Una base de datos en MongoDB Atlas.
- Rutas y controladores para administrar recursos.
- Vistas dinámicas con Tailwind CSS.
- Una API REST para exponer datos en formato JSON.

La aplicación permite gestionar un catálogo de juegos y una lista de jugadores, incluyendo la relación de los juegos favoritos de cada jugador.

---

## Tecnologías utilizadas y relación con el parcial

- **Node.js**: entorno de ejecución que permite levantar el servidor. Relacionado con el requerimiento de usar un backend en JavaScript.
- **Express**: framework que organiza las rutas, controladores y middlewares. Usado para manejar las solicitudes HTTP de juegos y jugadores.
- **MongoDB Atlas**: base de datos en la nube, con dos colecciones principales (`juegos` y `jugadores`). Cumple con el requisito de persistir datos en un servicio externo.
- **Servicios (services)**: capa que se conecta a MongoDB y aplica validaciones (ejemplo: año de publicación de los juegos). Esto implementa la lógica de acceso a datos pedida en el parcial.
- **Controladores (controllers)**: reciben las peticiones y coordinan entre servicios y vistas. Permiten organizar el código según lo pedido en el parcial.
- **Tailwind CSS**: librería de estilos aplicada en las vistas. Cumple con el requisito de darle estilo a las páginas HTML generadas desde el servidor.
- **Nodemon**: herramienta para desarrollo, que reinicia el servidor automáticamente al detectar cambios. Se utilizó para facilitar la prueba durante el desarrollo.

---

## Estructura del proyecto
