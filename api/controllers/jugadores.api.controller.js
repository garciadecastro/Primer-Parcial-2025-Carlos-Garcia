import * as services from "../../services/jugadores.service.js";

// Listar jugadores (con filtros opcionales)
export function getJugadores(req, res) {
  const filtros = {
    nombre: req.query.nombre && req.query.nombre.trim() !== "" ? req.query.nombre : undefined,
    descripcion: req.query.descripcion && req.query.descripcion.trim() !== "" ? req.query.descripcion : undefined
    // Podés agregar más filtros si querés (ej: por password o por juegos), pero
    // normalmente solo tiene sentido filtrar por nombre/descripcion
  };

  services.getJugadores(filtros)
    .then(jugadores => res.status(200).json(jugadores))
    .catch(err => res.status(500).json({ message: "Error obteniendo jugadores", error: err.message }));
}

// Obtener jugador por ID
export function getJugadorById(req, res) {
  const id = req.params.id;
  services.getJugadorById(id)
    .then(jugador => {
      if (jugador) res.status(200).json(jugador);
      else res.status(404).json({ message: "Jugador no encontrado" });
    })
    .catch(err => res.status(500).json({ message: "Error obteniendo jugador", error: err.message }));
}

// Crear jugador
export function createJugador(req, res) {
  const jugador = {
    nombre: req.body.nombre,
    foto: req.body.foto,
    descripcion: req.body.descripcion,
    password: req.body.password,
    juegos: []
  };

  services.guardarJugador(jugador)
    .then(nuevoJugador => res.status(201).json(nuevoJugador))
    .catch(err => res.status(500).json({ message: "Error creando jugador", error: err.message }));
}

// Reemplazar jugador (PUT)
export function reemplazarJugador(req, res) {
  const jugador = {
    _id: req.params.id,
    nombre: req.body.nombre,
    foto: req.body.foto,
    descripcion: req.body.descripcion,
    password: req.body.password,
    juegos: req.body.juegos || []
  };

  services.editarJugador(jugador)
    .then(jugadorEditado => res.status(202).json(jugadorEditado))
    .catch(err => res.status(500).json({ message: "Error reemplazando jugador", error: err.message }));
}

// Actualizar parcialmente jugador (PATCH)
export function actualizarJugador(req, res) {
  const jugador = { _id: req.params.id, ...req.body };

  services.editarJugador(jugador)
    .then(jugadorEditado => res.status(202).json(jugadorEditado))
    .catch(err => res.status(500).json({ message: "Error actualizando jugador", error: err.message }));
}

// Eliminar jugador (soft delete)
export function deleteJugador(req, res) {
  const id = req.params.id;

  services.borrarJugador(id)
    .then(() => res.status(202).json({ message: `Jugador ${id} eliminado correctamente` }))
    .catch(err => res.status(500).json({ message: "Error borrando jugador", error: err.message }));
}
