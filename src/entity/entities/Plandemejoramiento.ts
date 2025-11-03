import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Resultadoaprendizaje } from "./Resultadoaprendizaje";
import { Acta } from "./Acta";

@Index("ResCodFK", ["resCodFk"], {})
@Index("ActIDFK", ["actIdfk"], {})
@Entity("plandemejoramiento", { schema: "bdcomite" })
export class Plandemejoramiento {
  @Column("int", { primary: true, name: "PlanID" })
  planId: number;

  @Column("varchar", { name: "PlanForEnt", nullable: true, length: 50 })
  planForEnt: string | null;

  @Column("varchar", { name: "PlanEvidencia", nullable: true, length: 50 })
  planEvidencia: string | null;

  @Column("int", { name: "ResCodFK", nullable: true })
  resCodFk: number | null;

  @Column("int", { name: "ActIDFK", nullable: true })
  actIdfk: number | null;

  @ManyToOne(
    () => Resultadoaprendizaje,
    (resultadoaprendizaje) => resultadoaprendizaje.plandemejoramientos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "ResCodFK", referencedColumnName: "resCod" }])
  resCodFk2: Resultadoaprendizaje;

  @ManyToOne(() => Acta, (acta) => acta.plandemejoramientos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ActIDFK", referencedColumnName: "actId" }])
  actIdfk2: Acta;
}
