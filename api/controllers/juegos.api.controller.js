import * as services from "../../services/juegos.service.js";

// Listar juegos con filtros desde query
export function getJuegos(req, res) {
  const filtros = {
    nombre: req.query.nombre && req.query.nombre.trim() !== "" ? req.query.nombre : undefined,
    categoria: req.query.categoria && req.query.categoria.trim() !== "" ? req.query.categoria : undefined,
    editorial: req.query.editorial && req.query.editorial.trim() !== "" ? req.query.editorial : undefined,
    precioMax: req.query.precioMax && req.query.precioMax !== "" ? Number(req.query.precioMax) : undefined
  };

  services.getJuegos(filtros)
    .then(juegos => res.status(200).json(juegos))
    .catch(err => res.status(500).json({ message: "Error obteniendo juegos", error: err.message }));
}

// Obtener un juego por ID
export function getJuegoById(req, res) {
  const id = req.params.id;
  services.getJuegoById(id)
    .then(juego => {
      if (juego) {
        res.status(200).json(juego);
      } else {
        res.status(404).json({ message: "Juego no encontrado" });
      }
    })
    .catch(err => res.status(500).json({ message: "Error obteniendo juego", error: err.message }));
}

// Crear un nuevo juego
export function createJuego(req, res) {
  const juego = {
    nombre: req.body.nombre,
    editorial: req.body.editorial,
    precio: req.body.precio,
    year: req.body.year,
    categoria: req.body.categoria,
    imagen: req.body.imagen || null
  };

  services.guardarJuego(juego)
    .then(nuevoJuego => res.status(201).json(nuevoJuego))
    .catch(err => res.status(500).json({ message: "Error creando juego", error: err.message }));
}

// Reemplazar (PUT) un juego
export function reemplazarJuego(req, res) {
  const juego = {
    _id: req.params.id, // importante: _id, no id
    nombre: req.body.nombre,
    editorial: req.body.editorial,
    precio: req.body.precio,
    year: req.body.year,
    categoria: req.body.categoria,
    imagen: req.body.imagen || null
  };

  services.editarJuego(juego)
    .then(juegoEditado => res.status(202).json(juegoEditado))
    .catch(err => res.status(500).json({ message: "Error reemplazando juego", error: err.message }));
}

// Actualizar parcialmente (PATCH)
export function actualizarJuego(req, res) {
  const juego = {
    _id: req.params.id, // importante: _id
    ...req.body
  };

  services.actualizarJuego(juego)
    .then(juegoEditado => res.status(202).json(juegoEditado))
    .catch(err => res.status(500).json({ message: "Error actualizando juego", error: err.message }));
}

// Borrar un juego
export function deleteJuego(req, res) {
  const id = req.params.id;

  services.borrarJuego(id)
    .then(() => res.status(202).json({ message: `Juego con id ${id} eliminado correctamente` }))
    .catch(err => res.status(500).json({ message: "Error borrando juego", error: err.message }));
}
