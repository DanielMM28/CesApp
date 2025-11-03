import { Column, Entity, OneToMany } from "typeorm";
import { Acta } from "./Acta";

@Entity("comite", { schema: "bdcomite" })
export class Comite {
  @Column("int", { primary: true, name: "ComId" })
  comId: number;

  @Column("varchar", { name: "ComTip", nullable: true, length: 100 })
  comTip: string | null;

  @Column("varchar", { name: "ComDes", nullable: true, length: 200 })
  comDes: string | null;

  @OneToMany(() => Acta, (acta) => acta.comIdFk2)
  actas: Acta[];
  compromisos: any;
}
