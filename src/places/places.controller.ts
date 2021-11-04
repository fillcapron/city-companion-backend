import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(private readonly service: PlacesService) { }

    @Post()
    create(@Body() dto: CreatePlaceDto): Promise<any>{
        return this.service.createPlace(dto);
    } 
}
