import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}