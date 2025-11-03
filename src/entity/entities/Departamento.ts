import { Column, Entity, OneToMany } from "typeorm";
import { Municipio } from "./Municipio";

@Entity("departamento", { schema: "bdcomite" })
export class Departamento {
  @Column("int", { primary: true, name: "DepID" })
  depId: number;

  @Column("varchar", { name: "DepDes", nullable: true, length: 100 })
  depDes: string | null;

  @OneToMany(() => Municipio, (municipio) => municipio.depIdfk2)
  municipios: Municipio[];
}
