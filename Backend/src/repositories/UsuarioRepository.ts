import { AppDataSource } from "../db/data-source.js";
import { Usuario } from "../models/usuario.js";

class UsuarioRepository {
    usuarioRepository = AppDataSource.getRepository(Usuario)

    async save(usuario: Usuario): Promise<Usuario> {
        try {
            return await this.usuarioRepository.save(usuario)
        } catch (error: unknown) {
            throw new Error("Erro ao salvar o usuário: " + (error as Error).message)
        }
    }
    
    async retrieveAll(): Promise<Usuario[]> {
        try {
            return await this.usuarioRepository.find()
        } catch (error: unknown) {
            throw new Error("Falha ao retornar os usuários: " + (error as Error).message)
        }
    }

    async retrieveById(usuarioID: number): Promise<Usuario | null> {
        try {
            return await this.usuarioRepository.findOneBy({
                id: usuarioID,
            })
        } catch (error: unknown) {
            throw new Error("Falha ao retornar o usuário: " + (error as Error).message)
        }
    }

    async update(usuario: Usuario) {
        const { nome, email, senha, esta_ativo } = usuario
        try {
            return await this.usuarioRepository.save(usuario)
        } catch (error: unknown) {
            throw new Error("Falha ao alterar o usuário: " + (error as Error).message)
        }
    }

    async delete(usuarioID: number) : Promise<String> {
        try {
            const usuario = await this.usuarioRepository.findOneBy({ id: usuarioID });
            if (!usuario) {
                return "Usuário não encontrado";
            }
            await this.usuarioRepository.remove(usuario);
            return "Usuário deletado";
        } catch (error: unknown) {
            throw new Error("Falha ao apagar o usuário: " + (error as Error).message)
        }
    }

}