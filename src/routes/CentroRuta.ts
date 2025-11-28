import express from "express";

import { CentroController } from "../controllers/CentroController";

const router = express.Router();
const controller = new CentroController();

router.get("/", controller.obtenerTodos);

router.get("/:id", controller.obtenerUno);

router.post("/", controller.crear);

router.put("/:id", controller.actualizar);

router.delete("/:id", controller.eliminar);


export default router;
