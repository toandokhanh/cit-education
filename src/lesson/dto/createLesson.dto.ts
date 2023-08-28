import { IsNotEmpty, IsString } from "class-validator";

export class CreateLessonDTO{
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    content: string;


    @IsString()
    video: string;


    @IsString()
    sourceLanguage: string;


    @IsString()
    targetLanguage: string;

    
    @IsString()
    algorithm: string;
}