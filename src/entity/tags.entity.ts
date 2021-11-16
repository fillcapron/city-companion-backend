import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./category.entity";
import { Places } from "./places.entity";

@Entity('tags')
export class Tags extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'varchar', length: 100, unique: true})
    name: string;

    @ManyToOne(() => Categories, category => category.tags, { onDelete: 'CASCADE' })
    @JoinColumn()
    category: Categories;

    @ManyToOne(() => Places, place => place.tags, { onDelete: 'CASCADE' })
    @JoinColumn()
    place: Places;
}