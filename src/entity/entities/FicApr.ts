import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Estado } from "./Estado";
import { Ficha } from "./Ficha";
import { Aprendiz } from "./Aprendiz";

@Index("AprDocFK", ["aprDocFk"], {})
@Index("FicCodFK", ["ficCodFk"], {})
@Index("EstIDFK", ["estIdfk"], {})
@Entity("fic_apr", { schema: "bdcomite" })
export class FicApr {
  @Column("varchar", { primary: true, name: "AprDocFK", length: 20 })
  aprDocFk: string;

  @Column("int", { primary: true, name: "FicCodFK" })
  ficCodFk: number;

  @Column("date", { name: "FecEstado", nullable: true })
  fecEstado: string | null;

  @Column("int", { name: "EstIDFK", nullable: true })
  estIdfk: number | null;

  @ManyToOne(() => Estado, (estado) => estado.ficAprs, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "EstIDFK", referencedColumnName: "estId" }])
  estIdfk2: Estado;

  @ManyToOne(() => Ficha, (ficha) => ficha.ficAprs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "FicCodFK", referencedColumnName: "ficId" }])
  ficCodFk2: Ficha;

  @ManyToOne(() => Aprendiz, (aprendiz) => aprendiz.ficAprs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "AprDocFK", referencedColumnName: "aprDoc" }])
  aprDocFk2: Aprendiz;
}
