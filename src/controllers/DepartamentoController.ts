import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Departamento } from "../entity/entities/Departamento";
import { BaseController } from "./BaseController";

export class DepartamentoController extends BaseController<Departamento> {
  constructor() {
    super(AppDataSource.getRepository(Departamento), "depId");
  }
}
