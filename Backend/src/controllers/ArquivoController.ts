import type { Request, Response } from "express";
import { Arquivo } from "../models/arquivo.js";
import ArquivoService from "../services/ArquivoService.js";
import fs from "node:fs";

export default class ArquivoController {
  async create(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "Nenhum arquivo enviado." });
      }

      const {
        originalname,
        filename,
        path: filePath,
        mimetype,
        size,
      } = req.file;

      const novoArquivo = new Arquivo();
      novoArquivo.nome_original = originalname;
      novoArquivo.nome_alterado = filename;
      novoArquivo.caminho = filePath;
      novoArquivo.mimetype = mimetype;
      novoArquivo.tamanho = String(size);
      novoArquivo.esta_na_lixeira = false;

      if (req.body.usuario_id) {
        novoArquivo.usuario = req.body.usuario_id;
      }

      const savedArquivo = await ArquivoService.create(novoArquivo);
      res.status(201).send(savedArquivo);
    } catch (error: unknown) {
      res.status(500).send({
        message: "Erro ao tentar salvar o arquivo: " + (error as Error).message,
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const arquivos = await ArquivoService.findAll();
      res.status(200).send(arquivos);
    } catch (error: unknown) {
      res.status(500).send({ message: "Erro ao buscar todos os arquivos." });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: string = String(req.params.id);
    try {
      const arquivo = await ArquivoService.findOne(id);
      if (arquivo) {
        res.status(200).send(arquivo);
      } else {
        res
          .status(404)
          .send({ message: `Arquivo com id=${id} não encontrado.` });
      }
    } catch (error: unknown) {
      res
        .status(500)
        .send({ message: `Erro ao retornar o arquivo com id=${id}.` });
    }
  }

  // NOVA VERSÃO DO UPDATE: Substitui o arquivo físico e atualiza no banco
  async update(req: Request, res: Response) {
    const id: string = String(req.params.id);
    try {
      const arquivoAntigo = await ArquivoService.findOne(id);
      if (!arquivoAntigo) {
        // Se mandou um arquivo novo mas o registro não existe, limpa o arquivo enviado do disco
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).send({ message: "Arquivo não encontrado." });
      }

      // Se um novo arquivo foi enviado via Multer, substituímos o físico
      if (req.file) {
        // 1. Apaga o arquivo físico antigo do disco
        if (fs.existsSync(arquivoAntigo.caminho)) {
          fs.unlinkSync(arquivoAntigo.caminho);
        }

        // 2. Atualiza os dados físicos com o novo arquivo
        arquivoAntigo.nome_original = req.file.originalname;
        arquivoAntigo.nome_alterado = req.file.filename;
        arquivoAntigo.caminho = req.file.path;
        arquivoAntigo.mimetype = req.file.mimetype;
        arquivoAntigo.tamanho = String(req.file.size);
      }

      // Se o usuário mandou apenas alterar propriedades textuais (ex: renomear o nome_original ou lixeira) sem enviar arquivo novo
      if (req.body.nome_original) {
        arquivoAntigo.nome_original = req.body.nome_original;
      }
      if (req.body.esta_na_lixeira !== undefined) {
        arquivoAntigo.esta_na_lixeira =
          req.body.esta_na_lixeira === "true" ||
          req.body.esta_na_lixeira === true;
      }

      await ArquivoService.update(arquivoAntigo);
      res.status(200).send({
        message: "Arquivo atualizado com sucesso!",
        arquivo: arquivoAntigo,
      });
    } catch (err: any) {
      res
        .status(500)
        .send({ message: "Erro ao atualizar o arquivo: " + err.message });
    }
  }

  async download(req: Request, res: Response) {
    const id: string = String(req.params.id);
    try {
      const arquivo = await ArquivoService.findOne(id);
      if (!arquivo) {
        return res
          .status(404)
          .send({ message: "Arquivo não encontrado no banco de dados." });
      }

      if (!fs.existsSync(arquivo.caminho)) {
        return res
          .status(404)
          .send({ message: "Arquivo físico não encontrado no servidor." });
      }

      res.download(arquivo.caminho, arquivo.nome_original);
    } catch (error: unknown) {
      res.status(500).send({ message: "Erro ao realizar o download." });
    }
  }

  async delete(req: Request, res: Response) {
    const id: string = String(req.params.id);

    try {
      const arquivo = await ArquivoService.findOne(id);
      if (arquivo && fs.existsSync(arquivo.caminho)) {
        fs.unlinkSync(arquivo.caminho); // Apaga o arquivo físico
      }

      const resultado = await ArquivoService.delete(id);
      res.send({ message: resultado });
    } catch (err) {
      res
        .status(500)
        .send({ message: `O arquivo com id=${id} não pôde ser deletado.` });
    }
  }
}
