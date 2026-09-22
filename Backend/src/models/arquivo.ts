import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Usuario } from "./Usuario.js"

@Entity()
export class Arquivo {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30 })
    nome_original: string

    @Column({ type: "varchar", length: 30 })
    nome_alterado: string

    @Column("text")
    caminho: string

    @Column("text")
    mimetype: string

    @Column({ type: "bigint" })
    tamanho: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    criado_em: Date

    @Column("boolean", { default: false })
    esta_na_lixeira: boolean

    @ManyToOne(() => Usuario, (usuario) => usuario.arquivos, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario | null

}
