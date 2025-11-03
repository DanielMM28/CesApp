import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Conocimentodeprocesos } from "./Conocimentodeprocesos";
import { Plandemejoramiento } from "./Plandemejoramiento";
import { Competencia } from "./Competencia";

@Index("CompID", ["comCodFk"], {})
@Entity("resultadoaprendizaje", { schema: "bdcomite" })
export class Resultadoaprendizaje {
  @Column("int", { primary: true, name: "ResCod" })
  resCod: number;

  @Column("text", { name: "ResDes", nullable: true })
  resDes: string | null;

  @Column("int", { name: "ComCodFK", nullable: true })
  comCodFk: number | null;

  @OneToMany(
    () => Conocimentodeprocesos,
    (conocimentodeprocesos) => conocimentodeprocesos.resCodFk2
  )
  conocimentodeprocesos: Conocimentodeprocesos[];

  @OneToMany(
    () => Plandemejoramiento,
    (plandemejoramiento) => plandemejoramiento.resCodFk2
  )
  plandemejoramientos: Plandemejoramiento[];

  @ManyToOne(
    () => Competencia,
    (competencia) => competencia.resultadoaprendizajes,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "ComCodFK", referencedColumnName: "comCod" }])
  comCodFk2: Competencia;
}
