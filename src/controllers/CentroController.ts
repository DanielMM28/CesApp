import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Centro } from "../entity/entities/Centro";
import { BaseController } from "./BaseController";

export class CentroController extends BaseController<Centro> {
  constructor() {
    const repository: Repository<Centro> = AppDataSource.getRepository(Centro);
    super(repository, "cenId"); // 
  }
}