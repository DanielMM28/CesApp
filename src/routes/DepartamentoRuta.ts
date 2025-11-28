import express from "express";

import { DepartamentoController } from "../controllers/DepartamentoController";

const router = express.Router();
const controller = new DepartamentoController();

router.get("/", controller.obtenerTodos);
router.get("/:id", controller.obtenerUno);
router.post("/", controller.crear);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

export default router;
