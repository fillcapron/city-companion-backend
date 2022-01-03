import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { IMessage } from 'src/address/dto/create-address.dto';
import { Places } from 'src/entity/places.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(private readonly service: PlacesService, private readonly serviceReviews: ReviewsService) { }

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
    async getOne(@Param() name: string): Promise<Places> {
        const place = await this.service.getOnePlace(name);
        const rating = await this.serviceReviews.getRatingPlace({ id: place.id });
        return Object.assign(place, rating);
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
