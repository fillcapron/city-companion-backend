import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Images } from 'src/entity/images.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CreateImagesDto, UploadImage } from './dto/create-images.dto';
require('dotenv').config();

@Injectable()
export class ImagesService {

    constructor(
        @InjectRepository(Images)
        private repo: Repository<Images>,
        private cloudinary: CloudinaryService) { }

    async upload(file: Express.Multer.File): Promise<UploadImage | BadRequestException> {
        const upload = await this.cloudinary.uploadImage(file).catch((e) => {
            throw new BadRequestException(e);
        });
        return {url: upload.url, name: upload.name};
    }

    async create(images: CreateImagesDto[]) {
        try {
            return await this.repo.createQueryBuilder()
                .insert()
                .into(Images)
                .values(images)
                .execute();

        } catch (e) {
            return { error: true, message: 'Ошибка добавления изображения', meta: e }
        }
    }
}
