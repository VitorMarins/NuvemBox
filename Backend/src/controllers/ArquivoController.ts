import type { Request, Response } from "express";
import { Arquivo } from "../models/arquivo.js";
import ArquivoService from "../services/ArquivoService.js";

export default class ArquivoController {
  async create(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "Nenhum arquivo enviado." });
      }

      const { originalname, filename, path: filePath, mimetype, size } = req.file;

      const novoArquivo = new Arquivo();
      novoArquivo.nome_original = originalname;
      novoArquivo.nome_alterado = filename;
      novoArquivo.caminho = filePath;
      novoArquivo.mimetype = mimetype;
      novoArquivo.tamanho = String(size);
      novoArquivo.esta_na_lixeira = false;

      // Se você estiver enviando o usuario_id junto no FormData:
      if (req.body.usuario_id) {
        novoArquivo.usuario = req.body.usuario_id;
      }

      const savedArquivo = await ArquivoService.create(novoArquivo);
      res.status(201).send(savedArquivo);
    } catch (error: unknown) {
      res.status(500).send({ message: "Erro ao tentar salvar o arquivo: " + (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const arquivos = await ArquivoService.findAll();
      res.status(200).send(arquivos);
    } catch (error: unknown) {
      res.status(500).send({
        message:
          "Erro encontrado quando estava se fazendo a busca por todos os arquivos.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: string = String(req.params.id);
    try {
      const arquivo = await ArquivoService.findOne(id);
      if (arquivo) {
        res.status(200).send(arquivo);
      } else {
        res.status(404).send({
          message: `Não foi encontrado nenhum arquivo com esse id=${id}.`,
        });
      }
    } catch (error: unknown) {
      res.status(500).send({
        message: `Erro: não foi possível retornar o arquivo com id=${id}.`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let arquivo: Arquivo = req.body;
    arquivo.id = String(req.params.id);
    try {
      await ArquivoService.update(arquivo);
      res.send({
        message: `Arquivo atualizado com sucesso!`,
      });
    } catch (err: any) {
      const statusCode = err.message === "Arquivo não encontrado." ? 404 : 500;
      res.status(statusCode).send({
        message: err.message || `Erro ao atualizar o arquivo com id=${arquivo.id}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: string = String(req.params.id);

    try {
      const resultado = await ArquivoService.delete(id);

      if (resultado === "Arquivo excluído com sucesso.") {
        res.send({
          message: resultado,
        });
      } else {
        res.status(404).send({
          message: resultado,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `O arquivo com id=${id} não pôde ser deletado.`,
      });
    }
  }
}