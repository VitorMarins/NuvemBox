import { Usuario } from "../models/usuario.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { hashPassword } from "../utils/password.js";

class UsuarioService {
  private usuarioRepository = UsuarioRepository;

  async create(userData: Usuario): Promise<Usuario> {
    const hashedPassword = await hashPassword(userData.senha);
    const userFinalData = { ...userData, senha: hashedPassword };
    return await this.usuarioRepository.save(userFinalData);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.retrieveAll();
  }

  async findOne(id: string): Promise<Usuario | null> {
    return await this.usuarioRepository.retrieveById(id);
  }

  async findName(nome: string): Promise<Usuario | null> {
    return await this.usuarioRepository.retrieveByNome(nome);
  }

  async update(usuario: Usuario): Promise<void> {
    if (usuario.senha) {
      usuario.senha = await hashPassword(usuario.senha);
    }
    return await this.usuarioRepository.update(usuario);
  }

  async delete(id: string): Promise<string> {
    return await this.usuarioRepository.delete(id);
  }
}

export default new UsuarioService();
