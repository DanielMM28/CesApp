import express from "express";
import { FichaController } from "../controllers/FichaController";

const router = express.Router();
const controller = new FichaController();


router.get("/", controller.obtenerTodos);

router.get("/:id", controller.obtenerUno);

router.post("/", controller.crear);

router.put("/:id", controller.actualizar);

router.delete("/:id", controller.eliminar);

export default router;
