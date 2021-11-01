import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Places } from "./places.entity";

@Entity('images')
export class Images extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'varchar', length: 255})
    url_path: string;

    @ManyToOne(() => Places, places => places.images)
    place: Places;
}