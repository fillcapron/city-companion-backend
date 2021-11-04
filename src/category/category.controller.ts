import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Categories } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) { }

    @Get()
    public getAll(): Promise<Categories[]> {
        return this.service.getAllCategoties();
    }

    @Get(':id')
    public async getOne(@Param('id') id: number): Promise<Categories | {}> {
        return await this.service.getOneCategory(id);
    }

    @Post()
    public async create(@Body() dto: CreateCategoryDto): Promise<any> {
        return this.service.createCategory(dto);
    }

    @Delete(':id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.service.deleteCategory(id);
    }
}
