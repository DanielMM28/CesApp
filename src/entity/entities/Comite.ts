import { Column, Entity, OneToMany } from "typeorm";
import { Acta } from "./Acta";

@Entity("comite", { schema: "bdcomite" })
export class Comite {
  @Column("int", { primary: true, name: "ComId" })
  comId: number;

  @Column("varchar", { name: "ComTip", nullable: false, length: 100 })
  comTip: string | null;

  @Column("varchar", { name: "ComDes",  nullable: false, length: 200 })
  comDes: string | null;

 @OneToMany(() => Acta, (acta) => acta.comite)
  actas: Acta[];
}

