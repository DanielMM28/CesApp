import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Acta } from "./Acta";
import { Municipio } from "./Municipio";

@Index("MunIDFK", ["munIdfk"], {})
@Index("CenIDFKFK", ["cenIdfk"], {})
@Entity("centro", { schema: "bdcomite" })
export class Centro {
  @Column("int", { primary: true, name: "CenID" })
  cenId: number;

  @Column("varchar", { name: "CenDes", nullable: true, length: 100 })
  cenDes: string | null;

  @Column("int", { name: "MunIDFK", nullable: true })
  munIdfk: number | null;

  @Column("int", { name: "CenIDFK", nullable: true })
  cenIdfk: number | null;

  @OneToMany(() => Acta, (acta) => acta.cenIdfk2)
  actas: Acta[];

  @ManyToOne(() => Municipio, (municipio) => municipio.centros, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "MunIDFK", referencedColumnName: "munId" }])
  munIdfk2: Municipio;

  @ManyToOne(() => Centro, (centro) => centro.centros, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "CenIDFK", referencedColumnName: "cenId" }])
  cenIdfk2: Centro;

  @OneToMany(() => Centro, (centro) => centro.cenIdfk2)
  centros: Centro[];
}
