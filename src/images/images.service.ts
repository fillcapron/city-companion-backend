import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entity/images.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CreateImagesDto } from './dto/create-images.dto';
require('dotenv').config();

@Injectable()
export class ImagesService {

    constructor(
        @InjectRepository(Images) 
        private repo: Repository<Images>,
        private cloudinary: CloudinaryService) { }

    async create(image: Express.Multer.File): Promise<any> {
        const upload = await this.cloudinary.uploadImage(image).catch((e) => {
            throw new BadRequestException(e);
          });
        
        console.log(upload.url);
    }
}
