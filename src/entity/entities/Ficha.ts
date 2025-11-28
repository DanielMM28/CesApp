import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Acta } from "./Acta";
import { Programa } from "./Programa";
import { FicApr } from "./FicApr";
import { UsuFic } from "./UsuFic";

@Index("ProIDFK", ["proIdfk"], {})
@Entity("ficha", { schema: "bdcomite" })
export class Ficha {
  @Column("int", { primary: true, name: "FicID" })
  ficId: string;

  @Column("date", { name: "FicFecIni",  nullable: false })
  ficFecIni: string | null;

  @Column("date", { name: "FicFecFin", nullable: false })
  ficFecFin: string | null;

  @Column("varchar", { name: "FicEst",  nullable: false, length: 50 })
  ficEst: string | null;

  @Column("varchar", { name: "FicMod",  nullable: false, length: 50 })
  ficMod: string | null;

  @Column("varchar", { name: "FicJor", nullable: false, length: 50 })
  ficJor: string | null;

  @Column("int", { name: "FicCant", nullable: false })
  ficCant: number | null;

  @Column("int", { name: "ProID",  nullable: false })
  proIdfk: number | null;

  @OneToMany(() => Acta, (acta) => acta.ficId)
  actas: Acta[];

  @ManyToOne(() => Programa, (programa) => programa.fichas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ProID", referencedColumnName: "proId" }])
  proIdfk2: Programa;

  @OneToMany(() => FicApr, (ficApr) => ficApr.ficCodFk2)
  ficAprs: FicApr[];

  @OneToMany(() => UsuFic, (usuFic) => usuFic.ficIdfk2)
  usuFics: UsuFic[];

  @OneToMany(() => UsuFic, (usuFic) => usuFic.ficIdfk3)
  usuFics2: UsuFic[];
}
