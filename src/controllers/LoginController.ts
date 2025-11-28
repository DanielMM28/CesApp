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
  relations: ["rolIdfk2"],   // 👈 IMPORTANTE
});


      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      console.log("PASS BD:", user.usuCon);
      console.log("PASSWORD RECIBIDO:", password);

      // Como tu BD usa contraseñas sin encriptar:
      const passOk = password === user.usuCon;

      console.log("COMPARACIÓN:", passOk);

      if (!passOk) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        {
          id: user.usuId,
          nombre: user.usuNom,
          rol: user.rol.rolDes,
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
  rolNombre: user.rol.rolDes
}

      });
    } catch (error) {
      console.error("ERROR LOGIN:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  };
}
