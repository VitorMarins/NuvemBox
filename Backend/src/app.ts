import express from "express";
import type { Application } from "express";
import { AppDataSource } from "./db/data-source.js";

export class App {
  app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public async Start(port: number) {
    try {
      await AppDataSource.initialize()
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
    const appRuning = this.app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
    appRuning.on("error", (error: Error) => {
      console.error("Erro no servidor:", error);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
