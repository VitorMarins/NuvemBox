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
    esta_ativo: boolean

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_criacao: Date
    
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_atualizacao: Date

    @OneToMany(() => Arquivo, (arquivo) => arquivo.usuario)
    arquivos: Relation<Arquivo>[]

}
