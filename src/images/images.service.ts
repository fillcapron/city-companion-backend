import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entity/images.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {

    constructor(@InjectRepository(Images) private readonly repo: Repository<Images>) {}

    public async create(placeId: number, path: string): Promise<number>{
        const res = await this.repo.save({url_path: path, placeId: placeId });
        return res.id
    }
}
