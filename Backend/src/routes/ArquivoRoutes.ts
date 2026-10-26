import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer.js";
import ArquivoController from "../controllers/ArquivoController.js";

class ArquivoRoutes {
  router: Router;
  controller = new ArquivoController();
  upload = multer(multerConfig);

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/", this.upload.single("file"), this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findOne);
    // this.router.get("/nome/:nome", this.controller.findName);
    this.router.put(
      "/arquivos/:id",
      this.upload.single("arquivo"),
      this.controller.update,
    );
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new ArquivoRoutes().router;
