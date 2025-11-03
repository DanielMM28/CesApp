import "reflect-metadata";
import { DataSource } from "typeorm";

// Importa todas tus entidades
import { Aprendiz } from "./entity/entities/Aprendiz";
import { ApreAcu } from "./entity/entities/ApreAcu";
import { ProCom } from "./entity/entities/ProCom";
import { FicApr } from "./entity/entities/FicApr";
import { UsuFic } from "./entity/entities/UsuFic";
import { Acta } from "./entity/entities/Acta";
import { Acudiente } from "./entity/entities/Acudiente";
import { Estado } from "./entity/entities/Estado";
import { Ficha } from "./entity/entities/Ficha";
import { Usuario } from "./entity/entities/Usuario";
import { Invitado } from "./entity/entities/Invitado";
import { Competencia } from "./entity/entities/Competencia";
import { Programa } from "./entity/entities/Programa";
import { Resultadoaprendizaje } from "./entity/entities/Resultadoaprendizaje";
import { Conocimentodeprocesos } from "./entity/entities/Conocimentodeprocesos";
import { Plandemejoramiento } from "./entity/entities/Plandemejoramiento";
import { Asistente } from "./entity/entities/Asistente";
import { Area } from "./entity/entities/Area";
import { Rol } from "./entity/entities/Rol";
import { Compromisos } from "./entity/entities/Compromisos";
import { Comite } from "./entity/entities/Comite";
import { Departamento } from "./entity/entities/Departamento";
import { Centro } from "./entity/entities/Centro";
import { Municipio } from "./entity/entities/Municipio";
import { Llamadodeatencion } from "./entity/entities/Llamadodeatencion";
import { Prevenciondedesercion } from "./entity/entities/Prevenciondedesercion";
import { Reportecomite } from "./entity/entities/Reportecomite";
import { Resultado } from "./entity/entities/Resultado";




// agrega las demás entidades si las tienes...

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "", // o la contraseña que uses
  database: "bdcomite",
  synchronize: false, // ⚠️ usa true solo para desarrollo (crea tablas automáticamente)
  logging: false,
  entities: [
    Aprendiz,
    ApreAcu,
    ProCom,
    Resultado,
    FicApr,
    UsuFic,
    Acta,
    Acudiente,
    Estado,
    Ficha,
    Usuario,
    Invitado,
    Competencia,
    Programa,
    Reportecomite,
    Prevenciondedesercion,
    Resultadoaprendizaje,
    Conocimentodeprocesos,
    Plandemejoramiento,
    Asistente,
    Llamadodeatencion,
Area,
Rol,
Compromisos,
Departamento,
Centro,
Municipio,
Comite,

  ],
});
