import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Arquivo } from "./arquivo.js"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30 })
    nome: string

    @Column({ type: "varchar", length: 30 })
    email: string

    @Column({ type: "varchar", length: 30 })
    senha: string

    @Column({ name: "esta_ativo", type: "boolean" })
    estaAtivo: boolean

    @Column({ name: "data_criacao", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataCriacao: Date
    
    @Column({ name: "data_atualizacao", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataAtualizacao: Date

    @OneToMany(() => Arquivo, (arquivo) => arquivo.usuario)
    arquivos: Relation<Arquivo>[]

}
