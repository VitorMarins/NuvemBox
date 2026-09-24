import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, type Relation } from "typeorm"
import { Usuario } from "./usuario.js"
import { Backup } from "./backup.js"

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
    tamanho: string

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    criado_em: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    alterado_em: Date

    @Column("boolean", { default: false })
    esta_na_lixeira: boolean

    @ManyToOne(() => Usuario, (usuario) => usuario.arquivos, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "usuario_id" })
    usuario: Relation<Usuario | null>

    @OneToMany(() => Backup, (backup) => backup.arquivo)
    backups: Relation<Backup>[]

}
