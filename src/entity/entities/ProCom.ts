import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Competencia } from "./Competencia";
import { Programa } from "./Programa";

@Index("ProIDFK", ["proIdfk"], {})
@Index("ComCodFK", ["comCodFk"], {})
@Entity("pro_com", { schema: "bdcomite" })
export class ProCom {
  @Column("int", { primary: true, name: "ProIDFK" })
  proIdfk: number;

  @Column("int", { primary: true, name: "ComCodFK" })
  comCodFk: number;

  @ManyToOne(() => Competencia, (competencia) => competencia.proComs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ComCodFK", referencedColumnName: "comCod" }])
  competencia: Competencia;

  @ManyToOne(() => Programa, (programa) => programa.proComs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ProIDFK", referencedColumnName: "proId" }])
  programa: Programa;
}
