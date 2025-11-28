import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Asistente } from "./Asistente";
import { Comite } from "./Comite";

@Index("AsiIDFK", ["asiIdfk"], {})
@Index("ComiteIDFK", ["comiteIdfk"], {})
@Entity("compromisos", { schema: "bdcomite" })
export class Compromisos {
  @Column("int", { primary: true, name: "ComID" })
  comId: number;

  @Column("varchar", { name: "ComAct", nullable: true, length: 200 })
  comAct: string | null;

  @Column("date", { name: "ComFec",  nullable: false })
  comFec: string | null;

  @Column("varchar", { name: "ComRes", nullable: false, length: 100 })
  comRes: string | null;

  @Column("int", { name: "AsiIDFK",  nullable: false })
  asiIdfk: number | null;

  @Column("int", { name: "ComiteIDFK", nullable: false })
  comiteIdfk: number | null;

  @ManyToOne(() => Asistente, (asistente) => asistente.compromisos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AsiIDFK", referencedColumnName: "asiId" }])
  asiIdfk2: Asistente;

  @ManyToOne(() => Comite, (comite) => comite.compromisos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ComiteIDFK", referencedColumnName: "comId" }])
  comite: Comite;
}
