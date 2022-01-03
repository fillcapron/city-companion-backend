import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/entity/address.entity';
import { Places } from 'src/entity/places.entity';
import { Reviews } from 'src/entity/reviews.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
    imports: [TypeOrmModule.forFeature([Places, Address, Reviews])],
    providers: [PlacesService, AddressService, ReviewsService],
    controllers: [PlacesController]
})
export class PlacesModule {}
