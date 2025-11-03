import { Column, Entity, OneToMany } from "typeorm";
import { Reportecomite } from "./Reportecomite";

@Entity("resultado", { schema: "bdcomite" })
export class Resultado {
  @Column("int", { primary: true, name: "ResID" })
  resId: number;

  @Column("varchar", { name: "ResDes", nullable: true, length: 100 })
  resDes: string | null;

  @OneToMany(() => Reportecomite, (reportecomite) => reportecomite.resIdfk2)
  reportecomites: Reportecomite[];
}
