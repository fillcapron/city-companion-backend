import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';
import { ImagesModule } from './images/images.module';
import { PlacesModule } from './places/places.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CategoryModule,
    AddressModule,
    ImagesModule,
    PlacesModule,
    ReviewsModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
