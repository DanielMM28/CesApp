import express from "express";
import { AsistenteController } from "../controllers/AsistentesController";

const router = express.Router();
const controller = new AsistenteController();


router.get("/", controller.obtenerTodos);

router.get("/:id", controller.obtenerUno);

router.post("/", controller.crear);

router.put("/:id", controller.actualizar);

router.delete("/:id", controller.eliminar);

export default router;
