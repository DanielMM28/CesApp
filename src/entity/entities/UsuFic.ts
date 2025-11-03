import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Ficha } from "./Ficha";
import { Usuario } from "./Usuario";

@Index("UsuIDFK", ["usuIdfk"], {})
@Index("FicIDFK", ["ficIdfk"], {})
@Entity("usu_fic", { schema: "bdcomite" })
export class UsuFic {
  @Column("int", { primary: true, name: "UsuIDFK" })
  usuIdfk: number;

  @Column("int", { primary: true, name: "FicIDFK" })
  ficIdfk: number;

  @ManyToOne(() => Ficha, (ficha) => ficha.usuFics, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "FicIDFK", referencedColumnName: "ficId" }])
  ficIdfk2: Ficha;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuFics, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "UsuIDFK", referencedColumnName: "usuId" }])
  usuIdfk2: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuFics2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "UsuIDFK", referencedColumnName: "usuId" }])
  usuIdfk3: Usuario;

  @ManyToOne(() => Ficha, (ficha) => ficha.usuFics2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "FicIDFK", referencedColumnName: "ficId" }])
  ficIdfk3: Ficha;
}
