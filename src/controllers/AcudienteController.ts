import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Acudiente } from "../entity/entities/Acudiente";
import { BaseController } from "./BaseController";

export class AcudienteController extends BaseController<Acudiente> {
  constructor() {
    super(AppDataSource.getRepository(Acudiente), "acuDoc");
  }
}
