import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/entity/address.entity';
import { Places } from 'src/entity/places.entity';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
    imports: [TypeOrmModule.forFeature([Places, Address])],
    providers: [PlacesService, AddressService],
    controllers: [PlacesController]
})
export class PlacesModule {}
