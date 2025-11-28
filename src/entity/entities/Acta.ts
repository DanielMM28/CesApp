import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comite } from "./Comite";     // Asegúrate de crear esta entidad
import { Centro } from "./Centro";     // Asegúrate de crear esta entidad
import { Asistente } from "./Asistente";
import { Ficha } from "./Ficha";       // Asegúrate de crear esta entidad

@Index("ComId", ["comId"], {})
@Index("CenID", ["cenId"], {})
@Index("AsiID", ["asiId"], {})
@Index("FicID", ["ficId"], {})
@Entity("acta", { schema: "bdcomite" })
export class Acta {
  @PrimaryGeneratedColumn({ type: "int", name: "ActID" })
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

  // --- Columnas de IDs (Foreign Keys explícitas) ---

  @Column("int", { name: "ComId", nullable: true })
  comId: number | null;

  @Column("int", { name: "CenID", nullable: true })
  cenId: number | null;

  @Column("int", { name: "AsiID", nullable: true })
  asiId: number | null;

  @Column("int", { name: "FicID", nullable: true })
  ficId: number | null;

  // --- Relaciones (Objetos) ---

  @ManyToOne(() => Comite, (comite) => comite.actas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ComId", referencedColumnName: "comId" }])
  comite: Comite;

  @ManyToOne(() => Centro, (centro) => centro.actas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "CenID", referencedColumnName: "cenId" }])
  centro: Centro;

  // Relación con Asistente
  // IMPORTANTE: Se llama asiIdfk2 para coincidir con el @OneToMany de tu archivo Asistente.ts
  @ManyToOne(() => Asistente, (asistente) => asistente.actas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AsiID", referencedColumnName: "asiId" }])
  asiIdfk2: Asistente;

  @ManyToOne(() => Ficha, (ficha) => ficha.actas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "FicID", referencedColumnName: "ficId" }])
  ficha: Ficha;
}