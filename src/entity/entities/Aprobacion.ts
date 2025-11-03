import { Column, Entity, OneToOne } from "typeorm";
import { Compromisos } from "./Compromisos";

@Entity("aprobacion", { schema: "bdcomite" })
export class Aprobacion {
  @Column("int", { primary: true, name: "AprID" })
  aprId: number;

  @Column("varchar", { name: "AprObs", nullable: true, length: 200 })
  aprObs: string | null;

  @Column("enum", { name: "AprApr", nullable: true, enum: ["SI", "NO"] })
  aprApr: "SI" | "NO" | null;

  @Column("varchar", { name: "AprDep", nullable: true, length: 100 })
  aprDep: string | null;

  @Column("varchar", { name: "AprNom", nullable: true, length: 100 })
  aprNom: string | null;

  @OneToOne(() => Compromisos, (compromisos) => compromisos.com)
  compromisos: Compromisos;
}
