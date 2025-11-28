import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Acta } from "./Acta";
import { Usuario } from "./Usuario";
import { Compromisos } from "./Compromisos";

@Index("UsuIDFK", ["usuIdfk"], {})
@Entity("asistente", { schema: "bdcomite" })
export class Asistente {
  @PrimaryGeneratedColumn({ type: "int", name: "AsiID" })
  asiId: number;

  @Column("int", { name: "UsuID", nullable: false })
  usuIdfk: number | null;

  @OneToMany(() => Acta, (acta) => acta.asiIdfk2)
  actas: Acta[];

  @ManyToOne(() => Usuario, (usuario) => usuario.asistentes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "UsuID", referencedColumnName: "usuId" }])
  usuIdfk2: Usuario;

  @OneToMany(() => Compromisos, (compromisos) => compromisos.asiIdfk2)
  compromisos: Compromisos[];
}
