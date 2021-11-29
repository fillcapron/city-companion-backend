import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Express } from 'express';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Images } from 'src/entity/images.entity';
import { CreateImagesDto, UploadImage } from './dto/create-images.dto';
import { InsertResult } from 'typeorm';

@Controller('images')
export class ImagesController {
    constructor(private service: ImagesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadImage | BadRequestException> {
        return this.service.upload(file);
    }

    @Post('save')
    create(@Body() images: CreateImagesDto[]) {
        return this.service.saveImages(images);
    }
}
