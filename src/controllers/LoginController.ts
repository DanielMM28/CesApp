import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Usuario } from "../entity/entities/Usuario";
import jwt from "jsonwebtoken";

export class LoginController {
  private repo = AppDataSource.getRepository(Usuario);

  login = async (req: Request, res: Response) => {
    try {
      console.log("BODY RECIBIDO:", req.body);

      const { usuario, password } = req.body;

      if (!usuario || !password) {
        return res.status(400).json({
          message: "Usuario y contraseña son obligatorios",
        });
      }

      const user = await this.repo.findOne({
        where: { usuCorreo: usuario },
        // 🛑 CORRECCIÓN 1: Usar el nombre de la propiedad de objeto 'rol' 
        // (No la columna ID 'rolIdfk2')
        relations: ["rol"], 
      });


      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      
      // 🛑 CORRECCIÓN 2: Aplicar .trim() a la contraseña almacenada para evitar errores por espacios
      const storedPassword = user.usuCon ? user.usuCon.trim() : null;

      console.log("PASS BD:", storedPassword);
      console.log("PASSWORD RECIBIDO:", password);

      // Usar la contraseña limpia para la comparación
      const passOk = password === storedPassword;

      console.log("COMPARACIÓN:", passOk);

      if (!passOk) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // 🛑 CORRECCIÓN 3: Usar Optional Chaining (?.) para acceder a 'rolDes' de forma segura
      const rolDes = user.rol?.rolDes;

      const token = jwt.sign(
        {
          id: user.usuId,
          nombre: user.usuNom,
          rol: rolDes, // Usar la variable segura
        },
        process.env.JWT_SECRET || "clave_super_secreta",
        { expiresIn: "8h" }
      );

      return res.json({
        message: "Login exitoso",
        token,
        usuario: {
          id: user.usuId,
          nombreCompleto: `${user.usuNom} ${user.usuApe}`,
          rolNombre: rolDes, // Usar la variable segura
        }
      });
    } catch (error) {
      console.error("ERROR LOGIN:", error);
      // Agregar detalle del error para facilitar la depuración
      return res.status(500).json({ message: "Error en el servidor", error: (error as Error).message });
    }
  };
}