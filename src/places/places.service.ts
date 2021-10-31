import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { Places } from 'src/entity/places.entity';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Places) private readonly repoPlace: Repository<Places>
    ) { }

    public async create(dto: CreatePlaceDto): Promise<any> {
        const category: number = dto.category;
        const address: number  = dto.address;

        const place = await this.repoPlace.save({
            name: dto.name,
            description: dto.description,
            rating: dto.rating,
            website: dto.website,
            category: {id: category},
            address: {id: address }
        });
        return place.id
    }

    public async getOne(name: string) {
        return await this.repoPlace.findOneOrFail(name);
    }
}
