import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Acudiente } from "./Acudiente";
import { Aprendiz } from "./Aprendiz";

@Index("AprDocFK", ["aprDocFk"], {})
@Index("AcuDocFK", ["acuDocFk"], {})
@Entity("apre_acu", { schema: "bdcomite" })
export class ApreAcu {
  @Column("varchar", { primary: true, name: "AprDocFK", length: 20 })
  aprDocFk: string;

  @Column("varchar", { primary: true, name: "AcuDocFK", length: 20 })
  acuDocFk: string;

  @Column("varchar", { name: "Parentesco",  nullable: false, length: 50 })
  parentesco: string | null;

  @ManyToOne(() => Acudiente, (acudiente) => acudiente.apreAcus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AcuDocFK", referencedColumnName: "acuDoc" }])
  acuDocFk2: Acudiente;

  @ManyToOne(() => Aprendiz, (aprendiz) => aprendiz.apreAcus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AprDocFK", referencedColumnName: "aprDoc" }])
  aprDocFk2: Aprendiz;
}
