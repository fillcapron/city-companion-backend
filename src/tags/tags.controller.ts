import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    getOne(@Param('id') name: string) {
        return this.tagsService.getOneTag(name);
    }

    @Delete(':id')
    delete(@Param() id: number) {
        return this.tagsService.deleteTag(id);
    }
}
