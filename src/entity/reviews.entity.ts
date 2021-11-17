import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Places } from "./places.entity";

@Entity('reviews')
export class Reviews extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, default: 'Anonymous'})
    author_name: string;

    @Column({nullable: false, type: 'text'})
    review_text: string;

    @ManyToOne(() => Places, places => places.reviews, { onDelete: 'CASCADE' })
    place: Places;
}