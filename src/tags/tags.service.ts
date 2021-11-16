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
            const res = await this.repo.save({
                name: dto.name,
                category: { id: dto.categoryId }
            })
            return res

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
}
