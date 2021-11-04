import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createTagsDto } from './dto/create-tags.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }
    
    @Post()
    create(@Body() tag: createTagsDto): Promise<number | {}> {
        return this.tagsService.createTag(tag);
    }

    @Get()
    getAll() {
        return this.tagsService.getAllTags();
    }

    @Get(':id')
    getOne(@Param('id') id: number){
        return this.tagsService.getOneTag(id);
    }
}
