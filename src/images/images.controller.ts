import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImagesDto } from './dto/create-images.dto';
import { ImagesService } from './images.service';
import { Express } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private service: ImagesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFile() image: Express.Multer.File) {
        return this.service.create(image)
    }
}
