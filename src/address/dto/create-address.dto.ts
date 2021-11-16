import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { Categories } from "src/entity/category.entity";
import { Places } from "src/entity/places.entity";

export class CreateAddressDto {

    readonly id: number;

    @IsString({message: 'Должно быть строкой'})
    readonly country: string;

    @IsString({message: 'Должно быть строкой'})
    readonly region: string;

    @IsString({message: 'Должно быть строкой'})
    readonly city: string;

    @IsString({message: 'Должно быть строкой'})
    readonly street: string;

    @IsString({message: 'Должно быть строкой'})
    readonly house: string;

    @IsString({message: 'Должно быть строкой'})
    latitude: string;

    @IsString({message: 'Должно быть строкой'})
    longitude: string;

    @Type(() => Categories)
    category: Categories;
    
    @Type(() => Places)
    place: Places[];
}

export interface IMessage {
    error?: boolean,
    message: string,
    meta?: any
}

export interface GeoData {
    source: string,
    result: string,
    postal_code: string,
    country: string,
    region: string,
    city_area: string,
    city_district: string,
    street: string,
    house: string,
    geo_lat: string,
    geo_lon: string,
    qc_geo: number
}

export interface LatLon{
    geo_lat: string,
    geo_lon: string
}