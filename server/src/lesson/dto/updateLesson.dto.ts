import { IsNotEmpty, IsString } from "class-validator";

export class UpdateLessonDTO{
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    content: string;
}