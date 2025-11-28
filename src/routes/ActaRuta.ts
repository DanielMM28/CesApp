import express from "express";

import { ActaController } from "../controllers/ActaController";

const router = express.Router();
const controller = new ActaController();

router.get("/", controller.obtenerTodos);
router.get("/:id", controller.obtenerUno);
router.post("/", controller.crear);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

export default router;
