import { IsString } from "class-validator";

export class CreateReviewDto {
    id: number;
    @IsString({ message: 'Должно быть строкой' })
    readonly author_name: string;
    @IsString({ message: 'Должно быть строкой' })
    readonly review_text: string;
}