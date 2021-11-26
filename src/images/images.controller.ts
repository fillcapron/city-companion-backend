import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Express } from 'express';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Images } from 'src/entity/images.entity';
import { CreateImagesDto } from './dto/create-images.dto';

@Controller('images')
export class ImagesController {
    constructor(private service: ImagesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateImagesDto): Promise<Images | IMessage> {
        return this.service.create(file, dto);
    }
}
