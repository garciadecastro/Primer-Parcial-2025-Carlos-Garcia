import { createPage } from "../utils/page.js";

// Menú de navegación
const navLinks = `
  <li><a href="/juegos" class="hover:text-yellow-400 font-bold tracking-wide">Inicio</a></li>
  <li><a href="/juegos?categoria=clásicos" class="hover:text-yellow-400">Clásicos</a></li>
  <li><a href="/juegos?categoria=fantasía" class="hover:text-yellow-400">Fantasía</a></li>
  <li><a href="/juegos?categoria=terror" class="hover:text-yellow-400">Terror</a></li>
  <li><a href="/juegos?categoria=ciencia-ficcion" class="hover:text-yellow-400">Ciencia Ficción</a></li>
  <li><a href="/juegos?categoria=historia-mitos" class="hover:text-yellow-400">Historia y Mitos</a></li>
  <li><a href="/juegos/nuevo" class="hover:text-yellow-400">Nuevo juego</a></li>
`;

export function createJuegosListPage(juegos, query = {}) {
  let contenido = `
    <div class="bg-gradient-to-b from-gray-950 to-gray-800 text-gray-200 p-8 rounded-lg shadow-2xl border border-yellow-700">
      <h1 class="text-4xl font-extrabold text-yellow-500 mb-8 font-serif tracking-wider uppercase">Catálogo de Juegos</h1>
      
      <!-- Búsqueda por nombre -->
      <form method="get" action="/juegos" class="mb-6 flex space-x-2">
        <input 
          type="text" 
          name="nombre" 
          placeholder="Buscar por nombre..." 
          value="${query?.nombre ?? ""}" 
          class="flex-1 p-3 rounded bg-gray-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
        />
        <button 
          type="submit"
          class="bg-yellow-600 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase tracking-wide"
        >
          Buscar
        </button>
      </form>

      <!-- Búsqueda por precio -->
      <form method="get" action="/juegos" class="mb-8 flex space-x-2">
        <input
          type="number"
          name="precioMax"
          placeholder="Precio máximo..."
          value="${query?.precioMax ?? ""}"
          class="w-40 p-3 rounded bg-gray-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
        />
        <button 
          type="submit"
          class="bg-yellow-600 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase tracking-wide"
        >
          Filtrar
        </button>
      </form>
  `;

  if (juegos.length === 0) {
    contenido += `
      <div class="text-center p-6 bg-red-950 border border-red-700 rounded-lg">
        <h2 class="text-xl font-bold text-red-300">No tenemos juegos que coincidan con tu búsqueda</h2>
        <a href="/juegos" class="mt-4 inline-block bg-yellow-600 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase">
          Volver al catálogo completo
        </a>
      </div>
    </div>`; 
    return createPage("Sin resultados", navLinks, contenido);
  }

  contenido += `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">`;

  juegos.forEach((juego) => {
    contenido += `
      <div class="p-6 border border-yellow-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition transform hover:scale-105 duration-200 flex flex-col items-center shadow-md">
        <img 
          src="${juego.imagen || "https://placehold.co/200x200?text=Juego"}" 
          alt="Portada de ${juego.nombre}" 
          class="w-48 h-48 object-cover rounded-lg mb-4 shadow-lg border-4 border-yellow-600"
        />
        <span class="font-bold text-lg text-yellow-300 font-serif text-center">${juego.nombre}</span>
        <div class="mt-4 flex space-x-4">
          <a href="/juegos/${juego._id}" class="text-blue-400 hover:text-yellow-300 font-bold">Ver</a>
          <a href="/juegos/editar/${juego._id}" class="text-green-400 hover:text-yellow-300 font-bold">Editar</a>
          <a href="/juegos/borrar/${juego._id}" class="text-red-400 hover:text-yellow-300 font-bold">Borrar</a>
        </div>
      </div>`;
  });

  contenido += `</div></div>`;
  return createPage("Catálogo de Juegos", navLinks, contenido);
}

export function createDetailPage(juego) {
  let contenido = `
    <div class="bg-gray-950 text-gray-200 p-8 rounded-lg shadow-2xl border border-yellow-700 max-w-xl mx-auto">
      <img 
        src="${juego.imagen || "https://placehold.co/400x400?text=Juego"}" 
        alt="Portada de ${juego.nombre}" 
        class="w-64 h-64 object-cover rounded-lg mb-6 shadow-lg border-4 border-yellow-600 mx-auto"
      />
      <h2 class="text-3xl font-bold text-yellow-500 mb-6 font-serif uppercase text-center">${juego.nombre}</h2>
      <ul class="space-y-2 text-gray-300">
        <li><strong>Editorial:</strong> ${juego.editorial}</li>
        <li><strong>Año:</strong> ${juego.year}</li>
        <li><strong>Categoría:</strong> ${juego.categoria}</li>
        <li><strong>Precio:</strong> ${juego.precio}</li>
      </ul>
      <div class="mt-8 flex justify-center space-x-6">
        <a href="/juegos" class="text-blue-400 hover:text-yellow-300 font-bold">Catálogo</a>
        <a href="/juegos/editar/${juego._id}" class="text-green-400 hover:text-yellow-300 font-bold">Editar</a>
        <a href="/juegos/borrar/${juego._id}" class="text-red-400 hover:text-yellow-300 font-bold">Borrar</a>
      </div>
    </div>
  `;
  return createPage(juego.nombre, navLinks, contenido);
}

export function formularioNuevoJuego() {
  const contenido = `
    <div class="bg-gray-950 text-gray-200 p-8 rounded-lg shadow-2xl border border-yellow-700 max-w-xl mx-auto">
      <h2 class="text-3xl font-extrabold text-yellow-500 mb-6 font-serif uppercase">Añadir un nuevo juego</h2>
      <form class="space-y-5" action="/juegos/nuevo" method="post">
        ${crearCampo("Nombre", "nombre", "HeroQuest")}
        ${crearCampo("Editorial", "editorial", "Games Workshop")}
        ${crearCampo("Año", "year", "1989", "number")}
        <div>
          <label class="block text-sm font-bold text-yellow-400">Categoría</label>
            <select 
              name="categoria"
              class="w-full border border-yellow-700 bg-gray-800 text-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
              required
            >
              <option value="clásicos">Clásicos</option>
              <option value="fantasía">Fantasía</option>
              <option value="terror">Terror</option>
              <option value="ciencia-ficcion">Ciencia Ficción</option>
              <option value="historia-mitos">Historia y Mitos</option>
            </select>
        </div>
        ${crearCampo("Precio", "precio", "50000", "number")}
        ${crearCampo("Imagen (URL)", "imagen", "https://.../imagen.jpg", "url")}
        <button type="submit" class="bg-yellow-600 text-black px-8 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase tracking-wide">
          Guardar
        </button>
      </form>
    </div>
  `;
  return createPage("Nuevo juego", navLinks, contenido);
}

export function formularioEditarJuego(juego){
  let html  = `
    <div class="bg-gray-950 text-gray-200 p-8 rounded-lg shadow-2xl border border-yellow-700 max-w-xl mx-auto">
      <h2 class="text-3xl font-extrabold text-yellow-500 mb-6 font-serif uppercase">Editar juego</h2>
      <form class="space-y-5" action='/juegos/editar/${juego._id}' method='post'>
        ${crearCampoEditar("Nombre", "nombre", juego.nombre)}
        ${crearCampoEditar("Editorial", "editorial", juego.editorial)}
        ${crearCampoEditar("Año", "year", juego.year, "number")}
        <div>
          <label class="block text-sm font-bold text-yellow-400">Categoría</label>
            <select 
              name="categoria"
              class="w-full border border-yellow-700 bg-gray-800 text-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
              required
            >
              <option value="clásicos" ${juego.categoria === "clásicos" ? "selected" : ""}>Clásicos</option>
              <option value="fantasía" ${juego.categoria === "fantasía" ? "selected" : ""}>Fantasía</option>
              <option value="terror" ${juego.categoria === "terror" ? "selected" : ""}>Terror</option>
              <option value="ciencia-ficcion" ${juego.categoria === "ciencia-ficcion" ? "selected" : ""}>Ciencia Ficción</option>
              <option value="historia-mitos" ${juego.categoria === "historia-mitos" ? "selected" : ""}>Historia y Mitos</option>
            </select>
      </div>
        ${crearCampoEditar("Precio", "precio", juego.precio, "number")}
        ${crearCampoEditar("Imagen (URL)", "imagen", juego.imagen || "", "url")}
        <button type='submit' class="bg-yellow-600 text-black px-8 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase">
          Guardar cambios
        </button>
      </form>
      <div class="mt-6">
        <a href="/juegos" class="text-yellow-400 hover:text-white font-bold">Volver</a>
      </div>
    </div>
  `;
  return createPage("Editar juego", navLinks, html);
}

// Helper para inputs
function crearCampo(label, name, placeholder, type = "text", value = "") {
  return `
    <div>
      <label class="block text-sm font-bold text-yellow-400 tracking-wide">${label}</label>
      <input 
        type="${type}" 
        name="${name}" 
        placeholder="${placeholder}" 
        value="${value}" 
        class="w-full border border-yellow-700 bg-gray-800 text-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
        required
      >
    </div>
  `;
}

// Helper para inputs ya rellenos (editar juego)
function crearCampoEditar(label, name, value, type="text") {
  return `
    <div>
      <label class="block text-sm font-bold text-yellow-400 tracking-wide">${label}</label>
      <input 
        type="${type}" 
        name="${name}" 
        value="${value}" 
        class="w-full border border-yellow-700 bg-gray-800 text-gray-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
        required
      >
    </div>
  `;
}

export function errorPage() {
  let contenido = `
    <div class="bg-red-950 text-red-200 p-8 rounded-lg shadow-2xl border border-red-700 max-w-xl mx-auto">
      <h2 class="text-3xl font-bold mb-6 font-serif uppercase">No se encontró el juego buscado o no se actualizó</h2>
      <a href="/juegos" class="text-yellow-400 hover:text-white font-bold">Volver al menú principal</a>
    </div>
  `;
  return createPage("Error", navLinks, contenido);
}

export function formularioBorrarJuego(juego) {
  let html = `
    <div class="bg-gray-950 text-gray-200 p-8 rounded-lg shadow-2xl border border-red-700 max-w-xl mx-auto">
      <h2 class="text-3xl font-bold text-red-500 mb-6 font-serif uppercase">¿Seguro que quieres borrar este juego?</h2>
      <form class="space-y-5" action='/juegos/borrar/${juego._id}' method='post'>
        <div class="p-4 bg-gray-800 border border-yellow-700 rounded-lg">
          <p><span class="font-semibold">Nombre:</span> ${juego.nombre}</p>
          <p><span class="font-semibold">Editorial:</span> ${juego.editorial}</p>
          <p><span class="font-semibold">Precio:</span> ${juego.precio}</p>
          <p><span class="font-semibold">Año:</span> ${juego.year}</p>
          <p><span class="font-semibold">Categoría:</span> ${juego.categoria}</p>
        </div>
        <div class="flex space-x-4">
          <button type='submit' class="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-600 font-bold uppercase">
            Borrar
          </button>
          <a href="/juegos" class="text-yellow-400 hover:text-white font-bold">Volver</a>
        </div>
      </form>
    </div>
  `;
  return createPage("Borrar juego", navLinks, html);
}

export function borrarExito(id) {
  let html = `
    <div class="bg-green-950 text-green-200 p-8 rounded-lg shadow-2xl border border-green-700 max-w-xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-green-400 mb-6 font-serif uppercase">Juego borrado con éxito</h2>
      <p class="text-lg">ID: ${id}</p>
      <a href="/juegos" class="mt-6 inline-block bg-yellow-600 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 font-bold uppercase">
        Volver al catálogo
      </a>
    </div>
  `;
  return createPage("Juego borrado", navLinks, html);
}
