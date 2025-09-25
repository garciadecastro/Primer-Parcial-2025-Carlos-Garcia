export function createPage(titulo, navLinks, contenido) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${titulo}</title>
      <!-- Tailwind CDN -->
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-200 font-serif">
      
      <!-- Navbar principal -->
      <nav class="bg-gray-900 border-b border-yellow-700 shadow-lg">
        <div class="max-w-6xl mx-auto px-6">
          <div class="flex justify-between items-center py-4">
            <!-- Logo / Título -->
            <div class="text-2xl font-extrabold text-yellow-500 tracking-wide uppercase">
              Tienda de Juegos de Rol
            </div>
            <!-- Links principales -->
            <ul class="flex space-x-6 text-lg font-bold">
              <li><a href="/juegos" class="hover:text-yellow-400">Juegos</a></li>
              <li><a href="/jugadores" class="hover:text-yellow-400">Jugadores</a></li>
              <li><a href="/jugadores/nuevo" class="hover:text-yellow-400">Nuevo Jugador</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Menú secundario de categorías -->
      <div class="bg-gray-800 border-b border-yellow-700 shadow-inner">
        <div class="max-w-6xl mx-auto px-6 py-2">
          <ul class="flex flex-wrap gap-4 text-sm font-semibold text-gray-300">
            <li><a href="/juegos?categoria=clásicos" class="hover:text-yellow-400">Clásicos</a></li>
            <li><a href="/juegos?categoria=fantasía" class="hover:text-yellow-400">Fantasía</a></li>
            <li><a href="/juegos?categoria=terror" class="hover:text-yellow-400">Terror</a></li>
            <li><a href="/juegos?categoria=ciencia-ficcion" class="hover:text-yellow-400">Ciencia Ficción</a></li>
            <li><a href="/juegos?categoria=historia-mitos" class="hover:text-yellow-400">Historia y Mitos</a></li>
          </ul>
        </div>
      </div>

      <!-- Contenido principal -->
      <main class="max-w-6xl mx-auto px-6 py-8">
        ${contenido}
      </main>

      <!-- Footer -->
      <footer class="bg-gray-950 border-t border-yellow-700 text-gray-400 py-6 mt-10">
        <div class="max-w-6xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2025 Carlos García de Castro - Parcial 1 de Aplicaciones Híbridas - Escuela Da Vinci</p>
          <p class="mt-2">
            <a href="https://github.com/garciadecastro" target="_blank" class="text-blue-400 hover:underline">
              GitHub: garciadecastro
            </a>
          </p>
        </div>
      </footer>
    </body>
    </html>
  `;
}
