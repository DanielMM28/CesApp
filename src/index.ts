import "reflect-metadata";
import express from "express";

import { AppDataSource } from "./database";
import aprendizRoutes from "./routes/AprendizRuta";
import fichaRoutes from "./routes/FichaRuta";
import ComiteRoutes from "./routes/ComiteRuta";
import UsuariosRoutes from "./routes/UsuarioRuta";
import CentroRoutes from "./routes/CentroRuta";
import AcudienteRoutes from "./routes/AcudienteRuta";
import AsistenteRoutes  from "./routes/AsistenteRuta";
import  PlandemejoramientoRoutes   from "./routes/PlanRuta";
import FicAprRoutes from "./routes/FicApreRuta";
import ActasRoutes from "./routes/ActaRuta";
import LoginRoutes from "./routes/LoginRuta"
import DepartamentoRoutes from "./routes/DepartamentoRuta";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado a la base de datos MySQL");
app.use(express.json()); // NECESARIO para parsear application/json
app.use(express.urlencoded({ extended: true }));
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
