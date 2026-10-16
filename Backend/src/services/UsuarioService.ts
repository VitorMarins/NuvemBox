import { Usuario } from "../models/usuario.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";

class UsuarioService {
  private usuarioRepository: typeof UsuarioRepository;

  constructor() {
    this.usuarioRepository = UsuarioRepository;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepository.save(usuario);
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

  async update(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepository.update(usuario);
  }

  async delete(id: string): Promise<String> {
    return await this.usuarioRepository.delete(id);
  }
}

export default new UsuarioService();