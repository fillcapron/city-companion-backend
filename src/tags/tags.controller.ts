import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Tags } from 'src/entity/tags.entity';
import { createTagsDto } from './dto/create-tags.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Post()
    create(@Body() tag: createTagsDto): Promise<IMessage> {
        return this.tagsService.createTag(tag);
    }

    @Get()
    getAll(): Promise<Tags[]> {
        return this.tagsService.getAllTags();
    }

    @Get(':id')
    getOne(@Param('id') name: string): Promise<Tags> {
        return this.tagsService.getOneTag(name);
    }

    @Delete(':id')
    delete(@Param() id: number): Promise<IMessage> {
        return this.tagsService.deleteTag(id);
    }
}
