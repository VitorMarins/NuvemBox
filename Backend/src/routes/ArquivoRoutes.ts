import { Router } from "express";
import ArquivoController from "../controllers/ArquivoController.js";

class ArquivoRoutes {
  router: Router;
  controller = new ArquivoController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/", this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findOne);
    // this.router.get("/nome/:nome", this.controller.findName);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new ArquivoRoutes().router;
