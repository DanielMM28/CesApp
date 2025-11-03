import { Column, Entity, OneToMany } from "typeorm";
import { ApreAcu } from "./ApreAcu";

@Entity("acudiente", { schema: "bdcomite" })
export class Acudiente {
  @Column("varchar", { primary: true, name: "AcuDoc", length: 20 })
  acuDoc: string;

  @Column("varchar", { name: "AcuNom", nullable: true, length: 100 })
  acuNom: string | null;

  @Column("varchar", { name: "AcuApe", nullable: true, length: 100 })
  acuApe: string | null;

  @Column("varchar", { name: "AcuCor", nullable: true, length: 100 })
  acuCor: string | null;

  @Column("varchar", { name: "AcuTel", nullable: true, length: 20 })
  acuTel: string | null;

  @Column("varchar", { name: "AcuDir", nullable: true, length: 150 })
  acuDir: string | null;

  @Column("varchar", { name: "AcuBarr", nullable: true, length: 100 })
  acuBarr: string | null;

  @OneToMany(() => ApreAcu, (apreAcu) => apreAcu.acuDocFk2)
  apreAcus: ApreAcu[];
}
