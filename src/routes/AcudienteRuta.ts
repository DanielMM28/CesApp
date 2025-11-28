import express from "express";
import { AcudienteController } from "../controllers/AcudienteController";

const router = express.Router();
const controller = new AcudienteController();

// 📌 Obtener todos
router.get("/", controller.obtenerTodos);

// 📌 Obtener uno
router.get("/:id", controller.obtenerUno);

// 📌 Crear nuevo
router.post("/", controller.crear);

// 📌 Actualizar uno
router.put("/:id", controller.actualizar);

// 📌 Eliminar uno
router.delete("/:id", controller.eliminar);

export default router;
