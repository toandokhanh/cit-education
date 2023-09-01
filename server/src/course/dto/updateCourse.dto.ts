import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCourseDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    title : string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    category: number;// Catetory table ID


}