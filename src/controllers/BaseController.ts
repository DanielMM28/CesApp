import { Request, Response } from "express";
import { Repository, ObjectLiteral, DeepPartial } from "typeorm";

export class BaseController<T extends ObjectLiteral> {
  private repository: Repository<T>;
  private idField: keyof T;

  constructor(repository: Repository<T>, idField: keyof T) {
    this.repository = repository;
    this.idField = idField;
  }


  obtenerTodos = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 100 } = req.query;

      const data = await this.repository.find({
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      });

      res.json(data);
    } catch (error) {
      this.handleError(res, error, "Error al obtener los datos");
    }
  };


  obtenerUno = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id)))
      return res.status(400).json({ mensaje: "ID inválido" });

    try {
      const whereClause = { [this.idField]: Number(id) } as any;
      const item = await this.repository.findOne({ where: whereClause });

      if (!item)
        return res.status(404).json({ mensaje: "Registro no encontrado" });

      res.json(item);
    } catch (error) {
      this.handleError(res, error, "Error al obtener el registro");
    }
  };


  crear = async (req: Request, res: Response) => {
    try {
      const nuevo = this.repository.create(req.body as DeepPartial<T>);
      const guardado = await this.repository.save(nuevo);

      res.status(201).json(guardado);
    } catch (error) {
      this.handleError(res, error, "Error al crear el registro");
    }
  };


  actualizar = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id)))
      return res.status(400).json({ mensaje: "ID inválido" });

    try {
      const whereClause = { [this.idField]: Number(id) } as any;
      const existe = await this.repository.findOne({ where: whereClause });

      if (!existe)
        return res.status(404).json({ mensaje: "Registro no encontrado" });

      await this.repository.update(whereClause, req.body);

      res.json({ mensaje: "Registro actualizado correctamente" });
    } catch (error) {
      this.handleError(res, error, "Error al actualizar el registro");
    }
  };


  eliminar = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id)))
      return res.status(400).json({ mensaje: "ID inválido" });

    try {
      const whereClause = { [this.idField]: Number(id) } as any;
      const existe = await this.repository.findOne({ where: whereClause });

      if (!existe)
        return res.status(404).json({ mensaje: "Registro no encontrado" });

      await this.repository.delete(whereClause);

      res.json({ mensaje: "Registro eliminado correctamente" });
    } catch (error) {
      this.handleError(res, error, "Error al eliminar el registro");
    }
  };


  private handleError(res: Response, error: unknown, message: string) {
    console.error("❌", message, error);
    res.status(500).json({ mensaje: message });
  }
}
