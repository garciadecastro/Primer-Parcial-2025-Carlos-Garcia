import express from "express";
import * as controllers from "../controllers/jugadores.api.controller.js";

const router = express.Router();
console.log("jugadores.api.routes.js cargado"); // me dio algún problemita, por eso anda esto por acá

router.get("/", controllers.getJugadores);
router.get("/:id", controllers.getJugadorById);
router.post("/", controllers.createJugador);
router.put("/:id", controllers.reemplazarJugador);
router.patch("/:id", controllers.actualizarJugador);
router.delete("/:id", controllers.deleteJugador);

export default router;
