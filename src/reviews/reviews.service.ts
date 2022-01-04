import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Places } from 'src/entity/places.entity';
import { Reviews } from 'src/entity/reviews.entity';
import { PlacesService } from 'src/places/places.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(Reviews) private repo: Repository<Reviews>, private placeService: PlacesService) { }

    async getAll(): Promise<Reviews[]> {
        return await this.repo.find();
    }

    async getOne(id: number): Promise<Reviews> {
        return await this.repo.findOne(id);
    }

    async createReview(dto: CreateReviewDto): Promise<IMessage> {
        try {
            const review = await this.repo.create(dto).save();
            if (review.id) {
                const idPlace = review.place;
                const rating = await this.getRatingPlace(idPlace);
                const place = await this.placeService.updateRatingPlace(idPlace, rating.rating);
            }
            return { message: 'Комментарий создан', meta: review }
        } catch (e) {
            return { error: true, message: 'Ошибка создания комментария', meta: e }
        }

    }

    async deleteReview(id: number): Promise<IMessage> {
        try {
            const review = await this.repo.delete(id);
            return { error: false, message: 'Комментарий удален', meta: review }
        } catch (e) {
            return { error: true, message: 'Ошибка удаления комментария', meta: e }
        }
    }

    async getRatingPlace<T>(id: T) {

        const { total } = await this.repo
            .createQueryBuilder("reviews")
            .select("SUM(reviews.rating_place)/COUNT(reviews.rating_place)", "total")
            .where("reviews.placeId = :placeId", { placeId: id })
            .getRawOne();
            
        return { rating: +total };
    }
}
