import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({ type: 'text', nullable: true, unique: true })
    phone: string;

    @OneToMany(() => Tags, tag => tag.place)
    tags: Tags[];

    @OneToMany(() => Images, img => img.place)
    images: Images[];

    @OneToMany(() => Reviews, review => review.place)
    reviews: Reviews[];

    @ManyToOne(() => Address, address => address.places)
    address: Address;

    @ManyToOne(() => Categories)
    category: Categories;

    @Column({ type: 'boolean', default: false })
    published: boolean;

    @Column({ type: 'int', nullable: true, default: 0 })
    views: number;
}