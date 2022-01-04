import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from 'src/entity/reviews.entity';
import { PlacesService } from 'src/places/places.service';
import { Places } from 'src/entity/places.entity';

@Module({
  providers: [ReviewsService, PlacesService],
  imports: [TypeOrmModule.forFeature([Reviews, Places])],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
