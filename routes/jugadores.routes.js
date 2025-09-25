import express from "express";
import * as controller from "../controllers/jugadores.controller.js";

const router = express.Router();

// Listar todos los jugadores
router.get("/jugadores", controller.listarJugadores);

// Formulario para nuevo jugador
router.get("/jugadores/nuevo", controller.formularioNuevoJugador);

// Guardar jugador (cuando se envía el form)
router.post("/jugadores/nuevo", controller.guardarJugador);

// Formulario para editar jugador
router.get("/jugadores/editar/:id", controller.formularioEditarJugador);

// Guardar cambios al editar jugador
router.post("/jugadores/editar/:id", controller.editarJugador);

// Formulario para borrar jugador
router.get("/jugadores/borrar/:id", controller.formularioBorrarJugador);

// Confirmar borrado (lógico: eliminado:true)
router.post("/jugadores/borrar/:id", controller.borrarJugador);

// Ver detalle de un jugador
router.get("/jugadores/:id", controller.getJugadorById);

// Actualizar juegos favoritos de un jugador
router.post("/jugadores/:id/favoritos", controller.actualizarJuegosFavoritos);



export default router;
