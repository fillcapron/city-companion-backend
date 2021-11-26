import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from 'src/entity/images.entity';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Images]), CloudinaryModule],
  providers: [ImagesService],
  controllers: [ImagesController]
})
export class ImagesModule {}
