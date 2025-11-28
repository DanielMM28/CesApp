import express from "express";

import { ComiteController } from "../controllers/ComiteController";

const router = express.Router();
const controller = new ComiteController();

router.get("/", controller.obtenerTodos);

router.get("/:id", controller.obtenerUno);

router.post("/", controller.crear);

router.put("/:id", controller.actualizar);

router.delete("/:id", controller.eliminar);

export default router;
