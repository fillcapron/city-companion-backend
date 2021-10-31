import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Categories } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) { }

    @Get()
    public getAll(): Promise<Categories[]> {
        return this.service.getAll();
    }

    @Get(':id')
    public async getOneCategory(@Param('id') id: number): Promise<Categories | {}> {
        return await this.service.getOne(id);
    }

    @Post()
    public async createCategory(@Body() dto: CreateCategoryDto): Promise<any> {
        return this.service.create(dto);
    }

    @Delete(':id')
    public deleteCategory(@Param('id') id: number): Promise<void> {
        return this.service.delete(id);
    }
}
