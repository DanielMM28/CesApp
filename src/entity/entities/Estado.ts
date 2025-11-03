import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { FicApr } from "./FicApr";
import { Prevenciondedesercion } from "./Prevenciondedesercion";

@Entity("estado", { schema: "bdcomite" })
export class Estado {
  @Column("int", { primary: true, name: "EstID" })
  estId: number;

  @Column("varchar", { name: "EstDes", length: 100 })
  estDes: string;

  @OneToMany(() => FicApr, (ficApr) => ficApr.estIdfk2)
  ficAprs: FicApr[];

  @OneToOne(
    () => Prevenciondedesercion,
    (prevenciondedesercion) => prevenciondedesercion.pre
  )
  prevenciondedesercion: Prevenciondedesercion;
}
