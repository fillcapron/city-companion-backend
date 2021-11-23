import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entity/images.entity';
import { Repository } from 'typeorm';
import { CreateImagesDto } from './dto/create-images.dto';

require('dotenv').config();

@Injectable()
export class ImagesService {

    constructor(
        @InjectRepository(Images) private repo: Repository<Images>,
        private http: HttpService) { }

    async create(image): Promise<void> {
        console.log(image)
        const options = {
            key: process.env.KEY_UPLOAD_IMG,
            image: image
        }
        try {
            const response = await this.http.axiosRef.post(process.env.URL_UPLOAD_IMG, options);
            if (response.status === 200) {
                const title: any = response.data
                console.log(title)
                // this.repo.save({
                //     title: title
                // })
            }
        } catch(e) {
            console.log(e)
        }
        
        
    }
}
