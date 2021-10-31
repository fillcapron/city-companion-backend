import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Categories } from "./category.entity";
import { Images } from "./images.entity";
import { Reviews } from "./reviews.entity";
import { Tags } from "./tags.entity";

@Entity('places')
export class Places extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'real', nullable: true })
    rating: number;

    @Column({ type: 'varchar', length: 100 })
    website: string;

    @OneToMany(() => Tags, tag => tag.place)
    tags: Tags[];

    @OneToMany(() => Images, img => img.place)
    images: Images[];

    @OneToMany(() => Reviews, review => review.place)
    reviews: Reviews[];

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToOne(() => Categories)
    @JoinColumn()
    category: Categories;
}