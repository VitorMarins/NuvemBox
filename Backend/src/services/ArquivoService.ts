import type { Arquivo } from "../models/arquivo.js";
import ArquivoRepository from "../repositories/ArquivoRepository.js";

class ArquivoService {
  private arquivoRepository = ArquivoRepository;

  async create(fileData: Arquivo): Promise<Arquivo> {
    return await this.arquivoRepository.save(fileData);
  }

  async findAll(): Promise<Arquivo[]> {
    return await this.arquivoRepository.retrieveAll();
  }

  async findOne(id: string): Promise<Arquivo | null> {
    return await this.arquivoRepository.retrieveById(id);
  }

  //   async findName(nome: string): Promise<Arquivo | null> {
  //     return await this.arquivoRepository.retrieveByNome(nome);
  //   }

  async update(arquivo: Arquivo): Promise<void> {
    const arquivoAtual = await this.arquivoRepository.retrieveById(arquivo.id);

    if (!arquivoAtual) {
      throw new Error("Arquivo não encontrado.");
    }

    return await this.arquivoRepository.update(arquivo);
  }

  async delete(id: string): Promise<string> {
    return await this.arquivoRepository.delete(id);
  }
}

export default new ArquivoService();
