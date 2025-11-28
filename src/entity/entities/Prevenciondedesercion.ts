import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Estado } from "./Estado";
import { Acta } from "./Acta";

@Index("prevenciondedesercion_ibfk_2", ["actIdfk"], {})
@Entity("prevenciondedesercion", { schema: "bdcomite" })
export class Prevenciondedesercion {
  @Column("int", { primary: true, name: "PreID" })
  preId: number;

  @Column("varchar", { name: "PreSit", nullable: false, length: 200 })
  preSit: string | null;

  @Column("varchar", { name: "PreCau", nullable: false, length: 200 })
  preCau: string | null;

  @Column("varchar", { name: "PreReg",nullable: false, length: 100 })
  preReg: string | null;

  @Column("varchar", { name: "PreEsc", nullable: false, length: 100 })
  preEsc: string | null;

  @Column("varchar", { name: "PreQuienEsc", nullable: false, length: 100 })
  preQuienEsc: string | null;

  @Column("text", { name: "PreAcc", nullable: false })
  preAcc: string | null;

  @Column("int", { name: "ActIDFK", nullable: false })
  actIdfk: number | null;

  @OneToOne(() => Estado, (estado) => estado.prevenciondedesercion, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "PreID", referencedColumnName: "estId" }])
  pre: Estado;

  @ManyToOne(() => Acta, (acta) => acta.prevenciondedesercions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ActIDFK", referencedColumnName: "actId" }])
  actIdfk2: Acta;
}
