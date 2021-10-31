import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createTagsDto } from './dto/create-tags.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }
    
    @Post()
    create(@Body() tag: createTagsDto): Promise<number | {}> {
        return this.tagsService.create(tag);
    }

    @Get()
    getAll() {
        return this.tagsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number){
        return this.tagsService.getOne(id);
    }
}
