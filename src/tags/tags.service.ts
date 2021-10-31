import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from 'src/entity/tags.entity';
import { Repository } from 'typeorm';
import { createTagsDto } from './dto/create-tags.dto';

@Injectable()
export class TagsService {
    constructor(@InjectRepository(Tags) private readonly repo: Repository<Tags>) { }

    async create(dto: createTagsDto): Promise<number | {}> {
        try {
            const res = await this.repo.save({
                name: dto.name,
                category: { id: dto.categoryId }
            })
            return res.id
        } catch(e) {
            console.log(e);
            return {message: "Ошибка создания тэга"}
        }
        
    }

    async getAll() {
        return this.repo.find();
    }

    async getOne(id: number) {
        return this.repo.findOneOrFail(id, {relations: ['category', 'place']});
    }
}
