import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Reviews } from 'src/entity/reviews.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(Reviews) private repo: Repository<Reviews>) { }

    async getAll(): Promise<Reviews[]> {
        return await this.repo.find();
    }

    async getOne(id: number): Promise<Reviews> {
        return await this.repo.findOne(id);
    }

    async createReview(dto: CreateReviewDto): Promise<IMessage> {
        const review = await this.repo.create(dto).save();
        return { message: 'Комментарий создан', meta: review }
    }

    async deleteReview(id: number): Promise<IMessage> {
        const review = await this.repo.delete(id);
        return {message: 'Комментарий удален', meta: review}
    }
}
