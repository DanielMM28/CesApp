import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Centro } from "./Centro";
import { Departamento } from "./Departamento";

@Index("DepIDFK", ["depIdfk"], {})
@Entity("municipio", { schema: "bdcomite" })
export class Municipio {
  @Column("int", { primary: true, name: "MunID" })
  munId: number;

  @Column("varchar", { name: "MunDes", nullable: false, length: 100 })
  munDes: string | null;

  @Column("int", { name: "DepIDFK",  nullable: false })
  depIdfk: number | null;

  @OneToMany(() => Centro, (centro) => centro.munIdfk2)
  centros: Centro[];

  @ManyToOne(() => Departamento, (departamento) => departamento.municipios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "DepIDFK", referencedColumnName: "depId" }])
  depIdfk2: Departamento;
}
