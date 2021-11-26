import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
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

    async create(file: Express.Multer.File, dto: CreateImagesDto): Promise<Images | IMessage> {
        const upload = await this.cloudinary.uploadImage(file).catch((e) => {
            throw new BadRequestException(e);
        });

        try {
            const image = await this.repo.save({
                url: upload.url,
                ...dto
            });

            return image;

        } catch (e) {

            return { error: true, message: 'Ошибка добавления изображения' }
        }
    }
}
