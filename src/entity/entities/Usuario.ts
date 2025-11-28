import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Area } from "./Area"; // Asegúrate de crear/tener esta entidad
import { Rol } from "./Rol";   // Asegúrate de crear/tener esta entidad
import { Asistente } from "./Asistente";

@Index("AreaID", ["areaId"], {})
@Index("RolID", ["rolId"], {})
@Entity("usuario", { schema: "bdcomite" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "UsuID" })
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

  // --- Columnas de Claves Foráneas (IDs explícitos) ---
  @Column("int", { name: "AreaID", nullable: true })
  areaId: number | null;

  @Column("int", { name: "RolID", nullable: true })
  rolId: number | null;

  // --- Relaciones (Objetos) ---

  // Relación con Area
  @ManyToOne(() => Area, (area) => area.usuarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "AreaID", referencedColumnName: "areaId" }])
  area: Area;

  // Relación con Rol
  @ManyToOne(() => Rol, (rol) => rol.usuarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "RolID", referencedColumnName: "rolId" }])
  rol: Rol;

  // Relación inversa con Asistente (Necesaria para que tu archivo Asistente.ts funcione)
  @OneToMany(() => Asistente, (asistente) => asistente.usuIdfk2)
  asistentes: Asistente[];
}