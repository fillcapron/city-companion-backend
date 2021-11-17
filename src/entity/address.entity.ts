import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./category.entity";
import { Places } from "./places.entity";

@Entity('address')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100})
    country: string;

    @Column({type: "varchar", length: 100})
    region: string;

    @Column({nullable: false, type: "varchar", length: 100})
    city: string;

    @Column({nullable: false, type: "varchar", length: 100})
    street: string;

    @Column({nullable: false, type: "varchar", length: 10})
    house: string;

    @Column({nullable: false, type: "varchar", length: 50})
    latitude: string;

    @Column({nullable: false, type: "varchar", length: 50})
    longitude: string;

    @ManyToOne(() => Categories, categories => categories.address, { onDelete: 'CASCADE' })
    category: Categories;

    @OneToMany(() => Places, places => places.address)
    places: Places[]
}