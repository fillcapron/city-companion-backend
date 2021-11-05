import { Body, Controller, Get, Post } from '@nestjs/common';
import { Places } from 'src/entity/places.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(private readonly service: PlacesService) { }

    @Post()
    create(@Body() dto: CreatePlaceDto): Promise<number>{
        return this.service.createPlace(dto);
    } 

    @Get()
    getAll(): Promise<Places[]> {
        return this.service.getPlaces();
    }
}
