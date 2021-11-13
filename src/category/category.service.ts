import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Repository } from 'typeorm';
import { Categories } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Categories) private readonly repo: Repository<Categories>) { }

    async getAllCategoties(): Promise<Categories[]> {
        return await this.repo.find({ relations: ['tags'] });
    }

    async getOneCategory(id: number): Promise<Categories | {}> {
        const result = await this.repo.findOne(id, { relations: ['tags'] });
        if (result) {
            return result;
        } else {
            return { message: "Категория не найдена" }
        }
    }

    async createCategory(categoryDto: CreateCategoryDto): Promise<Categories | IMessage> {
        try {
            const category = await this.repo.save(categoryDto);
            const done = await category;
            return { message: `Категория "${done.name}" добавлена` };
        } catch (e) {
            console.log(e)
            return { message: 'Ошибка создания категории' }
        }
    }

    async updateGategory(dto: CreateCategoryDto): Promise<IMessage> {
        const category = await this.repo.update(dto.id, dto);
        return { message: 'Категория обновлена' }
    }

    async deleteCategory(id: number): Promise<IMessage> {
        const category = await this.repo.delete(id);
        return { message: `Категория  удалена` }
    }
}
