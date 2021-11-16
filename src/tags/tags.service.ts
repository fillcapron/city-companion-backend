import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Tags } from 'src/entity/tags.entity';
import { Repository } from 'typeorm';
import { createTagsDto } from './dto/create-tags.dto';

@Injectable()
export class TagsService {
    constructor(@InjectRepository(Tags) private readonly repo: Repository<Tags>) { }

    async createTag(dto: createTagsDto): Promise<Tags | IMessage> {
        try {
            const res = await this.repo.save(dto);
            return res;

        } catch (e) {
            return { message: 'Ошибка добавления тэга', meta: e }
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

    async CreateTags(tags: Tags[]) {
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

    async deleteTags(id: number) {
        try {
            return await this.repo.createQueryBuilder()
                .delete()
                .from(Tags)
                .where("id = :id", { id })
                .execute()
        } catch (e) {
            return { error: true, message: 'Ошибка удаления тегов', meta: e }
        }
    }
}