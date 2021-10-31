import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { Tags } from "./tags.entity";

@Entity('categories')
export class Categories extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: "varchar", length: 100})
    name: string;

    @OneToMany(() => Tags, tag => tag.category)
    tags: Tags[];
}