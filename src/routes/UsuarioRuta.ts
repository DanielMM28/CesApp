import express from "express";
import { UsuariosController } from "../controllers/Usuarioscontroller";

const router = express.Router();
const controller = new UsuariosController();

router.get("/", controller.obtenerTodos);

router.get("/:id", controller.obtenerUno);

router.post("/", controller.crear);

router.put("/:id", controller.actualizar);

router.delete("/:id", controller.eliminar);

export default router;
