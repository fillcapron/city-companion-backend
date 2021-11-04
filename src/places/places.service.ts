import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Places } from 'src/entity/places.entity';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';

@Injectable()
export class PlacesService {
    constructor(@InjectRepository(Places) private readonly repoPlace: Repository<Places>) { }

    public async createPlace(dto: CreatePlaceDto): Promise<number> {
        const category: number = dto.category;
        const address: number  = dto.address;

        const place = await this.repoPlace.save({
            name: dto.name,
            description: dto.description,
            website: dto.website,
            category: {id: category},
            address: {id: address }
        });
        return place.id
    }

    public async getOnePlace(name: string) {
        return await this.repoPlace.findOneOrFail(name);
    }
}
