import { IsNumber, IsString } from "class-validator";

export class CreatePlaceDto {
    id: number;
    @IsString({message: 'Должно быть строкой'})
    name: string;
    @IsString({message: 'Должно быть строкой'})
    address: number;
    @IsString({message: 'Должно быть строкой'})
    description: string;
    @IsNumber({}, {message: 'Должно быть числом'})
    category: number;
    @IsNumber({}, {message: 'Должно быть числом'})
    rating: number;
    @IsString({message: 'Должно быть строкой'})
    website: string;
}