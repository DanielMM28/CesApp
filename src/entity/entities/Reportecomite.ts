import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Resultado } from "./Resultado";
import { Aprendiz } from "./Aprendiz";

@Index("ResIDFK", ["resIdfk"], {})
@Index("AprDocFK", ["aprDocFk"], {})
@Entity("reportecomite", { schema: "bdcomite" })
export class Reportecomite {
  @Column("int", { primary: true, name: "RepID" })
  repId: number;

  @Column("int", { name: "ResIDFK", nullable: true })
  resIdfk: number | null;

  @Column("varchar", { name: "AprDocFK", nullable: true, length: 20 })
  aprDocFk: string | null;

  @ManyToOne(() => Resultado, (resultado) => resultado.reportecomites, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ResIDFK", referencedColumnName: "resId" }])
  resIdfk2: Resultado;

  @ManyToOne(() => Aprendiz, (aprendiz) => aprendiz.reportecomites, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AprDocFK", referencedColumnName: "aprDoc" }])
  aprDocFk2: Aprendiz;
}
