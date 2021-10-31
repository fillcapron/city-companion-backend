import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Categories } from '../entity/category.entity';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    imports: [
      TypeOrmModule.forFeature([Categories])
    ]
  })
export class CategoryModule {}
