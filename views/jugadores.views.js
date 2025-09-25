import { createPage } from "../utils/page.js";

// Menú de navegación
const navLinks = `
  <li><a href="/juegos" class="hover:text-yellow-400">Juegos</a></li>
  <li><a href="/jugadores" class="hover:text-yellow-400">Jugadores</a></li>
  <li><a href="/jugadores/nuevo" class="hover:text-yellow-400">Nuevo jugador</a></li>
  <li><a href="/clanes" class="hover:text-yellow-400">Clanes</a></li>
  <li><a href="/torneos" class="hover:text-yellow-400">Torneos</a></li>
`;

// Listado de jugadores
export function listaJugadores(jugadores) {
  let contenido = `
    <div class="bg-gradient-to-b from-gray-950 to-gray-800 text-gray-200 p-6 rounded-lg shadow-2xl border border-yellow-700">
      <h1 class="text-4xl font-extrabold text-yellow-500 mb-6 font-serif tracking-wider uppercase">Lista de Jugadores</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  `;

  if (jugadores.length === 0) {
    contenido += `
      <div class="col-span-full text-center p-6 bg-red-950 border border-red-700 rounded-lg">
        <h2 class="text-xl font-bold text-red-300">No hay jugadores registrados todavía</h2>
        <a href="/jugadores/nuevo" class="mt-4 inline-block bg-yellow-600 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 font-bold">
          Crear nuevo jugador
        </a>
      </div>`;
  } else {
    jugadores.forEach(jugador => {
      contenido += `
        <div class="p-6 border border-yellow-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition transform hover:scale-105 duration-200 flex flex-col items-center shadow-md">
          <img 
            src="${jugador.foto || "https://placehold.co/150x150?text=Jugador"}" 
            alt="Foto de ${jugador.nombre}" 
            class="w-32 h-32 object-cover rounded-full mb-4 border-4 border-yellow-600 shadow-lg"
          />
          <span class="font-bold text-lg text-yellow-300 font-serif text-center">${jugador.nombre}</span>
          <p class="mt-2 text-sm italic text-gray-400">${jugador.descripcion || "Aventurero sin descripción"}</p>
          <div class="mt-4 flex space-x-4">
            <a href="/jugadores/${jugador._id}" class="text-blue-400 hover:text-yellow-300 font-bold">Ver</a>
            <a href="/jugadores/editar/${jugador._id}" class="text-green-400 hover:text-yellow-300 font-bold">Editar</a>
            <a href="/jugadores/borrar/${jugador._id}" class="text-red-400 hover:text-yellow-300 font-bold">Borrar</a>
          </div>
        </div>
      `;
    });
  }

  contenido += `
      </div>
    </div>
  `;

  return createPage("Lista de Jugadores", navLinks, contenido);
}

// Formulario para registrar un nuevo jugador
export function formularioNuevoJugador() {
  const contenido = `
    <div class="bg-gray-950 text-gray-200 p-8 rounded-lg shadow-2xl border border-yellow-700 max-w-xl mx-auto">
      <h2 class="text-3xl font-extrabold text-yellow-500 mb-6 font-serif tracking-wide uppercase">Crear nuevo jugador</h2>
      <form class="space-y-5" action="/jugadores/nuevo" method="post">
        ${crearCampo("Nombre", "nombre", "Aragorn")}
        ${crearCampo("Foto (URL)", "foto", "https://picsum.photos/200", "url")}
        ${crearCampo("Descripción", "descripcion", "Guerrero de la Tierra Media")}
        <button type="submit" class="bg-yellow-600 text-black px-8 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase tracking-wide">
          Guardar jugador
        </button>
      </form>
    </div>
  `;
  return createPage("Nuevo jugador", navLinks, contenido);
}

// Formulario de edición de jugador
export function formularioEditarJugador(jugador) {
  const contenido = `
    <div class="bg-gray-950 text-gray-200 p-8 rounded-lg shadow-2xl border border-yellow-700 max-w-xl mx-auto">
      <h2 class="text-3xl font-extrabold text-yellow-500 mb-6 font-serif tracking-wide uppercase">Editar jugador</h2>
      <form class="space-y-5" action="/jugadores/editar/${jugador._id}" method="post">
        ${crearCampo("Nombre", "nombre", jugador.nombre)}
        ${crearCampo("Foto (URL)", "foto", jugador.foto, "url")}
        ${crearCampo("Descripción", "descripcion", jugador.descripcion)}
        <button type="submit" class="bg-yellow-600 text-black px-8 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase">
          Guardar cambios
        </button>
      </form>
    </div>
  `;
  return createPage("Editar jugador", navLinks, contenido);
}

// Vista de detalle del jugador
export function detalleJugador(jugador, juegosDisponibles = []) {
  const opcionesJuegos = juegosDisponibles.map(j => `
    <label class="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
      <input 
        type="checkbox" 
        name="juegos" 
        value="${j._id}" 
        ${jugador.juegos?.some(id => id.toString() === j._id.toString()) ? "checked" : ""}
        class="accent-yellow-600"
      >
      <span>${j.nombre}</span>
    </label>
  `).join("");

  const contenido = `
    <div class="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-200 p-8 rounded-lg shadow-2xl border border-yellow-700 max-w-2xl mx-auto">
      
      <!-- Cabecera -->
      <div class="text-center">
        <img src="${jugador.foto}" alt="Foto de ${jugador.nombre}" 
          class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-yellow-600 shadow-lg"/>
        <h2 class="text-3xl font-extrabold text-yellow-500 mb-2 font-serif uppercase tracking-wide">
          ${jugador.nombre}
        </h2>
        <p class="text-gray-400 italic">${jugador.descripcion || "Aventurero misterioso"}</p>
      </div>

      <!-- Lista de favoritos actuales -->
      <div class="mt-8">
        <h3 class="text-xl font-bold text-yellow-400 mb-2">Juegos favoritos</h3>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          ${
            (jugador.juegos && jugador.juegos.length > 0)
              ? juegosDisponibles
                  .filter(j => jugador.juegos.some(id => id.toString() === j._id.toString()))
                  .map(j => `<li>${j.nombre}</li>`)
                  .join("")
              : "<li>No tiene juegos favoritos seleccionados.</li>"
          }
        </ul>
      </div>

      <!-- Formulario con dropdown -->
      <form action="/jugadores/${jugador._id}/favoritos" method="post" class="mt-10">
        <div class="relative">
          <button type="button" 
            onclick="document.getElementById('dropdown-juegos').classList.toggle('hidden')" 
            class="w-full bg-gray-800 border border-yellow-700 px-4 py-2 rounded-lg text-yellow-400 font-bold hover:bg-gray-700">
            Seleccionar juegos favoritos ▼
          </button>
          <div id="dropdown-juegos" class="hidden absolute z-10 mt-2 w-full bg-gray-900 border border-yellow-700 rounded-lg max-h-60 overflow-y-auto shadow-xl">
            ${opcionesJuegos}
          </div>
        </div>
        
        <div class="text-center mt-6 space-x-4">
          <button type="submit" 
            class="bg-yellow-600 text-black px-8 py-3 rounded-lg font-extrabold uppercase tracking-wide shadow-md hover:bg-yellow-500 transition transform hover:scale-105">
            Guardar favoritos
          </button>
          <a href="/jugadores" 
            class="inline-block bg-gray-800 text-gray-200 px-8 py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-700 border border-gray-600 transition">
            Volver a la lista
          </a>
        </div>
      </form>
    </div>
  `;

  return createPage("Detalle jugador", "", contenido);
}


// Confirmación para borrar un jugador
export function borrarExito(id) {
  const contenido = `
    <div class="bg-green-950 text-green-200 p-8 rounded-lg shadow-2xl border border-green-700 max-w-xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-green-400 mb-4 font-serif uppercase">Jugador borrado con éxito</h2>
      <p class="text-lg">ID: ${id}</p>
      <a href="/jugadores" class="mt-6 inline-block bg-yellow-600 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase">
        Volver a la lista de jugadores
      </a>
    </div>
  `;
  return createPage("Jugador borrado", navLinks, contenido);
}

// Página de error
export function errorPage(mensaje) {
  const contenido = `
    <div class="bg-red-950 text-red-200 p-8 rounded-lg shadow-2xl border border-red-700 max-w-xl mx-auto">
      <h2 class="text-3xl font-bold mb-6 font-serif uppercase">Error: ${mensaje}</h2>
      <a href="/juegos" class="text-yellow-400 hover:text-white font-bold">Volver al inicio</a>
    </div>
  `;
  return createPage("Error", navLinks, contenido);
}

// Helper para campos
function crearCampo(label, name, value = "", type = "text") {
  return `
    <div>
      <label class="block text-sm font-bold text-yellow-400 tracking-wide">${label}</label>
      <input 
        type="${type}" 
        name="${name}" 
        value="${value}" 
        placeholder="${value}" 
        class="w-full border border-yellow-700 bg-gray-800 text-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
        required
      >
    </div>
  `;
}
