import express from "express";
import * as controller from '../controllers/juegos.controller.js';

const route = express.Router();

route.get("/juegos", controller.getJuegos);
route.get("/juegos/nuevo", controller.formularioNuevoJuego);
route.post("/juegos/nuevo", controller.guardarJuego);
route.get("/juegos/editar/:id", controller.formularioEditarJuego);
route.post("/juegos/editar/:id", controller.editarJuego);
route.get("/juegos/borrar/:id", controller.formularioBorrarJuego);
route.post("/juegos/borrar/:id", controller.borrarJuego);
route.get("/juegos/:id", controller.getJuegoById);

export default route;
