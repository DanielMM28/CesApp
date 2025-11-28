import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { FicApr } from "../entity/entities/FicApr";

export class FicAprController {

  async obtenerTodos(req: Request, res: Response) {
  try {
    const repo = AppDataSource.getRepository(FicApr);

    const registros = await repo.find({
      relations: ["aprDocFk2", "ficCodFk2", "estIdfk2"],
    });

    const respuesta = registros.map(p => ({
      aprDocFk: p.aprDocFk,
      nombreAprendiz: `${p.aprDocFk2.aprNom} ${p.aprDocFk2.aprApe}`,
      ficha: p.ficCodFk2.ficId,
      estado: p.estIdfk2.estDes,
      fechaEstado: p.fecEstado
    }));

    res.json(respuesta);

  } catch (error) {
    console.error("❌ Error obteniendo registros:", error);
    res.status(500).json({ mensaje: "Error obteniendo registros" });
  }
}

 obtenerUno = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const registros = await AppDataSource.getRepository(FicApr).findOne({
        where: { ficCodFk: id },
       relations: ["aprDocFk2", "ficCodFk2"],
      });

      if (!registros)
        return res.status(404).json({ mensaje: "Plan no encontrado" });

   const respuesta = registros.map(p => ({
      aprDocFk: p.aprDocFk,
      nombreAprendiz: `${p.aprDocFk2.aprNom} ${p.aprDocFk2.aprApe}`,
      ficha: p.ficCodFk2.ficId,
      estado: p.estIdfk2.estDes,
      fechaEstado: p.fecEstado
    }));

    res.json(respuesta);
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ mensaje: "Error al obtener plan" });
    }
  };



  async crear(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(FicApr);

      const nuevo = repo.create(req.body);
      const guardado = await repo.save(nuevo);

      res.status(201).json(guardado);
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ mensaje: "Error creando registro" });
    }
  }


  async actualizar(req: Request, res: Response) {
    try {
      const { aprDocFk, ficCodFk } = req.params;

      const repo = AppDataSource.getRepository(FicApr);

      const existe = await repo.findOne({
        where: { aprDocFk, ficCodFk: Number(ficCodFk) },
      });

      if (!existe) {
        return res.status(404).json({ mensaje: "Registro no encontrado" });
      }

      repo.merge(existe, req.body);
      const actualizado = await repo.save(existe);

      res.json(actualizado);
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ mensaje: "Error actualizando registro" });
    }
  }


  async eliminar(req: Request, res: Response) {
    try {
      const { aprDocFk, ficCodFk } = req.params;

      const repo = AppDataSource.getRepository(FicApr);

      const resultado = await repo.delete({
        aprDocFk,
        ficCodFk: Number(ficCodFk),
      });

      if (resultado.affected === 0) {
        return res.status(404).json({ mensaje: "Registro no encontrado" });
      }

      res.json({ mensaje: "Eliminado correctamente" });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ mensaje: "Error eliminando registro" });
    }
  }
}
