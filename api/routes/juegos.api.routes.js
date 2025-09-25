import express from 'express';
import * as controllers from '../controllers/juegos.api.controller.js' 

const router = express.Router();

router.get('/', controllers.getJuegos); // endpoint
router.get("/:id", controllers.getJuegoById)
router.post('/', controllers.createJuego);
router.delete("/:id", controllers.deleteJuego)
router.put("/:id", controllers.reemplazarJuego)
router.patch("/:id", controllers.actualizarJuego)



export default router;

