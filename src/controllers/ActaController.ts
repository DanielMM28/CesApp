import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { BaseController } from "./BaseController";
import { Acta } from "../entity/entities/Acta";
import { Comite } from "../entity/entities/Comite";
import { Centro } from "../entity/entities/Centro";
import { Asistente } from "../entity/entities/Asistente";

// Tipado de la respuesta del asistente (para consistencia)
type AsistenteResponse = {
    id: number;
    nombre: string | null;
};

// Función de mapeo para DRY (Do Not Repeat Yourself)
const mapActaToResponse = (p: Acta) => {
    // Generación de información del asistente (anidada)
    const asistenteInfo: AsistenteResponse | null = p.asiIdfk2 ? {
        id: p.asiIdfk2.asiId,
        nombre: p.asiIdfk2.usuIdfk2?.usuNom || p.asiIdfk2.usuIdfk2?.usuApe || null
    } : null;

    return {
        ID: p.actId,
        tema: p.actTema,
        descripcion: p.actDes,
        version: p.actVer,
        anexos: p.actAnexos,
        conclusion: p.actCon,
        objetivo: p.actObj,
        fecha: p.actFecha,
        horaInicio: p.actHoraInicio,
        horaFin: p.actHoraFin,
        // Nota: Asegúrate de que 'comite.comTip' exista en tu entidad Comite
        comiteTipo: p.comite?.comTip ?? null, 
        centroDescripcion: p.centro?.cenDes ?? null,
        asistente: asistenteInfo,
        // ficha: p.ficha?.propiedad_relevante_de_ficha ?? null, // Si incluyes Ficha
    };
};

export class ActaController extends BaseController<Acta> {
    constructor() {
        super(
            AppDataSource.getRepository(Acta),
            "actId"
        );
    }

    // ----------------------------------------------------
    // READ ALL (Leer todos)
    // ----------------------------------------------------
    obtenerTodos = async (req: Request, res: Response) => {
        try {
            const actas = await AppDataSource.getRepository(Acta).find({
                relations: [
                    "comite",
                    "centro",
                    "asiIdfk2",
                    "asiIdfk2.usuIdfk2",
                    "ficha" // Si la necesitas, si no, puedes quitarla
                ],
            });

            // Usamos la función de mapeo para mantener la consistencia
            const respuesta = actas.map(mapActaToResponse);

            res.json(respuesta);
        } catch (error) {
            console.error("❌ Error al obtener Actas:", error);
            res.status(500).json({ mensaje: "Error al obtener Actas", error: (error as Error).message });
        }
    };
    
    // ----------------------------------------------------
    // READ ONE (Leer por ID)
    // ----------------------------------------------------
    obtenerPorId = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ mensaje: "ID de Acta inválido" });
            }

            const acta = await AppDataSource.getRepository(Acta).findOne({
                where: { actId: id },
                relations: [
                    "comite",
                    "centro",
                    "asiIdfk2",
                    "asiIdfk2.usuIdfk2",
                    "ficha"
                ],
            });

            if (!acta) {
                return res.status(404).json({ mensaje: "Acta no encontrada" });
            }

            // Usamos la función de mapeo para mantener la consistencia
            const respuesta = mapActaToResponse(acta);
            res.json(respuesta);

        } catch (error) {
            console.error("❌ Error al obtener Acta por ID:", error);
            res.status(500).json({ mensaje: "Error al obtener Acta", error: (error as Error).message });
        }
    };

    // ----------------------------------------------------
    // CREATE (Crear)
    // ----------------------------------------------------

    // ----------------------------------------------------
    // UPDATE (Actualizar)
    // ----------------------------------------------------
    actualizar = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ mensaje: "ID de Acta inválido" });
            }

            const actaExistente = await this.repository.findOneBy({ actId: id });
            if (!actaExistente) {
                return res.status(404).json({ mensaje: "Acta no encontrada" });
            }

            // Actualizar y guardar
            this.repository.merge(actaExistente, req.body);
            const actaActualizada = await this.repository.save(actaExistente);

            // Para retornar con todas las relaciones cargadas
            const actaCompleta = await this.repository.findOne({
                where: { actId: actaActualizada.actId },
                relations: ["comite", "centro", "asiIdfk2", "asiIdfk2.usuIdfk2", "ficha"],
            });
            
            const respuesta = actaCompleta ? mapActaToResponse(actaCompleta) : actaActualizada;

            res.json({ mensaje: "Acta actualizada con éxito", acta: respuesta });
            
        } catch (error) {
            console.error("❌ Error al actualizar Acta:", error);
            res.status(500).json({ mensaje: "Error al actualizar Acta", error: (error as Error).message });
        }
    };

    // ----------------------------------------------------
    // DELETE (Eliminar)
    // ----------------------------------------------------
    eliminar = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ mensaje: "ID de Acta inválido" });
            }
            
            const resultado = await this.repository.delete(id);

            if (resultado.affected === 0) {
                return res.status(404).json({ mensaje: "Acta no encontrada" });
            }

            res.json({ mensaje: "Acta eliminada con éxito", id: id });
            
        } catch (error) {
            // Manejo de errores de restricción de llave foránea
            if (error instanceof Error && (error as any).code === 'ER_ROW_IS_REFERENCED') {
                 return res.status(409).json({ mensaje: "No se puede eliminar el Acta porque está referenciada por otra tabla (restricción de llave foránea).", error: (error as Error).message });
            }

            console.error("❌ Error al eliminar Acta:", error);
            res.status(500).json({ mensaje: "Error al eliminar Acta", error: (error as Error).message });
        }
    };
}