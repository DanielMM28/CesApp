import { Column, Entity, OneToMany } from "typeorm";
import { ProCom } from "./ProCom";
import { Resultadoaprendizaje } from "./Resultadoaprendizaje";

@Entity("competencia", { schema: "bdcomite" })
export class Competencia {
  @Column("int", { primary: true, name: "ComCod" })
  comCod: number;

  @Column("varchar", { name: "ComNomCor", nullable: true, length: 100 })
  comNomCor: string | null;

  @Column("varchar", { name: "ComNomLar", nullable: true, length: 150 })
  comNomLar: string | null;

 @OneToMany(() => ProCom, (proCom) => proCom.competencia)
proComs: ProCom[];

  @OneToMany(
    () => Resultadoaprendizaje,
    (resultadoaprendizaje) => resultadoaprendizaje.comCodFk2
  )
  resultadoaprendizajes: Resultadoaprendizaje[];
}
