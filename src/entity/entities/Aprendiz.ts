import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ApreAcu } from "./ApreAcu";
import { FicApr } from "./FicApr";
import { Llamadodeatencion } from "./Llamadodeatencion";
import { Reportecomite } from "./Reportecomite";

@Entity("aprendiz", { schema: "bdcomite" })
export class Aprendiz {


@PrimaryColumn("varchar", { name: "AprDoc", length: 20 })
aprDoc: string;


  @Column("varchar", { name: "AprNom", length: 100 })
  aprNom: string;

  @Column("varchar", { name: "AprApe", length: 100 })
  aprApe: string;

  @Column("varchar", { name: "AprCor", length: 100 })
  aprCor: string;

  @Column("varchar", { name: "AprSen", length: 100 })
  aprSen: string;

  @Column("varchar", { name: "AprTel", length: 20 })
  aprTel: string;

  @Column("varchar", { name: "AprDir", length: 150 })
  aprDir: string;

  @Column("varchar", { name: "AprBar", length: 100 })
  aprBar: string;

  @Column("date", { name: "AprFec", nullable: true })
  aprFec: Date | null;

  @OneToMany(() => ApreAcu, (apreAcu) => apreAcu.aprDocFk2)
  apreAcus: ApreAcu[];

  @OneToMany(() => FicApr, (ficApr) => ficApr.aprDocFk2)
  ficAprs: FicApr[];

  @OneToMany(
    () => Llamadodeatencion,
    (llamadodeatencion) => llamadodeatencion.aprDocFk2
  )
  llamadodeatencions: Llamadodeatencion[];

  @OneToMany(() => Reportecomite, (reportecomite) => reportecomite.aprDocFk2)
  reportecomites: Reportecomite[];
}
