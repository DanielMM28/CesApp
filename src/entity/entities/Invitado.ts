import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Acta } from "./Acta";

@Entity("invitado", { schema: "bdcomite" })
export class Invitado {
  @Column("int", { primary: true, name: "InvID" })
  invId: number;

  @Column("varchar", { name: "InvNom", nullable: true, length: 100 })
  invNom: string | null;

  @Column("varchar", { name: "InvCar", nullable: true, length: 100 })
  invCar: string | null;

  @Column("varchar", { name: "InvEnt", nullable: true, length: 100 })
  invEnt: string | null;

  @ManyToMany(() => Acta, (acta) => acta.invitados)
  @JoinTable({
    name: "inv_act",
    joinColumns: [{ name: "InvIDFK", referencedColumnName: "invId" }],
    inverseJoinColumns: [{ name: "ActIDFK", referencedColumnName: "actId" }],
    schema: "bdcomite",
  })
  actas: Acta[];
}
