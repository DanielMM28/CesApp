import { Column, Entity, OneToMany } from "typeorm";
import { Ficha } from "./Ficha";
import { ProCom } from "./ProCom";

@Entity("programa", { schema: "bdcomite" })
export class Programa {
  @Column("int", { primary: true, name: "ProID" })
  proId: number;

  @Column("varchar", { name: "ProNomCor", nullable: true, length: 100 })
  proNomCor: string | null;

  @Column("varchar", { name: "ProNomLar", nullable: true, length: 150 })
  proNomLar: string | null;

  @Column("varchar", { name: "ProTipo", nullable: true, length: 100 })
  proTipo: string | null;

  @Column("varchar", { name: "ProCod", nullable: true, length: 50 })
  proCod: string | null;

  @Column("varchar", { name: "ProVer", nullable: true, length: 20 })
  proVer: string | null;

  @Column("int", { name: "ProDur", nullable: true })
  proDur: number | null;

  @OneToMany(() => Ficha, (ficha) => ficha.proIdfk2)
  fichas: Ficha[];

  @OneToMany(() => ProCom, (proCom) => proCom.programa)
proComs: ProCom[];
}
