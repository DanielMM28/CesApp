import express from "express";
import { obtenerFichas } from "../controllers/fichaController";

const router = express.Router();

router.get("/", obtenerFichas);

export default router;
