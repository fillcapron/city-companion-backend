import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Reviews } from 'src/entity/reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {

    constructor(private reviewsService: ReviewsService) {}

    @Post()
    create(@Body() dto: CreateReviewDto): Promise<IMessage> {
        return this.reviewsService.createReview(dto);
    }

    @Get()
    getAll(): Promise<Reviews[]> {
        return this.reviewsService.getAll();
    }

    @Get(':id')
    getOne(@Param() id: number): Promise<Reviews> {
        return this.reviewsService.getOne(id);
    }

    @Delete(':id')
    delete(@Param() id: number): Promise<IMessage> {
        return this.reviewsService.deleteReview(id);
    }
}
