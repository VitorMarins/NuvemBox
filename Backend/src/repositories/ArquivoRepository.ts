import { AppDataSource } from "../db/data-source.js";
import { Arquivo } from "../models/arquivo.js";

class ArquivoRepository {
  arquivoRepository = AppDataSource.getRepository(Arquivo);

  async save(arquivo: Arquivo): Promise<Arquivo> {
    try {
      return await this.arquivoRepository.save(arquivo);
    } catch (error: unknown) {
      throw new Error("Erro ao criar o arquivo: " + (error as Error).message);
    }
  }

  async retrieveAll(): Promise<Arquivo[]> {
    try {
      return await this.arquivoRepository.find();
    } catch (error: unknown) {
      throw new Error(
        "Falha ao retornar os arquivos: " + (error as Error).message,
      );
    }
  }

  async retrieveById(arquivoID: string): Promise<Arquivo | null> {
    try {
      return await this.arquivoRepository.findOneBy({
        id: arquivoID,
      });
    } catch (error: unknown) {
      throw new Error(
        "Falha ao retornar o arquivo: " + (error as Error).message,
      );
    }
  }

  async update(arquivo: Arquivo) {
    const { id, ...updateData } = arquivo;
    try {
      await this.arquivoRepository.update(id, updateData);
    } catch (error: unknown) {
      throw new Error("Erro ao atualizar o arquivo: " + (error as Error).message);
    }
  }

  async delete(arquivoID: string): Promise<String> {
    try {
      await this.arquivoRepository.delete(arquivoID);
      return "Arquivo excluído com sucesso.";
    } catch (error: unknown) {
      throw new Error("Erro ao excluir o arquivo: " + (error as Error).message);
    }
  }
}

export default new ArquivoRepository();
