import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Aprendiz } from "./Aprendiz";
import { Acta } from "./Acta";

@Index("AprDocFK", ["aprDocFk"], {})
@Index("ActIDFK", ["actIdfk"], {})
@Entity("llamadodeatencion", { schema: "bdcomite" })
export class Llamadodeatencion {
  @Column("int", { primary: true, name: "llamID" })
  llamId: number;

  @Column("text", { name: "llamCom", nullable: true })
  llamCom: string | null;

  @Column("text", { name: "llamRec", nullable: true })
  llamRec: string | null;

  @Column("text", { name: "llamMot", nullable: true })
  llamMot: string | null;

  @Column("text", { name: "llamDes", nullable: true })
  llamDes: string | null;

  @Column("varchar", { name: "AprDocFK", nullable: true, length: 20 })
  aprDocFk: string | null;

  @Column("int", { name: "ActIDFK", nullable: true })
  actIdfk: number | null;

  @ManyToOne(() => Aprendiz, (aprendiz) => aprendiz.llamadodeatencions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AprDocFK", referencedColumnName: "aprDoc" }])
  aprDocFk2: Aprendiz;

  @ManyToOne(() => Acta, (acta) => acta.llamadodeatencions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ActIDFK", referencedColumnName: "actId" }])
  actIdfk2: Acta;
}
