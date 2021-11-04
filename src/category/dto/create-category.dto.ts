import { IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNumber({}, {message: 'Должно быть числом'})
    id: number;
    @IsString({message: 'Должно быть строкой'})
    name: string;
}