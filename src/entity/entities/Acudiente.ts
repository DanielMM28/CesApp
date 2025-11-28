import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ApreAcu } from "./ApreAcu";

@Entity("acudiente", { schema: "bdcomite" })
export class Acudiente {

  @PrimaryColumn({ type: "varchar", name: "AcuDoc", length: 20 })
  acuDoc: string;

  @Column("varchar", { name: "AcuNom", length: 100 })
  acuNom: string;

  @Column("varchar", { name: "AcuApe", length: 100 })
  acuApe: string;

  @Column("varchar", { name: "AcuCor", length: 100 })
  acuCor: string;

  @Column("varchar", { name: "AcuTel", length: 20 })
  acuTel: string;

  @Column("varchar", { name: "AcuDir", length: 150 })
  acuDir: string;

  @Column("varchar", { name: "AcuBarr", length: 100 })
  acuBarr: string;

  @OneToMany(() => ApreAcu, (apreAcu) => apreAcu.acuDocFk2)
  apreAcus: ApreAcu[];
}
