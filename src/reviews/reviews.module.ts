import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from 'src/entity/reviews.entity';

@Module({
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([Reviews])],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
