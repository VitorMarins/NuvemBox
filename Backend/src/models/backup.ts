import { Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, type Relation } from "typeorm"
import { Usuario } from "./usuario.js"
import { Arquivo } from "./arquivo.js"

@Entity()
export class Backup {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    criado_em: Date

    @ManyToOne(() => Arquivo, (arquivo) => arquivo.backups, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "arquivo_id" })
    arquivo: Relation<Arquivo>

}