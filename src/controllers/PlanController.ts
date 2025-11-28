import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Plandemejoramiento } from "../entity/entities/Plandemejoramiento";
import { BaseController } from "./BaseController";

export class PlanController extends BaseController<Plandemejoramiento> {
  constructor() {
    super(
      AppDataSource.getRepository(Plandemejoramiento),
      "planId"
    );
  }

  // ⭐ OBTENER TODOS — con relaciones y nombres
  obtenerTodos = async (req: Request, res: Response) => {
    try {
      const planes = await AppDataSource.getRepository(Plandemejoramiento).find({
        relations: ["resCodFk2", "actIdfk2"],
      });

      const respuesta = planes.map(p => ({
        planId: p.planId,
        planForEnt: p.planForEnt,
        planevidencia: p.planEvidencia,

        Resultadoaprendizaje: p.resCodFk2?.resDes || null,
        Acta: p.actIdfk2?.actTema || null
      }));

      res.json(respuesta);
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ mensaje: "Error al obtener planes" });
    }
  };

  // ⭐ OBTENER UNO — con nombres
  obtenerUno = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const plan = await AppDataSource.getRepository(Plandemejoramiento).findOne({
        where: { planId: id },
        relations: ["resCodFk2", "actIdfk2"],
      });

      if (!plan)
        return res.status(404).json({ mensaje: "Plan no encontrado" });

      const respuesta = {
        planId: plan.planId,
        planForEnt: plan.planForEnt,
        planEvidencia: plan.planEvidencia,

        Resultadoaprendizaje: plan.resCodFk2?.resDes || null,
        Acta: plan.actIdfk2?.actTema || null
      };

      res.json(respuesta);
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ mensaje: "Error al obtener plan" });
    }
  };

  // ⭐ CREAR
  crear = async (req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Plandemejoramiento);
      const nuevo = repo.create(req.body);

      const guardado = await repo.save(nuevo);

      res.status(201).json(guardado);
    } catch (error) {
      console.error("❌ Error al crear:", error);
      res.status(500).json({ mensaje: "Error al crear plan" });
    }
  };

  // ⭐ ACTUALIZAR
  actualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const repo = AppDataSource.getRepository(Plandemejoramiento);

      const existe = await repo.findOne({ where: { planId: id } });

      if (!existe)
        return res.status(404).json({ mensaje: "Plan no encontrado" });

      await repo.update({ planId: id }, req.body);

      res.json({ mensaje: "Plan actualizado correctamente" });
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
      res.status(500).json({ mensaje: "Error al actualizar plan" });
    }
  };

  // ⭐ ELIMINAR
  eliminar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const repo = AppDataSource.getRepository(Plandemejoramiento);

      const existe = await repo.findOne({ where: { planId: id } });

      if (!existe)
        return res.status(404).json({ mensaje: "Plan no encontrado" });

      await repo.delete({ planId: id });

      res.json({ mensaje: "Plan eliminado correctamente" });
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
      res.status(500).json({ mensaje: "Error al eliminar plan" });
    }
  };
}
