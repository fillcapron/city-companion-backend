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
        return await this.repo.find();
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
            return { error: false, message: `Категория "${done.name}" добавлена`, meta: done };
        } catch (e) {
            return { error: true, message: 'Ошибка создания категории', meta: e }
        }
    }

    async updateGategory(dto: CreateCategoryDto): Promise<IMessage> {
        try {
            const category = await this.repo.update(dto.id, dto);
            return { message: 'Категория обновлена', meta: category }
        } catch (e) {
            return { error: true, message: 'Ошибка обновления категории', meta: e }
        }

    }

    async deleteCategory(id: number): Promise<IMessage> {
        try {
            const category = await this.repo.delete(id);
            return { message: 'Категория  удалена', meta: category };
        } catch (e) {
            return { message: 'Ошибка удаления категории', meta: e };
        }
    }
}
