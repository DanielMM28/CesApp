import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Asistente } from "./Asistente";
import { Area } from "./Area";
import { Rol } from "./Rol";
import { UsuFic } from "./UsuFic";

@Index("AreaIDFK", ["areaIdfk"], {})
@Index("RolIDFK", ["rolIdfk"], {})
@Entity("usuario", { schema: "bdcomite" })
export class Usuario {
  @Column("int", { primary: true, name: "UsuID" })
  usuId: number;

  @Column("varchar", { name: "UsuNom", length: 100 })
  usuNom: string;

  @Column("varchar", { name: "UsuApe", length: 100 })
  usuApe: string;

  @Column("varchar", { name: "UsuCorreo", length: 100 })
  usuCorreo: string;

  @Column("varchar", { name: "UsuTel", nullable: true, length: 20 })
  usuTel: string | null;

  @Column("varchar", { name: "UsuEst", nullable: true, length: 50 })
  usuEst: string | null;

  @Column("text", { name: "UsuFir", nullable: true })
  usuFir: string | null;

  @Column("varchar", { name: "UsuCon", length: 100 })
  usuCon: string;

  @Column("int", { name: "AreaIDFK", nullable: true })
  areaIdfk: number | null;

  @Column("int", { name: "RolIDFK", nullable: true })
  rolIdfk: number | null;

  @OneToMany(() => Asistente, (asistente) => asistente.usuIdfk2)
  asistentes: Asistente[];

  @ManyToOne(() => Area, (area) => area.usuarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AreaIDFK", referencedColumnName: "areaId" }])
  areaIdfk2: Area;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "RolIDFK", referencedColumnName: "rolId" }])
  rolIdfk2: Rol;

  @OneToMany(() => UsuFic, (usuFic) => usuFic.usuIdfk2)
  usuFics: UsuFic[];

  @OneToMany(() => UsuFic, (usuFic) => usuFic.usuIdfk3)
  usuFics2: UsuFic[];
}
