import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from 'src/entity/tags.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tags])],
    providers: [TagsService],
    controllers: [TagsController]
})
export class TagsModule {}
