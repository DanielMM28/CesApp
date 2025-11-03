import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Comite } from "./Comite";
import { Centro } from "./Centro";
import { Asistente } from "./Asistente";
import { Ficha } from "./Ficha";
import { Invitado } from "./Invitado";
import { Llamadodeatencion } from "./Llamadodeatencion";
import { Plandemejoramiento } from "./Plandemejoramiento";
import { Prevenciondedesercion } from "./Prevenciondedesercion";

@Index("ComIdFK", ["comIdFk"], {})
@Index("CenIDFK", ["cenIdfk"], {})
@Index("AsiIDFK", ["asiIdfk"], {})
@Index("FicIDFK", ["ficIdfk"], {})
@Entity("acta", { schema: "bdcomite" })
export class Acta {
  @Column("int", { primary: true, name: "ActID" })
  actId: number;

  @Column("varchar", { name: "ActTema", nullable: true, length: 255 })
  actTema: string | null;

  @Column("text", { name: "ActDes", nullable: true })
  actDes: string | null;

  @Column("varchar", { name: "ActVer", nullable: true, length: 50 })
  actVer: string | null;

  @Column("text", { name: "ActAnexos", nullable: true })
  actAnexos: string | null;

  @Column("text", { name: "ActCon", nullable: true })
  actCon: string | null;

  @Column("time", { name: "ActHoraFin", nullable: true })
  actHoraFin: string | null;

  @Column("varchar", { name: "ActObj", nullable: true, length: 255 })
  actObj: string | null;

  @Column("date", { name: "ActFecha", nullable: true })
  actFecha: string | null;

  @Column("time", { name: "ActHoraInicio", nullable: true })
  actHoraInicio: string | null;

  @Column("int", { name: "ComIdFK", nullable: true })
  comIdFk: number | null;

  @Column("int", { name: "CenIDFK", nullable: true })
  cenIdfk: number | null;

  @Column("int", { name: "AsiIDFK", nullable: true })
  asiIdfk: number | null;

  @Column("int", { name: "FicIDFK", nullable: true })
  ficIdfk: number | null;

  @ManyToOne(() => Comite, (comite) => comite.actas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ComIdFK", referencedColumnName: "comId" }])
  comIdFk2: Comite;

  @ManyToOne(() => Centro, (centro) => centro.actas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "CenIDFK", referencedColumnName: "cenId" }])
  cenIdfk2: Centro;

  @ManyToOne(() => Asistente, (asistente) => asistente.actas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AsiIDFK", referencedColumnName: "asiId" }])
  asiIdfk2: Asistente;

  @ManyToOne(() => Ficha, (ficha) => ficha.actas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "FicIDFK", referencedColumnName: "ficId" }])
  ficIdfk2: Ficha;

  @ManyToMany(() => Invitado, (invitado) => invitado.actas)
  invitados: Invitado[];

  @OneToMany(
    () => Llamadodeatencion,
    (llamadodeatencion) => llamadodeatencion.actIdfk2
  )
  llamadodeatencions: Llamadodeatencion[];

  @OneToMany(
    () => Plandemejoramiento,
    (plandemejoramiento) => plandemejoramiento.actIdfk2
  )
  plandemejoramientos: Plandemejoramiento[];

  @OneToMany(
    () => Prevenciondedesercion,
    (prevenciondedesercion) => prevenciondedesercion.actIdfk2
  )
  prevenciondedesercions: Prevenciondedesercion[];
}
