import { Router } from "express";
import {
  obtenerAprendices,
  obtenerAprendizPorId,
  crearAprendiz,
  actualizarAprendiz,
  eliminarAprendiz,
} from "../controllers/Aprendizcontroller";

const router = Router();


router.get("/", obtenerAprendices);       
router.get("/:aprDoc", obtenerAprendizPorId);  
router.post("/", crearAprendiz);           
router.put("/:aprDoc", actualizarAprendiz);    
router.delete("/:aprDoc", eliminarAprendiz);  

export default router;
