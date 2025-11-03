import { Column, Entity, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("rol", { schema: "bdcomite" })
export class Rol {
  @Column("int", { primary: true, name: "RolID" })
  rolId: number;

  @Column("varchar", { name: "RolDes", length: 100 })
  rolDes: string;

  @Column("varchar", { name: "RolCargo", length: 100 })
  rolCargo: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rolIdfk2)
  usuarios: Usuario[];
}
