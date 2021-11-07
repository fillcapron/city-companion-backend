import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Categories } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IMessage } from 'src/address/dto/create-address.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) { }

    @Get()
    public getAll(): Promise<Categories[]> {
        return this.service.getAllCategoties();
    }

    @Get(':id')
    public getOne(@Param('id') id: number): Promise<Categories | {}> {
        return this.service.getOneCategory(id);
    }

    @Post()
    public create(@Body() dto: CreateCategoryDto): Promise<any> {
        return this.service.createCategory(dto);
    }

    @Delete(':id')
    public delete(@Param('id') id: number): Promise<IMessage> {
        return this.service.deleteCategory(id);
    }

    @Patch()
    public updateCategory(
        @Body() dto: CreateCategoryDto
    ): Promise<IMessage> {
        return this.service.updateGategory(dto);
    }
}
