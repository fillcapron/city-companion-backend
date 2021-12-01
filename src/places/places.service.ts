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

    async createPlace(dto: CreatePlaceDto): Promise<Places | IMessage> {
        const category: number = dto.category && dto.category.id;
        const address: number = dto.address && dto.address.id;

        try {
            const place = await this.repoPlace.save({
                name: dto.name,
                description: dto.description,
                website: dto.website,
                published: dto.published,
                category: { id: category },
                address: { id: address }
            });

            return { error: false, message: 'Место добавлено', meta: place };

        } catch (e) {
            return { error: true, message: 'Ошибка добавления места', meta: e };
        }

    }

    async getOnePlace(name: string): Promise<Places> {
        return await this.repoPlace.findOneOrFail(name);
    }

    async getPlaces() {
        return await this.repoPlace.find({ relations: ['category', 'tags', 'images', 'address'] });
    }

    async deletePlace(id: number): Promise<IMessage> {
        try {
            const place = await this.repoPlace.delete(id);
            return { error: false, message: 'Место удалено', meta: place };
        } catch (e) {
            return { error: true, message: 'Ошибка удаления места', meta: e }
        }
    }

    public async updatePlace(dto: CreatePlaceDto): Promise<IMessage> {
        try {
            const place = await this.repoPlace.update(dto.id, dto)
            return { error: false, message: 'Место обновлено', meta: place };
        } catch (e) {
            return { error: true, message: 'Ошибка обновления места', meta: e }
        }

    }
}
