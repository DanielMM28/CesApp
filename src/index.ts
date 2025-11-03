import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database";
import aprendizRoutes from "./routes/AprendizRuta";
import fichaRoutes from "./routes/FichaRuta";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado a la base de datos MySQL");


    app.use("/Aprendices", aprendizRoutes);
   app.use("/fichas", fichaRoutes);

    app.listen(3000, () => {
      console.log("✅ Servidor corriendo en http://localhost:3000/");
    });
  })
  .catch((error) => console.error("❌ Error al conectar la base de datos:", error));
