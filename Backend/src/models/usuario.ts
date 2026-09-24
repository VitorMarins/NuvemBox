import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, type Relation } from "typeorm"
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

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    data_criacao: Date
    
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    data_atualizacao: Date

    @OneToMany(() => Arquivo, (arquivo) => arquivo.usuario)
    arquivos: Relation<Arquivo>[]

}
