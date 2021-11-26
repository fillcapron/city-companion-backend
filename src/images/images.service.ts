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

        const options:any = {
            "key": '6bc5e52e6e7269527190e01f01479346'
        }
        await this.http.post(process.env.URL_UPLOAD_IMG, image, options).subscribe(
            res => console.log(res),
            err => console.log(err.response.data)
        );
        // try {
        //     const response = await this.http.axiosRef.post(process.env.URL_UPLOAD_IMG, options);
        //     if (response.status === 200) {
        //         const title: any = response.data
        //         console.log(title)
        //         // this.repo.save({
        //         //     title: title
        //         // })
        //     }

        // } catch(e) {
        //     console.log(e)
        // }
        
        
    }
}
