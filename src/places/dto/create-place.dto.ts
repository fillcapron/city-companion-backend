import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { Address } from "src/entity/address.entity";
import { Categories } from "src/entity/category.entity";

export class CreatePlaceDto {
    id: number;
    @IsString({message: 'Должно быть строкой'})
    name: string;
    @Type(() => Address)
    address: Address;
    @IsString({message: 'Должно быть строкой'})
    description: string;
    @Type(() => Categories)
    category: Categories;
    @IsNumber({}, {message: 'Должно быть числом'})
    rating: number;
    @IsString({message: 'Должно быть строкой'})
    website: string;
}