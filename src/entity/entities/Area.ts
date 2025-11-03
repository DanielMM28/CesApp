import { Column, Entity, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("area", { schema: "bdcomite" })
export class Area {
  @Column("int", { primary: true, name: "AreaID" })
  areaId: number;

  @Column("varchar", { name: "AreaDes", length: 100 })
  areaDes: string;

  @OneToMany(() => Usuario, (usuario) => usuario.areaIdfk2)
  usuarios: Usuario[];
}
