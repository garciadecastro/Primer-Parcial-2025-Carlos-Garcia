import * as service from "../services/jugadores.service.js";
import * as views from "../views/jugadores.views.js";

// Mostrar formulario de registro
export function formularioNuevoJugador(req, res) {
  res.send(views.formularioNuevoJugador());
}

// Guardar un nuevo jugador
export function guardarJugador(req, res) {
  const jugador = {
    nombre: req.body.nombre,
    foto: req.body.foto,
    descripcion: req.body.descripcion,
    password: req.body.password,
    juegos: [] // por defecto vacío
  };

  service.guardarJugador(jugador)
    .then(jugadorGuardado => res.send(views.detalleJugador(jugadorGuardado)))
    .catch(err => {
      console.error("Error guardando jugador:", err);
      res.send(views.errorPage("No se pudo crear el jugador"));
    });
}

// Listar todos los jugadores (que no estén eliminados)
export function listarJugadores(req, res) {
  service.getJugadores()
    .then(jugadores => res.send(views.listaJugadores(jugadores)))
    .catch(err => {
      console.error("Error listando jugadores:", err);
      res.send(views.errorPage("No se pudieron listar los jugadores"));
    });
}

// Ver detalle de un jugador (con lista de juegos disponibles)
export function getJugadorById(req, res) {
  const id = req.params.id;

  // Traemos jugador y juegos en paralelo
  Promise.all([
    service.getJugadorById(id),
    import("../services/juegos.service.js").then(mod => mod.getJuegos()) 
  ])
    .then(([jugador, juegos]) => {
      if (jugador) {
        res.send(views.detalleJugador(jugador, juegos)); 
      } else {
        res.send(views.errorPage("Jugador no encontrado"));
      }
    })
    .catch(err => {
      console.error("Error obteniendo jugador:", err);
      res.send(views.errorPage("No se pudo obtener el jugador"));
    });
}


export function actualizarJuegosFavoritos(req, res) {
  const id = req.params.id;

  // Siempre array, nunca undefined ni [undefined]
  let juegosIds = req.body.juegos || [];
  if (!Array.isArray(juegosIds)) juegosIds = [juegosIds];

  service.actualizarJuegosFavoritos(id, juegosIds)
    .then(() => res.redirect(`/jugadores/${id}`))
    .catch(err => {
      console.error("Error actualizando juegos favoritos:", err);
      res.send(views.errorPage("No se pudieron actualizar los juegos favoritos"));
    });
}

// Formulario de edición
export function formularioEditarJugador(req, res) {
  const id = req.params.id;
  service.getJugadorById(id)
    .then(jugador => {
      if (jugador) {
        res.send(views.formularioEditarJugador(jugador));
      } else {
        res.send(views.errorPage("Jugador no encontrado"));
      }
    })
    .catch(err => {
      console.error("Error cargando formulario de edición:", err);
      res.send(views.errorPage("No se pudo cargar el formulario"));
    });
}

// Editar un jugador
export function editarJugador(req, res) {
  const id = req.params.id;
  const jugador = {
    _id: id,
    nombre: req.body.nombre,
    foto: req.body.foto,
    descripcion: req.body.descripcion,
    password: req.body.password
  };

  service.editarJugador(jugador)
    .then(jugadorEditado => res.send(views.detalleJugador(jugadorEditado)))
    .catch(err => {
      console.error("Error editando jugador:", err);
      res.send(views.errorPage("No se pudo editar el jugador"));
    });
}

// Formulario de borrado
export function formularioBorrarJugador(req, res) {
  const id = req.params.id;
  service.getJugadorById(id)
    .then(jugador => {
      if (jugador) {
        // Podés hacer una vista más elaborada si querés
        res.send(`
          <div class="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-lg border border-red-700">
            <h2 class="text-2xl font-bold text-red-500 mb-4 font-serif">¿Seguro que quieres borrar a este jugador?</h2>
            <p><strong>Nombre:</strong> ${jugador.nombre}</p>
            <form action="/jugadores/borrar/${jugador._id}" method="post">
              <button type="submit" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 font-bold">
                Borrar
              </button>
              <a href="/jugadores" class="ml-4 text-yellow-400 hover:text-white">Cancelar</a>
            </form>
          </div>
        `);
      } else {
        res.send(views.errorPage("Jugador no encontrado"));
      }
    })
    .catch(err => {
      console.error("Error cargando formulario de borrado:", err);
      res.send(views.errorPage("No se pudo cargar el formulario de borrado"));
    });
}

// Borrar un jugador (soft delete → eliminado:true)
export function borrarJugador(req, res) {
  const id = req.params.id;
  service.borrarJugador(id)
    .then(() => res.send(views.borrarExito(id)))
    .catch(err => {
      console.error("Error borrando jugador:", err);
      res.send(views.errorPage("No se pudo borrar el jugador"));
    });
}
