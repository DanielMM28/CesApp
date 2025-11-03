import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Resultadoaprendizaje } from "./Resultadoaprendizaje";

@Index("ResCodFK", ["resCodFk"], {})
@Entity("conocimentodeprocesos", { schema: "bdcomite" })
export class Conocimentodeprocesos {
  @Column("int", { primary: true, name: "ConItem" })
  conItem: number;

  @Column("varchar", { name: "ConDes", nullable: true, length: 100 })
  conDes: string | null;

  @Column("int", { name: "ResCodFK", nullable: true })
  resCodFk: number | null;

  @ManyToOne(
    () => Resultadoaprendizaje,
    (resultadoaprendizaje) => resultadoaprendizaje.conocimentodeprocesos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "ResCodFK", referencedColumnName: "resCod" }])
  resCodFk2: Resultadoaprendizaje;
}
