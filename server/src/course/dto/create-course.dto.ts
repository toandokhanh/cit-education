import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";
import { BaseDto } from "../../common/base.dto";

export class CreateCourseDto extends BaseDto{
    @IsString()
    @IsNotEmpty()
    @Expose()
    title : string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    description: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    thumbnail: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    category: number;// Category table ID


    @IsOptional()
    @Expose()
    @Transform(({ value }) => value) // Tùy chọn này chỉ định giá trị của creator sẽ được giữ nguyên
    creator: number;
}
