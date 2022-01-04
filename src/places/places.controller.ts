import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Places } from 'src/entity/places.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(private readonly service: PlacesService) { }

    @Post()
    create(@Body() dto: CreatePlaceDto): Promise<Places | IMessage> {
        return this.service.createPlace(dto);
    }

    @Put('published/:id')
    changePublished(@Param() id: number, @Body() dto: { isPublished: boolean }): Promise<void> {
        return this.service.changePublished(id, dto);
    }

    @Get()
    getAll(): Promise<Places[]> {
        return this.service.getAllPlaces();
    }

    @Get(':name')
    getOne(@Param() name: string): Promise<Places> {
        return this.service.getOnePlace(name);
    }

    @Delete(':id')
    delete(@Param() id: number): Promise<IMessage> {
        return this.service.deletePlace(id);
    }

    @Patch()
    update(@Body() dto: CreatePlaceDto): Promise<IMessage> {
        return this.service.updatePlace(dto);
    }

    @Get('/category/:name')
    getPlaces(@Param() name: string): Promise<any> {
        return this.service.getPlacesByCategory(name);
    }

    @Put('views/:id')
    updateViews(@Param() id: number, @Body() dto: { views: number }): Promise<void> {
        return this.service.updateViewsPlace(id, dto);
    }

    @Get('/popular/all')
    getPopularPlaces(): Promise<Places[]> {
        return this.service.popularPlaces();
    }
}
