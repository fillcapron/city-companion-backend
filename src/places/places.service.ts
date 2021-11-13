import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Address } from 'src/entity/address.entity';
import { Places } from 'src/entity/places.entity';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';

@Injectable()
export class PlacesService {
    constructor(@InjectRepository(Places) private readonly repoPlace: Repository<Places>) { }

    async createPlace(dto: CreatePlaceDto): Promise<Places> {
        const category: number = dto.category.id;
        const address: number = dto.address.id;

        return await this.repoPlace.save({
            name: dto.name,
            description: dto.description,
            website: dto.website,
            category: { id: category },
            address: { id: address }
        });
    }

    async getOnePlace(name: string): Promise<Places> {
        return await this.repoPlace.findOneOrFail(name);
    }

    async getPlaces() {
        return await this.repoPlace.find({ relations: ['category', 'tags', 'images', 'address'] });
    }

    async deletePlace(id: number): Promise<IMessage> {
        const place = await this.repoPlace.delete(id);
        return { message: 'Место удалено' };
    }

    public async updatePlace(dto: CreatePlaceDto): Promise<IMessage> {
        const place = await this.repoPlace.update(dto.id, dto)
        return { message: 'Место обновлено' };
    }
}
