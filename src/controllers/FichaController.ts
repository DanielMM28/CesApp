import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Ficha} from "../entity/entities/Ficha";
import { BaseController } from "./BaseController";

export class FichaController extends BaseController<Ficha> {
  constructor() {
    const repository: Repository<Ficha> = AppDataSource.getRepository(Ficha);
    super(repository, "ficId"); 
  }
}
