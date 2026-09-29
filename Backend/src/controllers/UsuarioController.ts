import type { Request, Response } from "express";
import { Usuario } from "../models/usuario.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";

export default class UsuarioController {
  async create(req: Request, res: Response) {
    try {
      const usuario: Usuario = req.body;
      const savedUsuario = await UsuarioRepository.save(usuario);
      res.status(201).send(savedUsuario);
    } catch (error: unknown) {
      res.status(500).send({ message: "Erro ao tentar criar um usuario." });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const usuarios = await UsuarioRepository.retrieveAll();
      res.status(200).send(usuarios);
    } catch (error: unknown) {
      res.status(500).send({
        message:
          "Erro encontrado quando estava se fazendo a busca por todos os usuarios.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: string = String(req.params.id);
    try {
      const usuario = await UsuarioRepository.retrieveById(id);
      if (usuario) res.status(200).send(usuario);
      else
        res.status(404).send({
          message: `Não foi encontrado nenhum usuario com esse id=${id}.`,
        });
    } catch (error: unknown) {
      res.status(500).send({
        message: `Error não foi possível retornar o Usuario com id=${id}.`,
      });
    }
  }

  async findName(req: Request, res: Response) {
    const nome: string = req.params.nome;

    try {
      const usuario = await usuarioRepository.retrieveByNome(nome);
      if (usuario) res.status(200).send(usuario);
      else
        res.status(404).send({
          message: `Não foi encontrado nenhum usuário com esse nome=${nome}.`,
        });
    } catch (err) {
      res.status(500).send({
        message: `Error não foi possível retornar o Usuário com nome=${nome}.`,
      });
    }
  }
  async update(req: Request, res: Response) {
    let usuario: Usuario = req.body;
    usuario.id = String(req.params.id);
    try {
      await UsuarioRepository.update(usuario);
      res.send({
        message: `Usuário ${usuario.nome} atualizado com sucesso!`,
      });
    } catch (err) {
      res.status(500).send({
        message: `Error ao atualizar o Usuário com id=${usuario.id}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: string = String(req.params.id);

    try {
      const num = await UsuarioRepository.delete(id);

      if (num == "Usuário deletado") {
        res.send({
          message: "Usuário deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar o Usuário com id=${id}. O Usuário não foi encontrado.`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `O Usuário com id=${id}, não pode ser deletado.`,
      });
    }
  }
}
