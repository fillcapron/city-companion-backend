import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
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
                phone: dto.phone,
                category: { id: category },
                address: { id: address }
            });

            return { error: false, message: 'Место добавлено', meta: place };

        } catch (e) {
            return { error: true, message: 'Ошибка добавления места', meta: e };
        }

    }

    async getOnePlace(name: string): Promise<Places> {
        return await this.repoPlace.findOneOrFail(name, { relations: ['category', 'tags', 'images', 'address', 'reviews'] });
    }

    async getAllPlaces() {
        return await this.repoPlace.find({ relations: ['category', 'tags', 'images', 'address', 'reviews'] });
    }

    async deletePlace(id: number): Promise<IMessage> {
        try {
            const place = await this.repoPlace.delete(id);
            return { error: false, message: 'Место удалено', meta: place };
        } catch (e) {
            return { error: true, message: 'Ошибка удаления места', meta: e }
        }
    }

    async updatePlace(dto: CreatePlaceDto): Promise<IMessage> {
        try {
            const place = await this.repoPlace.update(dto.id, dto)
            return { error: false, message: 'Место обновлено', meta: place };
        } catch (e) {
            return { error: true, message: 'Ошибка обновления места', meta: e }
        }

    }

    async changePublished(id: number, { isPublished }): Promise<void> {
        try {
            await this.repoPlace.update(id, {
                published: isPublished
            });
        } catch (e) {
            throw new BadRequestException();
        }
    }

    async getPlacesByCategory(categoryName: string): Promise<any> {
        try {
            return this.repoPlace.find({
                join: { alias: 'place', innerJoin: { places: 'place.category' } },
                where: {
                    category: categoryName
                },
                relations: ['images', 'address', 'reviews']
            })
        } catch (e) {
            return e
        }
    }

    async updateViewsPlace(id: number, { views }): Promise<void> {
        try {
            await this.repoPlace.update(id, {
                views
            });
        } catch (e) {
            throw new BadRequestException();
        }
    }

    async updateRatingPlace<T>(id: T, rating: number): Promise<void> {
        try {
            await this.repoPlace.update(id, {
                rating
            });
        } catch (e) {
            throw new BadRequestException();
        }
    }

    async popularPlaces(): Promise<Places[]> {
        return await this.repoPlace.find({
            order: {
                'views': 'DESC'
            },
            relations: ['images'],
            take: 10
        });
    }

    async totalPlaces(): Promise<{ name: string, total: number, icon: string }> {
        const total = await this.repoPlace.count();
        return { name: 'Места', total: total, icon: 'business' }
    }
}
