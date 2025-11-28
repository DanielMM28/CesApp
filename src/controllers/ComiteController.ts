import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Comite } from "../entity/entities/Comite";
import { BaseController } from "./BaseController";

export class ComiteController extends BaseController<Comite> {
  constructor() {
    const repository: Repository<Comite> = AppDataSource.getRepository(Comite);
    super(repository, "comId"); // 
  }
}
