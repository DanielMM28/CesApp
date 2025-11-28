import "reflect-metadata";
import express from "express";
import cors from "cors"; // Importación correcta de CORS

import { AppDataSource } from "./database";
// ... (imports de rutas)
import aprendizRoutes from "./routes/AprendizRuta";
import fichaRoutes from "./routes/FichaRuta";
import ComiteRoutes from "./routes/ComiteRuta";
import UsuariosRoutes from "./routes/UsuarioRuta";
import CentroRoutes from "./routes/CentroRuta";
import AcudienteRoutes from "./routes/AcudienteRuta";
import AsistenteRoutes  from "./routes/AsistenteRuta";
import  PlandemejoramientoRoutes   from "./routes/PlanRuta";
import FicAprRoutes from "./routes/FicApreRuta";
import ActasRoutes from "./routes/ActaRuta";
import LoginRoutes from "./routes/LoginRuta"
import DepartamentoRoutes from "./routes/DepartamentoRuta";

const app = express();

// ----------------------------------------------------
// 1. CONFIGURACIÓN DE MIDDLEWARE (FUERA DEL .then())
// ----------------------------------------------------

// 1.1 CORS: Configuración para permitir peticiones desde React
app.use(cors({
    // ⚠️ Asegúrate de que 'http://localhost:XXXX' sea el puerto real de tu aplicación React.
    // Si usas Vite, suele ser 5173, 3001, etc.
    origin: ['http://localhost:5176', 'http://127.0.0.1:5176'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// 1.2 Body Parsers: Necesarios para leer req.body (JSON y formularios)
app.use(express.json()); // Única y correcta llamada para JSON
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------
// 2. INICIALIZACIÓN DE LA BASE DE DATOS Y RUTAS
// ----------------------------------------------------
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado a la base de datos MySQL");

    // 🛑 REMOVIDO: Las llamadas a app.use(express.json()); y app.use(express.urlencoded({ extended: true })); 
    // se han eliminado de aquí porque ya están al inicio del archivo.

    // Configuración de rutas (Endpoints)
    app.use("/Aprendices", aprendizRoutes);
    app.use("/fichas", fichaRoutes);
    app.use("/Usuarios",UsuariosRoutes);
    app.use("/Comites",ComiteRoutes);
    app.use("/Centros",CentroRoutes);
    app.use("/Acudientes",AcudienteRoutes);
    app.use("/Asistentes",AsistenteRoutes);
    app.use("/Plan",PlandemejoramientoRoutes);
    app.use("/AprendicesFichas", FicAprRoutes);
    app.use("/Actas", ActasRoutes);
    app.use("/login", LoginRoutes);
    app.use("/Departamentos", DepartamentoRoutes)


    app.listen(3000, () => {
      console.log("✅ Servidor corriendo en http://localhost:3000/");
    });
  })
  .catch((error) => console.error("❌ Error al conectar la base de datos:", error));