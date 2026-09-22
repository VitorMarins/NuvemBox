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

    @Column({ type: "boolean" })
    estaAtivo: boolean

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataCriacao: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataAtualizacao: Date

    @OneToMany(() => Arquivo, (arquivo) => arquivo.usuario)
    arquivos: Arquivo[]

}
