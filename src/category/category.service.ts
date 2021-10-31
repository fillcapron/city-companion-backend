import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../entity/category.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Categories) private readonly repo: Repository<Categories>) { }

    public async getAll(): Promise<Categories[]> {
        return await this.repo.find({relations: ['tags']});
    }

    public async getOne(id: number): Promise<Categories | {}> {
        const result = await this.repo.findOne(id, {relations: ['tags']});
        if(result){
            return result;
        } else {
            return {message: "Категория не найдена"}
        }
    }

    public async create(name): Promise<Categories | {}> {
        try {
            const category = await this.repo.save(name);
            const done = await category;
            return { message: `Категория "${done.name}" добавлена` };
        } catch (e) {
            console.log(e)
            return { message: 'Ошибка создания категории' }
        }
    }

    public async delete(id: number): Promise<void> {
        const res = this.repo.delete(id)
        res.then(r => console.log(r))
    }
}
