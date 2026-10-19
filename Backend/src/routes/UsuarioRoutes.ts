import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js";

class UsuarioRoutes {
  router: Router;
  controller = new UsuarioController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/", this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findOne);
    this.router.get("/nome/:nome", this.controller.findName);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new UsuarioRoutes().router;
