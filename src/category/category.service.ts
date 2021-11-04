import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Repository } from 'typeorm';
import { Categories } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Categories) private readonly repo: Repository<Categories>) { }

    public async getAllCategoties(): Promise<Categories[]> {
        return await this.repo.find({ relations: ['tags'] });
    }

    public async getOneCategory(id: number): Promise<Categories | {}> {
        const result = await this.repo.findOne(id, { relations: ['tags'] });
        if (result) {
            return result;
        } else {
            return { message: "Категория не найдена" }
        }
    }

    public async createCategory(categoryDto: CreateCategoryDto): Promise<Categories | IMessage> {
        try {
            const category = await this.repo.save(categoryDto);
            const done = await category;
            return { message: `Категория "${done.name}" добавлена` };
        } catch (e) {
            console.log(e)
            return { message: 'Ошибка создания категории' }
        }
    }

    public async deleteCategory(id: number): Promise<void> {
        const res = this.repo.delete(id)
        res.then(r => console.log(r))
    }
}
