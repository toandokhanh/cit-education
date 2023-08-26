import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class CreateCourseDto extends BaseDto{
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
    categoryId: number;// Catetory table ID

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    @IsOptional()
    creatorId: number;// User table ID

} 