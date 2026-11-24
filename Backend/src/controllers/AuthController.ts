import type { Request, Response } from "express";
import { Usuario } from "../models/usuario.js";
import AuthService from "../services/AuthService.js";

export default class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const token = await AuthService.login(email, senha);
      res.status(200).send({ token });
    } catch (error: unknown) {
      res.status(401).send({ message: "Credenciais inválidas." });
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const payload = await AuthService.verifyToken(token);
      if (!payload) {
        res.status(401).send({ message: "Token inválido." });
        return;
      }
      res.status(200).send({ payload });
    } catch (error: unknown) {
      res.status(401).send({ message: "Erro ao verificar o token." });
    }
  }
}
