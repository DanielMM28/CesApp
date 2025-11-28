import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { BaseController } from "./BaseController";
import { Acta } from "../entity/entities/Acta";
// import { flushCompileCache } from "module"; // <--- NO NECESARIO, SE REMUEVE
import { Comite } from "../entity/entities/Comite";
import { Centro } from "../entity/entities/Centro";
import { Asistente } from "../entity/entities/Asistente";

// Se sugiere tipar la respuesta para mayor claridad
type AsistenteResponse = {
    id: number;
    nombre: string | null;
};

export class ActaController extends BaseController<Acta> {
  constructor() {
    super(
      AppDataSource.getRepository(Acta),
      "actId"
    );
  }

  obtenerTodos = async (req: Request, res: Response) => {
    try {
      const actas = await AppDataSource.getRepository(Acta).find({
        relations: [
            "comite", 
            "centro", 
            "asiIdfk2", 
            "asiIdfk2.usuIdfk2", // Carga el Asistente y, anidadamente, el Usuario asociado
            "ficha" // Se sugiere añadir Ficha si es relevante para el Acta
        ],
      });

      const respuesta = actas.map(p => {
        // Objeto asistente simplificado y seguro
        const asistenteInfo: AsistenteResponse | null = p.asiIdfk2 ? {
            id: p.asiIdfk2.asiId,
            // Uso de Optional Chaining seguro para obtener el nombre del Usuario
            nombre: p.asiIdfk2.usuIdfk2?.usuNom || p.asiIdfk2.usuIdfk2?.usuApe || null
        } : null;

        return {
          ID: p.actId,
          tema: p.actTema,
          descripcion: p.actDes,
          version: p.actVer,
          // Se recomienda renombrar "Acta" a "anexos" o similar para evitar confusión con la entidad
          anexos: p.actAnexos, 
          conclusion: p.actCon,
          objetivo: p.actObj,
          fecha: p.actFecha,
          horaInicio: p.actHoraInicio, // camelCase
          horaFin: p.actHoraFin,       // camelCase
          // Se usa el operador nullish coalescing (??) para retornar una cadena vacía en lugar de 'undefined' si no existe la relación
          comiteTipo: p.comite.comTip, // Asumí 'comNombre' o 'ComId' en la entidad Comite
          centroDescripcion: p.centro?.cenDes ?? null,
          asistente: asistenteInfo,
          // ficha: p.ficha?.propiedad_relevante_de_ficha ?? null, // Ejemplo si agregaste Ficha
        };
      });

      res.json(respuesta);
    } catch (error) {
      console.error("❌ Error al obtener Actas:", error); // Agregar contexto al error
      res.status(500).json({ mensaje: "Error al obtener Actas", error: (error as Error).message });
    }
  };
}