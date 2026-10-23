import type { Application } from "express";
import UsuarioRoutes from "./UsuarioRoutes.js";
import ArquivoRoutes from "./ArquivoRoutes.js";

// Concentrador de rotas
export default class Routes {
  constructor(app: Application) {
    app.use("/usuarios", UsuarioRoutes);
    app.use("/arquivos", ArquivoRoutes);
  }
}
