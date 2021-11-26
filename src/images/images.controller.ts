import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Express } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private service: ImagesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto) {
        console.log(dto.id);
        return this.service.create(file)
    }
}
