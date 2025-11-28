import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Asistente } from "../entity/entities/Asistente";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";


export class AsistenteController extends BaseController<Asistente> {
  constructor() {
    super(
      AppDataSource.getRepository(Asistente),
      "asiId"
    );
  }

  obtenerTodos = async (req: Request, res: Response) => {
    try {
      const asistentes = await AppDataSource.getRepository(Asistente).find({
        relations: ["usuIdfk2"]
      });

      const respuesta = asistentes.map(a => ({
        asiId: a.asiId,
        usuario: `${a.usuIdfk2.usuNom} ${a.usuIdfk2.usuApe}`
      }));

      res.json(respuesta);
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ mensaje: "Error al obtener asistentes" });
    }
  };

 obtenerUno = async (req: Request, res: Response) => {
    try {
      const a = await AppDataSource.getRepository(Asistente).findOne({
        where: { asiId: Number(req.params.id) },
        relations: ["usuIdfk2"]
      });

      if (!a)
        return res.status(404).json({ mensaje: "No encontrado" });

      const respuesta = {
        asiId: a.asiId,
        usuario: `${a.usuIdfk2.usuNom} ${a.usuIdfk2.usuApe}`
      };

      res.json(respuesta);
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ mensaje: "Error al obtener asistente" });
    }
  };
}
