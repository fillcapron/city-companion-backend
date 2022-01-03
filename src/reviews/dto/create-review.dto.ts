import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    id: number;
    @IsString({ message: 'Должно быть строкой' })
    author_name: string;

    @IsString({ message: 'Должно быть строкой' })
    review_text: string;

    @IsNumber({},{ message: 'Должно быть числом'})
    @Min(1)
    @Max(5)
    rating_place: number
}