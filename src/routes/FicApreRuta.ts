import { Router } from "express";
import { FicAprController } from "../controllers/FicAprController";

const router = Router();
const controller = new FicAprController();

router.get("/", controller.obtenerTodos);
router.get("/:aprDocFk/:ficCodFk", controller.obtenerUno);
router.post("/", controller.crear);
router.put("/:aprDocFk/:ficCodFk", controller.actualizar);
router.delete("/:aprDocFk/:ficCodFk", controller.eliminar);

export default router;
