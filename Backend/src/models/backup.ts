import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import type { Relation } from "typeorm"
import { Usuario } from "./usuario.js"
import type { Arquivo } from "./arquivo.js"

@Entity()
export class Backup {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    criado_em: Date

    @ManyToOne("Arquivo", (arquivo: Arquivo) => arquivo.backups, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "arquivo_id" })
    arquivo: Relation<Arquivo>

}