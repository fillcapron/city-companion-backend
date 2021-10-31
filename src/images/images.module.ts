import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from 'src/entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  providers: [ImagesService],
  controllers: [ImagesController]
})
export class ImagesModule {}
