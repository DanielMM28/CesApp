import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Aprendiz } from "../entity/entities/Aprendiz";

const aprendizRepo = AppDataSource.getRepository(Aprendiz);

export const obtenerAprendices = async (req: Request, res: Response) => {
  try {
    const aprendices = await aprendizRepo.find();
    res.json(aprendices);
  } catch (error) {
    console.error("❌ Error al obtener aprendices:", error);
    res.status(500).json({ mensaje: "Error al obtener aprendices" });
  }
};


export const obtenerAprendizPorId = async (req: Request, res: Response) => {
  try {
    const { aprDoc } = req.params;
    const aprendiz = await aprendizRepo.findOneBy({ aprDoc });

    if (!aprendiz) {
      return res.status(404).json({ mensaje: "Aprendiz no encontrado" });
    }

    res.json(aprendiz);
  } catch (error) {
    console.error("❌ Error al obtener aprendiz:", error);
    res.status(500).json({ mensaje: "Error al obtener aprendiz" });
  }
};


export const crearAprendiz = async (req: Request, res: Response) => {
  try {
    console.log("📥 Datos recibidos:", req.body); 
    const nuevoAprendiz = aprendizRepo.create(req.body);
    await aprendizRepo.save(nuevoAprendiz);
    res.json({ mensaje: "Aprendiz creado correctamente" });
  } catch (error) {
    console.error("❌ Error al crear aprendiz:", error);
    res.status(500).json({ mensaje: "Error al crear aprendiz", error });
  }
};


export const actualizarAprendiz = async (req: Request, res: Response) => {
  try {
    const { aprDoc } = req.params;
    const aprendiz = await aprendizRepo.findOneBy({ aprDoc });

    if (!aprendiz) {
      return res.status(404).json({ mensaje: "Aprendiz no encontrado" });
    }

    aprendizRepo.merge(aprendiz, req.body);
    const resultado = await aprendizRepo.save(aprendiz);
    res.json(resultado);
  } catch (error) {
    console.error("❌ Error al actualizar aprendiz:", error);
    res.status(500).json({ mensaje: "Error al actualizar aprendiz" });
  }
};

export const eliminarAprendiz = async (req: Request, res: Response) => {
  try {
    const { aprDoc } = req.params;
    console.log("🗑 Intentando eliminar aprendiz con AprDoc:", aprDoc);

    const aprendiz = await aprendizRepo.findOne({
      where: { aprDoc: aprDoc },
    });

    if (!aprendiz) {
      console.log("❌ No se encontró el aprendiz");
      return res.status(404).json({ mensaje: "Aprendiz no encontrado" });
    }

    await aprendizRepo.remove(aprendiz);
    console.log("✅ Aprendiz eliminado correctamente");
    return res.json({ mensaje: "Aprendiz eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar aprendiz:", error);
    res.status(500).json({ mensaje: "Error al eliminar aprendiz" });
  }
};