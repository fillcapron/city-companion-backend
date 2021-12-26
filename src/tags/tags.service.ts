import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Tags } from 'src/entity/tags.entity';
import { ILike, Like, Repository } from 'typeorm';
import { createTagsDto } from './dto/create-tags.dto';

@Injectable()
export class TagsService {
    constructor(@InjectRepository(Tags) private readonly repo: Repository<Tags>) { }

    async createTag(dto: createTagsDto): Promise<Tags | IMessage> {
        try {
            const res = await this.repo.save(dto);
            return res;

        } catch (e) {
            return { error: true, message: 'Ошибка добавления тэга', meta: e }
        }

    }

    async getAllTags(): Promise<Tags[]> {
        return await this.repo.find();
    }

    async getOneTag(name: string): Promise<Tags> {
        return await this.repo.findOneOrFail(name, { relations: ['category', 'place'] });
    }

    async deleteTag(id: number): Promise<IMessage> {
        try {
            const tag = await this.repo.delete(id);
            return { message: 'Тег удален', meta: tag }
        } catch (e) {
            return { error: true, message: 'Ошибка удаления тега', meta: e }
        }
    }

    async createTags(tags: createTagsDto[]) {
        try {
            return await this.repo.createQueryBuilder()
                .insert()
                .into(Tags)
                .values(tags)
                .execute()
        } catch (e) {
            return { erorr: true, message: 'Ошибка добавления тегов', meta: e }
        }
    }

    async getPlaceOrCategory({query}) {
        return await this.repo.createQueryBuilder('tags')
        .select(['tags.id'])
        .where({name: ILike(`%${query}%`)})
        .leftJoin('tags.place', 'places')
        .leftJoin('tags.category', 'categories')
        .addSelect(['places.id', 'places.name', 'categories.id', 'categories.name'])
        .getMany()
    }
}