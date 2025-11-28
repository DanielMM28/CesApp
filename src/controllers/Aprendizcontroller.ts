import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Aprendiz } from "../entity/entities/Aprendiz";
import { BaseController } from "./BaseController";

export class AprendizController extends BaseController<Aprendiz> {
  constructor() {
    const repository: Repository<Aprendiz> = AppDataSource.getRepository(Aprendiz);
    super(repository, "aprDoc"); // 
  }
}
