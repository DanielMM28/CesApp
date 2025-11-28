import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Usuario } from "../entity/entities/Usuario";
import { BaseController } from "./BaseController";

export class UsuariosController extends BaseController<Usuario> {
  constructor() {
    const repository: Repository<Usuario> = AppDataSource.getRepository(Usuario);
    super(repository, "usuId"); // 👈 se pasa el nombre del campo
  }
}
