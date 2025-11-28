import express from "express";

import { PlanController } from "../controllers/PlanController";

const router = express.Router();
const controller = new PlanController();

router.get("/", controller.obtenerTodos);

router.get("/:id", controller.obtenerUno);

router.post("/", controller.crear);

router.put("/:id", controller.actualizar);

router.delete("/:id", controller.eliminar);


export default router;
