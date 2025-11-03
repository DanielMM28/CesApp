import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Ficha } from "../entity/entities/Ficha";

const fichaRepo = AppDataSource.getRepository(Ficha);

export const obtenerFichas = async (req: Request, res: Response) => {
  try {
    console.log("🔎 Consultando fichas...");
    const fichas = await fichaRepo.find();
    res.json(fichas);
  } catch (error) {
    console.error("❌ Error al obtener fichas:", error);
    res.status(500).json({ mensaje: "Error al obtener fichas" });
  }
};
